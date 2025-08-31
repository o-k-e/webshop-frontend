import ProductListSkeleton from './ProductListSkeleton';
import useProducts from '../hooks/useProducts';
import handleAxiosError from '../utils/handle-axios-error';
import ProductCard from './ProductCard';
import SortSelect from './filters/SortSelect';

const ProductList = () => {
  const { data, error, isLoading } = useProducts();

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <p className="p-6 text-red-600">{handleAxiosError(error)}</p>;

  const items = data?.content ?? [];
  const page = (data?.page ?? 0) + 1;
  const totalPages = data?.totalPages ?? 1;
  const total = data?.totalElements ?? 0;

  return (
    <div className="p-6 mt-5">
      {/* ↙︎ kis fejlécrész: balra infó, jobbra Sort */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages} — Total {total} products
        </p>
        <SortSelect />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;