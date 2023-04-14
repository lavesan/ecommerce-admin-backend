import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Product } from "../entities/Product";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsRequest } from "../models/IFindProductsRequest";

export interface IProductRepository {
  findById: (id: string) => Promise<Product>;
  paginate: (
    pagination: IPaginationRequest,
    filter: IFindProductsRequest
  ) => Promise<IPaginationResponse<Product>>;
  update: (id: string, body: Partial<Product>) => Promise<boolean>;
  create: (body: ICreateProductRequest) => Promise<Product>;
}
