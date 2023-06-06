import { Repository } from "typeorm";

import { RefreshAuthToken } from "../entities/RefreshAuthToken";
import { ICreateRefreshAuthToken } from "../models/ICreateRefreshAuthToken";
import { IRefreshAuthTokenRepository } from "./IRefreshAuthTokenRepository";
import AppDataSource from "@data-source";
import auth from "@config/auth";

export class RefreshAuthTokenRepository implements IRefreshAuthTokenRepository {
  private repository: Repository<RefreshAuthToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(RefreshAuthToken);
  }

  async create({
    userId,
    clientId,
    ...data
  }: ICreateRefreshAuthToken): Promise<RefreshAuthToken> {
    let body: any = data;

    if (userId) body.user = { id: userId };
    if (clientId) body.client = { id: clientId };

    const { expiresInAccessToken } = auth;

    const expiresInNumber = Number(expiresInAccessToken.replace(/\D/g, ""));

    const expiresInDate = new Date();
    expiresInDate.setDate(expiresInDate.getDate() + expiresInNumber);

    const refreshAuthToken = this.repository.create({
      ...body,
      expires_at: expiresInDate,
    });

    // @ts-ignore
    return this.repository.save(refreshAuthToken);
  }

  async logout(refreshToken: string): Promise<boolean> {
    await this.repository.delete({ refreshToken });
    return true;
  }

  async findOne(refreshToken: string): Promise<RefreshAuthToken> {
    return this.repository.findOne({ where: { refreshToken } });
  }
}
