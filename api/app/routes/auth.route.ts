import express from 'express';

import { createUser, loginUser, logoutUser, renewToken } from '../controllers';
import { auth, schemaValition, copyStatisticsByUser } from '../middlewares';
import { RegisterUser, LoginUser } from '../schemas';

const router = express.Router();

router.post('/register', schemaValition(RegisterUser), createUser);
router.get('/renewSession', auth, renewToken, copyStatisticsByUser);
router.get('/logout', auth, logoutUser);
router.post(
  '/login',
  schemaValition(LoginUser),
  loginUser,
  auth,
  copyStatisticsByUser
);

export { router as AuthRouter };
