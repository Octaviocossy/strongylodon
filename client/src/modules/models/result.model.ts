import type { AxiosError } from 'axios';

export enum EResult {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface BoomError {
  field?: string;
  statusCode: number;
  error: string;
  message: string;
  isBoom: boolean;
}

export interface Err {
  type: EResult.ERROR;
  value: AxiosError;
}

export interface Success<T> {
  type: EResult.SUCCESS;
  value: T;
}

export type IResult<T> = Success<T> | Err;
