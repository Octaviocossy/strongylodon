import { useDispatch } from 'react-redux';

import { EResult, IUser, TUserSignin } from '../../models';
import { api } from '../../services';

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

      if (type === EResult.CUSTOM_ERR) {
        dispatch(_handleError(value));

        return;
      }

      dispatch(_handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      console.log(error.message);
    }
  };

  return { onSignin };
};

export default useAuth;
