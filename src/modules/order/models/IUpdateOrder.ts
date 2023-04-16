import { OrderStatus } from "../enums/OrderStatus";

export interface IUpdateOrder {
  status: OrderStatus;
}
