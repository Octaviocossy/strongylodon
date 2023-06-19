import { AxiosError } from 'axios';

import { IBoomError } from '../models';

export const boomErrorValidator = (error: AxiosError) => {
  const { response } = error as AxiosError<IBoomError>;

  return response?.data?.isBoom ? response.data : null;
};
