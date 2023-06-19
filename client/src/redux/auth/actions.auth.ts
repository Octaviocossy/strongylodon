import { useDispatch } from 'react-redux';

import { EResult, IUser, TUserSignin } from '../../models';
import { api } from '../../services';
import { boomErrorValidator } from '../../utilities';

import {
  _handleError,
  _handleStartLogin,
  _handleUserData,
  // useAuthSelector,
} from '.';

const useAuth = () => {
  // const {} = useAuthSelector();
  const dispatch = useDispatch();

  const onSignin = async (data: TUserSignin) => {
    try {
      // set loading to true and error to null
      dispatch(_handleStartLogin());

      const { type, value } = await api.post<TUserSignin, IUser>(
        '/auth/login',
        data
      );

      // if type is ERROR, dispatch the error
      if (type === EResult.ERROR)
        return dispatch(_handleError(boomErrorValidator(value)));

      // if type is SUCCESS, dispatch the user data
      dispatch(_handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      console.log(error.message);
    }
  };

  const onRenewSession = async () => {
    try {
      // set loading to true and error to null
      dispatch(_handleStartLogin());

      const { type, value } = await api.get<IUser>('/auth/renew_session');

      // if type is ERROR, dispatch the error
      if (type === EResult.ERROR)
        return dispatch(_handleError(boomErrorValidator(value)));

      // if type is SUCCESS, dispatch the user data
      dispatch(_handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      console.log(error.message);
    }
  };

  return { onSignin, onRenewSession };
};

export default useAuth;
