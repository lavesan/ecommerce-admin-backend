import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAgentError } from "./CreateAgentError";

import { CreateAgentUseCase } from "./CreateAgentUseCase";
import { validationSchema } from "./createAgentValitation";

export class CreateAgentController {
  async execute(request: Request, response: Response) {
    const createAgent = container.resolve(CreateAgentUseCase);

    const { domain } = request.user;

    await validationSchema
      .validate(request.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateAgentError.BodyIsInvalid(err);
      });

    const agent = await createAgent.execute({
      ...request.body,
      domain,
    });

    return response.status(201).json(agent);
  }
}
