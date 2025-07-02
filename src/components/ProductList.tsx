import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import DOMPurify from "dompurify";
import apiClient from "../services/api-client";
import ProductListSkeleton from "./ProductListSkeleton";
import handleAxiosError from "../utils/handle-axios-error";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<Product[]>('/products');
        setProducts(response.data);
      } catch (error) {
        const message = handleAxiosError(error);
        setError(message);
        console.log('Error fetching products:', message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <ProductListSkeleton />
  if(error) return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.images[0]?.url || "/images/no-image.jpeg"}
              alt={product.productName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
            <p className="text-lg font-bold mb-2">{product.price} Ft</p>

            <div className="text-sm text-gray-500 mb-2">
              {product.categories.map((cat) => cat.categoryName).join(", ")}
            </div>

            <div
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.productDescription) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList