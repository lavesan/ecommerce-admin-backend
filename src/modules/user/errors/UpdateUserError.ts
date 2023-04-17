import { AppError } from "@shared/errors/AppError";

export namespace UpdateUserError {
  export class DontExist extends AppError {
    constructor() {
      super("Usuário não existe.");
    }
  }

  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
