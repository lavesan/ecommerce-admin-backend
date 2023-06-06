import { Request } from "express";
import jwt from "jsonwebtoken";
import { container } from "tsyringe";

import auth from "@config/auth";
import { ICreateRefreshAuthToken } from "@modules/auth/models/ICreateRefreshAuthToken";
import { RefreshAuthTokenService } from "@modules/auth/services/RefreshAuthTokenService";
import { RoleType } from "@shared/infra/http/middlewares/ensureAuthenticated";

export interface ICreateCredentialsReturn {
  accessToken: string;
  refreshToken: string;
}

export const createCredentials = async (
  user: any,
  userType: RoleType
): Promise<ICreateCredentialsReturn> => {
  const refreshAuthTokenService = container.resolve(RefreshAuthTokenService);

  const {
    expiresInAccessToken,
    expiresInRefreshToken,
    clientRefreshTokenKey,
    userAdminRefreshTokenKey,
    clientSecretToken,
    userAdminSecretToken,
  } = auth;

  const secret =
    userType === "client" ? clientSecretToken : userAdminSecretToken;

  // Creates Access token
  const accessToken = jwt.sign(user, secret, {
    subject: user.id,
    expiresIn: expiresInAccessToken,
  });

  // Creates and save Refresh token
  const relationParam: Partial<ICreateRefreshAuthToken> = {};

  if (userType === "client") relationParam.clientId = user.id;
  else relationParam.userId = user.id;

  const secretRefreshToken =
    userType === "client" ? clientRefreshTokenKey : userAdminRefreshTokenKey;

  const refreshToken = jwt.sign({}, secretRefreshToken, {
    subject: user.id,
    expiresIn: expiresInRefreshToken,
  });

  await refreshAuthTokenService.create({
    ...relationParam,
    refreshToken: refreshToken,
  });

  return {
    accessToken,
    refreshToken: refreshToken,
  };
};

export const getRefreshToken = (req: Request) =>
  req.body.token || req.headers["x-access-token"] || req.query.token;
