import { Request } from "express";
import HTTP from "../../constants/http";
import prisma from "../../prisma/client";
import {
  ChangePasswordType,
  CreateAccountType,
  LoginAccountType,
} from "../../types/auth";
import AppError from "../../utils/app-error";
import {
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../../utils/jwt";
import { hashPassword, verifyPassword } from "../../utils/password";
import { RefreshTokenPayload } from "../../types/jwt";
import { oneDay, oneMonth } from "../../utils/date";

export const createAccount = async (data: CreateAccountType) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError(HTTP.UNPROCESSABLE_CONTENT, "Email already in use.");
  }

  const password = await hashPassword(data.password);
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 30);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: String(password),
    },
  });

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: data.userAgent,
      expiredAt: expiredAt,
    },
  });

  const refreshToken = signToken(
    {
      sessionId: session.id,
    },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId: user.id,
    sessionId: session.id,
  });

  const { password: _password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const loginAccount = async ({
  email,
  password,
  userAgent,
}: LoginAccountType) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(HTTP.UNAUTHORIZED, "Invalid email.");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new AppError(HTTP.UNAUTHORIZED, "Invalid password.");
  }

  const userId: string = user.id;
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 30);

  let session;

  const oldSession = await prisma.session.findFirst({
    where: {
      userId: userId,
      userAgent: userAgent,
    },
  });

  if (!oldSession) {
    session = await prisma.session.create({
      data: {
        userId,
        userAgent,
        expiredAt,
      },
    });
  } else {
    session = await prisma.session.update({
      where: { id: oldSession.id },
      data: { expiredAt },
    });
  }

  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({ userId: user.id, sessionId: session.id });

  const { password: _password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const logoutAccount = async (req: Request) => {
  const accessToken = req.cookies?.accessToken || "";
  const { payload } = verifyToken(accessToken);

  if (payload) {
    await prisma.session.delete({
      where: {
        id: payload.sessionId,
      },
    });
  } else {
    throw new AppError(HTTP.BAD_REQUEST, "Something went wrong.");
  }
};

export const refreshTokenAccount = async (req: Request) => {
  const refreshToken = req.cookies?.refreshToken || "";
  if (!refreshToken) {
    throw new AppError(HTTP.UNAUTHORIZED, "Missing refresh token.");
  }

  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  if (!payload) {
    throw new AppError(HTTP.UNAUTHORIZED, "Invalid refresh token.");
  }

  const session = await prisma.session.findFirst({
    where: {
      id: payload.sessionId,
    },
  });

  const currentDate = Date.now();
  if (!session || session.expiredAt.getTime() < currentDate) {
    throw new AppError(HTTP.UNAUTHORIZED, "Session expired.");
  }

  const OneDay = session.expiredAt.getTime() - oneDay();

  const refreshSession = session.expiredAt.getTime() - currentDate <= OneDay;
  if (refreshSession) {
    await prisma.session.update({
      where: { id: payload.sessionId },
      data: { expiredAt: oneMonth() },
    });
  }

  const newRefreshSession = refreshSession
    ? signToken(
        {
          sessionId: session.id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session.id,
  });

  return {
    accessToken,
    newRefreshSession,
  };
};

export const changePassword = async ({
  userId,
  newPassword,
  currentPassword,
}: ChangePasswordType) => {
  if (!userId) {
    throw new AppError(HTTP.UNAUTHORIZED, "Session expired.");
  }

  const currentUser = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!currentUser) {
    throw new AppError(HTTP.NOT_FOUND, "User not found with that id.");
  }

  const isValid = await verifyPassword(currentPassword, currentUser.password);

  if (!isValid) {
    throw new AppError(HTTP.NOT_FOUND, "Password incorrect.");
  }

  const newHashPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: newHashPassword,
    },
  });

  return;
};
