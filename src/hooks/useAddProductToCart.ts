import { toast } from 'react-hot-toast';
import { useCartStore } from '../stores/useCartStore';
import type { Product } from '../types/product';

const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;

export function useAddProductToCart() {
	const addItem = useCartStore((state) => state.addItem);

	const addToCart = (product: Product, quantity = 1) => {

		addItem({
			productId: product.id,
			productName: product.productName,
			price: product.price,
			quantity,
			imageUrl: imageAPI + product.images[0]?.url || '',
		});

		toast.success(`${product.productName} added to cart!`, {
			icon: '🛒',
		});
	};

	return addToCart;
}