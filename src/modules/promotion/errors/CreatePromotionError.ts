import { AppError } from "@shared/errors/AppError";

export namespace CreatePromotionError {
  export class AlreadyExists extends AppError {
    constructor() {
      super("Promoção no dia da semana já existe.");
    }
  }
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios.", 400, fields?.errors);
    }
  }
}
