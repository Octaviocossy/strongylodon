import { z } from 'zod';

const properties = {
  initialAmount: z.number(),
  userId: z.string(),
};

export const SetStatistic = z.object({
  body: z.object({
    initialAmount: properties.initialAmount,
  }),
  query: z.object({
    id: properties.userId,
  }),
});
