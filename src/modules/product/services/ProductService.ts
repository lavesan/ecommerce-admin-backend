import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { ICreateProductRequest } from "../models/ICreateProductRequest";
import { IFindProductsRequest } from "../models/IFindProductsRequest";
import { IUpdateProductRequest } from "../models/IUpdateProductRequest";
import { IProductRepository } from "../repositories/IProductRepository";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: IProductRepository
  ) {}

  create(body: ICreateProductRequest) {
    return this.productRepository.create(body);
  }

  update(id: string, body: Partial<IUpdateProductRequest>) {
    return this.productRepository.update(id, body);
  }

  paginate(pagination: IPaginationRequest, filter: IFindProductsRequest) {
    return this.productRepository.paginate(pagination, filter);
  }

  findById(id: string) {
    return this.productRepository.findById(id);
  }

  findManyByEnterpriseId(enterpriseId: string) {
    return this.productRepository.findManyByEnterpriseID(enterpriseId);
  }
}
