import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';
import { IReview } from '@/shared/api/types/review.types';

export const useGetMyReviews = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<IReview[]>({
    queryKey: ['reviews', 'my'],
    queryFn: () => reviewService.getMyReviews()
  });

  return {
    reviews: data,
    isLoading,
    isError,
  };
};