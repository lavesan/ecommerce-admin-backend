import * as yup from "yup";
import { OrderStatus } from "../enums/OrderStatus";

export const updateOrderValidation = yup.object({
  status: yup
    .mixed()
    .oneOf([
      OrderStatus.CANCELED,
      OrderStatus.DELETED,
      OrderStatus.DOING,
      OrderStatus.DONE,
      OrderStatus.SENDING,
      OrderStatus.TO_APPROVE,
    ])
    .required(),
});
