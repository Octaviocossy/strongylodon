import express from 'express';

import { auth, schemaValition, updateStatistic } from '../middlewares';
import { CreateExpense, DeleteExpense, UpdateExpense } from '../schemas';
import * as Controllers from '../controllers';

const router = express.Router();

router.get('/get', auth, Controllers.getExpenses);
router.post(
  '/create',
  auth,
  schemaValition(CreateExpense),
  Controllers.createExpense,
  updateStatistic
);
router.put(
  '/update',
  auth,
  schemaValition(UpdateExpense),
  Controllers.updateExpense,
  updateStatistic
);
router.delete(
  '/delete',
  auth,
  schemaValition(DeleteExpense),
  Controllers.deleteExpense,
  updateStatistic
);

export { router as ExpenseRouter };
