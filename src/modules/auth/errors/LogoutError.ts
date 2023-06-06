import { AppError } from "@shared/errors/AppError";

export namespace LogoutError {
  export class DontExist extends AppError {
    constructor() {
      super("Refresh token não existe guardado.");
    }
  }
}
