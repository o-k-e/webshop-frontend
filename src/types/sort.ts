export type SortField = 'id' | 'price' | 'productName';
export type SortDir = 'asc' | 'desc';

export type Sort = {
  field: SortField;
  direction: SortDir;
};