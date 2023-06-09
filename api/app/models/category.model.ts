import { Category } from '@prisma/client';

export interface ICategoryReq {
  title: Category['title'];
}
