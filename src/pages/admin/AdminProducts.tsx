import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminProductQueryStore } from '../../stores/useAdminProductQueryStore';
import useAdminProducts from '../../hooks/useAdminProducts';
import AdminSearchBar from '../../components/navbar/AdminSearchBar';
import AdminTable from '../../components/AdminTable';

const AdminProducts = () => {
  const location = useLocation();
  const setSearch = useAdminProductQueryStore((s) => s.setSearch);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    setSearch(query);
  }, [location.search]);

  const { data, isLoading, error } = useAdminProducts();

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <AdminSearchBar />
      </div>

      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-600">Error loading products.</p>}
      {data && <AdminTable products={data.content} />}
    </div>
  );
};

export default AdminProducts;