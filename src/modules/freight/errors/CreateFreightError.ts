import { AppError } from "@shared/errors/AppError";

export namespace CreateFreightError {
  export class AlreadyExists extends AppError {
    constructor() {
      super("Frete já existe.");
    }
  }
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
