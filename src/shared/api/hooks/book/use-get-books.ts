import { useInfiniteQuery } from '@tanstack/react-query';
import { bookService } from '@/shared/api/services/book.service';

type BookFilters = {
  search?: string;
  title?: string;
  author?: string;
  isbn?: string;
  digital?: boolean;
  minPrice?: number;
  maxPrice?: number;
  userId?: string;
  isFavorite?: boolean;
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
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const allBooks = data?.pages.flat() || [];

  return {
    data: allBooks,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount: allBooks.length,
  };
};