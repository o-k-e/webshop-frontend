import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import useAdminProducts from '../../hooks/useAdminProducts';
import AdminSearchBar from '../../components/navbar/AdminSearchBar';
import AdminTable from '../../components/AdminTable';
import { useAdminProductQueryStore } from '../../stores/useAdminProductQueryStore';

const AdminSearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const setSearch = useAdminProductQueryStore((s) => s.setSearch);

  // Beállítjuk a Zustand store-t a query param alapján
  useEffect(() => {
    setSearch(query.trim());
  }, [query]);

  const { data, isLoading, error } = useAdminProducts();

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

      <h2 className="text-xl font-semibold pb-4">
        Search results for: <span className="text-gold italic">"{query}"</span>
      </h2>

      {isLoading && <p>Loading products...</p>}
      {error && <p>Error loading products.</p>}

      <AdminTable products={data?.content ?? []} />
    </div>
  );
};

export default AdminSearchResultsPage;