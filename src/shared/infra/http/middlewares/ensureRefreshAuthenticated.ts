import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { JWTInvalidTokenError } from "../../../errors/JWTInvalidTokenError";
import { JWTTokenMissingError } from "../../../errors/JWTTokenMissingError";
import { RoleType } from "./ensureAuthenticated";
import auth from "@config/auth";
import { getRefreshToken } from "@helpers/auth.helper";

export const ensureRefreshAuthenticated =
  (role: RoleType) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const token = getRefreshToken(request);

    if (!token) {
      throw new JWTTokenMissingError();
    }

    const isFromDashboard = role === "dashboard";

    try {
      const secret = isFromDashboard
        ? auth.userAdminRefreshTokenKey
        : auth.clientRefreshTokenKey;

      const tokenData = verify(token, secret) as { sub: string };

      request.userRole = role;

      if (isFromDashboard)
        request.user = {
          id: tokenData.sub,
        };
      else
        request.client = {
          id: tokenData.sub,
        };

      next();
    } catch {
      throw new JWTInvalidTokenError();
    }
  };
