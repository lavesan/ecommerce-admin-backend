import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Category } from "../entities/Category";
import { ICreateCategory } from "../models/ICreateCategory";
import { IPaginateCategoryRequest } from "../models/IPaginateCategoryRequest";

export interface ICategoryRepository {
  paginate: (
    pagination: IPaginationRequest,
    filter: IPaginateCategoryRequest
  ) => Promise<IPaginationResponse<Category>>;
  findById: (id: string) => Promise<Category>;
  findByName: (name: string) => Promise<Category>;
  update: (id: string, body: Partial<Category>) => Promise<boolean>;
  create: (body: ICreateCategory) => Promise<Category>;
}
