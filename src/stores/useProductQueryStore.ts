import { create } from 'zustand';
import type { Sort } from '../types/sort';

type ProductQueryState = {
  searchInput: string;     // input field aktuális értéke (azonnal frissül)
  search: string;          // tényleges keresőkifejezés (debounce után)
  categoryId: number | null;
  page: number;
  size: number;
  sort: Sort;

  // Actions
  setSearchInput: (value: string) => void;
  setSearch: (value: string) => void;
  setCategory: (id: number | null) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSort: (patch: Partial<Sort>) => void;
  reset: () => void;
};

export const useProductQueryStore = create<ProductQueryState>((set) => ({
  searchInput: '',
  search: '',
  categoryId: null,
  page: 0,
  size: 20,
  sort: { field: 'id', direction: 'asc' },

  // csak az input mezőt frissíti (nem indít keresést)
  setSearchInput: (value) =>
    set(() => ({
      searchInput: value,
    })),

  // a tényleges keresőkifejezést állítja be (és visszaugrik az első oldalra)
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
      searchInput: '',
      categoryId: null,
      page: 0,
      size: 20,
      sort: { field: 'id', direction: 'asc' },
    })),
}));