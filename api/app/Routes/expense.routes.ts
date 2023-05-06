import express from 'express';

import { auth, schemaValition } from '../middlewares';
import { createExpense } from '../controllers';
import { CreateExpense } from '../schemas';

const router = express.Router();

router.post('/create', auth, schemaValition(CreateExpense), createExpense);

export { router as ExpenseRouter };
