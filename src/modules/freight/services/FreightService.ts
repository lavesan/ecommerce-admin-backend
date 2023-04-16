import { inject, injectable } from "tsyringe";
import { CreateFreightError } from "../errors/CreateFreightError";
import { ICreateFreight } from "../models/ICreateFreight";
import { IFreightRepository } from "../repositories/IFreightRepositorty";

@injectable()
export class FreightService {
  constructor(
    @inject("FreightRepository")
    private readonly freightRepository: IFreightRepository
  ) {}

  async create(body: ICreateFreight) {
    const freight = await this.freightRepository.findByEnterpriseAndValue(
      body.enterpriseId,
      body.addressValue
    );

    if (freight) throw new CreateFreightError.AlreadyExists();

    return this.freightRepository.create(body);
  }

  findAll(enterpriseId: string) {
    return this.freightRepository.findAll(enterpriseId);
  }
}
