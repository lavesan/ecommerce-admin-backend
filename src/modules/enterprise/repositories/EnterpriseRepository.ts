import { getSkipAndTake } from "@helpers/pagination.helper";
import AppDataSource from "@data-source";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@models/pagination.models";
import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { Enterprise } from "../entities/Enterprise";
import { ICreateEnterprise } from "../models/ICreateEnterprise";
import { IPaginateEnterpriseRequest } from "../models/IPaginateEnterpriseRequest";
import { IEnterpriseRepository } from "./IEnterpriseRepository";
import { IUpdateEnterprise } from "../models/IUpdateEnterprise";
import { getWeekDay } from "@helpers/date.helper";
import { container } from "tsyringe";
import { OrderService } from "@modules/order/services/OrderService";
import {
  IFormattedEnterpriseData,
  IPaginateEnterpriseResponse,
} from "../models/IPaginateEnterpriseResponse";

export class EnterpriseRepository implements IEnterpriseRepository {
  private readonly repository: Repository<Enterprise>;

  constructor() {
    this.repository = AppDataSource.getRepository(Enterprise);
  }

  async create(body: ICreateEnterprise): Promise<Enterprise> {
    const enterprise = this.repository.create(body);
    await this.repository.save(enterprise);
    return enterprise;
  }

  async update(id: string, body: IUpdateEnterprise): Promise<boolean> {
    const parsedBody = {
      id,
      ...body,
    };
    //@ts-ignore
    await this.repository.save(parsedBody);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const enterprise = await this.repository.findOneOrFail({
      where: { id },
      relations: [
        "categories",
        "categories.products",
        "categories.products.productAdditionalCategory",
        "categories.products.productAdditionalCategory.productAdditionals",
        "promotions",
        "freights",
        "schedules",
      ],
    });

    await this.repository.softDelete(enterprise);
    return true;
  }

  findById(id: string): Promise<Enterprise> {
    return this.repository.findOne({
      where: { id },
      relations: ["users", "freights", "schedules"],
    });
  }

  findMenuById(id: string): Promise<Enterprise> {
    const weekDay = getWeekDay();

    return this.repository.findOne({
      where: {
        id,
        // categories: {
        //   isDisabled: false,
        //   products: {
        //     isDisabled: false,
        //     productAdditionalCategory: {
        //       isDisabled: false,
        //       productAdditionals: { isDisabled: false },
        //     },
        //   },
        // },
        // promotions: {
        //   weekDay,
        //   isDisabled: false,
        //   promotionProducts: { product: { isDisabled: false } },
        // },
      },
      relations: [
        "categories",
        "categories.products",
        "categories.products.productAdditionalCategory",
        "categories.products.productAdditionalCategory.productAdditionals",
        "promotions",
        "promotions.promotionProducts",
        "promotions.promotionProducts.product",
        "freights",
        "schedules",
      ],
    });
  }

  async paginate(
    pagination: IPaginationRequest,
    { cnpj, name, userId }: IPaginateEnterpriseRequest
  ): Promise<IPaginateEnterpriseResponse> {
    const orderService = container.resolve(OrderService);

    const paginationData = getSkipAndTake(pagination);

    let where: FindOptionsWhere<Enterprise> = {};

    if (name) where.name = ILike(`%${name}%`);
    if (cnpj) where.cnpj = ILike(`%${cnpj}%`);
    if (userId) where.users = { id: userId };

    const [data, count] = await this.repository.findAndCount({
      order: {
        created_at: "DESC",
      },
      where,
      relations: ["users"],
      ...paginationData,
    });

    const formattedData: IFormattedEnterpriseData[] = await Promise.all(
      data.map((row) => {
        return new Promise<IFormattedEnterpriseData>(
          async (resolve, reject) => {
            const openOrdersCount =
              await orderService.activeOrdersFromEnterpriseCount(row.id);

            resolve({
              ...row,
              openOrdersCount: openOrdersCount.count,
            });
          }
        );
      })
    );

    return {
      data: formattedData,
      count,
      ...pagination,
    };
  }

  findAll({ name, cnpj }: IPaginateEnterpriseRequest): Promise<Enterprise[]> {
    let where: FindOptionsWhere<Enterprise> = {};

    if (name) where.name = ILike(`%${name}%`);
    if (cnpj) where.cnpj = ILike(`%${cnpj}%`);

    return this.repository.find({
      order: {
        created_at: "DESC",
      },
      relations: ["schedules"],
    });
  }

  findAllWithProducts(): Promise<Enterprise[]> {
    return this.repository.find({
      relations: ["categories", "categories.products"],
    });
  }
}
