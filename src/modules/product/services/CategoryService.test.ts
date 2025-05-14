import { container } from "tsyringe";
import { CategoryService } from "./CategoryService";
import { CreateCategoryError } from "../errors/CreateCategoryErrors";
import { UpdateCategoryError } from "../errors/UpdateCategoryError";

// Mock the dependencies
jest.mock("../repositories/ICategoryRespository");

describe("CategoryService", () => {
  let categoryService: CategoryService;
  let mockCategoryRepository: any;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock repository
    mockCategoryRepository = {
      create: jest.fn(),
      update: jest.fn(),
      paginate: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
    };

    // Register mock in the container
    container.registerInstance("CategoryRepository", mockCategoryRepository);

    categoryService = new CategoryService(mockCategoryRepository);
  });

  describe("create", () => {
    it("should create a new category successfully", async () => {
      const mockCategory = {
        id: "category-id",
        name: "Test Category",
        description: "Test Description",
      };

      mockCategoryRepository.findByName.mockResolvedValue(null);
      mockCategoryRepository.create.mockResolvedValue(mockCategory);

      const result = await categoryService.create(mockCategory);

      expect(mockCategoryRepository.findByName).toHaveBeenCalledWith(
        mockCategory.name
      );
      expect(mockCategoryRepository.create).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockCategory);
    });

    it("should throw error when category already exists", async () => {
      const existingCategory = {
        id: "existing-id",
        name: "Existing Category",
        description: "Existing Description",
      };

      mockCategoryRepository.findByName.mockResolvedValue(existingCategory);

      await expect(
        categoryService.create({
          name: "Existing Category",
          description: "Test Description",
        })
      ).rejects.toThrow(CreateCategoryError.AlreadyExists);
    });
  });

  describe("update", () => {
    it("should update category successfully", async () => {
      const mockCategory = {
        id: "category-id",
        name: "Updated Category",
        description: "Updated Description",
      };

      mockCategoryRepository.findById.mockResolvedValue(mockCategory);
      mockCategoryRepository.update.mockResolvedValue(mockCategory);

      const result = await categoryService.update("category-id", {
        name: "Updated Category",
        description: "Updated Description",
      });

      expect(mockCategoryRepository.findById).toHaveBeenCalledWith(
        "category-id"
      );
      expect(mockCategoryRepository.update).toHaveBeenCalledWith(
        "category-id",
        {
          name: "Updated Category",
          description: "Updated Description",
        }
      );
      expect(result).toEqual(mockCategory);
    });

    it("should throw error when category doesn't exist", async () => {
      mockCategoryRepository.findById.mockResolvedValue(null);

      await expect(
        categoryService.update("non-existent-id", {
          name: "Updated Category",
          description: "Updated Description",
        })
      ).rejects.toThrow(UpdateCategoryError.DontExist);
    });
  });

  describe("paginate", () => {
    it("should paginate categories successfully", async () => {
      const mockPagination = {
        page: 1,
        limit: 10,
      };
      const mockFilter = {
        name: "Test",
      };
      const mockPaginatedResult = {
        data: [
          {
            id: "category-1",
            name: "Test Category 1",
            description: "Description 1",
          },
          {
            id: "category-2",
            name: "Test Category 2",
            description: "Description 2",
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
      };

      mockCategoryRepository.paginate.mockResolvedValue(mockPaginatedResult);

      const result = await categoryService.paginate(mockPagination, mockFilter);

      expect(mockCategoryRepository.paginate).toHaveBeenCalledWith(
        mockPagination,
        mockFilter
      );
      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe("findById", () => {
    it("should find category by id successfully", async () => {
      const mockCategory = {
        id: "category-id",
        name: "Test Category",
        description: "Test Description",
      };

      mockCategoryRepository.findById.mockResolvedValue(mockCategory);

      const result = await categoryService.findById("category-id");

      expect(mockCategoryRepository.findById).toHaveBeenCalledWith(
        "category-id"
      );
      expect(result).toEqual(mockCategory);
    });
  });
});
