import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsQuery } from "../models/IFindProductsRequest";
import { ProductService } from "../services/ProductService";
// import { CreateAgentError } from "./CreateAgentError";

// import { CreateAgentUseCase } from "./CreateAgentUseCase";
// import { validationSchema } from "./createAgentValitation";

export class ProductController {
  async create(req: Request, res: Response) {
    const service = container.resolve(ProductService);

    const body = req.body as ICreateProductRequest;

    const result = await service.create(body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(ProductService);

    const { id } = req.params;

    const result = await service.update(id, req.body);

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
