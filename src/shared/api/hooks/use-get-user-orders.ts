import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/shared/api/services/category.service';
import { ICategory } from '@/shared/api/types/category.types';

export const useGetAllCategories = () => {
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    categories: data,
    isLoading,
    isError,
    refetchCategories: refetch,
  };
};