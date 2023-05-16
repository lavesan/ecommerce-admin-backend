import { inject, injectable } from "tsyringe";

import { IPaginationRequest } from "models/pagination.models";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { IUpdatePromotion } from "../models/IUpdatePromotion";
import { IFindAllPromotionsFilter } from "../models/IFindAllPromotions";
import { IPromotionRepository } from "../repositories/IPromotionRepository";

@injectable()
export class PromotionService {
  constructor(
    @inject("PromotionRepository")
    private readonly promotionRepository: IPromotionRepository
  ) {}

  create(body: ICreatePromotion) {
    return this.promotionRepository.create(body);
  }

  update(id: string, body: IUpdatePromotion) {
    return this.promotionRepository.update(id, body);
  }

  findById(id: string) {
    return this.promotionRepository.findById(id);
  }

  findAll(filter: IFindAllPromotionsFilter) {
    return this.promotionRepository.findAll(filter);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginatePromotion) {
    return this.promotionRepository.paginate(pagination, filter);
  }
}
