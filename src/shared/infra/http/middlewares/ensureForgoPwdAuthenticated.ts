import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { JWTInvalidTokenError } from "../../../errors/JWTInvalidTokenError";
import { JWTTokenMissingError } from "../../../errors/JWTTokenMissingError";

export const ensureForgotPwdAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenMissingError();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, process.env.RESET_PASSWORD_TOKEN) as {
      sub: string;
    };

    request.client = {
      email: sub,
    };

    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
};
