import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { CreatePromotionError } from "../errors/CreatePromotionError";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { PromotionRepository } from "../repositories/PromotionRepository";

@injectable()
export class PromotionService {
  constructor(
    @inject("PromotionRepository")
    private readonly promotionRepository: PromotionRepository
  ) {}

  async create(body: ICreatePromotion) {
    const promotion =
      await this.promotionRepository.findByWeekDayAndEnterpriseId(
        body.weekDay,
        body.enterpriseId
      );

    if (promotion) throw new CreatePromotionError.AlreadyExists();

    return this.promotionRepository.create(body);
  }

  findById(id: string) {
    return this.promotionRepository.findById(id);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginatePromotion) {
    return this.promotionRepository.paginate(pagination, filter);
  }
}
