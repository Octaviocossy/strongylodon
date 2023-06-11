import express from 'express';

import { auth, schemaValition, updateStatistic } from '../middlewares';
import { getStatistics, setInitialAmount } from '../controllers';
import { SetStatistic } from '../schemas/statistic.schema';

const router = express.Router();

router.get('/get', auth, getStatistics);
router.put(
  '/set_amount',
  auth,
  schemaValition(SetStatistic),
  setInitialAmount,
  updateStatistic
);

export { router as StatisticRouter };
