import { AppError } from "@shared/errors/AppError";

export namespace UpdateCategoryError {
  export class DontExist extends AppError {
    constructor() {
      super("Categoria não existe.");
    }
  }
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
