import "reflect-metadata";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { InMemoryAgentRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";
import { hash } from "bcryptjs";

let usersRepository: InMemoryAgentRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryAgentRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it("should authenticate user", async () => {
    const email = "mock_email@email.com";
    const password = "12345678";

    await usersRepository.create({
      email,
      password: await hash(password, 8),
      name: "mock-name",
    });

    const auth = await authenticateUserUseCase.execute({
      email,
      password,
    });

    expect(auth).toBeTruthy();
    expect(auth).toHaveProperty("token");
    expect(auth).toHaveProperty("user");
  });

  it("should throw error when user email is wrong", async () => {
    const password = "12345678";

    expect(async () => {
      await usersRepository.create({
        name: "mock-name",
        email: "mock_email@email.com",
        password: await hash(password, 8),
      });

      await authenticateUserUseCase.execute({
        password,
        email: "mock_email_2@email.com",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it("should throw error when user password is wrong", async () => {
    expect(async () => {
      const email = "mock_email@email.com";
      await usersRepository.create({
        email,
        name: "mock-name",
        password: await hash("12345678", 8),
      });

      await authenticateUserUseCase.execute({
        email,
        password: "987654321",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
});
