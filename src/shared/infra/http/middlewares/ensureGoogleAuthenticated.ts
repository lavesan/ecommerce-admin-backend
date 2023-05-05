import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
// @ts-ignore
import { OAuth2Client } from "google-auth-library";

import { JWTTokenMissingError } from "../../../errors/JWTTokenMissingError";
import { GoogleJWTInvalidTokenError } from "@shared/errors/GoogleJWTInvalidTokenError";
import { IDecodedGoogleToken } from "@models/google.models";

interface IPayload {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export async function ensureGoogleAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenMissingError();
  }

  const [, token] = authHeader.split(" ");

  const client = new OAuth2Client(process.env.GOOGLE_ID);

  try {
    await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const user: IDecodedGoogleToken = (await decode(
      token
    )) as IDecodedGoogleToken;

    request.client = {
      name: user.name,
      email: user.email,
    };

    next();
  } catch {
    throw new GoogleJWTInvalidTokenError();
  }
}
