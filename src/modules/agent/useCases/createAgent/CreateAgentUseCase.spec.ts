import "reflect-metadata";

import { CreateAgentUseCase } from "./CreateAgentUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateAgentError } from "./CreateAgentError";

let usersRepository: InMemoryAgentRepository;
let createUserUseCase: CreateAgentUseCase;

describe("Create Agent", () => {
  beforeEach(() => {
    usersRepository = new InMemoryAgentRepository();
    createUserUseCase = new CreateAgentUseCase(usersRepository);
  });

  it("should create user", async () => {
    const user = await createUserUseCase.execute({
      email: "mock_email@email.com",
      name: "mock-name",
      password: "12345678",
    });

    expect(user?.id).toBeTruthy();
  });

  it("should throw error when user email already exists", async () => {
    expect(async () => {
      const email = "email@email.com";

      await createUserUseCase.execute({
        email,
        name: "name-mock-1",
        password: "12345678",
      });
      await createUserUseCase.execute({
        email,
        name: "name-mock-2",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(CreateAgentError);
  });
});
