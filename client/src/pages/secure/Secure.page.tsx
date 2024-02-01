import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth, useAuthSelector } from '@redux';
import { getLocalStorage } from '@utilities';
import { Center, Spinner } from '@ui';
import { useFirstLoad } from '@hooks';
import * as Models from '@models';

const Secure = () => {
  const { onRenewSession } = useAuth();
  const { isAuthenticated, error } = useAuthSelector();
  const navigate = useNavigate();

  useFirstLoad(onRenewSession);

  // Redirect to dashboard or saved location if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedLocation: Models.IRedirect | null = getLocalStorage(
        Models.ELocalStorage.REDIRECT
      );

      navigate(savedLocation?.path || Models.ESecureRoutes.DASHBOARD);
    }

    if (error) {
      navigate(Models.EPublicRoutes.SIGNIN);
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <Center>
      <Spinner styles={'h-[2rem], w-[2rem]'} />
    </Center>
  );
};

export default Secure;
