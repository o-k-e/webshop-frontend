import type { Product } from '../types/product';
import DOMPurify from 'dompurify';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;

	return (
		<>
			<div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
				<div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
					<img
						src={imageAPI + product.images[0]?.url}
						alt={product.productName}
						className="w-full h-full object-contain object-center"
					/>
				</div>
				<h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
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
		</>
	);
};

export default ProductCard;
