import { Statistics, Users } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: Users & {
        Statistics: Statistics[];
      };
      message?: string;
    }
  }
}

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
