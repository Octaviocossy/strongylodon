import express from 'express';

import { auth, schemaValition, updateStatistic } from '../middlewares';
import { CreateExpense, DeleteExpense, UpdateExpense } from '../schemas';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../controllers';

const router = express.Router();

router.get('/get', auth, getExpenses);
router.post(
  '/create',
  auth,
  schemaValition(CreateExpense),
  createExpense,
  updateStatistic
);
router.put(
  '/update',
  auth,
  schemaValition(UpdateExpense),
  updateExpense,
  updateStatistic
);
router.delete(
  '/delete',
  auth,
  schemaValition(DeleteExpense),
  deleteExpense,
  updateStatistic
);

export { router as ExpenseRouter };
