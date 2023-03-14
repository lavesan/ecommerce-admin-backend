import { AppError } from "@shared/errors/AppError";

export class AgentDontExist extends AppError {
  constructor() {
    super("Agente não existe.");
  }
}
