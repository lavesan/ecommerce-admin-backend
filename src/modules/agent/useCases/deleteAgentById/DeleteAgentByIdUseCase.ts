import { inject, injectable } from "tsyringe";
import { AgentDontExist } from "./DeleteAgentByIdError";

import { IAgentRepository } from "../../repositories/IAgentRepository";

@injectable()
export class DeleteAgentByIdUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute(id: string) {
    const userExists = await this.agentRepository.findById(id);

    if (!userExists) {
      throw new AgentDontExist();
    }

    return this.agentRepository.deleteById(id);
  }
}
