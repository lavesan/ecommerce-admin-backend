import { container } from "tsyringe";
import { ClientService } from "./ClientService";
import { CreateClientError } from "../errors/CreateClientError";
import { UpdateClientError } from "../errors/UpdateClientError";
import { LoginUserError } from "@modules/user/errors/LoginUserError";
import { LoginByEmailError } from "../errors/LoginByEmailError";
import { FindMeError } from "@modules/enterprise/errors/FindMeError";
import { MailService } from "@modules/mail/services/MailService";

// Mock the dependencies
jest.mock("../repositories/IClientRepository");
jest.mock("@modules/mail/services/MailService");
jest.mock("@helpers/password.helper");
jest.mock("@helpers/auth.helper");
jest.mock("jsonwebtoken");

describe("ClientService", () => {
  let clientService: ClientService;
  let mockClientRepository: any;
  let mockMailService: jest.Mocked<MailService>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock repository
    mockClientRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      paginate: jest.fn(),
      resetPassword: jest.fn(),
    };

    // Setup mock services
    mockMailService = new MailService() as jest.Mocked<MailService>;

    // Register mocks in the container
    container.registerInstance("ClientRepository", mockClientRepository);
    container.registerInstance("MailService", mockMailService);

    clientService = new ClientService(mockClientRepository);
  });

  describe("create", () => {
    it("should create a new client successfully", async () => {
      const mockClient = {
        id: "client-id",
        name: "Test Client",
        email: "client@test.com",
      };
      const mockCredentials = {
        token: "mock-token",
        refreshToken: "mock-refresh-token",
      };

      mockClientRepository.findByEmail.mockResolvedValue(null);
      mockClientRepository.create.mockResolvedValue(mockClient);
      jest
        .spyOn(require("@helpers/auth.helper"), "createCredentials")
        .mockResolvedValue(mockCredentials);

      const result = await clientService.create({
        name: "Test Client",
        email: "client@test.com",
        password: "password123",
      });

      expect(mockClientRepository.findByEmail).toHaveBeenCalledWith(
        "client@test.com"
      );
      expect(mockClientRepository.create).toHaveBeenCalled();
      expect(result).toEqual({
        ...mockClient,
        credentials: mockCredentials,
      });
    });

    it("should throw error when client already exists", async () => {
      const existingClient = {
        id: "existing-id",
        name: "Existing Client",
        email: "client@test.com",
      };

      mockClientRepository.findByEmail.mockResolvedValue(existingClient);

      await expect(
        clientService.create({
          name: "Test Client",
          email: "client@test.com",
          password: "password123",
        })
      ).rejects.toThrow(CreateClientError.AlreadyExists);
    });
  });

  describe("update", () => {
    it("should update client successfully", async () => {
      const mockClient = {
        id: "client-id",
        name: "Updated Client",
        email: "client@test.com",
      };

      mockClientRepository.findById.mockResolvedValue(mockClient);
      mockClientRepository.update.mockResolvedValue(mockClient);

      const result = await clientService.update("client-id", {
        name: "Updated Client",
      });

      expect(mockClientRepository.findById).toHaveBeenCalledWith("client-id");
      expect(mockClientRepository.update).toHaveBeenCalledWith("client-id", {
        name: "Updated Client",
      });
      expect(result).toEqual(mockClient);
    });

    it("should throw error when client doesn't exist", async () => {
      mockClientRepository.findById.mockResolvedValue(null);

      await expect(
        clientService.update("non-existent-id", {
          name: "Updated Client",
        })
      ).rejects.toThrow(UpdateClientError.DontExist);
    });
  });

  describe("findById", () => {
    it("should find client by id and remove password", async () => {
      const mockClient = {
        id: "client-id",
        name: "Test Client",
        email: "client@test.com",
        password: "hashed-password",
      };

      mockClientRepository.findById.mockResolvedValue(mockClient);

      const result = await clientService.findById("client-id");

      expect(mockClientRepository.findById).toHaveBeenCalledWith("client-id");
      expect(result).not.toHaveProperty("password");
    });
  });

  describe("findMeById", () => {
    it("should find client by id and remove password", async () => {
      const mockClient = {
        id: "client-id",
        name: "Test Client",
        email: "client@test.com",
        password: "hashed-password",
      };

      mockClientRepository.findById.mockResolvedValue(mockClient);

      const result = await clientService.findMeById("client-id");

      expect(mockClientRepository.findById).toHaveBeenCalledWith("client-id");
      expect(result).not.toHaveProperty("password");
    });

    it("should throw error when client doesn't exist", async () => {
      mockClientRepository.findById.mockResolvedValue(null);

      await expect(clientService.findMeById("non-existent-id")).rejects.toThrow(
        FindMeError.DontExist
      );
    });
  });

  describe("login", () => {
    it("should login successfully with correct credentials", async () => {
      const mockClient = {
        id: "client-id",
        name: "Test Client",
        email: "client@test.com",
        password: "hashed-password",
      };
      const mockCredentials = {
        token: "mock-token",
        refreshToken: "mock-refresh-token",
      };

      mockClientRepository.findByEmail.mockResolvedValue(mockClient);
      jest
        .spyOn(require("@helpers/password.helper"), "comparePwd")
        .mockResolvedValue(true);
      jest
        .spyOn(require("@helpers/auth.helper"), "createCredentials")
        .mockResolvedValue(mockCredentials);

      const result = await clientService.login({
        email: "client@test.com",
        password: "password123",
      });

      expect(mockClientRepository.findByEmail).toHaveBeenCalledWith(
        "client@test.com"
      );
      expect(result).toEqual({
        ...mockClient,
        password: undefined,
        credentials: mockCredentials,
      });
    });

    it("should throw error with incorrect email", async () => {
      mockClientRepository.findByEmail.mockResolvedValue(null);

      await expect(
        clientService.login({
          email: "wrong@test.com",
          password: "password123",
        })
      ).rejects.toThrow(LoginUserError.EmailOrPwdWrong);
    });

    it("should throw error with incorrect password", async () => {
      const mockClient = {
        id: "client-id",
        name: "Test Client",
        email: "client@test.com",
        password: "hashed-password",
      };

      mockClientRepository.findByEmail.mockResolvedValue(mockClient);
      jest
        .spyOn(require("@helpers/password.helper"), "comparePwd")
        .mockResolvedValue(false);

      await expect(
        clientService.login({
          email: "client@test.com",
          password: "wrong-password",
        })
      ).rejects.toThrow(LoginUserError.EmailOrPwdWrong);
    });
  });

  describe("googleLogin", () => {
    it("should login successfully with Google", async () => {
      const mockClient = {
        id: "client-id",
        name: "Test Client",
        email: "client@test.com",
        password: "hashed-password",
      };
      const mockCredentials = {
        token: "mock-token",
        refreshToken: "mock-refresh-token",
      };

      mockClientRepository.findByEmail.mockResolvedValue(mockClient);
      jest
        .spyOn(require("@helpers/auth.helper"), "createCredentials")
        .mockResolvedValue(mockCredentials);

      const result = await clientService.googleLogin("client@test.com", {
        email: "client@test.com",
        name: "Test Client",
      });

      expect(mockClientRepository.findByEmail).toHaveBeenCalledWith(
        "client@test.com"
      );
      expect(result).toEqual({
        ...mockClient,
        password: undefined,
        credentials: mockCredentials,
      });
    });

    it("should throw error when client doesn't exist", async () => {
      mockClientRepository.findByEmail.mockResolvedValue(null);

      await expect(
        clientService.googleLogin("non-existent@test.com", {
          email: "non-existent@test.com",
          name: "Non Existent",
        })
      ).rejects.toThrow(LoginByEmailError.DontExist);
    });
  });

  describe("forgotPassword", () => {
    it("should send reset password email", async () => {
      const email = "client@test.com";
      const mockToken = "mock-token";
      const mockRedirectLink =
        "http://localhost/reset-password?token=mock-token";

      jest.spyOn(require("jsonwebtoken"), "sign").mockReturnValue(mockToken);
      process.env.RESET_PASSWORD_TOKEN = "reset-token-secret";
      process.env.CLIENT_FRONT_URL = "http://localhost";
      process.env.MARKETPLACE_NAME = "Test Marketplace";

      await clientService.forgotPassword(email);

      expect(mockMailService.send).toHaveBeenCalledWith({
        from: "arco.marketplace.12@gmail.com",
        to: email,
        title: "Alterar senha em Test Marketplace",
        htmlBody: expect.any(String),
      });
    });
  });

  describe("resetPassword", () => {
    it("should reset password successfully", async () => {
      const mockResetData = {
        token: "reset-token",
        password: "new-password",
      };

      mockClientRepository.resetPassword.mockResolvedValue(true);

      const result = await clientService.resetPassword(mockResetData);

      expect(mockClientRepository.resetPassword).toHaveBeenCalledWith(
        mockResetData
      );
      expect(result).toBe(true);
    });
  });
});
