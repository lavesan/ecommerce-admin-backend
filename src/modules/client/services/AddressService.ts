import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "../repositories/IAddressRepository";
import { ICreateAddress } from "../models/ICreateAddress";
import { IUpdateAddress } from "../models/IUpdateAddress";
import { IUpdateAddressDefault } from "../models/IUpdateAddressDefault";

@injectable()
export class AddressService {
  constructor(
    @inject("AddressRepository")
    private readonly addressRepository: IAddressRepository
  ) {}

  async create(body: ICreateAddress) {
    return this.addressRepository.create(body);
  }

  async update(id: string, body: IUpdateAddress) {
    return this.addressRepository.update(id, body);
  }

  async updateDefault(id: string, body: IUpdateAddressDefault) {
    return this.addressRepository.updateDefault(id, body);
  }

  async delete(id: string) {
    return this.addressRepository.delete(id);
  }
}
