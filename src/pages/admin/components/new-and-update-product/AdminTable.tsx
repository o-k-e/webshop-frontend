import { Link } from 'react-router-dom';
import type { Product } from '../../../../types/product';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
// import { XCircleIcon } from '@heroicons/react/24/outline';
import PriceSortDropdown from '../filter-table-header/PriceSortDropdown';
import CategoryFilterDropdown from '../filter-table-header/CategoryFilterDropdown';
import NameSortDropdown from '../filter-table-header/NameSortDropdown';

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
			<table className="min-w-full border border-gray-300 border-collapse text-sm">
				<thead className="bg-[#f0dadacc]">
					<tr>
						<th className="p-4 border border-gray-300">Image</th>
						<th className="p-4 border border-gray-300 text-left">
							<NameSortDropdown />
						</th>
						<th className="p-4 border border-gray-300 text-left bg-[#f0dadacc]">
							<PriceSortDropdown />
						</th>
						<th className="p-4 border border-gray-300 text-left">
							<CategoryFilterDropdown />
						</th>
						<th className="p-4 border border-gray-300">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className="hover:bg-[#fff6f6]">
							<td className="p-2 border border-gray-200 text-center">
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
							<td className="p-2 border border-gray-200">
								{product.productName}
							</td>
							<td className="p-2 border border-gray-200 text-right">
								{product.price.toFixed(0)} Ft
							</td>
							<td className="p-2 border border-gray-200">
								{product.categories.map((cat) => cat.categoryName).join(', ')}
							</td>
							<td className="p-2 border border-gray-200 text-center">
								<div className="flex items-center justify-center gap-4">
									<Link
										to={`/admin/products/edit/${product.id}`}
										className="text-amber-800 border border-transparent hover:border-amber-800 px-2 py-1 rounded transition-colors duration-200"
									>
										Edit
									</Link>

									<div className="flex items-center gap-1 text-gray-400 italic text-sm">
										<CheckCircleIcon className="h-4 w-4" />
										Available
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
