import { OrderStatus } from "../enums/OrderStatus";
import { PaymentType } from "../enums/PaymentType";

export interface IPaginateOrderRequest {
  status?: OrderStatus;
  paymentType?: PaymentType;
  initialDate?: Date;
  finalDate?: Date;
  enterpriseId?: string;
  clientId?: string;
}
