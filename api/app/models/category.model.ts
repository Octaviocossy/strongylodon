import { Categories } from '@prisma/client';

export interface ICategoryReq {
  title: Categories['title'];
}
