import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAgentUseCase } from "./CreateAgentUseCase";

export class CreateAgentController {
  async execute(request: Request, response: Response) {
    const createAgent = container.resolve(CreateAgentUseCase);

    const domain = request.get("host");

    await createAgent.execute({
      ...request.body,
      domain,
    });

    return response.status(201).send();
  }
}
