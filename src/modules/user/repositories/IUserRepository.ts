import { User } from "../entities/User";

export interface IUserRepository {
  create: (user: Partial<User>) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
}
