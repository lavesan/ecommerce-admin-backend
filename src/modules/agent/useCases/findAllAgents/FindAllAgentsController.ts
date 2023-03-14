import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllAgentsUseCase } from "./FindAllAgentsUseCase";

export class FindAllAgentsController {
  async execute(request: Request, response: Response) {
    const findAllAgents = container.resolve(FindAllAgentsUseCase);

    const agents = await findAllAgents.execute();

    return response.status(200).json(agents);
  }
}
