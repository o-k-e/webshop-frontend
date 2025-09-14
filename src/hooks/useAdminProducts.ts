import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { useAdminProductQueryStore } from '../stores/useAdminProductQueryStore';
import type { PaginatedProducts } from '../types/paginated-products';

const useAdminProducts = () => {
  const page = useAdminProductQueryStore((s) => s.page);
  const size = useAdminProductQueryStore((s) => s.size);
  const sortField = useAdminProductQueryStore((s) => s.sort.field);
  const sortDir = useAdminProductQueryStore((s) => s.sort.direction);

  return useQuery<PaginatedProducts>({
    queryKey: ['admin-products', page, size, sortField, sortDir],
    queryFn: async () => {
      const res = await apiClient.get('/products/search', {
        params: {
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

export default useAdminProducts;