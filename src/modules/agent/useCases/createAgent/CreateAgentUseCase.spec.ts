import "reflect-metadata";

import { CreateAgentUseCase } from "./CreateAgentUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateAgentError } from "./CreateAgentError";
import { mockUser } from "@helpers/test.helper";

let agentRepository: InMemoryAgentRepository;
let createAgentUseCase: CreateAgentUseCase;

describe("UseCase -> Create Agent", () => {
  beforeEach(() => {
    agentRepository = new InMemoryAgentRepository();
    createAgentUseCase = new CreateAgentUseCase(agentRepository);
  });

  it("should create agent", async () => {
    const user = await createAgentUseCase.execute(mockUser);

    expect(user?.id).toBeTruthy();
  });

  it("should throw error when agent login already exists", async () => {
    await expect(async () => {
      await createAgentUseCase.execute(mockUser);
      await createAgentUseCase.execute(mockUser);
    }).rejects.toBeInstanceOf(CreateAgentError.AgentAlreadyExists);
  });
});
