import express from 'express';

import { auth, schemaValition, updateStatistic } from '../middlewares';
import { getStatistics, editAmount, addAmount } from '../controllers';
import { SetStatistic } from '../schemas/statistic.schema';

const router = express.Router();

router.get('/get', auth, getStatistics);

router.put(
  '/add_amount',
  auth,
  schemaValition(SetStatistic),
  addAmount,
  updateStatistic
);

router.put(
  '/edit_amount',
  auth,
  schemaValition(SetStatistic),
  editAmount,
  updateStatistic
);

export { router as StatisticRouter };
