import { comparePwd } from "@helpers/password.helper";
import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

import { ILoginRequest } from "../models/ILoginRequest";
import { ILoginResponse } from "../models/ILoginResponse";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async login({ email, password }: ILoginRequest): Promise<ILoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      console.error("usuário não achado");
    }

    const passwordMatch = await comparePwd(password, user.password);

    if (passwordMatch) {
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

    throw new Error("Password não tem a ver");
  }
}
