import * as z from 'zod';

export const signup = z
  .object({
    username: z
      .string()
      .min(4, 'Username must be at least 4 characters.')
      .max(30, 'Username must be less than 30 characters.'),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Wrong email format.' })
      .max(80, 'Email must be less than 80 characters.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    password_confirmation: z
      .string()
      .min(6, 'Password must be at least 6 characters.'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });
