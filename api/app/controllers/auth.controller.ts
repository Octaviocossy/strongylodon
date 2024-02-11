import { randomUUID } from 'crypto';

import boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

import { TCreateUserReq, TLoginUserReq, TMiddlewareParams } from '../models';
import { Prisma } from '../config';
import { generateJWT, parseCookiesToObject, sendEmail } from '../utilities';

export const createUser: TMiddlewareParams = async (req, res, next) => {
  try {
    const { email, password, username } = req.body as TCreateUserReq;

    const findUsername = await Prisma.users.findUnique({
      where: { username },
    });

    const findEmail = await Prisma.users.findUnique({
      where: { email },
    });

    // check if username already exists
    if (findUsername) return next(boom.badRequest('Username already exists'));

    // check if email already exists
    if (findEmail) return next(boom.badRequest('Email already exists'));

    // create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const randomToken = randomUUID();

    // send verrification email
    if (!(await sendEmail({ email, token: randomToken })).status) {
      return next(boom.badRequest('Email could not be sent'));
    }

    // Create user and statistic
    const { id } = await Prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        Statistics: {
          create: { initialAmount: 0, currentAmount: 0, expensedAmount: 0 },
        },
      },
      select: { id: true },
    });

    // Creates cookie for user session
    res.cookie('token', generateJWT({ id }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    // Create cookie for email verification
    res.cookie(`email_token-${randomToken}`, randomToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + (1000 * 60 * 60 * 1) / 5),
    });

    return res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailToken: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = res.locals.authorized;
    const { token } = req.query;
    const { cookie } = req.headers;

    const parsedCookie = parseCookiesToObject(cookie as string);

    if (token?.toString().trim() !== parsedCookie[`email_token-${token}`]) {
      return next(boom.badRequest('Invalid token'));
    }

    await Prisma.users.update({
      where: { id },
      data: { is_active: true },
    });

    res.clearCookie(`email_token-${token}`);

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    return next(error);
  }
};

export const loginUser: TMiddlewareParams = async (req, res, next) => {
  try {
    const { email, password } = req.body as TLoginUserReq;

    const findUser = await Prisma.users.findUnique({
      where: { email },
      include: { Statistics: true },
    });

    // check if user exists
    if (!findUser) return next(boom.badRequest('Incorrect email or password'));

    // check if password is correct
    const passwordCompare = await bcrypt.compare(password, findUser.password);

    if (!passwordCompare)
      return next(boom.badRequest('Incorrect email or password'));

    // update last login date
    await Prisma.users.update({
      where: { id: findUser.id },
      data: { last_login_at: new Date() },
    });

    // set cookie with the token
    res.cookie('token', generateJWT({ id: findUser.id }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    req.user = findUser;

    return next();
  } catch (error) {
    next(error);
  }
};

export const renewToken: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    // find user
    const findUser = await Prisma.users.findUnique({
      where: { id },
      include: { Statistics: true },
    });

    if (!findUser) return next(boom.badRequest('User not found'));

    // update last login date
    await Prisma.users.update({
      where: { id: findUser.id },
      data: { last_login_at: new Date() },
    });

    req.user = findUser;

    return next();
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
