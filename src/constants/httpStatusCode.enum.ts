export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum ReasonPhrases {
  OK = "OK",
  CREATED = "Created",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not Found",
  CONFLICT = "Conflict",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  SERVICE_UNAVAILABLE = "Service Unavailable",
}
