export interface Err {
  type: 'error';
  value: Error;
}

export interface Success<T> {
  type: 'success';
  value: T;
}

export type Result<T> = Success<T> | Err;

export enum EResult {
  ERROR = 'error',
  SUCCESS = 'success',
}
