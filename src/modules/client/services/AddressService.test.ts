import { container } from "tsyringe";
import { AddressService } from "./AddressService";

// Mock the dependencies
jest.mock("../repositories/IAddressRepository");

describe("AddressService", () => {
  let addressService: AddressService;
  let mockAddressRepository: any;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock repository
    mockAddressRepository = {
      create: jest.fn(),
      update: jest.fn(),
      updateDefault: jest.fn(),
      delete: jest.fn(),
    };

    // Register mock in the container
    container.registerInstance("AddressRepository", mockAddressRepository);

    addressService = new AddressService(mockAddressRepository);
  });

  describe("create", () => {
    it("should create a new address successfully", async () => {
      const mockAddress = {
        id: "address-id",
        street: "Test Street",
        number: "123",
        city: "Test City",
        state: "TS",
        zipCode: "12345-678",
        clientId: "client-id",
      };

      mockAddressRepository.create.mockResolvedValue(mockAddress);

      const result = await addressService.create(mockAddress);

      expect(mockAddressRepository.create).toHaveBeenCalledWith(mockAddress);
      expect(result).toEqual(mockAddress);
    });
  });

  describe("update", () => {
    it("should update address successfully", async () => {
      const mockAddress = {
        id: "address-id",
        street: "Updated Street",
        number: "456",
        city: "Updated City",
        state: "US",
        zipCode: "98765-432",
        clientId: "client-id",
      };

      mockAddressRepository.update.mockResolvedValue(mockAddress);

      const result = await addressService.update("address-id", {
        street: "Updated Street",
        number: "456",
        city: "Updated City",
        state: "US",
        zipCode: "98765-432",
      });

      expect(mockAddressRepository.update).toHaveBeenCalledWith("address-id", {
        street: "Updated Street",
        number: "456",
        city: "Updated City",
        state: "US",
        zipCode: "98765-432",
      });
      expect(result).toEqual(mockAddress);
    });
  });

  describe("updateDefault", () => {
    it("should update default address successfully", async () => {
      const mockAddress = {
        id: "address-id",
        isDefault: true,
        clientId: "client-id",
      };

      mockAddressRepository.updateDefault.mockResolvedValue(mockAddress);

      const result = await addressService.updateDefault("address-id", {
        isDefault: true,
      });

      expect(mockAddressRepository.updateDefault).toHaveBeenCalledWith(
        "address-id",
        {
          isDefault: true,
        }
      );
      expect(result).toEqual(mockAddress);
    });
  });

  describe("delete", () => {
    it("should delete address successfully", async () => {
      const addressId = "address-id";
      const clientId = "client-id";

      mockAddressRepository.delete.mockResolvedValue(true);

      const result = await addressService.delete(addressId, clientId);

      expect(mockAddressRepository.delete).toHaveBeenCalledWith(
        addressId,
        clientId
      );
      expect(result).toBe(true);
    });
  });
});
