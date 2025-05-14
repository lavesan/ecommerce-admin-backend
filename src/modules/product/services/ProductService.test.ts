import { container } from "tsyringe";
import { ProductService } from "./ProductService";

// Mock the dependencies
jest.mock("../repositories/IProductRepository");

describe("ProductService", () => {
  let productService: ProductService;
  let mockProductRepository: any;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock repository
    mockProductRepository = {
      create: jest.fn(),
      update: jest.fn(),
      paginate: jest.fn(),
      findById: jest.fn(),
      findManyByEnterpriseID: jest.fn(),
    };

    // Register mock in the container
    container.registerInstance("ProductRepository", mockProductRepository);

    productService = new ProductService(mockProductRepository);
  });

  describe("create", () => {
    it("should create a new product successfully", async () => {
      const mockProduct = {
        id: "product-id",
        name: "Test Product",
        description: "Test Description",
        price: 99.99,
        stock: 100,
        enterpriseId: "enterprise-id",
      };

      mockProductRepository.create.mockResolvedValue(mockProduct);

      const result = await productService.create(mockProduct);

      expect(mockProductRepository.create).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe("update", () => {
    it("should update product successfully", async () => {
      const mockProduct = {
        id: "product-id",
        name: "Updated Product",
        description: "Updated Description",
        price: 149.99,
        stock: 50,
      };

      mockProductRepository.update.mockResolvedValue(mockProduct);

      const result = await productService.update("product-id", {
        name: "Updated Product",
        description: "Updated Description",
        price: 149.99,
        stock: 50,
      });

      expect(mockProductRepository.update).toHaveBeenCalledWith("product-id", {
        name: "Updated Product",
        description: "Updated Description",
        price: 149.99,
        stock: 50,
      });
      expect(result).toEqual(mockProduct);
    });
  });

  describe("paginate", () => {
    it("should paginate products successfully", async () => {
      const mockPagination = {
        page: 1,
        limit: 10,
      };
      const mockFilter = {
        name: "Test",
        minPrice: 0,
        maxPrice: 1000,
      };
      const mockPaginatedResult = {
        data: [
          {
            id: "product-1",
            name: "Test Product 1",
            price: 99.99,
          },
          {
            id: "product-2",
            name: "Test Product 2",
            price: 149.99,
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
      };

      mockProductRepository.paginate.mockResolvedValue(mockPaginatedResult);

      const result = await productService.paginate(mockPagination, mockFilter);

      expect(mockProductRepository.paginate).toHaveBeenCalledWith(
        mockPagination,
        mockFilter
      );
      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe("findById", () => {
    it("should find product by id successfully", async () => {
      const mockProduct = {
        id: "product-id",
        name: "Test Product",
        description: "Test Description",
        price: 99.99,
        stock: 100,
      };

      mockProductRepository.findById.mockResolvedValue(mockProduct);

      const result = await productService.findById("product-id");

      expect(mockProductRepository.findById).toHaveBeenCalledWith("product-id");
      expect(result).toEqual(mockProduct);
    });
  });

  describe("findManyByEnterpriseId", () => {
    it("should find products by enterprise id successfully", async () => {
      const mockProducts = [
        {
          id: "product-1",
          name: "Test Product 1",
          price: 99.99,
        },
        {
          id: "product-2",
          name: "Test Product 2",
          price: 149.99,
        },
      ];

      mockProductRepository.findManyByEnterpriseID.mockResolvedValue(
        mockProducts
      );

      const result = await productService.findManyByEnterpriseId(
        "enterprise-id"
      );

      expect(mockProductRepository.findManyByEnterpriseID).toHaveBeenCalledWith(
        "enterprise-id"
      );
      expect(result).toEqual(mockProducts);
    });
  });
});
