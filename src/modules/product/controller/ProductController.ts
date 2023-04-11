import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IFindProductsQuery } from "../models/IFindProductsRequest";
import { ProductService } from "../service/ProductService";
// import { CreateAgentError } from "./CreateAgentError";

// import { CreateAgentUseCase } from "./CreateAgentUseCase";
// import { validationSchema } from "./createAgentValitation";

export class ProductController {
  async findProducts(request: Request, response: Response) {
    const service = container.resolve(ProductService);

    const pagination = getPageAndSize(
      request.query as unknown as IFindProductsQuery
    );
    const { name, categoryId } = request.query as unknown as IFindProductsQuery;

    const agent = await service.findProducts(pagination, { name, categoryId });

    return response.json(agent);
  }
}
