import { Link } from 'react-router-dom';
import type { Product } from '../../../types/product';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface AdminTableProps {
	products: Product[];
}

const AdminTable = ({ products }: AdminTableProps) => {
	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;

	if (products.length === 0) {
		return <p className="text-gray-500 italic">No products found.</p>;
	}

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border border-gray-200 text-sm">
				<thead className="bg-[#fff6f6]">
					<tr>
						<th className="p-2 border">Image</th>
						<th className="p-2 border text-left">Product Name</th>
						<th className="p-2 border text-right">Price</th>
						<th className="p-2 border text-left">Categories</th>
						<th className="p-2 border">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className="hover:bg-[#fff6f6]">
							<td className="p-2 border text-center">
								<img
									alt={product.productName}
									className="h-12 w-12 object-cover mx-auto rounded"
									src={
										product.images[0]?.url
											? `${imageAPI}${product.images[0].url}`
											: ''
									}
								/>
							</td>
							<td className="p-2 border">{product.productName}</td>
							<td className="p-2 border text-right">
								{product.price.toFixed(0)} Ft
							</td>
							<td className="p-2 border">
								{product.categories.map((cat) => cat.categoryName).join(', ')}
							</td>
							<td className="p-2 border text-center">
								<div className="flex items-center justify-center gap-4">
									<Link
										to={`/admin/products/edit/${product.id}`}
										className="text-amber-800 hover:underline"
									>
										Edit
									</Link>

									<div className="flex items-center gap-1 text-gray-400 italic text-sm">
										<XCircleIcon className="h-4 w-4" />
										Not available
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminTable;
