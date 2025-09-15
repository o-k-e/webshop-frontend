import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import { useAdminProductQueryStore } from '../stores/useAdminProductQueryStore';
import type { PaginatedProducts } from '../types/paginated-products';

const useAdminProducts = () => {

  const search = useAdminProductQueryStore(s => s.search);
  const categoryId = useAdminProductQueryStore((s) => s.categoryId);
  const page = useAdminProductQueryStore((s) => s.page);
  const size = useAdminProductQueryStore(s => s.size);
  const sortField = useAdminProductQueryStore(s => s.sort.field);
  const sortDir   = useAdminProductQueryStore(s => s.sort.direction);

  return useQuery<PaginatedProducts>({
    queryKey: ['admin-products', search, categoryId, page, size, sortField, sortDir],
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

export default useAdminProducts;