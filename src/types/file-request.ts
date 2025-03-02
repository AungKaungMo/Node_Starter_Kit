import { Request } from "express";

/***********************************
    USED WHEN FILE HAS ERROR OR NOT
***********************************/
export interface FileRequest extends Request {
  fileValidationError?: string;
}
