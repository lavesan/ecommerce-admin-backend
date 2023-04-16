import { AppError } from "@shared/errors/AppError";

export namespace UpdateClientError {
  export class DontExist extends AppError {
    constructor() {
      super("Cliente não existe.");
    }
  }

  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
