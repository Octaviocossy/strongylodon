import { TResult, EResult } from '../models';
import { Prisma } from '../config';

export const expenseCategoryValidation = async (
  categories: string[],
  userId: string
): Promise<TResult<null>> => {
  try {
    const notFound: string[] = [];

    // get all of the categories created by the logged user
    const allCategories = await Prisma.categories.findMany({
      where: { userId },
    });

    const categorysIDs = allCategories.map((category) => category.id);

    // in case of not find the category return an boom error
    categories.forEach((category) => {
      if (!categorysIDs.includes(category)) {
        notFound.push(category);
      }
    });

    // throw the error in case of it exists
    if (notFound[0])
      throw new Error(
        `Category: ${notFound.map((cat, index) => {
          if (index === notFound.length) {
            return `${cat}, `;
          } else {
            return `${cat}`;
          }
        })} not found`
      );

    return { type: EResult.SUCCESS, value: null };
  } catch (error) {
    const err = error as Error;

    return { type: EResult.ERROR, value: err };
  }
};
