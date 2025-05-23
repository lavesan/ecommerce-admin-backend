import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "@data-source";
import { IPaginationRequest } from "@models/pagination.models";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICreateCategory } from "../models/ICreateCategory";
import { IPaginateCategoryRequest } from "../models/IPaginateCategoryRequest";
import { ICategoryRepository } from "./ICategoryRespository";
import { IUpdateCategory } from "../models/IUpdateCategory";

export class CategoryRepository implements ICategoryRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create(body: ICreateCategory) {
    const { enterpriseId, ...newCategory } = body;
    const category = this.repository.create({
      ...newCategory,
      enterprise: { id: enterpriseId },
    });
    await this.repository.save(category);
    return category;
  }

  async update(id: string, body: IUpdateCategory) {
    await this.repository.save({ id, ...body });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const category = await this.repository.findOneOrFail({
      where: { id },
      relations: [
        "products",
        "products.productAdditionalCategory",
        "products.productAdditionalCategory.productAdditionals",
      ],
    });

    await this.repository.softDelete(category);
    return true;
  }

  async paginate(
    pagination: IPaginationRequest,
    { enterpriseId, name }: IPaginateCategoryRequest
  ) {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Category> = {};

    if (name) where.name = ILike(`%${name}%`);
    if (enterpriseId) where.enterprise = { id: enterpriseId };

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

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }
}
