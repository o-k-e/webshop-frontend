import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Category {
    id: number;
    categoryName: string;
}

const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => apiClient.get('/categories').then(res => res.data),
    });
};

export default useCategories;

// export const getCategories = async (): Promise<Category[]> => {
//     const res = await apiClient.get<Category[]>('/categories');
//     return res.data;
//   };