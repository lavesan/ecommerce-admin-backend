import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "@data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { FindOptionsWhere, Repository } from "typeorm";
import { Order } from "../entities/Order";
import { ICreateOrder } from "../models/ICreateOrder";
import { IPaginateOrderRequest } from "../models/IPaginateOrderRequest";
import { IUpdateOrder } from "../models/IUpdateOrder";
import { IOrderRepository } from "./IOrderRepository";
import { PaymentType } from "../enums/PaymentType";

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

    return createdOrder;
  }

  async update(id: string, body: IUpdateOrder): Promise<boolean> {
    await this.repository.update(id, body);
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
        created_at: "DESC",
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
}
