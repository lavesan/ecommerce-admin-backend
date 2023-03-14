import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAgentByLoginError } from "./DeleteAgentByLoginError";

import { DeleteAgentByLoginUseCase } from "./DeleteAgentByLoginUseCase";
import { validationSchema } from "./deleteAgentByLoginValitation";

export class DeleteAgentByLoginController {
  async execute(request: Request, response: Response) {
    const deleteAgentByLogin = container.resolve(DeleteAgentByLoginUseCase);

    const { query } = request;

    await validationSchema
      .validate(query, { abortEarly: false })
      .catch((err) => {
        throw new DeleteAgentByLoginError.BodyIsInvalid(err);
      });

    const feedback = await deleteAgentByLogin.execute(query.login as string);

    return response.status(200).json(feedback);
  }
}
