import { Statistic } from '@prisma/client';

export interface IStatisticReq {
  initialAmount: Statistic['initialAmount'];
}
