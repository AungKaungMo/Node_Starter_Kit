import { CookieOptions, Response } from "express";
import CONFIG from "../config/config";
import { oneMonth, tenMinute } from "./date";
import { SessionParamsType } from "../types/auth";

const secure = CONFIG.origin !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export const getAccessTokenCookie = (): CookieOptions => ({
  ...defaults,
  expires: tenMinute(),
});

export const getRefreshTokenCookie = (): CookieOptions => ({
  ...defaults,
  expires: oneMonth(),
  path: "/auth/refresh",
});

export const setAuthCookie = ({
  res,
  accessToken,
  refreshToken,
}: SessionParamsType) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookie())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookie());

export const clearAuthCookie = (res: Response) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: "/auth/refresh",
  });
};
