import boom from '@hapi/boom';
import isUUID from 'validator/lib/isUUID';

import { EResult, TMiddlewareParams, IExpenseReq } from '../models';
import { expenseCategoryValidation } from '../utilities';
import { Prisma } from '../config';

export const getExpenses: TMiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    const expenses = await Prisma.expenses.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const createExpense: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = res.locals.authorized;
    const expense = req.body as IExpenseReq;

    // Check if the expense category ID's its valid
    if (expense.categoriesId) {
      const { type, value } = await expenseCategoryValidation(
        expense.categoriesId,
        id
      );

      if (type === EResult.ERROR) return next(boom.notFound(value.message));
    }

    // creates expense
    await Prisma.expenses.create({
      data: {
        ...expense,
        categoriesId: expense.categoriesId?.join(','),
        date: expense.date ? new Date(expense.date) : new Date(),
        userId: id,
      },
    });

    req.message = 'Expense created';

    return next();
  } catch (error) {
    next(error);
  }
};

export const updateExpense: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { id: userId } = res.locals.authorized;
    const expense = req.body as IExpenseReq;

    // validate expense id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    // find the expense in the db
    const findExpense = await Prisma.expenses.findUnique({
      where: { id: String(id) },
    });

    if (!findExpense) return next(boom.notFound('Expense not found'));

    if (findExpense.userId !== userId)
      return next(boom.unauthorized('Unauthorized'));

    // Check if the expense category ID's its valid
    if (expense.categoriesId) {
      const { type, value } = await expenseCategoryValidation(
        expense.categoriesId,
        String(id)
      );

      if (type === EResult.ERROR) return next(boom.notFound(value.message));
    }

    // update expense
    await Prisma.expenses.update({
      where: { id: String(id) },
      data: {
        ...expense,
        categoriesId: expense.categoriesId?.join(','),
        updated_at: new Date(),
      },
    });

    req.message = 'Expense updated';

    return next();
  } catch (error) {
    next(error);
  }
};

export const deleteExpense: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { id: userId } = res.locals.authorized;

    // validate expense id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    const findExpense = await Prisma.expenses.findUnique({
      where: { id: String(id) },
    });

    if (!findExpense) return next(boom.notFound('Expense not found'));

    if (findExpense.userId !== userId)
      return next(boom.unauthorized('Unauthorized'));

    // delete expense
    await Prisma.expenses.delete({ where: { id: String(id) } });

    req.message = 'Expense deleted';

    return next();
  } catch (error) {
    next(error);
  }
};
