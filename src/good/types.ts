import { FILTER_ALL } from '@/constants/query';

export interface IGetAllFilter {
  categoryID: typeof FILTER_ALL | number;
}

export interface IGetAllArg {
  filter: {
    categoryID: typeof FILTER_ALL | number;
  };
}
