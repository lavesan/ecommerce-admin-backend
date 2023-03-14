import { AppError } from "@shared/errors/AppError";

export namespace CreateAgentError {
  export class AgentAlreadyExists extends AppError {
    constructor() {
      super("Agente já existe.");
    }
  }
  export class BodyIsInvalid extends AppError {
    constructor(fields: { [key: string]: any }) {
      super("Campos obrigatórios", 400, fields?.errors);
    }
  }
}
