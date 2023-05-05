import { AppError } from "./AppError";

export class GoogleJWTInvalidTokenError extends AppError {
  constructor() {
    super("Token inválido.", 401);
  }
}
