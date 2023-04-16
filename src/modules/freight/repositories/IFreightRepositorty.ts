import { Freight } from "../entities/Freight";
import { ICreateFreight } from "../models/ICreateFreight";

export interface IFreightRepository {
  create(body: ICreateFreight): Promise<Freight>;
  findAll(enterpriseId: string): Promise<Freight[]>;
  findByEnterpriseAndValue(
    enterpriseId: string,
    value: string
  ): Promise<Freight>;
}
