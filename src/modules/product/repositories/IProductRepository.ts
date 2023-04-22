import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Product } from "../entities/Product";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { IUpdateProductRequest } from "../models/IUpdateProductRequest";

export interface IProductRepository {
  findById(id: string): Promise<Product>;
  findManyByEnterpriseID(enterpriseId: string): Promise<Product[]>;
  paginate(
    pagination: IPaginationRequest,
    filter: IFindProductsRequest
  ): Promise<IPaginationResponse<Product>>;
  update(id: string, body: Partial<IUpdateProductRequest>): Promise<boolean>;
  create(body: ICreateProductRequest): Promise<Product>;
  delete(id: string): Promise<boolean>;
}
