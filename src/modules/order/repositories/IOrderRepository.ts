import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Order } from "../entities/Order";
import { ICreateOrder } from "../models/ICreateOrder";
import { IPaginateOrderRequest } from "../models/IPaginateOrderRequest";
import { IUpdateOrder } from "../models/IUpdateOrder";
import { IPaginateMineOrderRequest } from "../models/IPaginateMineOrderRequest";

export interface IOrderRepository {
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginateOrderRequest
  ): Promise<IPaginationResponse<Order>>;
  paginateMine(
    pagination: IPaginationRequest,
    filter: IPaginateMineOrderRequest
  ): Promise<IPaginationResponse<Order>>;
  findById(id: string): Promise<Order>;
  create(body: ICreateOrder): Promise<Order>;
  update(id: string, body: IUpdateOrder): Promise<boolean>;
}
