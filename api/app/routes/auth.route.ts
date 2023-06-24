import express from 'express';

import { createUser, loginUser, logoutUser, renewToken } from '../controllers';
import { auth, schemaValition, copyStatisticByUser } from '../middlewares';
import { RegisterUser, LoginUser } from '../schemas';

const router = express.Router();

router.post('/register', schemaValition(RegisterUser), createUser);
router.get('/renew_session', auth, renewToken, copyStatisticByUser);
router.get('/logout', auth, logoutUser);
router.post(
  '/login',
  schemaValition(LoginUser),
  loginUser,
  copyStatisticByUser
);

export { router as AuthRouter };
