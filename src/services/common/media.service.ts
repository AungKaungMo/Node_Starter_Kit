import { Request } from "express";
import AppError from "../../utils/app-error";
import HTTP from "../../constants/http";
import prisma from "../../prisma/client";
import path from "path";
import fs from "fs";

export const uploadFile = async (req: Request) => {
  if (!req.file) {
    throw new AppError(HTTP.BAD_REQUEST, "No file uploaded.");
  }

  const { filename, mimetype, size, path } = req.file;

  const file = await prisma.media.create({
    data: {
      file_name: filename,
      file_path: path,
      file_size: size,
      file_type: mimetype,
    },
  });

  return { file };
};

export const deleteFile = async (id: string) => {
  if (!id) {
    throw new AppError(HTTP.NOT_FOUND, "Id Not found.");
  }

  const media = await prisma.media.findFirst({ where: { id } });

  if (!media)
    throw new AppError(HTTP.NOT_FOUND, "Media not found with that id.");

  /********************************************************************************
  We already declare folder name in DB , so we only need to locate its path way
********************************************************************************/

  const filePath = path.join(__dirname, "../../../", media.file_path);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await prisma.media.delete({ where: { id } });

  return;
};
