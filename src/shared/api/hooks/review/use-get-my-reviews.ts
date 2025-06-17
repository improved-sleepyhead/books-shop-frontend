import { useInfiniteQuery } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';
import { IReview, PaginationParams } from '@/shared/api/types/review.types';

type MyReviewsFilters = {
  limit?: number;
};

export const useMyReviews = (initialFilters: MyReviewsFilters = {}) => {
  const limit = initialFilters.limit ?? 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['myReviews', initialFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const filters = {
        ...initialFilters,
        page: pageParam,
        limit,
      };

      return await reviewService.getMyReviews(filters);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const reviews = data?.pages.flat() || [];

  return {
    data: reviews,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount: reviews.length,
  };
};