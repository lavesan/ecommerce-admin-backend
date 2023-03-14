import { inject, injectable } from "tsyringe";

import { IAgentRepository } from "../../repositories/IAgentRepository";

@injectable()
export class FindAllAgentsUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute() {
    return this.agentRepository.findAll();
  }
}
