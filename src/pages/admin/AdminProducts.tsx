import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';
import { useAdminProductQueryStore } from '../../stores/useAdminProductQueryStore';
import AdminSearchBar from './components/AdminSearchBar';
import AdminTable from './components/AdminTable';
import handleAxiosError from '../../utils/handle-axios-error';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import useAdminProducts from '../../hooks/useAdminProducts';
import Pagination from '../../components/Pagination';
import AdminSortSelect from '../../components/filters/AdminSortSelect';

const fetchAdminSearch = async (q: string): Promise<unknown> => {
	const res = await apiClient.get('/products/search', {
		params: { query: q || undefined },
	});
	return res.data;
};

const ensureArray = (data: unknown): Product[] => {
	if (Array.isArray(data)) return data as Product[];
	if (
		data &&
		typeof data === 'object' &&
		Array.isArray((data as any).content)
	) {
		return (data as any).content as Product[];
	}
	return [];
};

const AdminProducts = () => {
	const search = useAdminProductQueryStore((state) => state.search).trim();
	const searchInput = useAdminProductQueryStore((s) => s.searchInput);
	const page = useAdminProductQueryStore((s) => s.page);
	const reset = useAdminProductQueryStore((s) => s.reset);
	const setPage = useAdminProductQueryStore((s) => s.setPage);
	const navigate = useNavigate();

	useEffect(() => {
		const isAtDefault = searchInput === '' && page === 0;
		if (!isAtDefault) {
			reset(); // 👉 reseteli a store-t, ha szükséges
		}
	}, []);

	// Ha van keresési szöveg, ezt használjuk
	const {
		data: searchData,
		error: searchError,
		isLoading: isSearchLoading,
	} = useQuery({
		queryKey: ['admin-search', search],
		queryFn: () => fetchAdminSearch(search),
		enabled: search.length > 0,
	});

	// Ha nincs keresési szöveg, akkor sima paginated lekérés
	const {
		data: allProductsData,
		isLoading: isAllLoading,
		error: allError,
	} = useAdminProducts();

	// Töröljük az URL-ből a ?query=... részt ha törölték a keresést
	useEffect(() => {
		if (search.length === 0) {
			navigate('/admin/products', { replace: true });
		}
	}, [search, navigate]);

	const products =
		search.length > 0
			? ensureArray(searchData)
			: allProductsData?.content || [];

	const isLoading = search.length > 0 ? isSearchLoading : isAllLoading;
	const error = search.length > 0 ? searchError : allError;

	const currentPage =
		search.length > 0
			? (searchData as any)?.number || 0
			: allProductsData?.pageNumber || 0;

	const totalPages =
		search.length > 0
			? (searchData as any)?.totalPages || 1
			: allProductsData?.totalPages || 1;

	return (
		<div className="p-6">
			{/* Felső sáv: kereső + új termék */}
			<div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
				<AdminSearchBar />
				<Link
					to="/admin/products/create-product"
					className="bg-[#953733cc] text-white px-4 py-2 rounded hover:bg-[#953633f1]"
				>
					+ Add Product
				</Link>
			</div>

			{/* Hibakezelés és töltőállapot */}
			{isLoading && <p>Loading products...</p>}
			{error && <p className="text-red-600">{handleAxiosError(error)}</p>}

			{/* Eredmények */}
			{products.length > 0 && (
				<>
					{search.length > 0 && (
						<h2 className="text-xl font-semibold mb-4">
							Results for <span className="italic font-medium">“{search}”</span>
							<span className="italic ml-2 text-sm text-gray-500">
								({products.length})
							</span>
						</h2>
					)}
					{/* ↙︎ kis fejlécrész: balra infó, jobbra sort*/}
					<div className="mb-4 flex items-center justify-between">
						<p className="text-sm text-gray-500">
							Page {currentPage + 1} of {totalPages} — Products {products.length} of{' '}
							{(search.length > 0
								? (searchData as any)?.totalElements
								: allProductsData?.totalElements) ?? 0}
						</p>
						<AdminSortSelect />
					</div>
					<AdminTable products={products} />

					{/* Pagination ha több oldal van */}
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							setPage={setPage}
						/>
					)}
				</>
			)}
			{!isLoading && products.length === 0 && (
				<p className="text-gray-500">No products found.</p>
			)}
		</div>
	);
};

export default AdminProducts;
