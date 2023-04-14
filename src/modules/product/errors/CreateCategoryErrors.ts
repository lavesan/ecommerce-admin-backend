import { AppError } from "@shared/errors/AppError";

export namespace CreateCategoryError {
  export class AlreadyExists extends AppError {
    constructor() {
      super("Categoria já existe.");
    }
  }
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
