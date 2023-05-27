import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";

import { UpdateOrderError } from "../errors/UpdateOrderError";
import { ICreateOrderRequest } from "../models/ICreateOrderRequest";
import { IPaginateOrderRequest } from "../models/IPaginateOrderRequest";
import { IUpdateOrder } from "../models/IUpdateOrder";
import { IPaginateMineOrderRequest } from "../models/IPaginateMineOrderRequest";
import { IOrderRepository } from "../repositories/IOrderRepository";

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

  create(body: ICreateOrderRequest) {
    return this.orderRepository.create(body);
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
