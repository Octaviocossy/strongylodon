import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import {
  ELocalStorage,
  EPublicRoutes,
  ESecureRoutes,
  IRedirect,
} from '../../models';
import { useAuth, useAuthSelector } from '../../redux';
import { getLocalStorage } from '../../utilities';
import { useFirstLoad } from '../../hooks';

const Secure = () => {
  const { onRenewSession } = useAuth();
  const { isAuthenticated, error } = useAuthSelector();
  const navigate = useNavigate();

  useFirstLoad(onRenewSession);

  useEffect(() => {
    if (isAuthenticated) {
      const savedLocation: IRedirect = getLocalStorage(ELocalStorage.REDIRECT);

      navigate(savedLocation.path || ESecureRoutes.DASHBOARD);
    }

    if (error) {
      navigate(EPublicRoutes.SIGNIN);
    }
  }, [error, isAuthenticated, navigate]);

  return <p>{'Loading...'}</p>;
};

export default Secure;
