import { AppError } from "@shared/errors/AppError";

export namespace LoginUserError {
  export class EmailOrPwdWrong extends AppError {
    constructor() {
      super("Email ou password errados.");
    }
  }

  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
