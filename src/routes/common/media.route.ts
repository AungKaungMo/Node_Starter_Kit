import { Router } from "express";
import {
  deleteFileController,
  uploadFileController,
} from "../../controllers/common/media.controller";
import multer from "multer";
import { storage, fileFilter } from "../../utils/media";

const mediaRoute = Router();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

mediaRoute.post("/file/upload", upload.single("file"), uploadFileController);
mediaRoute.delete("/file/:id", deleteFileController);

export default mediaRoute;
