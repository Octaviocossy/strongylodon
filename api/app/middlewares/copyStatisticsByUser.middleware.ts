import boom from '@hapi/boom';

import { Prisma } from '../config';
import { TMiddlewareParams } from '../models';

export const copyStatisticsByUser: TMiddlewareParams = async (
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
      const createHistorical = Prisma.hStatistic.create({
        data: {
          ...statistic,
          id: undefined,
        },
      });

      const updateCurrentStatistic = Prisma.statistic.update({
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
