import { AxiosError } from 'axios';

export interface ICustomError {
  statusCode: number;
  error: string;
  message: string;
}

export interface ICustomErr {
  type: EResult.CUSTOM_ERR;
  value: ICustomError;
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

export type IResult<T> = ISuccess<T> | IErr | ICustomErr;

export enum EResult {
  ERROR = 'error',
  CUSTOM_ERR = 'custom_error',
  SUCCESS = 'success',
}
