import { AppError } from "@shared/errors/AppError";

export namespace CreateClientError {
  export class AlreadyExists extends AppError {
    constructor() {
      super("Este email não está disponível.");
    }
  }

  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
