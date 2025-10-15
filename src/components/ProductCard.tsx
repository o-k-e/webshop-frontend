import { MdOutlinePageview } from 'react-icons/md';
import type { Product } from '../types/product';
import { Link } from 'react-router-dom';
import { LuShoppingCart } from 'react-icons/lu';
import { formatPrice } from '../utils/formatPrice';
import { useAddProductToCart } from '../hooks/useAddProductToCart';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;
	const shortDescription = product.productDescription
		? product.productDescription.split('</p>')[0] + '</p>'
		: '';
	const firstImage = product.images[0]?.url;

	const addToCart = useAddProductToCart();

	return (
		<>
			<div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition flex flex-col">
				<Link to={`/products/${product.id}`}>
					<div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
						{firstImage ? (
							<img
								src={imageAPI + firstImage}
								alt={product.productName}
								loading="lazy"
								decoding="async"
								className="w-full h-full object-contain object-center"
							/>
						) : (
							// Minimal placeholder arra az esetre, ha egyszer mégis hiányozna a kép
							<div className="w-full h-full bg-gray-100 animate-pulse" />
						)}
					</div>
				</Link>
				<Link to={`/products/${product.id}`}>
					<h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
				</Link>
				<p className="text-lg font-bold mb-2">{formatPrice(product.price)}</p>

				{/* description */}
				<div className="flex-grow">
					<div
						className="prose prose-base text-gray-700 max-w-none mb-4"
						dangerouslySetInnerHTML={{ __html: shortDescription }}
					/>
				</div>

				{/* buttons a kártya alján */}
				<div className="mt-auto w-full rounded-xl border border-gray-300 overflow-hidden grid grid-cols-2">
					<Link
						to={`/products/${product.id}`}
						className="px-3 py-2 bg-[#f0dadacc] hover:bg-[#b03939cc] hover:text-white transition
               flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#953633f1]"
						aria-label={`Details ${product.productName}`}
					>
						<MdOutlinePageview className="h-5 w-5" aria-hidden="true" />
						<span>Details</span>
					</Link>

					<button
						type="button"
						className="px-3 py-2 bg-[#f0dadacc] hover:bg-[#b03939cc] hover:text-white transition cursor-pointer
               flex items-center justify-center gap-2 border-l border-gray-300 focus:outline-none focus-visible:ring-2"
						onClick={() => addToCart(product)}
					>
						<LuShoppingCart size={20} aria-hidden="true" />
						<span>Add to Cart</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
