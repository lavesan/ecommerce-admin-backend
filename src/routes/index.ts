import { Router, Request, Response } from "express";

import { agentsRouter } from "./agents.routes";

const router = Router();

router.get("/healthy", (req: Request, res: Response) => res.send("Ok"));

router.use("/public/agents", agentsRouter);

export { router };
