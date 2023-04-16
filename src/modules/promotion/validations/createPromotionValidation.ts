import * as yup from "yup";
import { WeekDay } from "../enums/WeekDay";

export const createPromotionValidation = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  base64Banner: yup.string().required(),
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
    .required(),
  enterpriseId: yup.string().required(),
  products: yup.array().of(
    yup.object({
      id: yup.string().required(),
      value: yup.number().required(),
    })
  ),
});
