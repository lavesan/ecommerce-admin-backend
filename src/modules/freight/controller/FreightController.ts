import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFreightError } from "../errors/CreateFreightError";
import { FreightService } from "../services/FreightService";
import { createFreightValidation } from "../validations/createFreightValidation";

export class FreightController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FreightService);

    await createFreightValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateFreightError.BodyIsInvalid(err);
      });

    const result = await service.create(req.body);

    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FreightService);

    const { enterpriseId } = req.params;

    const result = await service.findAll(enterpriseId);

    return res.json(result);
  }
}
