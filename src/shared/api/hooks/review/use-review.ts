import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';
import { IReview, UpdateReviewDto } from '@/shared/api/types/review.types';
import { toast } from 'sonner';

export function useReview(reviewId?: string) {
  const queryClient = useQueryClient();

  const {
    data: review,
    isLoading,
    isError,
  } = useQuery<IReview>({
    queryKey: ['review', reviewId],
    queryFn: () => {
      if (!reviewId) throw new Error('Review ID is required');
      return reviewService.getReviewById(reviewId);
    },
    enabled: !!reviewId,
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: reviewService.createReview,
    onSuccess: (newReview) => {
      toast.success('Отзыв успешно создан');
      queryClient.invalidateQueries({ queryKey: ['reviewsByBook', newReview.bookId] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
    onError: () => {
      toast.error('Ошибка при создании отзыва');
    },
  });

  const { mutate: updateReview, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateReviewDto }) => 
      reviewService.updateReview(id, dto),
    onSuccess: (updatedReview) => {
      toast.success('Отзыв обновлён');
      queryClient.setQueryData(['review', updatedReview.id], updatedReview);
      queryClient.invalidateQueries({ queryKey: ['reviewsByBook', updatedReview.bookId] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении отзыва');
    },
  });

  const { mutate: deleteReview, isPending: isDeleting } = useMutation({
    mutationFn: reviewService.deleteReview,
    onSuccess: (deletedReview) => {
      toast.success('Отзыв удалён');
      queryClient.invalidateQueries({ queryKey: ['reviewsByBook', deletedReview.bookId] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
      queryClient.invalidateQueries({ queryKey: ['review', deletedReview.id] });
    },
    onError: () => {
      toast.error('Ошибка при удалении отзыва');
    },
  });

  return {
    review,
    isLoading,
    isError,
    createReview,
    isCreating,
    updateReview,
    isUpdating,
    deleteReview,
    isDeleting,
  };
}