import { AppError } from "@shared/errors/AppError";

export namespace FindMeError {
  export class DontExist extends AppError {
    constructor() {
      super("Cliente não encontrado.");
    }
  }
}
