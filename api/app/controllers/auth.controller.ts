import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

import { CreateUserReq, LoginUserReq, IToken } from '../models';
import { Prisma } from '../config';
import { removeTokenDB, tokenValidation } from '../utilities';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body as CreateUserReq;

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

    await Prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as LoginUserReq;

    const findUser = await Prisma.user.findUnique({
      where: { username },
    });

    if (!findUser)
      return next(boom.badRequest('Incorrect username or password'));

    const passwordCompare = await bcrypt.compare(password, findUser.password);

    if (!passwordCompare)
      return next(boom.badRequest('Incorrect username or password'));

    const tokenValidationResult = (await tokenValidation(
      findUser.id
    )) as IToken;

    if (!tokenValidationResult) return next(tokenValidationResult);

    res.cookie('token', tokenValidationResult['token'], {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ ...findUser, password: undefined });
  } catch (error) {
    next(error);
  }
};

export const renewToken = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.authorized;

    const findUser = await Prisma.user.findUnique({ where: { id } });

    if (!findUser) return next(boom.badRequest('User not found'));

    return res.status(200).json({
      ...findUser,
      password: undefined,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.authorized;

    await removeTokenDB(id);

    res.clearCookie('token');

    return res.status(200).json({ msg: 'User logged out successfully' });
  } catch (error) {
    return next(error);
  }
};
