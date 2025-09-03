import { useSearchParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import type { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import ProductListSkeleton from '../components/ProductListSkeleton';
import handleAxiosError from '../utils/handle-axios-error';

const fetchSearch = async (q: string): Promise<unknown> => {
  const res = await apiClient.get('/products/search', { params: { query: q || undefined } });
  return res.data;
};

const ensureArray = (data: unknown): Product[] => {
  if (Array.isArray(data)) return data as Product[];
  if (data && typeof data === 'object' && Array.isArray((data as any).content)) {
    return (data as any).content as Product[];
  }
  return [];
};

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const queryText = (searchParams.get('query') ?? '').trim();

  // üres query → azonnal vissza a főoldalra
  if (!queryText) return <Navigate to="/" replace />;

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', queryText],
    queryFn: () => fetchSearch(queryText),
    enabled: queryText.length > 0,
  });

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <p className="p-6 text-red-600">{handleAxiosError(error)}</p>;

  const items = ensureArray(data);

  return (
    <div className="p-6 mt-20">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">
          Results for “{queryText}”
          <span className="ml-2 text-sm text-gray-500">({items.length})</span>
        </h1>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;