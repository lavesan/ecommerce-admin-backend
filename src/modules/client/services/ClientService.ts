import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

import { CreateClientError } from "../errors/CreateClientError";
import { UpdateClientError } from "../errors/UpdateClientError";
import { ICreateClient } from "../models/ICreateClient";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { IUpdateClient } from "../models/IUpdateClient";
import { IClientRepository } from "../repositories/IClientRepository";
import { ILoginRequest } from "@modules/user/models/ILoginRequest";
import { LoginUserError } from "@modules/user/errors/LoginUserError";
import { comparePwd } from "@helpers/password.helper";

@injectable()
export class ClientService {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository
  ) {}

  async create(body: ICreateClient) {
    const client = await this.clientRepository.findByEmail(body.email);

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

  async login({ email, password }: ILoginRequest) {
    const client = await this.clientRepository.findByEmail(email);

    if (!client) throw new LoginUserError.EmailOrPwdWrong();

    const passwordMatch = await comparePwd(password, client.password);

    if (!passwordMatch) throw new LoginUserError.EmailOrPwdWrong();

    const accessToken = jwt.sign(
      {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      process.env.CLIENT_JWT_SECRET
    );

    return {
      accessToken,
      refreshToken: "",
    };
  }
}
