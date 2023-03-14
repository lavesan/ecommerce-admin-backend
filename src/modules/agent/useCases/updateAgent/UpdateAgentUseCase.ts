import { inject, injectable } from "tsyringe";

import { IAgentRepository } from "../../repositories/IAgentRepository";
import { IUpdateAgentDTO } from "./IUpdateAgentDTO";
import { UpdateAgentError } from "./UpdateAgentError";

@injectable()
export class UpdateAgentUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute(agent_id: string, body: IUpdateAgentDTO) {
    const userExists = await this.agentRepository.findById(agent_id);

    if (!userExists) {
      throw new UpdateAgentError.AgentDontExist();
    }

    const user = await this.agentRepository.update(agent_id, body);

    return user;
  }
}
