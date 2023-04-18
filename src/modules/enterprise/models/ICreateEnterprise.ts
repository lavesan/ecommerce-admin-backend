import { WeekDay } from "@modules/promotion/enums/WeekDay";
import { ScheduleRelation } from "../enums/ScheduleRelation";

export interface ICreateEnterprise {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  phone: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  state: string;
  city: string;
  imageKey: string;
  userId: string;
  freights: {
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
  schedules: {
    time: Date;
    relation: ScheduleRelation;
    weekDay: WeekDay;
  }[];
}
