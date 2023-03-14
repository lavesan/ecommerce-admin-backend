import "reflect-metadata";
import { FindAgentUseCase } from "./FindAgentUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AgentDontExist } from "./FindAgentError";
import { mockUser } from "@helpers/test.helper";

let agentRepository: InMemoryAgentRepository;
let findAgentUseCase: FindAgentUseCase;

describe("UseCase -> Delete Agent By Id", () => {
  beforeEach(() => {
    agentRepository = new InMemoryAgentRepository();
    findAgentUseCase = new FindAgentUseCase(agentRepository);
  });

  it("should create delete agent", async () => {
    const createdAgent = await agentRepository.create(mockUser);
    const response = await findAgentUseCase.execute(createdAgent.id);

    expect(response).toHaveProperty("id");
  });

  it("should throw error when agent is not found", async () => {
    expect(async () => {
      await findAgentUseCase.execute("mock");
    }).rejects.toBeInstanceOf(AgentDontExist);
  });
});
