import { WeekDay } from "../enums/WeekDay";

export interface IUpdatePromotion {
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  enterpriseId: string;
  isDisabled: boolean;
  products: {
    id?: string;
    value: number;
    productId: string;
  }[];
}
