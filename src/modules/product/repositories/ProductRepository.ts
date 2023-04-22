import { getSkipAndTake } from "@helpers/pagination.helper";
import { IPaginationRequest } from "@models/pagination.models";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import AppDataSource from "@data-source";
import { Product } from "../entities/Product";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { IProductRepository } from "./IProductRepository";
import { IUpdateProductRequest } from "../models/IUpdateProductRequest";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create({
    categoryId,
    productAdditionalCategory,
    ...body
  }: ICreateProductRequest) {
    const product = this.repository.create({
      ...body,
      productAdditionalCategory,
      category: { id: categoryId },
    });

    await this.repository.save(product);

    return product;
  }

  async update(
    id: string,
    {
      categoryId,
      productAdditionalCategory,
      ...body
    }: Partial<IUpdateProductRequest>
  ) {
    const parsedBody = {
      ...body,
      productAdditionalCategory,
      category: { id: categoryId },
    };
    await this.repository.save({ id, ...parsedBody });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const product = await this.repository.findOneOrFail({
      where: { id },
      relations: [
        "productAdditionalCategory",
        "productAdditionalCategory.productAdditionals",
      ],
    });

    await this.repository.softDelete(product);
    return true;
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: [
        "productAdditionalCategory",
        "productAdditionalCategory.productAdditionals",
      ],
    });
  }

  findManyByEnterpriseID(enterpriseId: string) {
    return this.repository.find({
      where: { category: { enterprise: { id: enterpriseId } } },
    });
  }

  async paginate(
    pagination: IPaginationRequest,
    { name, categoryId }: IFindProductsRequest
  ) {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Product> = {};

    if (name) where.name = ILike(`%${name}%`);

    if (categoryId)
      where = {
        ...where,
        category: { id: categoryId },
      };

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      ...paginationData,
      where,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }
}
