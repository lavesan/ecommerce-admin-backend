import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlwares/ensureAuthenticated";
import { ProductController } from "@modules/product/controller/ProductController";

const productController = new ProductController();

const productRouter = Router();

productRouter.get("/", ensureAuthenticated, productController.findProducts);

export { productRouter };
