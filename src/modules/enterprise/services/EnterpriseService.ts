import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { ICreateEnterprise } from "../models/ICreateEnterprise";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { IEnterpriseRepository } from "../repositories/IEnterpriseRepository";
import { IUpdateEnterprise } from "../models/IUpdateEnterprise";

@injectable()
export class EnterpriseService {
  constructor(
    @inject("EnterpriseRepository")
    private readonly enterpriseRepository: IEnterpriseRepository
  ) {}

  create(body: ICreateEnterprise) {
    return this.enterpriseRepository.create(body);
  }

  update(id: string, body: IUpdateEnterprise) {
    return this.enterpriseRepository.update(id, body);
  }

  delete(id: string) {
    return this.enterpriseRepository.delete(id);
  }

  findById(id: string) {
    return this.enterpriseRepository.findById(id);
  }

  findMenuById(id: string) {
    return this.enterpriseRepository.findMenuById(id);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginateEnterpriseRequest) {
    return this.enterpriseRepository.paginate(pagination, filter);
  }

  findAll(filter: IPaginateEnterpriseRequest) {
    return this.enterpriseRepository.findAll(filter);
  }

  findAllWithProducts() {
    return this.enterpriseRepository.findAllWithProducts();
  }
}
