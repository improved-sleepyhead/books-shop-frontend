import { useInfiniteQuery } from '@tanstack/react-query';
import { orderService } from '@/shared/api/services/order.service';

type OrderFilters = {
  userId?: string;
  limit?: number;
};

export const useGetOrders = (initialFilters: OrderFilters = {}) => {
  const limit = initialFilters.limit ?? 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['orders', initialFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const filters = {
        ...initialFilters,
        page: pageParam,
        limit,
      };

      return await orderService.getOrdersByUser(filters.userId || '', filters);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!initialFilters.userId,
  });

  const allOrders = data?.pages.flat() || [];

  return {
    data: allOrders,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount: allOrders.length,
  };
};