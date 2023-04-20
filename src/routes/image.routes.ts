import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { FileStorageController } from "@modules/fileStorage/controller/FileStorageController";

const fileStorageController = new FileStorageController();

const imageRouter = Router();

const upload = multer({
  dest: "public/uploads",
});

imageRouter.post(
  "/",
  ensureAuthenticated,
  upload.single("file"),
  fileStorageController.upload
);
imageRouter.delete(
  "/:key",
  ensureAuthenticated,
  fileStorageController.deleteByKey
);

imageRouter.get("/:key", fileStorageController.findByKey);

export { imageRouter };
