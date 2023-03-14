import { AppError } from "./AppError";

export class JWTTokenMissingError extends AppError {
  constructor() {
    super("Usuário não autenticado.", 401);
  }
}
