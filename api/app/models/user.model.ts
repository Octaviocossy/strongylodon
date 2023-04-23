import { User } from '@prisma/client';

export type CreateUserReq = Pick<User, 'email' | 'username' | 'password'>;
export type LoginUserReq = Pick<User, 'username' | 'password'>;
