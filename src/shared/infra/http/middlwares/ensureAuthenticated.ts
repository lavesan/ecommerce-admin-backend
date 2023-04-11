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

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenMissingError();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id, name, email, isAdmin } = verify(
      token,
      process.env.JWT_SECRET
    ) as IPayload;

    request.user = {
      id,
      name,
      email,
      isAdmin,
    };

    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
}
