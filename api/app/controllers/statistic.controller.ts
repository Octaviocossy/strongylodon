import boom from '@hapi/boom';
import isUUID from 'validator/lib/isUUID';

import { Prisma } from '../config';
import { TMiddlewareParams } from '../models';
import { IStatisticReq } from '../models/statistic.model';

export const getStatistics: TMiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    // Find the statistic of the logged user
    const findStatistic = await Prisma.statistic.findFirst({
      where: {
        userId: id,
      },
    });

    res.status(200).json(findStatistic);
  } catch (error) {
    return next(error);
  }
};

export const setInitialAmount: TMiddlewareParams = async (req, res, next) => {
  try {
    const { initialAmount } = req.body as IStatisticReq;
    const { id: statisticId } = req.query;
    const { id } = res.locals.authorized;

    // validate statistic id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    // Find the statistic of the logged user
    const findStatistic = await Prisma.statistic.findUnique({
      where: {
        id: String(statisticId),
      },
    });

    if (!findStatistic) {
      return next(boom.badRequest('Statistic not found'));
    }

    if (findStatistic.userId !== id) {
      return next(boom.unauthorized('Unauthorized'));
    }

    // Update statistic
    await Prisma.statistic.update({
      where: { id: String(statisticId) },
      data: { initialAmount },
    });

    req.message = 'Initial amount set';

    next();
  } catch (error) {
    next(error);
  }
};
