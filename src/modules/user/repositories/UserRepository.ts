import { getSkipAndTake } from "@helpers/pagination.helper";
import { encryptPwd } from "@helpers/password.helper";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import AppDataSource from "@data-source";
import { User } from "../entities/User";
import { IPaginateUser } from "../models/IPaginateUser";

import { IUserRepository as IUserRepository } from "./IUserRepository";
import { ICreateUserRequest } from "../models/ICreateUserRequest";
import { IUpdateUserRequest } from "../models/IUpdateUserRequest";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ password, ...body }: ICreateUserRequest) {
    const user = this.repository.create({
      ...body,
      password: await encryptPwd(password),
    });

    await this.repository.save(user);

    return user;
  }

  async update(id: string, { password, ...body }: IUpdateUserRequest) {
    let user: Partial<IUpdateUserRequest> = body;
    if (password) user.password = await encryptPwd(password);

    await this.repository.save({ id, ...user });
    return true;
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: ["enterprises"],
    });
  }

  async paginate(
    pagination: IPaginationRequest,
    { email, name }: IPaginateUser
  ): Promise<IPaginationResponse<User>> {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<User> = {};

    if (name) where.name = ILike(`%${name}%`);
    if (email) where.email = ILike(`%${email}%`);

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      where,
      ...paginationData,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }
}
