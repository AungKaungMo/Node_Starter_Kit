import { AsyncType } from "../types/error";

/******************************************************************************
  CATCH FOR EVERY INTERNAL SERVER NO NEED TO USED TRY CATCH IN EVERY FUNCTION
******************************************************************************/
const catchError =
  (controller: AsyncType): AsyncType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      console.log(error, "error");
      next(error);
    }
  };

export default catchError;
