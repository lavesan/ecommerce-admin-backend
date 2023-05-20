import { Address } from "../entities/Address";
import { ICreateAddress } from "../models/ICreateAddress";
import { IUpdateAddress } from "../models/IUpdateAddress";
import { IUpdateAddressDefault } from "../models/IUpdateAddressDefault";

export interface IAddressRepository {
  create(body: ICreateAddress): Promise<Address>;
  update(id: string, body: IUpdateAddress): Promise<boolean>;
  updateDefault(id: string, body: IUpdateAddressDefault): Promise<boolean>;
  delete(id: string, clientId: string): Promise<boolean>;
}
