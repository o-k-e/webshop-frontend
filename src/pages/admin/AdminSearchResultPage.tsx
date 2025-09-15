import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import { useAdminProductQueryStore } from '../../stores/useAdminProductQueryStore';
import type { Product } from '../../types/product';
import AdminTable from '../../components/AdminTable';
import handleAxiosError from '../../utils/handle-axios-error';
import AdminSearchBar from '../../components/navbar/AdminSearchBar';

const fetchAdminSearch = async (q: string): Promise<unknown> => {
  const res = await apiClient.get('/products/search', {
    params: { query: q || undefined },
  });
  return res.data;
};

const ensureArray = (data: unknown): Product[] => {
  if (Array.isArray(data)) return data as Product[];
  if (
    data &&
    typeof data === 'object' &&
    Array.isArray((data as any).content)
  ) {
    return (data as any).content as Product[];
  }
  return [];
};

const AdminSearchResultsPage = () => {
  const queryText = useAdminProductQueryStore((state) => state.search).trim() || '';

  // Csak akkor fetch-elünk, ha query van
  const { data, error } = useQuery({
    queryKey: ['admin-search', queryText],
    queryFn: () => fetchAdminSearch(queryText),
    enabled: queryText.length > 0,
  });

  if (queryText.length === 0) return <Navigate to="/admin/products" replace />;
//   if (isLoading) return <ProductListSkeleton />;
  if (error) return <p className="p-6 text-red-600">{handleAxiosError(error)}</p>;

  const products = ensureArray(data);

  return (
    <section className="p-6">
        <AdminSearchBar />
      <h2 className="text-xl font-semibold">
        Search results for:{' '}
        <span className="text-[#953733]">&quot;{queryText}&quot;</span>
      </h2>
      <AdminTable products={products} />
    </section>
  );
};

export default AdminSearchResultsPage;