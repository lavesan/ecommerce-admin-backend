import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { ProductRepository } from "../repositories/ProductRepository";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  findProducts(pagination: IPaginationRequest, filter: IFindProductsRequest) {
    return this.productRepository.findProducts(pagination, filter);
  }
}
