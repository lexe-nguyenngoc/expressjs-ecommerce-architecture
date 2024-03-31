const { ReasonPhrases, StatusCodes } = require("./httpStatusCode");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT, status = StatusCodes.CONFLICT) {
    super(message, status);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.CONFLICT,
    status = StatusCodes.FORBIDDEN
  ) {
    super(message, status);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
};