import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { CreateClientError } from "../errors/CreateClientError";
import { UpdateClientError } from "../errors/UpdateClientError";
import { ICreateClient } from "../models/ICreateClient";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { IUpdateClient } from "../models/IUpdateClient";
import { IClientRepository } from "../repositories/IClientRepository";

@injectable()
export class ClientService {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository
  ) {}

  async create(body: ICreateClient) {
    const client = await this.clientRepository.findByEmail(body.email);

    console.log("client: ", client);

    if (client) throw new CreateClientError.AlreadyExists();

    return this.clientRepository.create(body);
  }

  async update(id: string, body: IUpdateClient) {
    const client = await this.clientRepository.findById(id);

    if (!client) throw new UpdateClientError.DontExist();

    return this.clientRepository.update(id, body);
  }

  async findById(id: string) {
    const client = await this.clientRepository.findById(id);
    delete client.password;
    return client;
  }

  paginate(pagination: IPaginationRequest, filter: IPaginateClientRequest) {
    return this.clientRepository.paginate(pagination, filter);
  }
}
