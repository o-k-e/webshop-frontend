import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { useAdminProductQueryStore } from '../stores/useAdminProductQueryStore';
import type { PaginatedProducts } from '../types/paginated-products';

const useAdminProducts = () => {
  const page = useAdminProductQueryStore((s) => s.page);
  const size = useAdminProductQueryStore((s) => s.size);
  const sort = useAdminProductQueryStore((s) => s.sort);
  const search = useAdminProductQueryStore((s) => s.search);
  const categoryId = useAdminProductQueryStore((s) => s.categoryId);

  return useQuery<PaginatedProducts>({
    queryKey: ['admin-products', page, size, sort, search, categoryId],
    queryFn: async () => {
      const res = await apiClient.get('/products/search', {
        params: {
          page,
          size,
          sort: `${sort.field},${sort.direction}`,
          query: search || undefined,
          categoryId: categoryId ?? undefined,
        },
      });
      return res.data as PaginatedProducts;
    },
    staleTime: 60_000,
  });
};

export default useAdminProducts;