import { Expenses } from '@prisma/client';

export interface IExpenseReq {
  title: Expenses['title'];
  amount: Expenses['amount'];
  description?: Expenses['description'];
  date: Expenses['date'];
  categoriesId: string[];
}
