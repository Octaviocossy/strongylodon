import boom from '@hapi/boom';

import { Prisma } from '../config';
import { MiddlewareParams } from '../models';

export const updateStatistic: MiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    // find the statistic of the logged user
    const currentStatistic = await Prisma.statistic.findFirst({
      where: { userId: id },
    });

    if (!currentStatistic) return next(boom.badRequest('Statistic not found'));

    // get all expenses of the logged user
    const expenses = await Prisma.expense.findMany({
      where: { userId: id },
    });

    // calculate the total amount of expenses
    const expensedAmount = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // update statistic
    await Prisma.statistic.update({
      where: { id: currentStatistic.id },
      data: {
        expensedAmount: expensedAmount,
        currentAmount: currentStatistic.initialAmount - expensedAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};
