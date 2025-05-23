import * as yup from "yup";
import { ScheduleRelation } from "../enums/ScheduleRelation";
import { WeekDay } from "@modules/promotion/enums/WeekDay";

export const updateEnterpriseValidation = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  description: yup.string().notRequired(),
  cnpj: yup.string().notRequired(),
  cep: yup.string().notRequired(),
  estimatedTime: yup.string().notRequired(),
  isDisabled: yup.boolean().notRequired(),
  street: yup.string().notRequired(),
  complement: yup.string().notRequired(),
  number: yup.string().notRequired(),
  district: yup.string().notRequired(),
  state: yup.string().notRequired(),
  city: yup.string().notRequired(),
  imageKey: yup.string().notRequired(),
  bannerKey: yup.string().notRequired(),
  freights: yup
    .array()
    .of(
      yup
        .object({
          id: yup.string().uuid().notRequired(),
          addressKey: yup.string().required(),
          addressValue: yup.string().required(),
          value: yup.number().required(),
        })
        .notRequired()
    )
    .notRequired(),
  schedules: yup
    .array()
    .of(
      yup
        .object({
          id: yup.string().uuid().notRequired(),
          from: yup.string().notRequired(),
          to: yup.string().notRequired(),
          weekDay: yup
            .mixed()
            .oneOf([
              WeekDay.DOM,
              WeekDay.QUA,
              WeekDay.QUI,
              WeekDay.SAB,
              WeekDay.SEG,
              WeekDay.SEX,
              WeekDay.TER,
            ])
            .notRequired(),
        })
        .notRequired()
    )
    .notRequired(),
});
