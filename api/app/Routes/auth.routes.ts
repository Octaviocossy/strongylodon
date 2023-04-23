import express from 'express';

import { createUser, loginUser, logoutUser, renewToken } from '../controllers';
import { auth, schemaValition } from '../middlewares';
import { RegisterUser, LoginUser } from '../schemas';

const router = express.Router();

router.post('/register', schemaValition(RegisterUser), createUser);
router.post('/login', schemaValition(LoginUser), loginUser);
router.get('/renew', auth, renewToken);
router.get('/logout', auth, logoutUser);

export { router as AuthRouter };
