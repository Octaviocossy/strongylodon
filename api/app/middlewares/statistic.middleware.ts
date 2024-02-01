import boom from '@hapi/boom';

import { Prisma } from '../config';
import { TMiddlewareParams } from '../models';

export const updateStatistic: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    const message = req.message;

    // find the statistic of the logged user
    const currentStatistic = await Prisma.statistics.findFirst({
      where: { userId: id },
    });

    if (!currentStatistic) return next(boom.badRequest('Statistic not found'));

    // get all expenses of the logged user
    const expenses = await Prisma.expenses.findMany({
      where: { userId: id },
    });

    // calculate the total amount of expenses
    const expensedAmount = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // update statistic
    await Prisma.statistics.update({
      where: { id: currentStatistic.id },
      data: {
        expensedAmount: expensedAmount,
        currentAmount: currentStatistic.initialAmount - expensedAmount,
      },
    });

    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

export const copyStatisticByUser: TMiddlewareParams = async (
  req,
  res,
  next
) => {
  try {
    const user = req.user;

    if (!user) return next(boom.badRequest('User not found'));

    const statistic = user.Statistics[0];

    // In case of the month is different, create a new historical and update the current statistic
    if (new Date(statistic.created_at).getMonth() !== new Date().getMonth()) {
      const createHistorical = Prisma.hStatistics.create({
        data: {
          ...statistic,
          id: undefined,
        },
      });

      const updateCurrentStatistic = Prisma.statistics.update({
        where: { id: statistic.id },
        data: {
          ...statistic,
          created_at: new Date(),
          initialAmount: 0,
          currentAmount: 0,
          expensedAmount: 0,
        },
      });

      await Prisma.$transaction([createHistorical, updateCurrentStatistic]);
    }

    return res
      .status(200)
      .json({ ...user, password: undefined, Statistics: undefined });
  } catch (error) {
    next(error);
  }
};
