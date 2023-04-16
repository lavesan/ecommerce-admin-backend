import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { User } from "../entities/User";
import { IPaginateUser } from "../models/IPaginateUser";

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  paginate(
    pagination: IPaginationRequest,
    filter: IPaginateUser
  ): Promise<IPaginationResponse<User>>;
}
