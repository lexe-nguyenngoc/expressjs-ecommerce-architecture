import { NextFunction, Request, Response } from "express";

import configs from "@/configs";
import { ErrorResponse } from "@/core/error.response";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;

  if (error instanceof ErrorResponse) {
    status = error.status;
  }

  res.status(status).json({
    message: error.message,
    stack: configs.isDEV ? error.stack : undefined,
  });
};
