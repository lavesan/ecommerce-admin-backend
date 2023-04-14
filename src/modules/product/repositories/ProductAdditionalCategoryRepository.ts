import AppDataSource from "data-source";
import { Repository } from "typeorm";
import { ProductAdditionalCategory } from "../entities/ProductAdditionalCategory";
import { ICreateProductAdditionalCategory } from "../models/ICreateProductAdditionalCategory";
import { IProductAdditionalCategoryRepository } from "./IProductAdditionalCategory";

export class ProductAdditionalCategoryRepository
  implements IProductAdditionalCategoryRepository
{
  private readonly repository: Repository<ProductAdditionalCategory>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductAdditionalCategory);
  }

  async create(body: ICreateProductAdditionalCategory) {
    const productAdditionalCategory = this.repository.create(body);

    await this.repository.save(productAdditionalCategory);

    return productAdditionalCategory;
  }

  async update(id: string, body: ICreateProductAdditionalCategory) {
    await this.repository.update(id, body);
    return true;
  }
}
