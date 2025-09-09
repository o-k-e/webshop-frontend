import type { Product } from './product';

export type PaginatedProducts = {
  content: Product[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  last: boolean;
};