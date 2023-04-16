import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreateEnterpriseError } from "../errors/CreateEnterpriseError";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { EnterpriseService } from "../services/EnterpriseService";
import { createEnterpriseValidation } from "../validations/createEnterpriseValidation";

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

  async paginate(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(EnterpriseService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const { name, cnpj } = req.query as unknown as IPaginateEnterpriseRequest;

    const result = await service.paginate(pagination, { name, cnpj });

    return res.json(result);
  }
}
