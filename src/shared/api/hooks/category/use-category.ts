import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/shared/api/services/category.service';
import { CreateCategoryDto, ICategory, UpdateCategoryDto } from '@/shared/api/types/category.types';
import { toast } from 'sonner';

export function useCategory(categoryId?: string) {
  const queryClient = useQueryClient();

  const {
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery<ICategory>({
    queryKey: ['category', categoryId],
    queryFn: () => {
      if (!categoryId) throw new Error('Category ID is required');
      return categoryService.getCategoryById(categoryId);
    },
    enabled: !!categoryId,
  });

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: (newCategory) => {
      toast.success('Категория создана');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.setQueryData(['category', newCategory.id], newCategory);
    },
    onError: () => {
      toast.error('Ошибка при создании категории');
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoryDto }) =>
      categoryService.updateCategory(id, dto),
    onSuccess: (updatedCategory) => {
      toast.success('Категория обновлена');
      queryClient.setQueryData(['category', updatedCategory.id], updatedCategory);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении категории');
    },
  });

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: (deletedCategory) => {
      toast.success('Категория удалена');
      queryClient.invalidateQueries({ queryKey: ['category', deletedCategory.id] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('Ошибка при удалении категории');
    },
  });

  return {
    category,
    
    isCategoryLoading,
    isCreating,
    isUpdating,
    isDeleting,
    
    isCategoryError,
    
    createCategory,
    updateCategory,
    deleteCategory,
  };
}