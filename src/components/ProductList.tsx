import DOMPurify from 'dompurify';
import ProductListSkeleton from './ProductListSkeleton';
import useProducts from '../hooks/useProducts';

const ProductList = () => {
	const { data: products, error, isLoading } = useProducts();

	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;

	if (isLoading) return <ProductListSkeleton />;
	if (error)
		return <p className="p-6 text-red-600">Failed to fetch products</p>;

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Product List</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
				{products?.map((product) => (
					<div
						key={product.id}
						className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
					>
						<div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
							<img
								src={imageAPI + product.images[0]?.url}
								alt={product.productName}
								className="w-full h-full object-cover object-center"
							/>
						</div>
						<h2 className="text-xl font-semibold mb-2">
							{product.productName}
						</h2>
						<p className="text-lg font-bold mb-2">{product.price} Ft</p>

						<div className="text-sm text-gray-500 mb-2">
							{product.categories.map((cat) => cat.categoryName).join(', ')}
						</div>

						<div
							className="text-sm text-gray-700"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(product.productDescription),
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;
