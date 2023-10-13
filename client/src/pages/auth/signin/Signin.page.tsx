import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useAuth, useAuthSelector } from '@redux';
import { Button, Center, Error, Input } from '@ui';
import { getLocalStorage, handleErrorInput } from '@utilities';
import * as Models from '@models';

import { signin } from './signin.zod';

interface IFormInput {
  username: string;
  password: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(signin),
  });

  const { onSignin, onCleanError } = useAuth();
  const { isAuthenticated, error, isLoading } = useAuthSelector();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => onSignin(data);

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedLocation: Models.IRedirect | null = getLocalStorage(
        Models.ELocalStorage.REDIRECT
      );

      navigate(savedLocation?.path || Models.ESecureRoutes.DASHBOARD);
    }

    return () => {
      // Cleanup
      onCleanError();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  return (
    <Center>
      <div>
        <h1 className="text-4xl font-semibold mb-4 text-blackprimary">
          Sign in
        </h1>
        <p className="mb-3 text-gray-500 font-semibold">
          Sign in to see your monthly expenses! 💸
        </p>
        {error && <Error message={error.message} styles={'text-warn mb-3'} />}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={handleErrorInput<IFormInput>(
              Models.EFields.USERNAME,
              null,
              errors
            )}
            label="Username*"
            name={Models.EFields.USERNAME}
            placeholder="Enter your username"
            register={{ ...register(Models.EFields.USERNAME) }}
            styles="w-[23rem]"
            type="text"
          />
          <Input
            error={handleErrorInput<IFormInput>(
              Models.EFields.PASSWORD,
              null,
              errors
            )}
            label="Password*"
            name={Models.EFields.PASSWORD}
            placeholder="Enter your password"
            register={{ ...register(Models.EFields.PASSWORD) }}
            styles="w-[23rem]"
            type="password"
          />
          <Button
            loading={isLoading}
            styles="bg-blackprimary text-white hover:bg-primary"
            text="Sign In"
            type="submit"
          />
        </form>
        <div className="flex">
          <p className="mt-8 text-sm font-semibold text-blackprimary m-auto">
            {"Don't have an account?"}{' '}
            <Link
              className="underline hover:text-primary transition-colors"
              to={Models.EPublicRoutes.SIGNUP}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Center>
  );
};

export default Signin;
