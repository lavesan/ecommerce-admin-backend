import { comparePwd } from "@helpers/password.helper";
import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

import { ILoginRequest } from "../models/ILoginRequest";
import { ILoginResponse } from "../models/ILoginResponse";
import { IUserRepository } from "../repositories/IUserRepository";
import { LoginUserError } from "../errors/LoginUserError";
import { ICreateUserRequest } from "../models/ICreateUserRequest";
import { CreateUserError } from "../errors/CreateUserError";
import { IPaginationRequest } from "models/pagination.models";
import { IPaginateUser } from "../models/IPaginateUser";
import { IUpdateUserRequest } from "../models/IUpdateUserRequest";
import { UpdateUserError } from "../errors/UpdateUserError";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async login({ email, password }: ILoginRequest): Promise<ILoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new LoginUserError.EmailOrPwdWrong();

    const passwordMatch = await comparePwd(password, user.password);

    if (!passwordMatch) throw new LoginUserError.EmailOrPwdWrong();

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    return {
      accessToken,
      refreshToken: "",
    };
  }

  async create(body: ICreateUserRequest) {
    const user = await this.userRepository.findByEmail(body.email);

    if (user) throw new CreateUserError.AlreadyExists();

    const createdUser = await this.userRepository.create(body);
    delete createdUser.password;
    return createdUser;
  }

  async update(id: string, body: IUpdateUserRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UpdateUserError.DontExist();

    const updatedUser = await this.userRepository.create(body);
    delete updatedUser.password;
    return updatedUser;
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginateUser) {
    return this.userRepository.paginate(pagination, filter);
  }
}
