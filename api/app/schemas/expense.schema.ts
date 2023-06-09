import { z } from 'zod';

const properties = {
  id: z.string(),
  title: z
    .string({ required_error: 'Title is required' })
    .min(4, 'Title must contain at least 4 character(s)')
    .max(30, 'Title must be less than 30 character(s)'),
  description: z.string(),
  amount: z.number({ required_error: 'Amount is required' }),
  date: z.string().nullable(),
  categoriesId: z.string().array().nullable(),
};

export const CreateExpense = z.object({
  body: z.object({
    title: properties.title,
    description: properties.description,
    amount: properties.amount,
    date: properties.date,
    categoriesId: properties.categoriesId,
  }),
});

export const UpdateExpense = z.object({
  query: z.object({
    id: properties.id,
  }),
  body: z.object({
    title: properties.title,
    description: properties.description,
    amount: properties.amount,
    date: properties.date,
    categoriesId: properties.categoriesId,
  }),
});

export const DeleteExpense = z.object({
  query: z.object({
    id: properties.id,
  }),
});
