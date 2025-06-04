import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';

export const useGetMyReviews = () => {
  return useQuery({
    queryKey: ['reviews', 'my'],
    queryFn: () => reviewService.getMyReviews(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};