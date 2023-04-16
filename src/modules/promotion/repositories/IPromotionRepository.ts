import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Promotion } from "../entities/Promotion";
import { WeekDay } from "../enums/WeekDay";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";

export interface IPromotionRepository {
  create(body: ICreatePromotion): Promise<Promotion>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginatePromotion
  ): Promise<IPaginationResponse<Promotion>>;
  findById(id: string): Promise<Promotion>;
  findByWeekDayAndEnterpriseId(
    weekDay: WeekDay,
    enterpriseId: string
  ): Promise<Promotion>;
}
