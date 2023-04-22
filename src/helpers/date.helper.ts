import { WeekDay } from "@modules/promotion/enums/WeekDay";

export const getWeekDay = (date: Date = new Date()): WeekDay => {
  return (date.getDay() + 1).toString() as WeekDay;
};
