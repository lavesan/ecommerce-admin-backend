import { IPaginationRequest } from "models/pagination.models";
import { container, inject, injectable } from "tsyringe";

import { UpdateOrderError } from "../errors/UpdateOrderError";
import { ICreateOrderRequest } from "../models/ICreateOrderRequest";
import { IPaginateOrderRequest } from "../models/IPaginateOrderRequest";
import { IUpdateOrder } from "../models/IUpdateOrder";
import { IPaginateMineOrderRequest } from "../models/IPaginateMineOrderRequest";
import { IOrderRepository } from "../repositories/IOrderRepository";
import { maskMoney, translatePaymentType } from "@helpers/mask.helper";
import { MailService } from "@modules/mail/services/MailService";

@injectable()
export class OrderService {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: IOrderRepository
  ) {}

  paginate(pagination: IPaginationRequest, filter: IPaginateOrderRequest) {
    return this.orderRepository.paginate(pagination, filter);
  }

  paginateMine(
    pagination: IPaginationRequest,
    filter: IPaginateMineOrderRequest
  ) {
    return this.orderRepository.paginateMine(pagination, filter);
  }

  async create(body: ICreateOrderRequest) {
    const mailService = container.resolve(MailService);

    const order = await this.orderRepository.create(body);

    const orderRoute = `/empresas/${order.enterprise.id}/pedidos/${order.id}`;

    await mailService.send({
      from: "arco.marketplace.12@gmail.com",
      to: order.enterprise.email,
      title: `Pedido feito ${order.id}`,
      htmlBody: `
        <a href="${
          process.env.ADMIN_FRONT_URL
        }${orderRoute}" target="_blank">Ver no Dashboard</a>
        <h2>${order.client.name}</h2>
        <p>Valor: ${maskMoney(order.productsValue + order.freightValue)}</p>
        <p>Tipo de pagamento: ${translatePaymentType[order.paymentType]}</p>
        <p>Produtos</p>
        ${order.orderProducts.reduce(
          (stringValue, element) => `
          ${stringValue ? "<br />" : ""}
          <b>${element.quantity}x ${element.product.name}</b>
          <br />${element.additionals.reduce(
            (initialValue, additional) =>
              `${initialValue}${additional.quantity}x ${additional.productAdditional.name}, `,
            ""
          )}
        `,
          ""
        )}
        <p>Endereço</p>
        <p>Bairro: ${order.address.district}</p>
        <p>Rua: ${order.address.street}</p>
        <p>Número: ${order.address.number}</p>
        <p>Complemento: ${order.address.complement}</p>
        <p>CEP: ${order.address.cep}</p>
      `,
    });

    return order;
  }

  findById(id: string) {
    return this.orderRepository.findById(id);
  }

  async update(id: string, body: IUpdateOrder) {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new UpdateOrderError.DontExist();

    return this.orderRepository.update(id, body);
  }
}
