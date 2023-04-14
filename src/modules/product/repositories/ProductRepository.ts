import { getSkipAndTake } from "@helpers/pagination.helper";
import { IPaginationRequest } from "models/pagination.models";
import { ILike, Repository } from "typeorm";
import AppDataSource from "../../../data-source";
import { Product } from "../entities/Product";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(body: ICreateProductRequest) {
    const { categoryId, productAdditionalCategory, ...newProduct } = body;

    const product = this.repository.create({
      ...newProduct,
      productAdditionalCategory,
      category: { id: categoryId },
    });

    await this.repository.save(product);

    return product;
  }

  async update(id: string, body: Partial<Product>) {
    await this.repository.update(id, body);
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

  async paginate(pagination: IPaginationRequest, filter: IFindProductsRequest) {
    const paginationData = getSkipAndTake(pagination);

    let where: any = {};

    if (filter.name) where.name = ILike(`%${filter.name}%`);

    if (filter.categoryId)
      where = {
        ...where,
        category: { id: filter.categoryId },
      };

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      skip: 0,
      take: 20,
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
