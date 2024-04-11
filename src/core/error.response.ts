import { ReasonPhrases, StatusCode } from "@/constants";

export class ErrorResponse extends Error {
  private _status: StatusCode;

  constructor(message: string, status: StatusCode) {
    super(message);
    this._status = status;
  }

  get status(): StatusCode {
    return this._status;
  }
}
export class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(message, StatusCode.FORBIDDEN);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCode.NOT_FOUND);
  }
}

export class ConflictError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.CONFLICT) {
    super(message, StatusCode.CONFLICT);
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}

export class ServiceUnavailableError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.SERVICE_UNAVAILABLE) {
    super(message, StatusCode.SERVICE_UNAVAILABLE);
  }
}
