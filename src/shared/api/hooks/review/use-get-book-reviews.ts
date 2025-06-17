import { useInfiniteQuery } from '@tanstack/react-query';
import { reviewService } from '@/shared/api/services/review.service';
import { IReview, PaginationParams } from '@/shared/api/types/review.types';

type ReviewFilters = {
  bookId: string;
  limit?: number;
};

export const useBookReviews = (initialFilters: ReviewFilters) => {
  const limit = initialFilters.limit ?? 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['reviewsByBook', initialFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const filters = {
        ...initialFilters,
        page: pageParam,
        limit,
      };

      return await reviewService.getReviewsByBookId(initialFilters.bookId, filters);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!initialFilters.bookId,
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