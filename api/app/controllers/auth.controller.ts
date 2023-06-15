import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

import { TCreateUserReq, TLoginUserReq, MiddlewareParams } from '../models';
import { Prisma } from '../config';
import { generateJWT } from '../utilities';

export const createUser: MiddlewareParams = async (req, res, next) => {
  try {
    const { email, password, username } = req.body as TCreateUserReq;

    const findUsername = await Prisma.user.findUnique({
      where: { username },
    });

    const findEmail = await Prisma.user.findUnique({
      where: { email },
    });

    if (findUsername) return next(boom.badRequest('Username already exists'));

    if (findEmail) return next(boom.badRequest('Email already exists'));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and statistic
    await Prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        Statistics: {
          create: { initialAmount: 0, currentAmount: 0, expensedAmount: 0 },
        },
      },
    });

    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const loginUser: MiddlewareParams = async (req, res, next) => {
  try {
    const { username, password } = req.body as TLoginUserReq;

    const findUser = await Prisma.user.findUnique({
      where: { username },
    });

    if (!findUser)
      return next(boom.badRequest('Incorrect username or password'));

    const passwordCompare = await bcrypt.compare(password, findUser.password);

    if (!passwordCompare)
      return next(boom.badRequest('Incorrect username or password'));

    await Prisma.user.update({
      where: { id: findUser.id },
      data: { last_login_at: new Date() },
    });

    res.cookie('token', generateJWT({ id: findUser.id }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ ...findUser, password: undefined });

    next();
  } catch (error) {
    next(error);
  }
};

export const renewToken: MiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    const findUser = await Prisma.user.findUnique({ where: { id } });

    if (!findUser) return next(boom.badRequest('User not found'));

    await Prisma.user.update({
      where: { id: findUser.id },
      data: { last_login_at: new Date() },
    });

    res.status(200).json({
      ...findUser,
      password: undefined,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const logoutUser: MiddlewareParams = async (_req, res, next) => {
  try {
    res.clearCookie('token');

    return res.status(200).json({ msg: 'User logged out successfully' });
  } catch (error) {
    return next(error);
  }
};
