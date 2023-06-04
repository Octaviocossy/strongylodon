import { Expense } from '@prisma/client';

export type ExpenseReq = Omit<
  Expense,
  'created_at' | 'updated_at' | 'userId' | 'id'
>;
