import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CategoryController } from "@modules/product/controller/CategoryController";

const categoryController = new CategoryController();

const categoryRouter = Router();

categoryRouter.get("/", categoryController.paginate);
categoryRouter.get("/:id", categoryController.findById);
categoryRouter.post("/", categoryController.create);
categoryRouter.put("/:id", categoryController.update);

export { categoryRouter };
