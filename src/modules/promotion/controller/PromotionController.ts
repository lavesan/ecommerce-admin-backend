import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreatePromotionError } from "../errors/CreatePromotionError";
import { IPaginatePromotion } from "../models/IPaginatePromotion";
import { PromotionService } from "../services/PromotionService";
import { createPromotionValidation } from "../validations/createPromotionValidation";

export class PromotionController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(PromotionService);

    await createPromotionValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreatePromotionError.BodyIsInvalid(err);
      });

    const result = await service.create(req.body);

    return res.status(201).json(result);
  }

  async paginate(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(PromotionService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const { name, enterpriseId, weekDay } =
      req.query as unknown as IPaginatePromotion;

    const result = await service.paginate(pagination, {
      name,
      enterpriseId,
      weekDay,
    });

    return res.json(result);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(PromotionService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }
}
