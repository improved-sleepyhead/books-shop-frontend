import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';
import { IReview } from '@/shared/api/types/review.types';
import { toast } from 'sonner';

type UseReviewParams = {
  id?: string;
};

export function useReview({ id }: UseReviewParams = {}) {
  const queryClient = useQueryClient();

  const {
    data: review,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = useQuery<IReview>({
    queryKey: ['review', id],
    queryFn: () => {
      if (!id) throw new Error('Review ID is required');
      return reviewService.getReviewById(id);
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: (dto: Parameters<typeof reviewService.createReview>[0]) =>
      reviewService.createReview(dto),
    onSuccess: (newReview) => {
      toast.success('Отзыв успешно создан');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['book-reviews', newReview.bookId] });
      if (newReview.id) {
        queryClient.invalidateQueries({ queryKey: ['review', newReview.id] });
      }
    },
    onError: () => {
      toast.error('Ошибка при создании отзыва');
    },
  });

  const { mutate: updateReview, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof reviewService.updateReview>[1] }) =>
      reviewService.updateReview(id, dto),
    onSuccess: (_, variables) => {
      toast.success('Отзыв успешно обновлён');
      queryClient.invalidateQueries({ queryKey: ['review', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении отзыва');
    },
  });

  const { mutate: deleteReview, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => reviewService.deleteReview(id),
    onSuccess: (_, deletedId) => {
      toast.success('Отзыв успешно удалён');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review', deletedId] });
    },
    onError: () => {
      toast.error('Ошибка при удалении отзыва');
    },
  });

  return {
    review,
    isReviewLoading,
    isReviewError,

    createReview,
    isCreating,

    updateReview,
    isUpdating,

    deleteReview,
    isDeleting,
  };
}