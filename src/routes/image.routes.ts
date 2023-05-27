import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { FileStorageController } from "@modules/fileStorage/controller/FileStorageController";

const fileStorageController = new FileStorageController();

const imageRouter = Router();

const upload = multer({
  dest: "public/uploads",
});

imageRouter.get("/base64/:key", fileStorageController.findBase64ByKey);

imageRouter.post(
  "/",
  ensureAuthenticated("dashboard"),
  upload.single("file"),
  fileStorageController.upload
);
imageRouter.delete(
  "/:key",
  ensureAuthenticated("dashboard"),
  fileStorageController.deleteByKey
);

imageRouter.get(
  "/:key",
  ensureAuthenticated("dashboard"),
  fileStorageController.findByKey
);

export { imageRouter };
