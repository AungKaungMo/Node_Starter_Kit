import HTTP from "../../constants/http";
import prisma from "../../prisma/client";
import { deleteFile, uploadFile } from "../../services/common/media.service";
import { FileRequest } from "../../types/file-request";
import AppError from "../../utils/app-error";
import catchError from "../../utils/catch-error";
import { RESPONSE } from "../../utils/response";

export const uploadFileController = catchError(
  async (req: FileRequest, res) => {
    if (req.fileValidationError) {
      throw new AppError(HTTP.BAD_REQUEST, req.fileValidationError);
    }

    const { file } = await uploadFile(req);

    return RESPONSE({
      res,
      status: "Success",
      code: HTTP.OK,
      message: "Successfully uploaded the file.",
      data: file,
    });
  }
);

export const deleteFileController = catchError(async (req, res) => {
  await deleteFile(req.params.id);

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Successfully deleted the file.",
  });
});
