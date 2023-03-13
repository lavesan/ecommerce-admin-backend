import { AppError } from "../../../../shared/errors/AppError";

export class CreateAgentError extends AppError {
  constructor() {
    super("Agent already exists");
  }
}
