import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "data-source";
import { IPaginationRequest } from "models/pagination.models";
import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoryRepository } from "./ICategoryRespository";

export class CategoryRepository implements ICategoryRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create(body: Partial<Category>) {
    const category = this.repository.create(body);
    await this.repository.save(category);
    return category;
  }

  async update(id: string, body: Partial<Category>) {
    await this.repository.update(id, body);
    return true;
  }

  async paginate(pagination: IPaginationRequest) {
    const paginationData = getSkipAndTake(pagination);

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      ...paginationData,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  findByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }
}
