import express from 'express';

import { auth, schemaValition } from '../middlewares';
import { CreateExpense, DeleteExpense, UpdateExpense } from '../schemas';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../controllers';

const router = express.Router();

router.get('/get', auth, getExpenses);
router.post('/create', auth, schemaValition(CreateExpense), createExpense);
router.put('/update', auth, schemaValition(UpdateExpense), updateExpense);
router.delete('/delete', auth, schemaValition(DeleteExpense), deleteExpense);

export { router as ExpenseRouter };
