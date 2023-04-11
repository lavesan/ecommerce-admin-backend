import { IPaginationRequest } from "models/pagination.models";

export interface IFindProductsRequest {
  name: string;
  categoryId: string;
}

export interface IFindProductsQuery
  extends IFindProductsRequest,
    IPaginationRequest {}
