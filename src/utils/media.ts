import path from "path";
import multer, { FileFilterCallback } from "multer";
import { FileRequest } from "../types/file-request";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

export const fileFilter = (
  req: FileRequest,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("REACH");
    cb(null, false);
    req.fileValidationError =
      "Invalid file type. Only JPEG, PNG, and GIF are allowed.";
  }
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
