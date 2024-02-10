import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import type { BoomError } from '@/models';

import React from 'react';
import * as Icons from 'lucide-react';

import { Error } from '@/ui';
import { cn } from '@/utilities';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldErrors | BoomError | undefined;
  register?: UseFormRegisterReturn;
  containerStyles?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <section className={cn('flex flex-col space-y-2', props.containerStyles)}>
      {props.label ? (
        <label className="font-semibold" htmlFor={props.name}>
          {props.label}
        </label>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-11',
          className
        )}
        {...props.register}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        type={type}
        {...props}
      />
      {props.error ? <Error className="text-red-700/80 dark:text-red-300" icon={Icons.AlertTriangle} message={(props.error.message as string) || ''} /> : null}
    </section>
  );
});

Input.displayName = 'Input';

export { Input };
