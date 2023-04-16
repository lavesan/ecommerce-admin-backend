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

export class EnterpriseRepository implements IEnterpriseRepository {
  private readonly repository: Repository<Enterprise>;

  constructor() {
    this.repository = AppDataSource.getRepository(Enterprise);
  }

  async create(body: ICreateEnterprise): Promise<Enterprise> {
    const { userId, ...newEnterprise } = body;
    const enterprise = this.repository.create({
      ...newEnterprise,
      user: { id: userId },
    });
    await this.repository.save(enterprise);
    return enterprise;
  }

  async paginate(
    pagination: IPaginationRequest,
    { cnpj, name }: IPaginateEnterpriseRequest
  ): Promise<IPaginationResponse<Enterprise>> {
    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Enterprise> = {};

    if (name) where.name = ILike(`%${name}%`);

    if (cnpj) where.cnpj = ILike(`%${name}%`);

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
