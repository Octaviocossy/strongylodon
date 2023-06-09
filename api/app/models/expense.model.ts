import { Expense } from '@prisma/client';

export interface IExpenseReq {
  title: Expense['title'];
  amount: Expense['amount'];
  description?: Expense['description'];
  date: Expense['date'];
  categoriesId: string[];
}
