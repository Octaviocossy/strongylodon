import { AxiosError } from 'axios';
import { FieldErrors } from 'react-hook-form';

import { EFields, IBoomError } from '../models';

import { parseEnumToArray } from '.';

export const boomValidator = (error: AxiosError): IBoomError | null => {
  const { response } = error as AxiosError<IBoomError>;

  return response?.data?.isBoom ? response.data : null;
};

export const parseField = (error: IBoomError | null): IBoomError | null => {
  if (!error) return error;

  return {
    ...error,
    field: error.message
      .toLocaleLowerCase()
      .split(' ')
      .find((word) => parseEnumToArray(EFields).includes(word)),
  };
};

export const parseError = (error: AxiosError): IBoomError | null => {
  return parseField(boomValidator(error));
};

export const handleErrorInput = <T extends Object>(
  field: keyof FieldErrors<T>,
  error: IBoomError | null,
  errors: FieldErrors<T>
) => {
  return error?.field === field
    ? error
    : errors[field] && (errors[field] as FieldErrors<T>);
};
