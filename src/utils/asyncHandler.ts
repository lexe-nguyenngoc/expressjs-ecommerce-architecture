import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  <T>(fn: (req: T, res: Response, next: NextFunction) => Promise<any>) =>
  (req: T, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
