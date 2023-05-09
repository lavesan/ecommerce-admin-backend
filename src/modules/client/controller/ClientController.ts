import { container } from "tsyringe";
import { Request, Response } from "express";

import { getPageAndSize } from "@helpers/pagination.helper";
import { IPaginationRequest } from "models/pagination.models";
import { CreateClientError } from "../errors/CreateClientError";
import { UpdateClientError } from "../errors/UpdateClientError";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { ClientService } from "../services/ClientService";
import { createClientValidation } from "../validations/createClientValidation";
import { updateClientValidation } from "../validations/updateClientValidation";
import { loginUserValidation } from "@modules/user/validations/loginUserValidation";
import { LoginUserError } from "@modules/user/errors/LoginUserError";

export class ClientController {
  async login(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    await loginUserValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new LoginUserError.BodyIsInvalid(err);
      });

    const { email, password } = req.body;

    const data = await service.login({ email, password });

    res.cookie("token", data.credentials.accessToken, { httpOnly: true });

    return res.json(data);
  }

  async create(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    await createClientValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateClientError.BodyIsInvalid(err);
      });

    const result = await service.create(req.body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    await updateClientValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateClientError.BodyIsInvalid(err);
      });

    const { id } = req.params;

    const result = await service.update(id, req.body);

    return res.json(result);
  }

  async paginate(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const { name, email } = req.query as unknown as IPaginateClientRequest;

    const result = await service.paginate(pagination, { name, email });

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }

  async findMe(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    const { id } = req.client;

    const result = await service.findMeById(id);

    return res.json(result);
  }

  async loginByGoogle(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    const { email } = req.client;

    const result = await service.googleLogin(email, req.client);

    return res.json(result);
  }
}
