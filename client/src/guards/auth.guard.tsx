import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { EPublicRoutes, ESecureRoutes } from '@models';
import { parseEnumToArray, persistLocalStorage } from '@utilities';
import { useAuthSelector } from '@redux';

const AuthGuard = () => {
  const { isAuthenticated } = useAuthSelector();

  const { pathname } = useLocation();

  useEffect(() => {
    // save current path to redirect after login
    if (parseEnumToArray(ESecureRoutes).includes(pathname)) {
      persistLocalStorage('redirect', { path: pathname });
    }
  }, [pathname]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={EPublicRoutes.SECURE} />
  );
};

export default AuthGuard;
