import { AppError } from "@shared/errors/AppError";

export namespace LoginByEmailError {
  export class DontExist extends AppError {
    constructor(data: { [key: string]: string }) {
      super("Este email não foi encontrado.", 404, data);
    }
  }
}
