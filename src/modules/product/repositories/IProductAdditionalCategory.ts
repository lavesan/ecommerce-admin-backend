import { ProductAdditionalCategory } from "../entities/ProductAdditionalCategory";
import { ICreateProductAdditionalCategory } from "../models/ICreateProductAdditionalCategory";

export interface IProductAdditionalCategoryRepository {
  create: (
    body: ICreateProductAdditionalCategory
  ) => Promise<ProductAdditionalCategory>;
  update: (
    id: string,
    body: ICreateProductAdditionalCategory
  ) => Promise<boolean>;
}
