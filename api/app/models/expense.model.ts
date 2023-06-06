import { Expense } from '@prisma/client';

export interface ExpenseReq {
  title: Expense['title'];
  amount: Expense['amount'];
  description?: Expense['description'];
  date: Expense['date'];
  expenseCategoryId: string[];
}
