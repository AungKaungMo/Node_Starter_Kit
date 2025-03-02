import { ErrorRequestHandler, Response } from "express";
import HTTP from "../constants/http";
import { z } from "zod";
import AppError from "../utils/app-error";
import { clearAuthCookie } from "../utils/cookie";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  res.status(HTTP.BAD_REQUEST).json({
    message: error.message,
    errors,
  });
  // return;
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (req.path === "/auth/refresh") {
    clearAuthCookie(res);
  }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  res.status(HTTP.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  return;
};

export default errorHandler;
