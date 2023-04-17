import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreateEnterpriseError } from "../errors/CreateEnterpriseError";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { EnterpriseService } from "../services/EnterpriseService";
import { createEnterpriseValidation } from "../validations/createEnterpriseValidation";
import { updateEnterpriseValidation } from "../validations/updateEnterpriseValidations";
import { UpdateEnterpriseError } from "../errors/UpdateEnterpriseError";

export class EnterpriseController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(EnterpriseService);

    await createEnterpriseValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateEnterpriseError.BodyIsInvalid(err);
      });

    const result = await service.create(req.body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(EnterpriseService);

    await updateEnterpriseValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateEnterpriseError.BodyIsInvalid(err);
      });

    const { id } = req.params;

    const result = await service.update(id, req.body);

    return res.json(result);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(EnterpriseService);

    const { id } = req.params;

    const result = await service.delete(id);

    return res.json(result);
  }

  async paginate(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(EnterpriseService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const { name, cnpj } = req.query as unknown as IPaginateEnterpriseRequest;

    const result = await service.paginate(pagination, { name, cnpj });

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(EnterpriseService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }

  async findAllMenuById(req: Request, res: Response) {
    const service = container.resolve(EnterpriseService);

    const { id } = req.params;

    const result = await service.findAllMenuById(id);

    return res.json(result);
  }
}
