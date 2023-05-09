import { Address } from "../entities/Address";
import { ICreateAddress } from "../models/ICreateAddress";
import { IUpdateAddress } from "../models/IUpdateAddress";

export interface IAddressRepository {
  create(body: ICreateAddress): Promise<Address>;
  update(id: string, body: Partial<IUpdateAddress>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
