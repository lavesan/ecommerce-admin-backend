import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddressService } from "../services/AddressService";
import { createAddressValidation } from "../validations/createAddressValidation";
import { updateAddressValidation } from "../validations/updateAddressValidation";
import { UpdateAddressError } from "../errors/UpdateAddressError";
import { CreateAddressError } from "../errors/CreateAddressError";

export class AddressController {
  async create(req: Request, res: Response) {
    const service = container.resolve(AddressService);

    await createAddressValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateAddressError.BodyIsInvalid(err);
      });

    const { client } = req;

    const result = await service.create({ ...req.body, clientId: client.id });

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(AddressService);

    await updateAddressValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateAddressError.BodyIsInvalid(err);
      });

    const { id } = req.params;
    const { client } = req;

    const result = await service.update(id, {
      ...req.body,
      clientId: client.id,
    });

    return res.json(result);
  }

  async updateDefault(req: Request, res: Response) {
    const service = container.resolve(AddressService);

    const { id } = req.params;
    const { client } = req;

    const result = await service.updateDefault(id, { clientId: client.id });

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const service = container.resolve(AddressService);

    const { id } = req.params;

    const { client } = req;

    const result = await service.delete(id, client.id);

    return res.json(result);
  }
}
