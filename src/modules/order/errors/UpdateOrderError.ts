import { AppError } from "@shared/errors/AppError";

export namespace UpdateOrderError {
  export class DontExist extends AppError {
    constructor() {
      super("Pedido não existe.");
    }
  }

  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
