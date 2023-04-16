import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { Client } from "../entities/Client";
import { ICreateClient } from "../models/ICreateClient";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { IUpdateClient } from "../models/IUpdateClient";

export interface IClientRepository {
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginateClientRequest
  ): Promise<IPaginationResponse<Client>>;
  findById(id: string): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  create(body: ICreateClient): Promise<Partial<Client>>;
  update(id: string, body: IUpdateClient): Promise<boolean>;
}
