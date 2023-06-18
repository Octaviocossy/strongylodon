import { Statistic } from '@prisma/client';

export interface IStatisticReq {
  amount: Statistic['initialAmount'];
}
