import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export type MiddlewareParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type MiddlewareErrorParams<T> = (
  err: T,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type MiddlewareSchemaParams = (
  schema: AnyZodObject
) => (req: Request, res: Response, next: NextFunction) => void;
