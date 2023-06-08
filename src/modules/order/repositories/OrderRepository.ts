import { FindOptionsWhere, In, Repository } from "typeorm";
import { container } from "tsyringe";

import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "@data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { Order } from "../entities/Order";
import { ICreateOrder } from "../models/ICreateOrder";
import { IPaginateOrderRequest } from "../models/IPaginateOrderRequest";
import { IUpdateOrder } from "../models/IUpdateOrder";
import { IOrderRepository } from "./IOrderRepository";
import { PaymentType } from "../enums/PaymentType";
import { IPaginateMineOrderRequest } from "../models/IPaginateMineOrderRequest";
import { OrderStatus } from "../enums/OrderStatus";
import { ClientService } from "@modules/client/services/ClientService";
import { IFindMineById } from "../models/IFindMineById";
import { IConcludeOrderRequest } from "../models/IConcludeOrderRequest";
import { IActiveOrdersCountRequest } from "../models/IActiveOrdersCountRequest";

export class OrderRepository implements IOrderRepository {
  private readonly repository: Repository<Order>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }

  async create({
    products,
    address,
    enterpriseId,
    freightId,
    clientId,
    hasCents,
    moneyExchange,
    ...body
  }: ICreateOrder): Promise<Order> {
    // @ts-ignore
    delete address.id;

    const orderProducts = products.map(({ id, additionals, ...product }) => ({
      ...product,
      product: { id },
      additionals: additionals.map(({ id: additionalId, ...additional }) => ({
        ...additional,
        productAdditional: { id: additionalId },
      })),
    }));

    let exchangeObj: Partial<Order> = {};

    if (body.paymentType === PaymentType.MONEY) {
      exchangeObj = {
        hasCents: hasCents,
        // @ts-ignore
        moneyExchanges: moneyExchange,
      };
    }

    const order = this.repository.create({
      ...body,
      ...exchangeObj,
      address,
      orderProducts,
      enterprise: { id: enterpriseId },
      freight: { id: freightId },
      client: { id: clientId },
    });

    const createdOrder = await this.repository.save(order);

    return this.repository.findOne({
      where: { id: createdOrder.id },
      relations: [
        "orderProducts",
        "orderProducts.product",
        "orderProducts.additionals",
        "orderProducts.additionals.productAdditional",
        "address",
        "client",
        "enterprise",
      ],
    });
  }

  async update(id: string, { status }: IUpdateOrder): Promise<boolean> {
    const order = await this.repository.findOne({
      where: { id },
      relations: ["client", "orderProducts", "orderProducts.product"],
    });

    await this.addPointsToClient(order, status);

    await this.repository.update(id, { status });
    return true;
  }

  findById(id: string): Promise<Order> {
    return this.repository.findOne({
      where: { id },
      relations: [
        "orderProducts",
        "orderProducts.product",
        "orderProducts.additionals",
        "orderProducts.additionals.productAdditional",
        "address",
        "client",
      ],
    });
  }

  findMineById({ orderId, clientId }: IFindMineById): Promise<Order> {
    return this.repository.findOne({
      where: { id: orderId, client: { id: clientId } },
      relations: [
        "orderProducts",
        "orderProducts.product",
        "orderProducts.additionals",
        "orderProducts.additionals.productAdditional",
        "address",
        "client",
        "enterprise",
      ],
    });
  }

  async paginate(
    pagination: IPaginationRequest,
    {
      paymentType,
      status,
      finalDate,
      initialDate,
      clientId,
      enterpriseId,
    }: IPaginateOrderRequest
  ): Promise<IPaginationResponse<Order>> {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Order> = {};

    if (paymentType) where.paymentType = paymentType;
    if (status) where.status = status;
    if (clientId) where.client = { id: clientId };
    if (enterpriseId) where.enterprise = { id: enterpriseId };
    // if (initialDate && finalDate)

    const [data, count] = await this.repository.findAndCount({
      order: {
        status: "ASC",
      },
      ...paginationData,
      where,
      relations: ["client"],
    });

    return {
      data,
      count,
      ...pagination,
    };
  }

  async paginateMine(
    pagination: IPaginationRequest,
    { clientId, isActive }: IPaginateMineOrderRequest
  ): Promise<IPaginationResponse<Order>> {
    const paginationData = getSkipAndTake(pagination);

    const doneStatus = [
      OrderStatus.CANCELED,
      OrderStatus.DELETED,
      OrderStatus.DONE,
    ];

    const doingStatus = [
      OrderStatus.DOING,
      OrderStatus.SENDING,
      OrderStatus.TO_APPROVE,
    ];

    const where: FindOptionsWhere<Order> = {
      client: { id: clientId },
      status: isActive ? In(doingStatus) : In(doneStatus),
    };

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      where,
      relations: [
        "address",
        "enterprise",
        "enterprise.freights",
        "orderProducts",
        "orderProducts.product",
        "orderProducts.additionals",
        "orderProducts.additionals.productAdditional",
      ],
      ...paginationData,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }

  async concludeOrder({
    orderId,
    clientId,
  }: IConcludeOrderRequest): Promise<boolean> {
    const order = await this.repository.findOne({
      where: { id: orderId },
      relations: ["client", "orderProducts", "orderProducts.product"],
    });

    if (order.status !== OrderStatus.DONE)
      await this.addPointsToClient(order, OrderStatus.DONE);

    if (order.status === OrderStatus.SENDING) {
      await this.repository.update(orderId, { client: { id: clientId } });
    }

    return true;
  }

  async activeOrdersCount({ userId, isAdmin }: IActiveOrdersCountRequest) {
    const doingStatus = [
      OrderStatus.DOING,
      OrderStatus.SENDING,
      OrderStatus.TO_APPROVE,
    ];

    const where: FindOptionsWhere<Order> = isAdmin
      ? {}
      : { enterprise: { users: { id: userId } } };

    const count = await this.repository.count({
      where: { ...where, status: In(doingStatus) },
    });

    return {
      count,
    };
  }

  private async addPointsToClient(order: Order, newStatus: OrderStatus) {
    const clientService = container.resolve(ClientService);

    if (order.status === OrderStatus.DONE) {
      const orderPoints = order.orderProducts.reduce((value, prod) => {
        return value + prod.product.givenPoints * prod.quantity;
      }, 0);

      const finalClientPoints = order.client.points - orderPoints;

      await clientService.update(order.client.id, {
        points: finalClientPoints < 0 ? 0 : finalClientPoints,
      });
    } else if (newStatus === OrderStatus.DONE) {
      const orderPoints = order.orderProducts.reduce((value, prod) => {
        return value + prod.product.givenPoints * prod.quantity;
      }, 0);

      const finalClientPoints = order.client.points + orderPoints;

      await clientService.update(order.client.id, {
        points: finalClientPoints,
      });
    }
  }
}
