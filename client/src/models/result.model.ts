import { AxiosError } from 'axios';

export interface IBoomError {
  statusCode: number;
  error: string;
  message: string;
}

export interface IBoomErr {
  type: EResult.BOOM_ERROR;
  value: IBoomError;
}

export interface IErr {
  type: EResult.ERROR;
  value: AxiosError;
}

export interface ISuccess<T> {
  type: EResult.SUCCESS;
  value: T;
}

export interface IMessage {
  msg: string;
}

export type IResult<T> = ISuccess<T> | IErr | IBoomErr;

export enum EResult {
  ERROR = 'error',
  BOOM_ERROR = 'boom_error',
  SUCCESS = 'success',
}
