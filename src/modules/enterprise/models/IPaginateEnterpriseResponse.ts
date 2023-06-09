import { IPaginationResponse } from "@models/pagination.models";
import { Enterprise } from "../entities/Enterprise";

export interface IFormattedEnterpriseData extends Enterprise {
  openOrdersCount: number;
}

export interface IPaginateEnterpriseResponse
  extends IPaginationResponse<IFormattedEnterpriseData> {}
