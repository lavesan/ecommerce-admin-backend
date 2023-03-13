import { container } from "tsyringe";

import { IAgentRepository } from "@modules/agent/repositories/IAgentRepository";
import { AgentRepository } from "@modules/agent/repositories/AgentRepository";

container.registerSingleton<IAgentRepository>(
  "AgentRepository",
  AgentRepository
);
