import ProductListSkeleton from './ProductListSkeleton';
import useProducts from '../hooks/useProducts';
import handleAxiosError from '../utils/handle-axios-error';
import ProductCard from './ProductCard';
import SortSelect from './filters/SortSelect';
import Pagination from './Pagination';
import { useProductQueryStore } from '../stores/useProductQueryStore';

const ProductList = () => {
  const { data, error, isLoading } = useProducts();

  const page = useProductQueryStore((s) => s.page); // 0-alapú
  const setPage = useProductQueryStore((s) => s.setPage);

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <p className="p-6 text-red-600">{handleAxiosError(error)}</p>;

  const items = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.totalElements ?? 0;

  return (
    <div className="p-6 pt-10">
      {/* ↙ kis fejlécrész: balra infó, jobbra Sort */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {page + 1} of {totalPages} — Total {total} products
        </p>
        <SortSelect />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination ha több oldal van */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;