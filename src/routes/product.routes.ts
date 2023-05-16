import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ProductController } from "@modules/product/controller/ProductController";

const productController = new ProductController();

const productRouter = Router();

productRouter.get("/:id", productController.findById);

productRouter.get("/", ensureAuthenticated, productController.paginate);
productRouter.get(
  "/enterprise/:enterpriseId",
  ensureAuthenticated,
  productController.findManyByEnterpriseId
);
productRouter.post("/", ensureAuthenticated, productController.create);
productRouter.put("/:id", ensureAuthenticated, productController.update);

export { productRouter };
