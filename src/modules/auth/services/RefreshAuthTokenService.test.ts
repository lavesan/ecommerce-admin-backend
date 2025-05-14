import { container } from "tsyringe";
import { RefreshAuthTokenService } from "./RefreshAuthTokenService";
import { LogoutError } from "../errors/LogoutError";
import { ClientService } from "@modules/client/services/ClientService";
import { UserService } from "@modules/user/service/UserService";

// Mock the dependencies
jest.mock("@modules/client/services/ClientService");
jest.mock("@modules/user/service/UserService");
jest.mock("../repositories/IRefreshAuthTokenRepository");

describe("RefreshAuthTokenService", () => {
  let refreshAuthTokenService: RefreshAuthTokenService;
  let mockRefreshAuthTokenRepository: any;
  let mockClientService: jest.Mocked<ClientService>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock repository
    mockRefreshAuthTokenRepository = {
      create: jest.fn(),
      logout: jest.fn(),
      findOne: jest.fn(),
    };

    // Setup mock services
    mockClientService = new ClientService() as jest.Mocked<ClientService>;
    mockUserService = new UserService() as jest.Mocked<UserService>;

    // Register mocks in the container
    container.registerInstance(
      "RefreshAuthTokenRepository",
      mockRefreshAuthTokenRepository
    );
    container.registerInstance("ClientService", mockClientService);
    container.registerInstance("UserService", mockUserService);

    refreshAuthTokenService = new RefreshAuthTokenService(
      mockRefreshAuthTokenRepository
    );
  });

  describe("create", () => {
    it("should create a new refresh token", async () => {
      const mockBody = {
        token: "mock-token",
        userId: "user-id",
        expiresIn: new Date(),
      };

      mockRefreshAuthTokenRepository.create.mockResolvedValue(mockBody);

      const result = await refreshAuthTokenService.create(mockBody);

      expect(mockRefreshAuthTokenRepository.create).toHaveBeenCalledWith(
        mockBody
      );
      expect(result).toEqual(mockBody);
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      const refreshToken = "mock-refresh-token";
      mockRefreshAuthTokenRepository.logout.mockResolvedValue(true);

      const result = await refreshAuthTokenService.logout(refreshToken);

      expect(mockRefreshAuthTokenRepository.logout).toHaveBeenCalledWith(
        refreshToken
      );
      expect(result).toBe(true);
    });
  });

  describe("refresh", () => {
    const mockRefreshToken = "mock-refresh-token";
    const mockId = "user-id";

    it("should throw error when refresh token doesn't exist", async () => {
      mockRefreshAuthTokenRepository.findOne.mockResolvedValue(null);

      await expect(
        refreshAuthTokenService.refresh(mockRefreshToken, "client", mockId)
      ).rejects.toThrow(LogoutError.DontExist);
    });

    it("should refresh token for client role", async () => {
      const mockStoredToken = { token: mockRefreshToken };
      const mockClient = {
        id: mockId,
        name: "Test Client",
        email: "client@test.com",
      };
      const mockCredentials = {
        token: "new-token",
        refreshToken: "new-refresh-token",
      };

      mockRefreshAuthTokenRepository.findOne.mockResolvedValue(mockStoredToken);
      mockRefreshAuthTokenRepository.logout.mockResolvedValue(true);
      mockClientService.findById.mockResolvedValue(mockClient);
      jest
        .spyOn(require("@helpers/auth.helper"), "createCredentials")
        .mockResolvedValue(mockCredentials);

      const result = await refreshAuthTokenService.refresh(
        mockRefreshToken,
        "client",
        mockId
      );

      expect(mockRefreshAuthTokenRepository.findOne).toHaveBeenCalledWith(
        mockRefreshToken
      );
      expect(mockRefreshAuthTokenRepository.logout).toHaveBeenCalledWith(
        mockRefreshToken
      );
      expect(mockClientService.findById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockCredentials);
    });

    it("should refresh token for dashboard role", async () => {
      const mockStoredToken = { token: mockRefreshToken };
      const mockUser = {
        id: mockId,
        name: "Test User",
        email: "user@test.com",
      };
      const mockCredentials = {
        token: "new-token",
        refreshToken: "new-refresh-token",
      };

      mockRefreshAuthTokenRepository.findOne.mockResolvedValue(mockStoredToken);
      mockRefreshAuthTokenRepository.logout.mockResolvedValue(true);
      mockUserService.findById.mockResolvedValue(mockUser);
      jest
        .spyOn(require("@helpers/auth.helper"), "createCredentials")
        .mockResolvedValue(mockCredentials);

      const result = await refreshAuthTokenService.refresh(
        mockRefreshToken,
        "dashboard",
        mockId
      );

      expect(mockRefreshAuthTokenRepository.findOne).toHaveBeenCalledWith(
        mockRefreshToken
      );
      expect(mockRefreshAuthTokenRepository.logout).toHaveBeenCalledWith(
        mockRefreshToken
      );
      expect(mockUserService.findById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockCredentials);
    });
  });
});
