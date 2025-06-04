import { useInfiniteQuery } from '@tanstack/react-query';
import { bookService } from '@/shared/api/services/book.service';

type BookFilters = {
  search?: string;
  vendorId?: string;
  limit?: number;
};

export const useGetAllBooks = (initialFilters: BookFilters = {}) => {
  const limit = initialFilters.limit ?? 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['books', initialFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const filters = {
        ...initialFilters,
        page: pageParam,
        limit,
      };

      return await bookService.getAllBooks(filters);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.length < limit ? undefined : undefined; // можно убрать, если не нужно вычислять дальше
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};