import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAgentUseCase } from "./FindAgentUseCase";

export class FindAgentController {
  async execute(request: Request, response: Response) {
    const findAgent = container.resolve(FindAgentUseCase);
    const { id } = request.params;

    const agent = await findAgent.execute(id);

    return response.status(200).json(agent);
  }
}
