import { Request } from "express";

/***************************************************************
        USE THIS REQUEST WHEN U WANT TO GET USERID AND SESSIONID
    *****************************************************************/

export interface AuthenticateRequest extends Request {
  userId?: string;
  sessionId?: string;
}
