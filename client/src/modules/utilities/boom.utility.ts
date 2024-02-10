import type { AxiosError } from 'axios';
import type { FieldErrors } from 'react-hook-form';
import type { BoomError } from '@/models';

import { EFields } from '@/models';
import { parseEnumToArray } from '@/utilities';

export const boomValidator = (error: AxiosError): BoomError | null => {
  const { response } = error as AxiosError<BoomError>;

  return response?.data.isBoom ? response.data : null;
};

export const parseField = (error: BoomError | null): BoomError | null => {
  if (!error) return error;

  return {
    ...error,
    field: error.message
      .toLocaleLowerCase()
      .split(' ')
      .find((word) => parseEnumToArray(EFields).includes(word)),
  };
};

export const parseError = (error: AxiosError): BoomError | null => {
  return parseField(boomValidator(error));
};

export const handleErrorInput = <T extends object>(field: keyof FieldErrors<T>, error: BoomError | null, errors: FieldErrors<T>) => {
  return error?.field === field ? error : errors[field] && (errors[field] as FieldErrors<T>);
};
