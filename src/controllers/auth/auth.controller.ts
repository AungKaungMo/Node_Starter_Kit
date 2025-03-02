import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../../schema/auth";
import catchError from "../../utils/catch-error";
import {
  changePassword,
  createAccount,
  loginAccount,
  logoutAccount,
  refreshTokenAccount,
} from "../../services/auth/auth.service";
import HTTP from "../../constants/http";
import {
  clearAuthCookie,
  getAccessTokenCookie,
  getRefreshTokenCookie,
  setAuthCookie,
} from "../../utils/cookie";
import { ChangePasswordType } from "../../types/auth";
import { RESPONSE } from "../../utils/response";

export const registerController = catchError(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookie({ res, accessToken, refreshToken })
    .status(HTTP.CREATED)
    .json({
      status: "success",
      code: HTTP.CREATED,
      data: user,
    });
});

export const loginController = catchError(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginAccount(request);

  return setAuthCookie({ res, accessToken, refreshToken })
    .status(HTTP.OK)
    .json({
      status: "success",
      code: HTTP.OK,
      message: "Login successfully.",
    });
});

export const logoutController = catchError(async (req, res) => {
  await logoutAccount(req);

  return clearAuthCookie(res).status(HTTP.OK).json({
    status: "success",
    code: HTTP.OK,
    message: "Logout successful.",
  });
});

export const refreshController = catchError(async (req, res) => {
  const { accessToken, newRefreshSession } = await refreshTokenAccount(req);
  if (newRefreshSession) {
    res.cookie("refreshToken", newRefreshSession, getRefreshTokenCookie());
  }

  return res
    .status(HTTP.OK)
    .cookie("accessToken", accessToken, getAccessTokenCookie())
    .json({
      status: "success",
      code: HTTP.OK,
      message: "Access token refreshed",
    });
});

export const changePasswordController = catchError(async (req, res) => {
  const request = changePasswordSchema.parse({
    ...req.body,
  });

  const payload: ChangePasswordType = { ...request, userId: req.userId ?? "" };

  await changePassword(payload);

  return RESPONSE({
    res,
    status: "Success",
    code: HTTP.OK,
    message: "Password changed successfully.",
  });
});
