import express from 'express';

import { auth, schemaValition } from '../middlewares';
import { CreateCategory, DeleteCategory, UpdateCategory } from '../schemas';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers';

const router = express.Router();

router.get('/get', auth, getCategories);
router.post('/create', auth, schemaValition(CreateCategory), createCategory);
router.put('/update', auth, schemaValition(UpdateCategory), updateCategory);
router.delete('/delete', auth, schemaValition(DeleteCategory), deleteCategory);

export { router as CategoryRouter };
