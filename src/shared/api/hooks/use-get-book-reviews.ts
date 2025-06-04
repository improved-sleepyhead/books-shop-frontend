import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';

export const useGetReviewsByBookId = (bookId: string) => {
  return useQuery({
    queryKey: ['reviews', 'book', bookId],
    queryFn: () => reviewService.getReviewsByBookId(bookId),
    enabled: !!bookId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};