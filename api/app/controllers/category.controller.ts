import isUUID from 'validator/lib/isUUID';
import boom from '@hapi/boom';

import { ICategoryReq, TMiddlewareParams } from '../models';
import { Prisma } from '../config';

export const getCategories: TMiddlewareParams = async (_req, res, next) => {
  try {
    const { id } = res.locals.authorized;

    // get all categories of the user
    const categories = await Prisma.category.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id } = res.locals.authorized;
    const { title } = req.body as ICategoryReq;

    await Prisma.category.create({
      data: {
        title,
        userId: id,
      },
    });

    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    next(error);
  }
};

export const updateCategory: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id: userId } = res.locals.authorized;
    const { title } = req.body as ICategoryReq;
    const { id } = req.query;

    // validate category id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    // find the category in the db
    const findCategory = await Prisma.category.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!findCategory) throw new Error('Category not found');

    if (findCategory.userId !== userId) {
      return next(boom.unauthorized('Unauthorized'));
    }

    // Update category
    await Prisma.category.update({
      where: {
        id: String(id),
      },
      data: {
        title,
        userId,
        updated_at: new Date(),
      },
    });

    res.status(200).json({ message: 'Category updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: TMiddlewareParams = async (req, res, next) => {
  try {
    const { id: userId } = res.locals.authorized;
    const { id } = req.query;

    // validate category id
    if (!isUUID(String(id))) return next(boom.badRequest('Invalid id'));

    // find the category in the db
    const findCategory = await Prisma.category.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!findCategory) throw new Error('Category not found');

    if (findCategory.userId !== userId) {
      return next(boom.unauthorized('Unauthorized'));
    }

    // delete category
    await Prisma.category.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
