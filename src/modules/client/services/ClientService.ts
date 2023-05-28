import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";

import { CreateClientError } from "../errors/CreateClientError";
import { UpdateClientError } from "../errors/UpdateClientError";
import { ICreateClient } from "../models/ICreateClient";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { IUpdateClient } from "../models/IUpdateClient";
import { IClientRepository } from "../repositories/IClientRepository";
import { ILoginRequest } from "@modules/user/models/ILoginRequest";
import { LoginUserError } from "@modules/user/errors/LoginUserError";
import { comparePwd } from "@helpers/password.helper";
import { createToken } from "@helpers/auth.helper";
import { LoginByEmailError } from "../errors/LoginByEmailError";
import { FindMeError } from "@modules/enterprise/errors/FindMeError";

@injectable()
export class ClientService {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository
  ) {}

  async create(body: ICreateClient) {
    const client = await this.clientRepository.findByEmail(body.email);

    if (client) throw new CreateClientError.AlreadyExists();

    const createdClient = await this.clientRepository.create(body);

    const accessToken = createToken(
      {
        id: createdClient.id,
        name: createdClient.name,
        email: createdClient.email,
      },
      process.env.CLIENT_JWT_SECRET
    );

    return {
      credentials: {
        accessToken,
        refreshToken: "",
      },
      ...createdClient,
    };
  }

  async update(id: string, body: Partial<IUpdateClient>) {
    const client = await this.clientRepository.findById(id);

    if (!client) throw new UpdateClientError.DontExist();

    return this.clientRepository.update(id, body);
  }

  async findById(id: string) {
    const client = await this.clientRepository.findById(id);
    delete client.password;
    return client;
  }

  async findMeById(id: string) {
    const client = await this.clientRepository.findById(id);

    if (!client) throw new FindMeError.DontExist();

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

    delete client.password;

    const accessToken = createToken(
      {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      process.env.CLIENT_JWT_SECRET
    );

    return {
      credentials: {
        accessToken,
        refreshToken: "",
      },
      ...client,
    };
  }

  async googleLogin(
    email: string,
    googleInfo: { email: string; name: string }
  ) {
    const client = await this.clientRepository.findByEmail(email);

    if (!client) throw new LoginByEmailError.DontExist(googleInfo);

    delete client.password;

    const accessToken = createToken(
      {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      process.env.CLIENT_JWT_SECRET
    );

    return {
      credentials: {
        accessToken,
        refreshToken: "",
      },
      ...client,
    };
  }
}
