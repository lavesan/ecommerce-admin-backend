import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Promotion } from "../entities/Promotion";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { IUpdatePromotion } from "../models/IUpdatePromotion";
import { WeekDay } from "../enums/WeekDay";

export interface IPromotionRepository {
  create(body: ICreatePromotion): Promise<Promotion>;
  delete(id: string): Promise<boolean>;
  update(id: string, body: IUpdatePromotion): Promise<boolean>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginatePromotion
  ): Promise<IPaginationResponse<Promotion>>;
  findById(id: string): Promise<Promotion>;
  findAllByWeekDay(weekDay: WeekDay): Promise<Promotion[]>;
}
