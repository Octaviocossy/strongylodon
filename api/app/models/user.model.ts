import { Users } from '@prisma/client';

export type TCreateUserReq = Pick<Users, 'email' | 'username' | 'password'>;
export type TLoginUserReq = Pick<Users, 'username' | 'password'>;
