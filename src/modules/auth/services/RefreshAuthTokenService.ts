import { container, inject, injectable } from "tsyringe";

import { IRefreshAuthTokenRepository } from "../repositories/IRefreshAuthTokenRepository";
import { ICreateRefreshAuthToken } from "../models/ICreateRefreshAuthToken";
import { LogoutError } from "../errors/LogoutError";
import {
  ICreateCredentialsReturn,
  createCredentials,
} from "@helpers/auth.helper";
import { ClientService } from "@modules/client/services/ClientService";
import { UserService } from "@modules/user/service/UserService";
import { RoleType } from "@shared/infra/http/middlewares/ensureAuthenticated";

@injectable()
export class RefreshAuthTokenService {
  constructor(
    @inject("RefreshAuthTokenRepository")
    private readonly refreshAuthTokenRepository: IRefreshAuthTokenRepository
  ) {}

  create(body: ICreateRefreshAuthToken) {
    return this.refreshAuthTokenRepository.create(body);
  }

  async logout(refreshToken: string) {
    return this.refreshAuthTokenRepository.logout(refreshToken);
  }

  async refresh(refreshToken: string, role: RoleType, id: string) {
    const clientService = container.resolve(ClientService);
    const userDashboardService = container.resolve(UserService);

    const storedToken = await this.refreshAuthTokenRepository.findOne(
      refreshToken
    );

    if (!storedToken) throw new LogoutError.DontExist();

    await this.refreshAuthTokenRepository.logout(refreshToken);

    let credentials: ICreateCredentialsReturn;

    if (role === "client") {
      const client = await clientService.findById(id);

      credentials = await createCredentials(
        {
          id: client.id,
          name: client.name,
          email: client.email,
        },
        "client"
      );
    } else {
      const user = await userDashboardService.findById(id);

      credentials = await createCredentials(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        "dashboard"
      );
    }

    return credentials;
  }
}
