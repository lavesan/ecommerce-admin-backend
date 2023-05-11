import { Repository } from "typeorm";
import { Address } from "../entities/Address";
import { ICreateAddress } from "../models/ICreateAddress";
import { IAddressRepository } from "./IAddressRepository";
import AppDataSource from "@data-source";
import { IUpdateAddress } from "../models/IUpdateAddress";

export class AddressRepository implements IAddressRepository {
  private readonly repository: Repository<Address>;

  constructor() {
    this.repository = AppDataSource.getRepository(Address);
  }

  async create({ clientId, ...body }: ICreateAddress): Promise<Address> {
    // Opens transaction
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const transactionRepository =
        transactionalEntityManager.getRepository(Address);

      const clientAddresses = await transactionRepository.find({
        where: { client: { id: clientId } },
      });

      if (clientAddresses.length) {
        const removeDefaults = clientAddresses.map((address) => ({
          ...address,
          isDefault: false,
        }));

        await transactionRepository.save(removeDefaults);
      }

      const address = transactionRepository.create({
        ...body,
        client: { id: clientId },
      });

      await transactionRepository.save(address);

      return address;
    });
  }

  async update(id: string, body: Partial<IUpdateAddress>): Promise<boolean> {
    await this.repository.save({ id, ...body });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.repository.softDelete(id);
    return true;
  }
}
