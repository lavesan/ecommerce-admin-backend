import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreateClientError } from "../errors/CreateClientError";
import { UpdateClientError } from "../errors/UpdateClientError";
import { IPaginateClientRequest } from "../models/IPaginateClientRequest";
import { ClientService } from "../services/ClientService";
import { createClientValidation } from "../validations/createClientValidation";
import { updateClientValidation } from "../validations/updateClientValidation";

export class ClientController {
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
    const { name } = req.query as unknown as IPaginateClientRequest;

    const result = await service.paginate(pagination, { name });

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(ClientService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }
}
