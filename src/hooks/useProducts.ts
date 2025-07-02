import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import apiClient from "../services/api-client";

const useProducts = () => {
    return useQuery<Product[]>({
      queryKey: ["products"],
      queryFn: () => apiClient.get("/products").then((res) => res.data),
    });
  };

export default useProducts;