import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlwares/ensureAuthenticated";
import { FreightController } from "@modules/freight/controller/FreightController";

const freightController = new FreightController();

const freightRouter = Router();

freightRouter.post("/", freightController.create);
freightRouter.get("/all/:enterpriseId", freightController.findAll);

export { freightRouter };
