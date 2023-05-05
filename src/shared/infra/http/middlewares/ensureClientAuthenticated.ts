import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { JWTInvalidTokenError } from "../../../errors/JWTInvalidTokenError";
import { JWTTokenMissingError } from "../../../errors/JWTTokenMissingError";

interface IPayload {
  id: string;
  name: string;
  email: string;
}

export async function ensureClientAuthenticated(
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
    const { id, name, email } = verify(
      token,
      process.env.CLIENT_JWT_SECRET
    ) as IPayload;

    request.client = {
      id,
      name,
      email,
    };

    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
}
