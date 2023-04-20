import { AppError } from "@shared/errors/AppError";

export namespace UpdatePromotionError {
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
