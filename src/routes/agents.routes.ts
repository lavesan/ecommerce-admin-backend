import { Router } from "express";

import { CreateAgentController } from "@modules/agent/useCases/createAgent/CreateAgentController";
import { UpdateAgentController } from "@modules/agent/useCases/updateAgent/UpdateAgentController";
import { FindAgentController } from "@modules/agent/useCases/findAgent/FindAgentController";
import { FindAllAgentsController } from "@modules/agent/useCases/findAllAgents/FindAllAgentsController";
import { DeleteAgentByLoginController } from "@modules/agent/useCases/deleteAgentByLogin/DeleteAgentByLoginController";
import { DeleteAgentByIdController } from "@modules/agent/useCases/deleteAgentById/DeleteAgentByIdController";
import { ensureAuthenticated } from "@shared/infra/http/middlwares/ensureAuthenticated";

const agentsRouter = Router();

const createAgentController = new CreateAgentController();
const updateAgentController = new UpdateAgentController();
const findAgentController = new FindAgentController();
const findAllAgentsController = new FindAllAgentsController();
const deleteAgentByLoginController = new DeleteAgentByLoginController();
const deleteAgentByIdController = new DeleteAgentByIdController();

agentsRouter.post("/", ensureAuthenticated, createAgentController.execute);
agentsRouter.put("/:id", ensureAuthenticated, updateAgentController.execute);
agentsRouter.get("/:id", ensureAuthenticated, findAgentController.execute);
agentsRouter.get("/", ensureAuthenticated, findAllAgentsController.execute);
agentsRouter.delete(
  "/",
  ensureAuthenticated,
  deleteAgentByLoginController.execute
);
agentsRouter.delete(
  "/:id",
  ensureAuthenticated,
  deleteAgentByIdController.execute
);

export { agentsRouter };
