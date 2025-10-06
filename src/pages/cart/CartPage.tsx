import { useCartStore } from '../../stores/useCartStore';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

export const CartPage = () => {
	const items = useCartStore((state) => state.items);
	const totalPrice = useCartStore((state) => state.totalPrice());
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const totalItems = useCartStore((state) => state.totalItems());
	const clearCart = useCartStore((state) => state.clearCart);

	if (items.length === 0) {
		return (
			<section className="max-w-4xl mx-auto p-6 text-center pt-20 pb-160">
				<h1 className="text-2xl font-bold mb-4">Cart is empty 🛒</h1>
				<Link
					to="/"
					className="inline-block mt-4 px-6 py-3 bg-[#f0dadacc] cursor-pointer rounded-xl hover:bg-[#b03939cc] hover:text-white transition"
				>
					Back to Shop
				</Link>
			</section>
		);
	}

	return (
		<section className="max-w-6xl mx-auto pt-10 pb-20">
			<h1 className="text-3xl font-bold mb-6">Your Cart ({totalItems})</h1>

			{/* Cart termek lista */}
			<div className="space-y-6">
				{items.map((item) => (
					<div
						key={item.productId}
						className="flex items-center justify-between border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
					>
						{/* BAL OLDAL: kép + név + quantity */}
						<div className="flex items-center gap-4">
							<img
								src={item.imageUrl}
								alt={item.productName}
								className="w-20 h-20 object-contain rounded-md"
							/>
							<div className="pl-3">
								<p className="font-semibold">{item.productName}</p>

								{/* mennyiség gombok + ár egy sorban */}
								<div className="flex items-center gap-4 mt-2">
									{/* + / - gombcsoport */}
									<div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
										<button
											type="button"
											onClick={() =>
												updateQuantity(
													item.productId,
													Math.max(item.quantity - 1, 1)
												)
											}
											className="text-lg px-2 text-gray-700 hover:text-black cursor-pointer"
											aria-label="Decrease quantity"
										>
											−
										</button>
										<span className="mx-2 text-base font-medium">
											{item.quantity}
										</span>
										<button
											type="button"
											onClick={() =>
												updateQuantity(item.productId, item.quantity + 1)
											}
											className="text-lg px-2 text-gray-700 hover:text-black cursor-pointer"
											aria-label="Increase quantity"
										>
											+
										</button>
									</div>

									{/* ár (mennyiség alapján) */}
									<p>{formatPrice(item.price * item.quantity)}</p>
								</div>
							</div>
						</div>

						{/* JOBB OLDAL: ár + törlés */}
						<div className="flex items-center">
							<button
								type="button"
								onClick={() => removeItem(item.productId)}
								className="text-gray-700 hover:text-red-600 transition cursor-pointer"
								aria-label={`Remove ${item.productName}`}
							>
								<BsTrash size={24} />
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Summary */}
			<div className="mt-10 border-t border-gray-300 pt-6 text-right pb-30">
				<p className="text-lg font-semibold mb-4">
					Total: {formatPrice(totalPrice)}
				</p>

				<div className="flex justify-end gap-4">
					<button
						className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition cursor-pointer"
						onClick={() => clearCart()}
					>
						Clear Cart
					</button>

					<button
						className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition cursor-pointer"
						onClick={() => {
							// TODO: payment page
						}}
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</section>
	);
};
