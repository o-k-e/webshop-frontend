import { useQuery } from "@tanstack/react-query"
import type { Product } from "../types/product";
import apiClient from "../services/api-client"

const useProduct = (id: string | undefined) => {
    return useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => apiClient.get(`/products/${id}`).then(res => res.data),
        enabled: !!id,
    });
};

export default useProduct;