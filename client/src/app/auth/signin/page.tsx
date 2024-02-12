'use client';

import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as Icons from 'lucide-react';

import { Button, Center, Error, GoogleIcon, Input } from '@/ui';
import { cn, handleErrorInput } from '@/utilities';
import { useAuth, useAuthSelector } from '@/redux';
import { useTheme } from '@/hooks';
import * as Models from '@/models';

import { SIGNIN_SCHEMA } from './_zod';

interface FormInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const { theme } = useTheme();

  const { register, handleSubmit, formState } = useForm<FormInput>({ resolver: zodResolver(SIGNIN_SCHEMA) });

  const { errors } = formState;

  const { onSignIn } = useAuth();
  const { isLoading, error } = useAuthSelector();

  const onSubmit: SubmitHandler<FormInput> = (data) => onSignIn(data);

  return (
    <Center>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold text-blackprimary">Sign in</h1>
        <p className="text-gray-500 font-semibold">Sign in to see your monthly expenses! 💸</p>
        {error ? <Error className="text-red-700/80 dark:text-red-300" icon={Icons.AlertTriangle} message={error.message} /> : null}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={handleErrorInput<FormInput>(Models.EFields.EMAIL, null, errors)}
            label="Email*"
            name={Models.EFields.EMAIL}
            placeholder="my_email@gmail.com"
            register={{ ...register(Models.EFields.EMAIL) }}
            type="text"
          />
          <Input
            className="ring-gray-200"
            error={handleErrorInput<FormInput>(Models.EFields.PASSWORD, null, errors)}
            label="Password*"
            name={Models.EFields.PASSWORD}
            placeholder="*************"
            register={{ ...register(Models.EFields.PASSWORD) }}
            type="password"
          />
          <Button className="font-semibold" isLoading={isLoading} size="lg" type="submit" variant="green">
            Sign In
          </Button>
        </form>
        <div className="flex items-center space-x-4">
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700" />
          <p className="text-gray-400 text-sm">OR</p>
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700" />
        </div>
        <Button className="font-semibold w-full space-x-2" size="lg" variant="red">
          <GoogleIcon className={cn({ 'animate-pulse': !theme })} color={theme === 'dark' ? '#fca5a5' : '#b91c1c'} />
          <span>Join with Google</span>
        </Button>
      </div>
    </Center>
  );
}
