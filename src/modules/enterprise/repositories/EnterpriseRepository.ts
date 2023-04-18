import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "models/pagination.models";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { Enterprise } from "../entities/Enterprise";
import { ICreateEnterprise } from "../models/ICreateEnterprise";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { IEnterpriseRepository } from "./IEnterpriseRepository";
import { IUpdateEnterprise } from "../models/IUpdateEnterprise";

export class EnterpriseRepository implements IEnterpriseRepository {
  private readonly repository: Repository<Enterprise>;

  constructor() {
    this.repository = AppDataSource.getRepository(Enterprise);
  }

  async create({ userId, ...body }: ICreateEnterprise): Promise<Enterprise> {
    const enterprise = this.repository.create({
      ...body,
      user: { id: userId },
    });
    await this.repository.save(enterprise);
    return enterprise;
  }

  async update(
    id: string,
    { userId, ...body }: IUpdateEnterprise
  ): Promise<boolean> {
    // @ts-ignore
    await this.repository.save({
      id,
      ...body,
      user: { id: userId },
    });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.repository.softDelete(id);
    return true;
  }

  findById(id: string): Promise<Enterprise> {
    return this.repository.findOne({
      where: { id },
      relations: ["user", "freights", "schedules"],
    });
  }

  findAllMenuById(id: string): Promise<Enterprise> {
    return this.repository.findOne({
      where: { id },
      relations: [
        "categories",
        "categories.products",
        "categories.products.productAdditionalCategory",
        "categories.products.productAdditionalCategory.productAdditionals",
        "promotions",
        "freights",
      ],
    });
  }

  async paginate(
    pagination: IPaginationRequest,
    { cnpj, name }: IPaginateEnterpriseRequest
  ): Promise<IPaginationResponse<Enterprise>> {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Enterprise> = {};

    if (name) where.name = ILike(`%${name}%`);
    if (cnpj) where.cnpj = ILike(`%${cnpj}%`);

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      where,
      ...paginationData,
    });

    return {
      data,
      count,
      ...pagination,
    };
  }
}
