import * as yup from "yup";
import { PaymentType } from "../enums/PaymentType";

export const createOrderValidation = yup.object({
  freightValue: yup.number().required(),
  productsValue: yup.number().required(),
  enterpriseId: yup.string().uuid().required(),
  freightId: yup.string().uuid().required(),
  clientId: yup.string().uuid().required(),
  paymentType: yup
    .mixed<PaymentType>()
    .oneOf([
      PaymentType.CREDIT_CARD_MACHINE,
      PaymentType.DEBIT_CARD_MACHINE,
      PaymentType.MONEY,
    ])
    .required(),
  moneyExchange: yup.number().when("paymentType", (paymentType, schema) => {
    if ((paymentType as unknown as PaymentType) === PaymentType.MONEY)
      return schema.required();
    return schema;
  }),
  products: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        quantity: yup.number().required(),
        value: yup.number().required(),
        points: yup.number().required(),
        additionals: yup
          .array()
          .of(
            yup.object({
              id: yup.string().required(),
              value: yup.number().required(),
              quantity: yup.number().required(),
            })
          )
          .notRequired(),
      })
    )
    .required(),
  address: yup
    .object({
      cep: yup.string().required(),
      street: yup.string().required(),
      complement: yup.string().notRequired(),
      number: yup.string().required(),
      district: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      shortName: yup.string().notRequired(),
    })
    .required(),
});
