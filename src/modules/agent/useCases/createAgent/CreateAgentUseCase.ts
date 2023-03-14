import { inject, injectable } from "tsyringe";
import { CreateAgentError } from "./CreateAgentError";

import { IAgentRepository } from "../../repositories/IAgentRepository";
import { ICreateAgentDTO } from "./ICreateAgentDTO";

@injectable()
export class CreateAgentUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute(body: ICreateAgentDTO) {
    const userAlreadyExists = await this.agentRepository.findByLogin(
      body.login
    );

    if (userAlreadyExists) {
      throw new CreateAgentError.AgentAlreadyExists();
    }

    const user = await this.agentRepository.create(body);

    const userData = user.toObject();

    delete userData.password;

    return userData;
  }
}
