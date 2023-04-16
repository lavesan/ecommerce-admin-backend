import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { UserController } from "@modules/user/controller/UserController";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/", userController.create);
userRouter.get("/:id", userController.findById);
userRouter.get("/", userController.paginate);

export { userRouter };
