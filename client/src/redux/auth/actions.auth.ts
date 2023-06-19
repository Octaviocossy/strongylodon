import { useDispatch } from 'react-redux';

import { EResult, IUser, TUserSignin } from '../../models';
import { api } from '../../services';
import { boomErrorValidator } from '../../utilities';

import {
  _handleError,
  _handleStartLogin,
  _handleUserData,
  useAuthSelector,
} from '.';

const useAuth = () => {
  const {} = useAuthSelector();
  const dispatch = useDispatch();

  const onSignin = async (data: TUserSignin) => {
    try {
      dispatch(_handleStartLogin());

      const { type, value } = await api.post<TUserSignin, IUser>(
        '/auth/login',
        data
      );

      if (type === EResult.ERROR)
        return dispatch(_handleError(boomErrorValidator(value)));

      dispatch(_handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      console.log(error.message);
    }
  };

  const onRenewSession = async () => {
    try {
      dispatch(_handleStartLogin());

      const { type, value } = await api.get<IUser>('/auth/renew_session');

      if (type === EResult.ERROR)
        return dispatch(_handleError(boomErrorValidator(value)));

      dispatch(_handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      console.log(error.message);
    }
  };

  return { onSignin, onRenewSession };
};

export default useAuth;
