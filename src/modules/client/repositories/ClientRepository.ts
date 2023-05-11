import { getSkipAndTake } from "@helpers/pagination.helper";
import { encryptPwd } from "@helpers/password.helper";
import AppDataSource from "@data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { ILike, Repository } from "typeorm";
import { Client } from "../entities/Client";
import { ICreateClient } from "../models/ICreateClient";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { IUpdateClient } from "../models/IUpdateClient";
import { IClientRepository } from "./IClientRepository";

export class ClientRepository implements IClientRepository {
  private readonly repository: Repository<Client>;

  constructor() {
    this.repository = AppDataSource.getRepository(Client);
  }

  async create({ password, ...body }: ICreateClient): Promise<Partial<Client>> {
    const client = this.repository.create({
      ...body,
      password: await encryptPwd(password),
    });

    await this.repository.save(client);

    delete client.password;

    return client;
  }

  async update(id: string, body: IUpdateClient): Promise<boolean> {
    await this.repository.update(id, body);
    return true;
  }

  findById(id: string): Promise<Client> {
    return this.repository.findOne({
      where: { id },
      relations: ["addresses"],
    });
  }

  findByEmail(email: string): Promise<Client> {
    return this.repository.findOne({ where: { email } });
  }

  async paginate(
    pagination: IPaginationRequest,
    { name, email }: IPaginateClientRequest
  ): Promise<IPaginationResponse<Client>> {
    const paginationData = getSkipAndTake(pagination);

    let where: any = {};

    if (name) where.name = ILike(`%${name}%`);
    if (email) where.email = ILike(`%${email}%`);

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      ...paginationData,
      where,
      select: ["cpf", "created_at", "email", "id", "name"],
    });

    return {
      data,
      count,
      ...pagination,
    };
  }
}
