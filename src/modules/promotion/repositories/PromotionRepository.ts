import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "@data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { Promotion } from "../entities/Promotion";
import { ICreatePromotion } from "../models/ICreatePromotion";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { IPromotionRepository } from "./IPromotionRepository";
import { IUpdatePromotion } from "../models/IUpdatePromotion";

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
      promotionProducts: products.map(({ productId, value }) => ({
        product: { id: productId },
        value,
      })),
    });
    await this.repository.save(promotion);
    return promotion;
  }

  async update(
    id: string,
    { enterpriseId, products, ...body }: IUpdatePromotion
  ): Promise<boolean> {
    await this.repository.save({
      ...body,
      id,
      enterprise: { id: enterpriseId },
      promotionProducts: products.map(({ productId, ...product }) => ({
        ...product,
        product: { id: productId },
      })),
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const promotion = await this.repository.findOneOrFail({
      where: { id },
      relations: ["promotionProducts", "promotionProducts.product"],
    });

    await this.repository.softDelete(promotion);
    return true;
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
}
