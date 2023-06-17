import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export type TMiddlewareParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type TMiddlewareErrorParams<T> = (
  err: T,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type TMiddlewareSchemaParams = (
  schema: AnyZodObject
) => (req: Request, res: Response, next: NextFunction) => void;
