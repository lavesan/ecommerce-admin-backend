import { Response, Request } from "express";
import { container } from "tsyringe";
import { UserService } from "../service/UserService";

export class UserController {
  async login(request: Request, response: Response) {
    const service = container.resolve(UserService);

    const { email, password } = request.body;

    const data = await service.login({ email, password });

    return response.json(data);
  }
}
