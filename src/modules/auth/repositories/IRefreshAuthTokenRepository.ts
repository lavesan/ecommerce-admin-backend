import { RefreshAuthToken } from "../entities/RefreshAuthToken";
import { ICreateRefreshAuthToken } from "../models/ICreateRefreshAuthToken";

export interface IRefreshAuthTokenRepository {
  create(data: ICreateRefreshAuthToken): Promise<RefreshAuthToken>;
  logout(refreshToken: string): Promise<boolean>;
  findOne(refreshToken: string): Promise<RefreshAuthToken>;
}
