import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { User } from "../entities/User";
import { IPaginateUser } from "../models/IPaginateUser";
import { IUpdateUserRequest } from "../models/IUpdateUserRequest";
import { ICreateUserRequest } from "../models/ICreateUserRequest";

export interface IUserRepository {
  create(user: ICreateUserRequest): Promise<User>;
  update(id: string, user: IUpdateUserRequest): Promise<boolean>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginateUser
  ): Promise<IPaginationResponse<User>>;
}
