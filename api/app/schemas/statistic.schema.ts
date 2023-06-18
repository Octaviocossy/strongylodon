import { z } from 'zod';

const properties = {
  amount: z.number(),
  userId: z.string(),
};

export const SetStatistic = z.object({
  body: z.object({
    amount: properties.amount,
  }),
  query: z.object({
    id: properties.userId,
  }),
});
