import { getPageAndSize } from "@helpers/pagination.helper";
import { Request, Response } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreateOrderError } from "../errors/CreateOrderError";
import { UpdateOrderError } from "../errors/UpdateOrderError";
import { IPaginateOrderRequest } from "../models/IPaginateOrderRequest";
import { OrderService } from "../services/OrderService";
import { createOrderValidation } from "../validations/createOrderValidation";
import { updateOrderValidation } from "../validations/updateOrderValidation";
import { ICreateOrder } from "../models/ICreateOrder";
import { IPaginateMineOrderRequest } from "../models/IPaginateMineOrderRequest";

export class OrderController {
  async create(req: Request, res: Response) {
    const service = container.resolve(OrderService);

    await createOrderValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateOrderError.BodyIsInvalid(err);
      });

    const { client } = req;

    const body = req.body as ICreateOrder;

    const result = await service.create({
      ...body,
      clientId: client.id,
    });

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(OrderService);

    await updateOrderValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateOrderError.BodyIsInvalid(err);
      });

    const { id } = req.params;

    const result = await service.update(id, req.body);

    return res.status(201).json(result);
  }

  async paginate(req: Request, res: Response) {
    const service = container.resolve(OrderService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const {
      finalDate,
      initialDate,
      paymentType,
      status,
      clientId,
      enterpriseId,
    } = req.query as unknown as IPaginateOrderRequest;

    const result = await service.paginate(pagination, {
      finalDate,
      initialDate,
      paymentType,
      status,
      clientId,
      enterpriseId,
    });

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(OrderService);

    const { id } = req.params;

    const result = await service.findById(id);

    return res.json(result);
  }

  async paginateMine(req: Request, res: Response) {
    const service = container.resolve(OrderService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );

    const { id } = req.client;

    const result = await service.paginateMine(pagination, { clientId: id });

    return res.json(result);
  }
}
