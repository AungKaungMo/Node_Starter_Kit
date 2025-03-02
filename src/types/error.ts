import { Response, NextFunction } from "express";
import { AuthenticateRequest } from "./authenticate-request";

export type AsyncType = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;
