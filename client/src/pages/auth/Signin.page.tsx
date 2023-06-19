import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Input, Submit } from '../../ui';
import { useAuth, useAuthSelector } from '../../redux';
import { getLocalStorage } from '../../utilities';
import {
  ELocalStorage,
  EPublicRoutes,
  ESecureRoutes,
  IRedirect,
} from '../../models';

interface IFormInput {
  username: string;
  password: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { onSignin } = useAuth();
  const { isAuthenticated } = useAuthSelector();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => onSignin(data);

  useEffect(() => {
    if (isAuthenticated) {
      const savedLocation: IRedirect = getLocalStorage(ELocalStorage.REDIRECT);

      navigate(savedLocation.path || ESecureRoutes.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <h1 className="text-4xl font-semibold mb-4 text-blackprimary">
          Sign in
        </h1>
        <p className="mb-3 text-gray-500 font-semibold">
          Sign in to see your monthly expenses! 💸
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors.username && errors.username}
            label="Username*"
            name="username"
            placeholder="Enter your username"
            register={{
              ...register('username', {
                required: 'Username is required',
                minLength: {
                  message: 'Must be at least 4 characters.',
                  value: 4,
                },
                maxLength: {
                  message: 'Must be less than 30 characters.',
                  value: 30,
                },
              }),
            }}
            styles="w-[23rem]"
            type="text"
          />

          <Input
            error={errors.password && errors.password}
            label="Password*"
            name="password"
            placeholder="Enter your password"
            register={{
              ...register('password', {
                required: 'Password is required',
                minLength: {
                  message: 'Must be at least 6 characters.',
                  value: 6,
                },
              }),
            }}
            styles="w-[23rem]"
            type="password"
          />

          <Submit styles="mt-2" text="Sign In" />
        </form>
        <div className="flex">
          <p className="mt-8 text-sm font-semibold text-blackprimary m-auto">
            {"Don't have an account?"}{' '}
            <Link
              className="underline hover:text-primary transition-colors"
              to={EPublicRoutes.SIGNUP}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
