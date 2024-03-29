import express from 'express';

import { auth, schemaValition } from '../middlewares';
import { CreateCategory, DeleteCategory, UpdateCategory } from '../schemas';
import * as Controllers from '../controllers';

const router = express.Router();

router.get('/get', auth, Controllers.getCategories);
router.post(
  '/create',
  auth,
  schemaValition(CreateCategory),
  Controllers.createCategory
);
router.put(
  '/update',
  auth,
  schemaValition(UpdateCategory),
  Controllers.updateCategory
);
router.delete(
  '/delete',
  auth,
  schemaValition(DeleteCategory),
  Controllers.deleteCategory
);

export { router as CategoryRouter };
