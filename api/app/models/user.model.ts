import { User } from '@prisma/client';

export type TCreateUserReq = Pick<User, 'email' | 'username' | 'password'>;
export type TLoginUserReq = Pick<User, 'username' | 'password'>;
