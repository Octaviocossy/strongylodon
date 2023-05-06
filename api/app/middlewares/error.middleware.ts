import { ErrorRequestHandler } from 'express';
import { Output } from '@hapi/boom';
import { ZodError } from 'zod';

import { MiddlewareErrorParams } from '../models';

export interface BoomError extends ErrorRequestHandler {
  isBoom: boolean;
  output: Output;
}

export const boomErrorHandler: MiddlewareErrorParams<BoomError> = (
  err,
  _req,
  res,
  next
) => {
  if (err.isBoom) {
    const { output } = err;

    return res.status(output.statusCode).json(output.payload);
  }

  return next(err);
};

export const zodErrorHandler: MiddlewareErrorParams<ZodError> = (
  err,
  _req,
  res,
  next
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

export const errorHandler: MiddlewareErrorParams<Error> = (
  err,
  _req,
  res,
  _next
) => {
  return res.status(500).json({ msg: err.message, stack: err.stack });
};
