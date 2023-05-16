import { WeekDay } from "../enums/WeekDay";

export interface IFindAllPromotionsFilter {
  enterpriseId: string;
  weekDay: WeekDay;
}
