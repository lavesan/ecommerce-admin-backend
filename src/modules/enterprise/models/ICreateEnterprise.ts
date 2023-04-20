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
  estimatedTime: string;
  isDisabled: boolean;
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
    from: Date;
    to: Date;
    weekDay: WeekDay;
  }[];
}
