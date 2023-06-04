import jwt, { Secret } from 'jsonwebtoken';
import { User } from '@prisma/client';

const tokenExpirationMinutes = 60;

export const generateJWT = (data: { id: User['id'] }) => {
  return jwt.sign(data, process.env.JWT_SECRET as Secret, {
    expiresIn: 60 * tokenExpirationMinutes,
  });
};
