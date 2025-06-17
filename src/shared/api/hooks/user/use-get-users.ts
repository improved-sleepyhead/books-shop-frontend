import { useInfiniteQuery } from '@tanstack/react-query';
import { userService } from '@/shared/api/services/user.service';

type UserFilters = {
  limit?: number;
};

export const useGetAllUsers = (initialFilters: UserFilters = {}) => {
  const limit = initialFilters.limit ?? 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users', initialFilters],
    queryFn: async ({ pageParam = 1 }) => {
      return await userService.getAllUsers(pageParam, limit);
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

  const allUsers = data?.pages.flat() || [];

  return {
    users: allUsers,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount: allUsers.length,
  };
};