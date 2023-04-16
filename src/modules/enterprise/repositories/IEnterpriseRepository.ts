import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Enterprise } from "../entities/Enterprise";
import { ICreateEnterprise } from "../models/ICreateEnterprise";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";

export interface IEnterpriseRepository {
  create(body: ICreateEnterprise): Promise<Enterprise>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginateEnterpriseRequest
  ): Promise<IPaginationResponse<Enterprise>>;
}
