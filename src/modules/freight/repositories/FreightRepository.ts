import AppDataSource from "@data-source";
import { Repository } from "typeorm";
import { Freight } from "../entities/Freight";
import { ICreateFreight } from "../models/ICreateFreight";
import { IFreightRepository } from "./IFreightRepositorty";

export class FreightRepository implements IFreightRepository {
  private readonly repository: Repository<Freight>;

  constructor() {
    this.repository = AppDataSource.getRepository(Freight);
  }

  async create(body: ICreateFreight): Promise<Freight> {
    const { enterpriseId, ...newFreight } = body;
    const freight = this.repository.create({
      ...newFreight,
      enterprise: { id: enterpriseId },
    });
    await this.repository.save(freight);
    return freight;
  }

  findAll(enterpriseId: string): Promise<Freight[]> {
    return this.repository.find({
      where: { enterprise: { id: enterpriseId } },
    });
  }

  findByEnterpriseAndValue(
    enterpriseId: string,
    value: string
  ): Promise<Freight> {
    return this.repository.findOne({
      where: { enterprise: { id: enterpriseId }, addressValue: value },
    });
  }
}
