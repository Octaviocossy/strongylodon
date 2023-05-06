import { MiddlewareParams } from '../models';

export const createExpense: MiddlewareParams = (_req, res, next) => {
  try {
    res.status(200).json({ message: 'Expense created' });
  } catch (error) {
    next(error);
  }
};
