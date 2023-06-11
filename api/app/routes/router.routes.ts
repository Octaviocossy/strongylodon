import express, { Express } from 'express';

import { AuthRouter, ExpenseRouter, CategoryRouter, StatisticRouter } from '.';

export const Router = (app: Express) => {
  const router = express.Router();

  app.use('/api', router);

  router.use('/auth', AuthRouter);
  router.use('/expense', ExpenseRouter);
  router.use('/category', CategoryRouter);
  router.use('/statistic', StatisticRouter);
};
