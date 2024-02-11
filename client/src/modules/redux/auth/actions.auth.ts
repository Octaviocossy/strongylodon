import type { TUserSignin, User } from '@/models';

import { useDispatch } from 'react-redux';

import { parseError } from '@/utilities';
import * as Redux from '@/redux';
import { EResult } from '@/models';
import { api } from '@/services';

export const useAuth = () => {
  const dispatch = useDispatch();

  const onSignIn = async (data: TUserSignin) => {
    dispatch(Redux._handleStartAuth());

    const { type, value } = await api.post<TUserSignin, User>('/auth/login', data);

    if (type === EResult.ERROR) return dispatch(Redux._handleError(parseError(value)));

    dispatch(Redux._handleUserData(value));
  };

  return { onSignIn };
};
