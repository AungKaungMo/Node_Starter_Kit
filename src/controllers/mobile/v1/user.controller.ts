import HTTP from "../../../constants/http";
import { updateUserSchema } from "../../../schema/user";
import {
  getAllUser,
  deleteUser,
  getDetailUser,
  updateUser,
} from "../../../services/mobile/v1/user.service";
import { UpdateUserType } from "../../../types/user";
import catchError from "../../../utils/catch-error";
import { RESPONSE } from "../../../utils/response";

export const getAllController = catchError(async (req, res) => {
  const { users } = await getAllUser();

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Get all users.",
    data: users,
  });
});

export const getDetailController = catchError(async (req, res) => {
  const id = req.params.id;
  const { user } = await getDetailUser(id);

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Get user detail.",
    data: user,
  });
});

export const updateController = catchError(async (req, res) => {
  const request = updateUserSchema.parse({
    ...req.body,
  });

  const payload: UpdateUserType = { ...request, userId: req.params.id ?? "" };

  const { user } = await updateUser(payload);
  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "successfully updated the user.",
    data: user,
  });
});

export const deleteController = catchError(async (req, res) => {
  await deleteUser(req.params.id);

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Delete user successfully.",
  });
});
