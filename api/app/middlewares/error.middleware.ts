import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { Output } from '@hapi/boom';
import { ZodError } from 'zod';

export interface BoomError extends ErrorRequestHandler {
  isBoom: boolean;
  output: Output;
}

export const boomErrorHandler = (
  err: BoomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isBoom) {
    const { output } = err;

    return res.status(output.statusCode).json(output.payload);
  }

  return next(err);
};

export const zodErrorHandler = (
  err: ZodError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json(
      err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }))
    );
  }

  return next(err);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(500).json({ msg: err.message, stack: err.stack });
};
