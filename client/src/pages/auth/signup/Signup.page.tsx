import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { useAuth, useAuthSelector } from '../../../redux';
import { Center, Input, Submit } from '../../../ui';
import { EFields, EPublicRoutes } from '../../../models';
import { handleErrorInput } from '../../../utilities';

import { signup } from './signup.zod';

interface IFormInput {
  username: string;
  password: string;
  password_confirmation: string;
  email: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(signup),
  });

  const { onSignup, onHandleOk, onCleanError } = useAuth();
  const { error, ok } = useAuthSelector();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_confirmation, ...rest } = data;

    onSignup(rest);
  };

  // Redirect to signin if user is created
  useEffect(() => {
    if (ok) {
      navigate(EPublicRoutes.SIGNIN);
    }

    return () => {
      // Cleanup
      onHandleOk(null);
      onCleanError();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ok, navigate]);

  return (
    <Center>
      <div>
        <h1 className="text-4xl font-semibold mb-4 text-blackprimary">
          Sign up
        </h1>
        <p className="mb-3 text-gray-500 font-semibold max-w-[23rem]">
          Sign up to experience the experience of controlling your expenses in
          depth! 😱
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={handleErrorInput<IFormInput>(
              EFields.USERNAME,
              error,
              errors
            )}
            label="Username*"
            name={EFields.USERNAME}
            placeholder="Enter your username"
            register={{ ...register(EFields.USERNAME) }}
            styles="w-[23rem]"
            type="text"
          />
          <Input
            error={handleErrorInput<IFormInput>(EFields.EMAIL, error, errors)}
            label="Email*"
            name={EFields.EMAIL}
            placeholder="Enter your email"
            register={{ ...register(EFields.EMAIL) }}
            styles="w-[23rem]"
            type="email"
          />
          <Input
            error={handleErrorInput<IFormInput>(
              EFields.PASSWORD,
              error,
              errors
            )}
            label="Password*"
            name={EFields.PASSWORD}
            placeholder="Enter your password"
            register={{ ...register(EFields.PASSWORD) }}
            styles="w-[23rem]"
            type="password"
          />
          <Input
            error={handleErrorInput<IFormInput>(
              EFields.PASSWORD_CONFIRMATION,
              null,
              errors
            )}
            label="Confirm Password*"
            name={EFields.PASSWORD_CONFIRMATION}
            placeholder="Confirm password"
            register={{ ...register(EFields.PASSWORD_CONFIRMATION) }}
            styles="w-[23rem]"
            type="password"
          />
          <Submit styles="mt-2" text="Sign Up" />
        </form>
        <div className="flex">
          <p className="mt-8 text-sm font-semibold text-blackprimary m-auto">
            {'Already have an account?'}{' '}
            <Link
              className="underline hover:text-primary transition-colors"
              to={EPublicRoutes.SIGNIN}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Center>
  );
};

export default Signin;
