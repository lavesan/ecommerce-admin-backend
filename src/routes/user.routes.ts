import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { UserController } from "@modules/user/controller/UserController";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/", ensureAuthenticated, userController.create);
userRouter.put("/:id", ensureAuthenticated, userController.update);
userRouter.get("/:id", ensureAuthenticated, userController.findById);
userRouter.get("/", ensureAuthenticated, userController.paginate);

export { userRouter };
