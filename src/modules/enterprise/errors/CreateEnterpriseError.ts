import { AppError } from "@shared/errors/AppError";

export namespace CreateEnterpriseError {
  export class AlreadyExists extends AppError {
    constructor() {
      super("Empresa já existe.");
    }
  }
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
