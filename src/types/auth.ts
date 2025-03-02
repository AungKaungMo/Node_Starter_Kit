import { Response } from "express";

export type CreateAccountType = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  userAgent?: string;
};

export type SessionParamsType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export type LoginAccountType = {
  email: string;
  password: string;
  userAgent?: string;
};

export type ChangePasswordType = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};
