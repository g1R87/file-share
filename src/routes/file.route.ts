import { Router } from "express";
import { upload } from "../middlewares/upload";

import * as fileController from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.get("/", fileController.getPage);

fileRouter.post("/upload", upload.single("file"), fileController.uploadFile);

fileRouter.get("/file/:id", fileController.downloadFile);
fileRouter.post("/file/:id", fileController.downloadFile);

export default fileRouter;
