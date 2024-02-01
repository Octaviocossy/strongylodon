import jwt, { Secret } from 'jsonwebtoken';
import { Users } from '@prisma/client';

const tokenExpirationMinutes = 60;

export const generateJWT = (data: { id: Users['id'] }) => {
  // sing the jwt with the user id and the secret
  return jwt.sign(data, process.env.JWT_SECRET as Secret, {
    expiresIn: 60 * tokenExpirationMinutes,
  });
};
