import { encryptPwd } from "helpers/password.helper";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import AppDataSource from "../../../../ormconfig";
import { User } from "../entities/User";

import { IUserRepository as IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ password, ...body }: Partial<User>) {
    const user = this.repository.create({
      ...body,
      password: await encryptPwd(password),
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }
}
