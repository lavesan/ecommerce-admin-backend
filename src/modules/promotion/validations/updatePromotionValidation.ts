import * as yup from "yup";
import { WeekDay } from "../enums/WeekDay";

export const updatePromotionValidation = yup.object({
  name: yup.string().notRequired(),
  description: yup.string().notRequired(),
  imageKey: yup.string().notRequired(),
  isDisabled: yup.boolean().notRequired(),
  weekDay: yup
    .mixed()
    .oneOf([
      WeekDay.DOM,
      WeekDay.SEG,
      WeekDay.TER,
      WeekDay.QUA,
      WeekDay.QUI,
      WeekDay.SEX,
      WeekDay.SAB,
    ])
    .notRequired(),
  enterpriseId: yup.string().uuid().notRequired(),
  products: yup.array().of(
    yup.object({
      id: yup.string().uuid().notRequired(),
      productId: yup.string().uuid().notRequired(),
      value: yup.number().notRequired(),
    })
  ),
});
