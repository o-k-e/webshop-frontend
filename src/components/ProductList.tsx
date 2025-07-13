import ProductListSkeleton from './ProductListSkeleton';
import useProducts from '../hooks/useProducts';
import handleAxiosError from '../utils/handle-axios-error';
import ProductCard from './ProductCard';

const ProductList = () => {
	const { data: products, error, isLoading } = useProducts();

	if (isLoading) return <ProductListSkeleton />;
	if (error)
		return <p className="p-6 text-red-600">{handleAxiosError(error)}</p>;

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Product List</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductList;
