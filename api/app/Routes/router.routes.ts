import express, { Express } from 'express';

import { AuthRouter } from './auth.routes';

export const Router = (app: Express) => {
  const router = express.Router();

  app.use('/api', router);

  router.use('/auth', AuthRouter);
};
