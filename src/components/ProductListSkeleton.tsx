const ProductListSkeleton = () => {
	return (
		<div className="p-6 mt-10">
			<div className="text-gray-400 mb-5">Loading products...</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className="border border-gray-200 rounded-xl p-4 shadow-sm"
					>
						<div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
						<div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
						<div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-2"></div>
						<div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
						<div className="h-3 w-2/3 bg-gray-200 animate-pulse rounded"></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductListSkeleton;
