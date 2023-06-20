import * as z from 'zod';

export const signin = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters.')
    .max(30, 'Username must be less than 30 characters.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});
