import { phoneReg } from "@helpers/validation.helper";
import * as yup from "yup";
import { ScheduleRelation } from "../enums/ScheduleRelation";
import { WeekDay } from "@modules/promotion/enums/WeekDay";

export const createEnterpriseValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  description: yup.string().required(),
  cnpj: yup.string().required(),
  phone: yup.string().matches(phoneReg).required(),
  cep: yup.string().required(),
  street: yup.string().required(),
  complement: yup.string().notRequired(),
  number: yup.string().required(),
  district: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  imageKey: yup.string().required(),
  userId: yup.string().uuid().required(),
  freights: yup
    .array()
    .of(
      yup
        .object({
          addressKey: yup.string().required(),
          addressValue: yup.string().required(),
          value: yup.number().required(),
        })
        .required()
    )
    .required(),
  schedules: yup
    .array()
    .of(
      yup
        .object({
          scheduleId: yup.string().uuid().notRequired(),
          time: yup.string().required(),
          relation: yup
            .mixed()
            .oneOf([ScheduleRelation.FROM, ScheduleRelation.TO])
            .required(),
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
            .required(),
        })
        .notRequired()
    )
    .notRequired(),
});
