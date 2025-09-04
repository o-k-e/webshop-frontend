// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { useProductQueryStore } from '../stores/useProductQueryStore';
import type { PaginatedProducts } from '../types/pagination';

const useProducts = () => {
  // fontos: ne adjunk vissza új objektumot minden rendernél
  const search = useProductQueryStore(s => s.search);
  const categoryId = useProductQueryStore(s => s.categoryId);
  const page = useProductQueryStore(s => s.page);
  const size = useProductQueryStore(s => s.size);
  const sortField = useProductQueryStore(s => s.sort.field);
  const sortDir   = useProductQueryStore(s => s.sort.direction);

  return useQuery<PaginatedProducts>({
    
    queryKey: ['products', search, categoryId, page, size, sortField, sortDir],
    queryFn: async () => {
      const res = await apiClient.get('/products/search', {
        params: {
          query: search || undefined,
          categoryId: categoryId ?? undefined,
          page,
          size,
          sort: `${sortField},${sortDir}`,
        },
      });
      return res.data as PaginatedProducts;
    },
    staleTime: 60_000,
  });
};

export default useProducts;