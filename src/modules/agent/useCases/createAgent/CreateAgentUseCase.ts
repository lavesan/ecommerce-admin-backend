import { inject, injectable } from "tsyringe";
import { CreateAgentError } from "./CreateAgentError";

import { IAgentRepository } from "../../repositories/IAgentRepository";
import { ICreateAgentDTO } from "./ICreateAgentDTO";
import { encryptPwd } from "helpers/password";

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
      throw new CreateAgentError();
    }

    const passwordHash = await encryptPwd(body.password);

    const user = await this.agentRepository.create({
      ...body,
      password: passwordHash,
    });

    return user;
  }
}
