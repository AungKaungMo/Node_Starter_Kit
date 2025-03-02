import { SignOptions, VerifyOptions } from "jsonwebtoken";
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  SignOptionsAndSecret,
} from "../types/jwt";
import CONFIG from "../config/config";
import jwt from "jsonwebtoken";

const defaults: SignOptions = {
  audience: ["User"],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: CONFIG.jwt_secret,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: CONFIG.jwt_refresh_secret,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & {
    secret?: string;
  }
) => {
  const { secret = CONFIG.jwt_secret, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
