import { useEffect, useState } from "react";
import type { Product } from "../types/product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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
              dangerouslySetInnerHTML={{ __html: product.productDescription }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}