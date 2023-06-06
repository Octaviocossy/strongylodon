import boom from '@hapi/boom';
import isUUID from 'validator/lib/isUUID';

import { EResult, MiddlewareParams } from '../models';
import { ExpenseReq } from '../models/expense.model';
import { Prisma } from '../config';
import { expenseCategoryValidation } from '../utilities';

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

    // Check if the expense category ID's its valid
    if (expense.expenseCategoryId) {
      const { type, value } = await expenseCategoryValidation(
        expense.expenseCategoryId,
        id
      );

      if (type === EResult.ERROR) return next(boom.notFound(value.message));
    }

    // creates expense
    await Prisma.expense.create({
      data: {
        ...expense,
        expenseCategoryId: expense.expenseCategoryId?.join(','),
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

    // validate expense id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    // find the expense in the db
    const findExpense = await Prisma.expense.findUnique({
      where: { id: String(id) },
    });

    if (!findExpense) return next(boom.notFound('Expense not found'));

    if (findExpense.userId !== userId)
      return next(boom.unauthorized('Unauthorized'));

    // Check if the expense category ID's its valid
    if (expense.expenseCategoryId) {
      const { type, value } = await expenseCategoryValidation(
        expense.expenseCategoryId,
        String(id)
      );

      if (type === EResult.ERROR) return next(boom.notFound(value.message));
    }

    // update expense
    await Prisma.expense.update({
      where: { id: String(id) },
      data: {
        ...expense,
        expenseCategoryId: expense.expenseCategoryId?.join(','),
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

    // validate expense id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    const findExpense = await Prisma.expense.findUnique({
      where: { id: String(id) },
    });

    if (!findExpense) return next(boom.notFound('Expense not found'));

    if (findExpense.userId !== userId)
      return next(boom.unauthorized('Unauthorized'));

    // delete expense
    await Prisma.expense.delete({ where: { id: String(id) } });

    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    next(error);
  }
};
