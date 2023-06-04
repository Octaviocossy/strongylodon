import boom from '@hapi/boom';
import isUUID from 'validator/lib/isUUID';

import { MiddlewareParams } from '../models';
import { ExpenseReq } from '../models/expense.model';
import { Prisma } from '../config';

export const getExpenses: MiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    const expenses = await Prisma.expense.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json({ expenses });
  } catch (error) {
    next(error);
  }
};

export const createExpense: MiddlewareParams = async (req, res, next) => {
  try {
    const { id } = res.locals.authorized;
    const expense = req.body as ExpenseReq;

    if (expense.expenseCategoryId) {
      const category = await Prisma.expenseCategory.findUnique({
        where: {
          id: expense.expenseCategoryId,
        },
      });

      if (!category) {
        return next(boom.notFound('Category not found'));
      }
    }

    await Prisma.expense.create({
      data: {
        ...expense,
        date: expense.date ? new Date(expense.date) : new Date(),
        userId: id,
      },
    });

    res.status(200).json({ message: 'Expense created' });
  } catch (error) {
    next(error);
  }
};

export const updateExpense: MiddlewareParams = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { id: userId } = res.locals.authorized;
    const expense = req.body as ExpenseReq;

    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    const findExpense = await Prisma.expense.findUnique({
      where: { id: String(id) },
    });

    if (!findExpense) return next(boom.notFound('Expense not found'));

    if (findExpense.userId !== userId)
      return next(boom.unauthorized('Unauthorized'));

    // expenseCategoryId check
    // ...

    await Prisma.expense.update({
      where: { id: String(id) },
      data: {
        ...expense,
        updated_at: new Date(),
      },
    });

    res.status(200).json({ message: 'Expense updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense: MiddlewareParams = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { id: userId } = res.locals.authorized;

    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    const findExpense = await Prisma.expense.findUnique({
      where: { id: String(id) },
    });

    if (!findExpense) return next(boom.notFound('Expense not found'));

    if (findExpense.userId !== userId)
      return next(boom.unauthorized('Unauthorized'));

    await Prisma.expense.delete({ where: { id: String(id) } });

    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    next(error);
  }
};
