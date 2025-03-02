import { Response } from "express";

export type ResponseType = {
  res: Response;
  status: "Success" | "Error";
  code: number;
  message: string;
  data?: any;
};
