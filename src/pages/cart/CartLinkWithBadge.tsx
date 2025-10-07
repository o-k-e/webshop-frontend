import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";

const CartLinkWithBadge = () => {
    const totalItems = useCartStore((state) => state.totalItems());

    return (
        <div className="relative">
            <FiShoppingCart size={18} />
            {totalItems > 0 && (
                <span className="absolute -top-3 -right-2 text-xs bg-gray-900 text-white font-semibold rounded-full px-1.5 py-0.5">
                    {totalItems}
                </span>
            )}
        </div>
    );
};

export default CartLinkWithBadge;