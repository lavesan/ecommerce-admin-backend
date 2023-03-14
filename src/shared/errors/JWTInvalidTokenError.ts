import { AppError } from "./AppError";

export class JWTInvalidTokenError extends AppError {
  constructor() {
    super("Token inválido.", 401);
  }
}
