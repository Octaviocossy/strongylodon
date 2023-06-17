import boom from '@hapi/boom';

import { Prisma } from '../config';
import { TMiddlewareParams } from '../models';

export const copyStatisticsByUser: TMiddlewareParams = async (
  _req,
  res,
  next
) => {
  try {
    const { id } = res.locals.authorized;

    // Find user and statistics
    const data = await Prisma.user.findUnique({
      where: { id },
      include: { Statistics: true },
    });

    if (!data) return next(boom.badRequest('User not found'));

    const statistic = data.Statistics[0];

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
  } catch (error) {
    next(error);
  }
};