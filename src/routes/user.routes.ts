import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlwares/ensureAuthenticated";
import { UserController } from "@modules/user/controller/UserController";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/login", userController.login);

export { userRouter };
