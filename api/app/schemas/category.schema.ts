import { z } from 'zod';

const properties = {
  id: z.string(),
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title must contain at least 1 character(s)')
    .max(60, 'Title must be less than 30 character(s)'),
  userId: z.string(),
};

export const CreateCategory = z.object({
  body: z.object({
    title: properties.title,
  }),
});

export const UpdateCategory = z.object({
  query: z.object({
    id: properties.id,
  }),
  body: z.object({
    title: properties.title,
  }),
});

export const DeleteCategory = z.object({
  query: z.object({
    id: properties.id,
  }),
});
