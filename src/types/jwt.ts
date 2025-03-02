import { SignOptions } from "jsonwebtoken";

export type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

export type AccessTokenPayload = {
  userId: string;
  sessionId: string;
};

export type RefreshTokenPayload = {
  sessionId: string;
};
