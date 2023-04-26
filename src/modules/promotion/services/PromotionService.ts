import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { CreatePromotionError } from "../errors/CreatePromotionError";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { PromotionRepository } from "../repositories/PromotionRepository";
import { IUpdatePromotion } from "../models/IUpdatePromotion";
import { WeekDay } from "../enums/WeekDay";

@injectable()
export class PromotionService {
  constructor(
    @inject("PromotionRepository")
    private readonly promotionRepository: PromotionRepository
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

  findAllByWeekDay(weekDay: WeekDay) {
    return this.promotionRepository.findAllByWeekDay(weekDay);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginatePromotion) {
    return this.promotionRepository.paginate(pagination, filter);
  }
}
