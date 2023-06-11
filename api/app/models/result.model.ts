export interface IErr {
  type: 'error';
  value: Error;
}

export interface ISuccess<T> {
  type: 'success';
  value: T;
}

export type TResult<T> = ISuccess<T> | IErr;

export enum EResult {
  ERROR = 'error',
  SUCCESS = 'success',
}
