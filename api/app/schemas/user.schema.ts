import { z } from 'zod';

const properties = {
  username: z
    .string({ required_error: 'Username is required' })
    .min(4, 'Username must contain at least 4 character(s)')
    .max(30, 'Username must be less than 30 character(s)'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must contain at least 6 character(s)'),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Wrong email format' })
    .max(80, 'Email must be less than 80 character(s)'),
};

export const RegisterUser = z.object({
  body: z.object({
    username: properties.username,
    password: properties.password,
    email: properties.email,
  }),
});

export const LoginUser = z.object({
  body: z.object({
    username: properties.username,
    password: properties.password,
  }),
});
