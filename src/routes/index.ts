import { Router, Request, Response } from "express";

import { userRouter } from "./user.routes";
import { categoryRouter } from "./category.routes";
import { productRouter } from "./product.routes";

const router = Router();

router.get("/healthy", (req: Request, res: Response) => res.send("Ok"));

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

export { router };
