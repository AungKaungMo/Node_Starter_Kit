import { RequestHandler } from "express";
import HTTP from "../constants/http";
import { verifyToken } from "../utils/jwt";
import AppError from "../utils/app-error";
import { AuthenticateRequest } from "../types/authenticate-request";

const authenticate: RequestHandler = (req: AuthenticateRequest, res, next) => {
  const accessToken = req.cookies?.accessToken as string | undefined;
  if (!accessToken) {
    throw new AppError(HTTP.UNAUTHORIZED, "User is not authorized.");
  }

  const { error, payload } = verifyToken(accessToken);
  if (!payload) {
    throw new AppError(
      HTTP.UNAUTHORIZED,
      error === "jwt expired" ? "Token expired" : "Invalid token."
    );
  }

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
