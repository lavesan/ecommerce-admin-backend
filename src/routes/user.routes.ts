import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { UserController } from "@modules/user/controller/UserController";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/login", userController.login);

userRouter.post("/", ensureAuthenticated("dashboard"), userController.create);
userRouter.put("/:id", ensureAuthenticated("dashboard"), userController.update);
userRouter.get(
  "/:id",
  ensureAuthenticated("dashboard"),
  userController.findById
);
userRouter.get("/", ensureAuthenticated("dashboard"), userController.paginate);

export { userRouter };
