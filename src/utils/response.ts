import { ResponseType } from "../types/response";

export const RESPONSE = ({
  res,
  status,
  code,
  message,
  data,
}: ResponseType) => {
  return res.status(code).json({
    status,
    message,
    code,
    ...(data && { data }),
  });
};
