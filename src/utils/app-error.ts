import AppErrorCode from "../constants/app-error-code";
import { HttpStatusCode } from "../constants/http";

/************************************
  FOR ALL ERROR RESPONE, USE THIS
***********************************/
class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
