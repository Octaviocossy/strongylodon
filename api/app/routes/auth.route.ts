import express from 'express';

import * as Controllers from '../controllers';
import { auth, schemaValition, copyStatisticByUser } from '../middlewares';
import { RegisterUser, LoginUser, EmailToken } from '../schemas';

const router = express.Router();

router.post('/register', schemaValition(RegisterUser), Controllers.createUser);
router.get('/renew_session', auth, Controllers.renewToken, copyStatisticByUser);
router.get('/logout', auth, Controllers.logoutUser);
router.get(
  '/verify_email',
  auth,
  schemaValition(EmailToken),
  Controllers.verifyEmailToken
);
router.post(
  '/login',
  schemaValition(LoginUser),
  Controllers.loginUser,
  copyStatisticByUser
);

export { router as AuthRouter };
