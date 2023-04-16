import { IPaginationRequest } from "models/pagination.models";
import { inject, injectable } from "tsyringe";
import { ICreateEnterprise } from "../models/ICreateEnterprise";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { IEnterpriseRepository } from "../repositories/IEnterpriseRepository";

@injectable()
export class EnterpriseService {
  constructor(
    @inject("EnterpriseRepository")
    private readonly enterpriseRepository: IEnterpriseRepository
  ) {}

  create(body: ICreateEnterprise) {
    return this.enterpriseRepository.create(body);
  }

  paginate(pagination: IPaginationRequest, filter: IPaginateEnterpriseRequest) {
    return this.enterpriseRepository.paginate(pagination, filter);
  }
}
