import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAgentError } from "./UpdateAgentError";

import { UpdateAgentUseCase } from "./UpdateAgentUseCase";
import { validationSchema } from "./updateAgentValidation";

export class UpdateAgentController {
  async execute(request: Request, response: Response) {
    const updateAgent = container.resolve(UpdateAgentUseCase);
    const { id } = request.params;

    await validationSchema
      .validate(request.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateAgentError.BodyIsInvalid(err);
      });

    const agent = await updateAgent.execute(id, request.body);

    return response.status(200).json(agent);
  }
}
