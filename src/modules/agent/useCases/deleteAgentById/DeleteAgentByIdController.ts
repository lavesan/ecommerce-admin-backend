import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAgentByIdUseCase } from "./DeleteAgentByIdUseCase";

export class DeleteAgentByIdController {
  async execute(request: Request, response: Response) {
    const deleteAgentById = container.resolve(DeleteAgentByIdUseCase);

    const { params } = request;

    const feedback = await deleteAgentById.execute(params.id as string);

    return response.status(200).json(feedback);
  }
}
