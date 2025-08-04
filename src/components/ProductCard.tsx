import type { Product } from '../types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;
	const shortDescription = product.productDescription
		? product.productDescription.split('</p>')[0] + '</p>'
		: '';

	return (
		<>
			<div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
				<Link to={`/products/${product.id}`}>
					<div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
						<img
							src={imageAPI + product.images[0]?.url}
							alt={product.productName}
							className="w-full h-full object-contain object-center"
						/>
					</div>
				</Link>
				<Link to={`/products/${product.id}`}>
					<h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
				</Link>
				<p className="text-lg font-bold mb-2">{product.price} Ft</p>
				<div className="prose prose-base text-gray-700 max-w-none mb-2"
				dangerouslySetInnerHTML={{ __html: shortDescription }} />
				<Link
					to={`/products/${product.id}`}
					className="inline-block px-2 py-1 rounded border-1 text-[#230e5f] font-medium hover:text-[#cf6b59] transition"
				>
					Details
				</Link>
			</div>
		</>
	);
};

export default ProductCard;
