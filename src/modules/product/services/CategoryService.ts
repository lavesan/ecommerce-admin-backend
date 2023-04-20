import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { Category } from "../entities/Category";
import { CreateCategoryError } from "../errors/CreateCategoryErrors";
import { UpdateCategoryError } from "../errors/UpdateCategoryError";
import { ICreateCategory } from "../models/ICreateCategory";
import { IPaginateCategoryRequest } from "../models/IPaginateCategoryRequest";
import { ICategoryRepository } from "../repositories/ICategoryRespository";
import { IUpdateCategory } from "../models/IUpdateCategory";

@injectable()
export class CategoryService {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async create(body: ICreateCategory) {
    const category = await this.categoryRepository.findByName(body.name);

    if (category) {
      throw new CreateCategoryError.AlreadyExists();
    }

    return this.categoryRepository.create(body);
  }

  async update(id: string, body: IUpdateCategory) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new UpdateCategoryError.DontExist();
    }

    return this.categoryRepository.update(id, body);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginateCategoryRequest) {
    return this.categoryRepository.paginate(pagination, filter);
  }

  findById(id: string) {
    return this.categoryRepository.findById(id);
  }
}
