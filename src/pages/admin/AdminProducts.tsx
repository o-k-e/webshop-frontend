import useAdminProducts from '../../hooks/useAdminProducts';
import { Link } from 'react-router-dom';
import AdminSearchBar from '../../components/navbar/AdminSearchBar';

const AdminProducts = () => {
	const { data, isLoading, error } = useAdminProducts();

	if (isLoading) return <p>Loading products...</p>;
	if (error) return <p>Error loading products</p>;

	return (
		<div className="p-6">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pb-5">
					<AdminSearchBar />
				</div>
				<Link
					to="/admin/products/create-product"
					className="bg-[#953733] text-white px-4 py-2 rounded hover:bg-[#7b2b29]"
				>
					+ Add Product
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-200 text-sm">
					<thead className="bg-gray-100">
						<tr>
							<th className="p-2 border">Image</th>
							<th className="p-2 border text-left">Product Name</th>
							<th className="p-2 border text-right">Price</th>
							<th className="p-2 border text-left">Categories</th>
							<th className="p-2 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data?.content.map((product) => (
							<tr key={product.id} className="hover:bg-gray-50">
								<td className="p-2 border text-center">
									<img
										alt="Clear Quartz Bracelet"
										className="h-12 w-12 object-cover mx-auto rounded"
										src={`${import.meta.env.VITE_IMAGEAPI_URL}${
											product.images[0]?.url
										}`}
									/>
								</td>
								<td className="p-2 border">{product.productName}</td>
								<td className="p-2 border text-right">
									{product.price.toFixed(0)} Ft
								</td>
								<td className="p-2 border">
									{product.categories.map((cat) => cat.categoryName).join(', ')}
								</td>
								<td className="p-2 border text-center space-x-2">
									<Link
										to={`/admin/products/edit/${product.id}`}
										className="text-blue-600 hover:underline"
									>
										Edit
									</Link>
									<span className="text-gray-400 italic text-sm">
										Not available
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminProducts;
