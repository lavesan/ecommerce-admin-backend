import { getSkipAndTake } from "@helpers/pagination.helper";
import { IPaginationRequest } from "models/pagination.models";
import { Like, Repository } from "typeorm";
import AppDataSource from "../../../../ormconfig";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;
  private readonly categoryRepository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  async createProduct(body: Partial<Product>) {
    const product = this.repository.create(body);

    await this.repository.save(product);

    return product;
  }

  async updateProduct(id: string, body: Partial<Product>) {
    await this.repository.update(id, body);
    return true;
  }

  findProductById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findProducts(
    pagination: IPaginationRequest,
    filter: IFindProductsRequest
  ) {
    const paginationData = getSkipAndTake(pagination);

    let where: any = {};

    if (filter.name) where.name = Like(`%${filter.name}%`);

    if (filter.categoryId)
      where = {
        ...where,
        category: { id: filter.categoryId },
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

  async createCategory(body: Partial<Category>) {
    const category = this.categoryRepository.create(body);
    await this.categoryRepository.save(category);
    return category;
  }

  async updateCategory(id: string, body: Partial<Category>) {
    await this.categoryRepository.update(id, body);
    return true;
  }

  async findCategories(pagination: IPaginationRequest) {
    const paginationData = getSkipAndTake(pagination);

    const [data, count] = await this.categoryRepository.findAndCount({
      order: {
        created_at: "DESC",
      },
      ...paginationData,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }

  findCategoryById(id: string) {
    return this.categoryRepository.findOne({ where: { id } });
  }
}
