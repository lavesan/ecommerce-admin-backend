import { inject, injectable } from "tsyringe";
import { DeleteAgentByLoginError } from "./DeleteAgentByLoginError";

import { IAgentRepository } from "../../repositories/IAgentRepository";

@injectable()
export class DeleteAgentByLoginUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute(login: string) {
    const userExists = await this.agentRepository.findByLogin(login);

    if (!userExists) {
      throw new DeleteAgentByLoginError.AgentDontExist();
    }

    return this.agentRepository.deleteByLogin(login);
  }
}
