import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreateCategoryError } from "../errors/CreateCategoryErrors";
import { UpdateCategoryError } from "../errors/UpdateCategoryError";
import { IPaginateCategoryRequest } from "../models/IPaginateCategoryRequest";
import { CategoryService } from "../services/CategoryService";
import { createCategoryValidations } from "../validations/createCategoryValidations";
import { updateCategoryValidation } from "../validations/updateCategoryValidation";

export class CategoryController {
  async create(req: Request, res: Response) {
    const service = container.resolve(CategoryService);

    await createCategoryValidations
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateCategoryError.BodyIsInvalid(err);
      });

    const result = await service.create(req.body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(CategoryService);

    await updateCategoryValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateCategoryError.BodyIsInvalid(err);
      });

    const { id } = req.params;

    const result = await service.update(id, req.body);

    return res.status(201).json(result);
  }

  async paginate(req: Request, res: Response) {
    const service = container.resolve(CategoryService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const { name, enterpriseId } =
      req.query as unknown as IPaginateCategoryRequest;

    const result = await service.paginate(pagination, { name, enterpriseId });

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(CategoryService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }
}
