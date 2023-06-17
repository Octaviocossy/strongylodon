import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

import { TCreateUserReq, TLoginUserReq, TMiddlewareParams } from '../models';
import { Prisma } from '../config';
import { generateJWT } from '../utilities';

export const createUser: TMiddlewareParams = async (req, res, next) => {
  try {
    const { email, password, username } = req.body as TCreateUserReq;

    const findUsername = await Prisma.user.findUnique({
      where: { username },
    });

    const findEmail = await Prisma.user.findUnique({
      where: { email },
    });

    // check if username already exists
    if (findUsername) return next(boom.badRequest('Username already exists'));

    // check if email already exists
    if (findEmail) return next(boom.badRequest('Email already exists'));

    // create hashed password
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

export const loginUser: TMiddlewareParams = async (req, res, next) => {
  try {
    const { username, password } = req.body as TLoginUserReq;

    const findUser = await Prisma.user.findUnique({
      where: { username },
    });

    // check if user exists
    if (!findUser)
      return next(boom.badRequest('Incorrect username or password'));

    // check if password is correct
    const passwordCompare = await bcrypt.compare(password, findUser.password);

    if (!passwordCompare)
      return next(boom.badRequest('Incorrect username or password'));

    // update last login date
    await Prisma.user.update({
      where: { id: findUser.id },
      data: { last_login_at: new Date() },
    });

    // set cookie with the token
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

export const renewToken: TMiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    // find user
    const findUser = await Prisma.user.findUnique({ where: { id } });

    if (!findUser) return next(boom.badRequest('User not found'));

    // update last login date
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

export const logoutUser: TMiddlewareParams = async (_req, res, next) => {
  try {
    // remove cookie
    res.clearCookie('token');

    return res.status(200).json({ msg: 'User logged out successfully' });
  } catch (error) {
    return next(error);
  }
};
