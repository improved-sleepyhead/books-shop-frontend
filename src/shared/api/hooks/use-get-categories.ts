import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/shared/api/services/category.service';

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};