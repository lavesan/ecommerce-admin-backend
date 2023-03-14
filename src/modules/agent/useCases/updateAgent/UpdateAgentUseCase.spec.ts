import "reflect-metadata";

import { UpdateAgentUseCase } from "./UpdateAgentUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { UpdateAgentError } from "./UpdateAgentError";
import { mockUser } from "@helpers/test.helper";
import { HandleMode } from "@modules/agent/entities/IAgent";

let agentRepository: InMemoryAgentRepository;
let updateAgentsUseCase: UpdateAgentUseCase;

describe("UseCase -> Delete Agent By Id", () => {
  beforeEach(() => {
    agentRepository = new InMemoryAgentRepository();
    updateAgentsUseCase = new UpdateAgentUseCase(agentRepository);
  });

  it("should create delete agent", async () => {
    const newName = "Roberto";

    const agent = await agentRepository.create(mockUser);
    const response = await updateAgentsUseCase.execute(agent.id, {
      name: newName,
      medias: {
        chat: {
          handleMode: HandleMode.MANUAL,
        },
      },
    });

    expect(response.name).toBe(newName);
    expect(response.medias.chat.handleMode).toBe(HandleMode.MANUAL);
    expect(response.medias.chat.min).toBe(agent.medias.chat.min);
  });

  it("should throw error if agent is not found", async () => {
    await expect(async () => {
      await updateAgentsUseCase.execute("mock", {
        login: "novo login",
      });
    }).rejects.toBeInstanceOf(UpdateAgentError.AgentDontExist);
  });
});
