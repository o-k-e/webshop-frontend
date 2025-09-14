import { create } from 'zustand';
import type { Sort } from '../types/sort';

type AdminProductQueryState = {
  search: string;
  categoryId: number | null;
  page: number;
  size: number;
  sort: Sort;

  // Actions
  setSearch: (value: string) => void;
  setCategory: (id: number | null) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSort: (patch: Partial<Sort>) => void;
  reset: () => void;
};

export const useAdminProductQueryStore = create<AdminProductQueryState>((set) => ({
  search: '',
  categoryId: null,
  page: 0,
  size: 10,
  sort: { field: 'id', direction: 'desc' },

  setSearch: (value) =>
    set(() => ({
      search: value,
      page: 0,
    })),

  setCategory: (id) =>
    set(() => ({
      categoryId: id,
      page: 0,
    })),

  setPage: (page) => set(() => ({ page })),
  setSize: (size) => set(() => ({ size, page: 0 })),
  setSort: (patch) =>
    set((s) => ({
      sort: { ...s.sort, ...patch },
      page: 0,
    })),

  reset: () =>
    set(() => ({
      search: '',
      categoryId: null,
      page: 0,
      size: 10,
      sort: { field: 'id', direction: 'desc' },
    })),
}));