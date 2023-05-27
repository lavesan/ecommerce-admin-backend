import { getPageAndSize } from "@helpers/pagination.helper";
import { Response, Request } from "express";
import { IPaginationRequest } from "models/pagination.models";
import { container } from "tsyringe";
import { CreateUserError } from "../errors/CreateUserError";
import { LoginUserError } from "../errors/LoginUserError";
import { ICreateUserRequest } from "../models/ICreateUserRequest";
import { IPaginateUser } from "../models/IPaginateUser";
import { UserService } from "../service/UserService";
import { createUserValidation } from "../validations/createUserValidation";
import { loginUserValidation } from "../validations/loginUserValidation";
import { updateUserValidation } from "../validations/updateUserValidation";
import { UpdateUserError } from "../errors/UpdateUserError";
import { IUpdateUserRequest } from "../models/IUpdateUserRequest";

export class UserController {
  async login(req: Request, res: Response) {
    const service = container.resolve(UserService);

    await loginUserValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new LoginUserError.BodyIsInvalid(err);
      });

    const { email, password } = req.body;

    const data = await service.login({ email, password });

    res.cookie("token", data.accessToken, { httpOnly: true });

    return res.json(data);
  }

  async create(req: Request, res: Response) {
    const service = container.resolve(UserService);

    await createUserValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new CreateUserError.BodyIsInvalid(err);
      });

    const { email, isAdmin, name, password, enterpriseId } =
      req.body as ICreateUserRequest;

    const data = await service.create({
      email,
      isAdmin,
      name,
      password,
      enterpriseId,
    });

    return res.json(data);
  }

  async update(req: Request, res: Response) {
    const service = container.resolve(UserService);

    await updateUserValidation
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        throw new UpdateUserError.BodyIsInvalid(err);
      });

    const { id } = req.params;
    const { email, isAdmin, name, password, enterpriseId } =
      req.body as IUpdateUserRequest;

    const data = await service.update(id, {
      email,
      isAdmin,
      name,
      password,
      enterpriseId,
    });

    return res.json(data);
  }

  async findById(req: Request, res: Response) {
    const service = container.resolve(UserService);

    const { id } = req.params;

    const data = await service.findById(id);

    return res.json(data);
  }

  async paginate(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UserService);

    const pagination = getPageAndSize(
      req.query as unknown as IPaginationRequest
    );
    const { name, email } = req.query as unknown as IPaginateUser;

    const result = await service.paginate(pagination, {
      name,
      email,
    });

    return res.json(result);
  }
}
