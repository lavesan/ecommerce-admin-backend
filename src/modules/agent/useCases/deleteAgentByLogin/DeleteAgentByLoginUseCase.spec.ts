import "reflect-metadata";

import { DeleteAgentByLoginUseCase } from "./DeleteAgentByLoginUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { DeleteAgentByLoginError } from "./DeleteAgentByLoginError";
import { mockUser } from "@helpers/test.helper";

let agentRepository: InMemoryAgentRepository;
let deleteAgentByLoginUseCase: DeleteAgentByLoginUseCase;

describe("UseCase -> Delete Agent By Login", () => {
  beforeEach(() => {
    agentRepository = new InMemoryAgentRepository();
    deleteAgentByLoginUseCase = new DeleteAgentByLoginUseCase(agentRepository);
  });

  it("should create delete agent", async () => {
    const createdAgent = await agentRepository.create(mockUser);
    const response = await deleteAgentByLoginUseCase.execute(
      createdAgent.login
    );

    expect(response).toBe("Ok");
  });

  it("should throw error when agent is not found", async () => {
    expect(async () => {
      await deleteAgentByLoginUseCase.execute("mock");
    }).rejects.toBeInstanceOf(DeleteAgentByLoginError.AgentDontExist);
  });
});
