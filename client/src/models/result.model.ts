import { AxiosError } from 'axios';

export enum EResult {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface IBoomError {
  field?: string;
  statusCode: number;
  error: string;
  message: string;
  isBoom: boolean;
}

export interface IErr {
  type: EResult.ERROR;
  value: AxiosError;
}

export interface ISuccess<T> {
  type: EResult.SUCCESS;
  value: T;
}

export type IResult<T> = ISuccess<T> | IErr;
