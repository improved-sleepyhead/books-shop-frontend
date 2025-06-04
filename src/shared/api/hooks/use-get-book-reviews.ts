import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';
import { IReview } from '@/shared/api/types/review.types';

export const useGetReviewsByBookId = (bookId: string) => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<IReview[]>({
    queryKey: ['reviews', 'book', bookId],
    queryFn: () => {
      if (!bookId) {
        throw new Error('Book ID is required');
      }
      return reviewService.getReviewsByBookId(bookId);
    }
  });

  return {
    reviews: data,
    isLoading,
    isError,
  };
};