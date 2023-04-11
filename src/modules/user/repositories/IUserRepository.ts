import { User } from "../entities/User";
import { ILoginRequest } from "../models/ILoginRequest";
import { ILoginResponse } from "../models/ILoginResponse";

export interface IUserRepository {
  create: (user: Partial<User>) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
}
