import HTTP from "../../../constants/http";
import {
  getAllSession,
  deleteSession,
} from "../../../services/mobile/v1/session.service";
import catchError from "../../../utils/catch-error";
import { RESPONSE } from "../../../utils/response";

export const getAllController = catchError(async (req, res) => {
  const { sessions } = await getAllSession();

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Get all sessions.",
    data: sessions,
  });
});

export const deleteController = catchError(async (req, res) => {
  const id = req.params.id;
  await deleteSession(id);

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Delete session successfully.",
  });
});
