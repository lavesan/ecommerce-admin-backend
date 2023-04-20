import { WeekDay } from "aws-sdk/clients/ec2";
import { ScheduleRelation } from "../enums/ScheduleRelation";

export interface IUpdateEnterprise {
  name: string;
  email: string;
  description: string;
  cnpj: string;
  cep: string;
  street: string;
  complement: string;
  number: string;
  district: string;
  estimatedTime: string;
  isDisabled: boolean;
  state: string;
  city: string;
  imageKey: string;
  userId: string;
  freights: {
    id?: string;
    addressKey: string;
    addressValue: string;
    value: number;
  }[];
  schedules: {
    id?: string;
    from: Date;
    to: Date;
    weekDay: WeekDay;
  }[];
}
