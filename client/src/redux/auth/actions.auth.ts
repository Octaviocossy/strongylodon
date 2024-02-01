import { useDispatch } from 'react-redux';
import { EResult, IUser, TUserSignin, TUserSignup } from '@models';
import { api } from '@services';
import { parseError } from '@utilities';
import * as Redux from '@redux';

const useAuth = () => {
  // const {} = useAuthSelector();
  const dispatch = useDispatch();

  const onSignin = async (data: TUserSignin) => {
    try {
      // set loading to true and error to null
      dispatch(Redux._handleStartAuth());

      const { type, value } = await api.post<TUserSignin, IUser>(
        '/auth/login',
        data
      );

      // if type is ERROR, dispatch the error
      if (type === EResult.ERROR)
        return dispatch(Redux._handleError(parseError(value)));

      // if type is SUCCESS, dispatch the user data
      dispatch(Redux._handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const onRenewSession = async () => {
    try {
      // set loading to true and error to null
      dispatch(Redux._handleStartAuth());

      const { type, value } = await api.get<IUser>('/auth/renew_session');

      // if type is ERROR, dispatch the error
      if (type === EResult.ERROR)
        return dispatch(Redux._handleError(parseError(value)));

      // if type is SUCCESS, dispatch the user data
      dispatch(Redux._handleUserData(value));
    } catch (_error) {
      const error = _error as Error;

      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const onSignup = async (data: TUserSignup) => {
    try {
      // set loading to true and error to null
      dispatch(Redux._handleStartAuth());

      const { type, value } = await api.post<TUserSignup, { msg: string }>(
        '/auth/register',
        data
      );

      // if type is ERROR, dispatch the error
      if (type === EResult.ERROR)
        return dispatch(Redux._handleError(parseError(value)));

      // set toast (context)
      //...

      dispatch(Redux._handleOk(true));
    } catch (_error) {
      const error = _error as Error;

      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const onHandleOk = (status: boolean | null) => {
    dispatch(Redux._handleOk(status));
  };

  const onCleanError = () => {
    dispatch(Redux._handleError(null));
  };

  return { onSignin, onRenewSession, onSignup, onHandleOk, onCleanError };
};

export default useAuth;
