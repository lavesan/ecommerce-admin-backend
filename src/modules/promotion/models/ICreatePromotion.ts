import { WeekDay } from "../enums/WeekDay";

export interface ICreatePromotion {
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  enterpriseId: string;
  products: {
    id: string;
    value: number;
  }[];
}
