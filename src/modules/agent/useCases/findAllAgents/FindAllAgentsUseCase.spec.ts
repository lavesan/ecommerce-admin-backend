import "reflect-metadata";
import { FindAllAgentsUseCase } from "./FindAllAgentsUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { mockUser } from "@helpers/test.helper";

let agentRepository: InMemoryAgentRepository;
let findAllAgentsUseCase: FindAllAgentsUseCase;

describe("UseCase -> Delete Agent By Id", () => {
  beforeEach(() => {
    agentRepository = new InMemoryAgentRepository();
    findAllAgentsUseCase = new FindAllAgentsUseCase(agentRepository);
  });

  it("should create delete agent", async () => {
    await agentRepository.create(mockUser);
    const response = await findAllAgentsUseCase.execute();

    expect(response.length).toBe(1);
  });
});
