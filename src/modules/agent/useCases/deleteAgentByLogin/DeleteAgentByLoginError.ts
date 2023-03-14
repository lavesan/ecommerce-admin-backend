import { AppError } from "@shared/errors/AppError";

export namespace DeleteAgentByLoginError {
  export class AgentDontExist extends AppError {
    constructor() {
      super("Agente não existe.");
    }
  }

  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios", 400, fields);
    }
  }
}
