import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "@data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { Promotion } from "../entities/Promotion";
import { WeekDay } from "../enums/WeekDay";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { IPromotionRepository } from "./IPromotionRepository";

export class PromotionRepository implements IPromotionRepository {
  private readonly repository: Repository<Promotion>;

  constructor() {
    this.repository = AppDataSource.getRepository(Promotion);
  }

  async create({
    enterpriseId,
    products,
    ...body
  }: ICreatePromotion): Promise<Promotion> {
    const promotion = this.repository.create({
      ...body,
      enterprise: { id: enterpriseId },
      promotionProducts: products.map(({ id, value }) => ({
        product: { id },
        value,
      })),
    });
    await this.repository.save(promotion);
    return promotion;
  }

  async paginate(
    pagination: IPaginationRequest,
    { enterpriseId, name, weekDay }: IPaginatePromotion
  ): Promise<IPaginationResponse<Promotion>> {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Promotion> = {
      enterprise: { id: enterpriseId },
    };

    if (name) where.name = ILike(`%${name}%`);
    if (weekDay) where.weekDay = weekDay;

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      where,
      ...paginationData,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }

  findById(id: string): Promise<Promotion> {
    return this.repository.findOne({
      where: { id },
      relations: ["promotionProducts", "promotionProducts.product"],
    });
  }

  findByWeekDayAndEnterpriseId(
    weekDay: WeekDay,
    enterpriseId: string
  ): Promise<Promotion> {
    return this.repository.findOne({
      where: { weekDay, enterprise: { id: enterpriseId } },
    });
  }
}
