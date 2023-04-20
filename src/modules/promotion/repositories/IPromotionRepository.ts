import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Promotion } from "../entities/Promotion";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { IUpdatePromotion } from "../models/IUpdatePromotion";

export interface IPromotionRepository {
  create(body: ICreatePromotion): Promise<Promotion>;
  update(id: string, body: IUpdatePromotion): Promise<boolean>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginatePromotion
  ): Promise<IPaginationResponse<Promotion>>;
  findById(id: string): Promise<Promotion>;
}
