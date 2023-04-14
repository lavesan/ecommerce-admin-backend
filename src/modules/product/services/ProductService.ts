import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { Product } from "../entities/Product";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { ProductRepository } from "../repositories/ProductRepository";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  create(body: ICreateProductRequest) {
    return this.productRepository.create(body);
  }

  update(id: string, body: Partial<Product>) {
    return this.productRepository.update(id, body);
  }

  paginate(pagination: IPaginationRequest, filter: IFindProductsRequest) {
    return this.productRepository.paginate(pagination, filter);
  }

  findById(id: string) {
    return this.productRepository.findById(id);
  }
}
