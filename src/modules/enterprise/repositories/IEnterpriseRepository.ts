import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Enterprise } from "../entities/Enterprise";
import { ICreateEnterprise } from "../models/ICreateEnterprise";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { IUpdateEnterprise } from "../models/IUpdateEnterprise";

export interface IEnterpriseRepository {
  create(body: ICreateEnterprise): Promise<Enterprise>;
  update(id: string, body: IUpdateEnterprise): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Enterprise>;
  findAllMenuById(id: string): Promise<Enterprise>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginateEnterpriseRequest
  ): Promise<IPaginationResponse<Enterprise>>;
}
