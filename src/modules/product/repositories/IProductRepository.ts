import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { IFindProductsRequest } from "../models/IFindProductsRequest";

export interface IProductRepository {
  findProductById: (id: string) => Promise<Product>;
  findProducts: (
    pagination: IPaginationRequest,
    filter: IFindProductsRequest
  ) => Promise<IPaginationResponse<Product>>;
  updateProduct: (id: string, body: Partial<Product>) => Promise<boolean>;
  createProduct: (body: Partial<Product>) => Promise<Product>;
  findCategories: (
    pagination: IPaginationRequest
  ) => Promise<IPaginationResponse<Category>>;
  findCategoryById: (id: string) => Promise<Category>;
  updateCategory: (id: string, body: Partial<Category>) => Promise<boolean>;
  createCategory: (body: Partial<Category>) => Promise<Category>;
}
