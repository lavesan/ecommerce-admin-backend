import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../../../../config/auth";

import { IAgentRepository } from "../../repositories/IAgentRepository";
import { IAuthenticateUserResponseDTO } from "./IAuthenticateUserResponseDTO";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("AgentRepository")
    private agentRepository: IAgentRepository
  ) {}

  async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponseDTO> {
    const agent = await this.agentRepository.findByLogin(email);

    if (!agent) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMatch = await compare(password, agent.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ agent }, secret, {
      subject: agent.id.toString(),
      expiresIn,
    });

    return {
      user: {
        id: agent.id,
        domain: agent.domain,
        login: agent.login,
      },
      token,
    };
  }
}
