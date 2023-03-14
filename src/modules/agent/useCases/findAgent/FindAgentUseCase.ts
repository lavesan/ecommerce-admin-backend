import { inject, injectable } from "tsyringe";

import { IAgentRepository } from "../../repositories/IAgentRepository";
import { AgentDontExist } from "./FindAgentError";

@injectable()
export class FindAgentUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute(agent_id: string) {
    const user = await this.agentRepository.findById(agent_id);

    if (!user) {
      throw new AgentDontExist();
    }

    return user;
  }
}
