import type { Product } from './product';

export type PaginatedProducts = {
  content: Product[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  last: boolean;
};