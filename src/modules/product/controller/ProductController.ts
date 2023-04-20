import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsQuery } from "../models/IFindProductsRequest";
import { ProductService } from "../services/ProductService";
import { createProductValidation } from "../validations/createProductValidation";
import { CreateProductError } from "../errors/CreateProductError";
import { IUpdateProductRequest } from "../models/IUpdateProductRequest";
import { updateProductValidation } from "../validations/updateProductValidation";
import { UpdateProductError } from "../errors/UpdateProductError";

export class ProductController {
  async create(req: Request, res: Response) {
    const service = container.resolve(ProductService);

    await createProductValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateProductError.BodyIsInvalid(err);
      });

    const body = req.body as ICreateProductRequest;

    const result = await service.create(body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(ProductService);

    await updateProductValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateProductError.BodyIsInvalid(err);
      });

    const { id } = req.params;

    const result = await service.update(
      id,
      req.body as Partial<IUpdateProductRequest>
    );

    return res.json(result);
  }

  async paginate(req: Request, res: Response) {
    const service = container.resolve(ProductService);

    const pagination = getPageAndSize(
      req.query as unknown as IFindProductsQuery
    );
    const { name, categoryId } = req.query as unknown as IFindProductsQuery;

    const result = await service.paginate(pagination, { name, categoryId });

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(ProductService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }
}
