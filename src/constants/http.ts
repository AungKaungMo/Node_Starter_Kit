const HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUEST: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export type HttpStatusCode =
  | typeof HTTP.OK
  | typeof HTTP.CREATED
  | typeof HTTP.BAD_REQUEST
  | typeof HTTP.UNAUTHORIZED
  | typeof HTTP.FORBIDDEN
  | typeof HTTP.NOT_FOUND
  | typeof HTTP.CONFLICT
  | typeof HTTP.UNPROCESSABLE_CONTENT
  | typeof HTTP.TOO_MANY_REQUEST
  | typeof HTTP.INTERNAL_SERVER_ERROR;

export default HTTP;
