import { Router, Request, Response } from "express";

import { userRouter } from "./user.routes";
import { categoryRouter } from "./category.routes";
import { productRouter } from "./product.routes";
import { orderRouter } from "./order.routes";
import { clientRouter } from "./client.routes";
import { enterpriseRouter } from "./enterprise.routes";
import { promotionRouter } from "./promotion.routes";
import { freightRouter } from "./freight.routes";
import { imageRouter } from "./image.routes";
import { addressRouter } from "./address.routes";
import { refreshTokenRouter } from "./refreshToken.routes";

const router = Router();

router.get("/health", (req: Request, res: Response) => res.send("Ok"));

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/client", clientRouter);
router.use("/enterprise", enterpriseRouter);
router.use("/promotion", promotionRouter);
router.use("/freight", freightRouter);
router.use("/image", imageRouter);
router.use("/address", addressRouter);
router.use("/refresh-token", refreshTokenRouter);

export { router };
