import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { JWTInvalidTokenError } from "../../../errors/JWTInvalidTokenError";
import { JWTTokenMissingError } from "../../../errors/JWTTokenMissingError";

interface IPayload {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

type RoleType = "dashboard" | "client";

export const ensureAuthenticated =
  (role: RoleType, userIsAdmin?: boolean) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new JWTTokenMissingError();
    }

    const [, token] = authHeader.split(" ");

    const isFromDashboard = role === "dashboard";

    try {
      const secret = isFromDashboard
        ? process.env.JWT_SECRET
        : process.env.CLIENT_JWT_SECRET;

      const { id, name, email, isAdmin } = verify(token, secret) as IPayload;

      if (userIsAdmin && !isAdmin) {
        throw new JWTInvalidTokenError();
      }

      if (isFromDashboard)
        request.user = {
          id,
          name,
          email,
          isAdmin,
        };
      else
        request.client = {
          id,
          name,
          email,
        };

      next();
    } catch {
      throw new JWTInvalidTokenError();
    }
  };
