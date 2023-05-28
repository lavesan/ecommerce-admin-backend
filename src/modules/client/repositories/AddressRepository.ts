import { Repository } from "typeorm";
import { Address } from "../entities/Address";
import { ICreateAddress } from "../models/ICreateAddress";
import { IAddressRepository } from "./IAddressRepository";
import AppDataSource from "@data-source";
import { IUpdateAddress } from "../models/IUpdateAddress";
import { IUpdateAddressDefault } from "../models/IUpdateAddressDefault";

export class AddressRepository implements IAddressRepository {
  private readonly repository: Repository<Address>;

  constructor() {
    this.repository = AppDataSource.getRepository(Address);
  }

  async create({
    clientId,
    orderId,
    ...body
  }: ICreateAddress): Promise<Address> {
    // Opens transaction
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const transactionRepository =
        transactionalEntityManager.getRepository(Address);

      let addressRelation = {};

      // Updates all address to isDefault: false
      if (clientId) {
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

        addressRelation = { client: { id: clientId } };
      }

      if (orderId) {
        addressRelation = { order: { id: orderId } };
      }

      const address = transactionRepository.create({
        ...body,
        ...addressRelation,
      });

      await transactionRepository.save(address);

      return address;
    });
  }

  async update(
    id: string,
    { clientId, ...body }: IUpdateAddress
  ): Promise<boolean> {
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const transactionRepository =
        transactionalEntityManager.getRepository(Address);

      const clientAddresses = await transactionRepository.find({
        where: { client: { id: clientId } },
      });

      if (clientAddresses.length) {
        const defaultsUpdated = clientAddresses.map((address) => {
          let updatedBody: Partial<Address> =
            address.id === id
              ? {
                  ...body,
                  isDefault: true,
                }
              : {};

          return {
            ...address,
            ...updatedBody,
          };
        });

        await transactionRepository.save(defaultsUpdated);
      }

      return true;
    });
  }

  async updateDefault(
    id: string,
    { clientId }: IUpdateAddressDefault
  ): Promise<boolean> {
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const transactionRepository =
        transactionalEntityManager.getRepository(Address);

      const clientAddresses = await transactionRepository.find({
        where: { client: { id: clientId } },
      });

      if (clientAddresses.length) {
        const defaultsUpdated = clientAddresses.map((address) => ({
          ...address,
          isDefault: address.id === id ? true : false,
        }));

        await transactionRepository.save(defaultsUpdated);
      }

      return true;
    });
  }

  async delete(id: string, clientId: string): Promise<boolean> {
    await this.repository.softDelete({ id, client: { id: clientId } });
    return true;
  }
}
