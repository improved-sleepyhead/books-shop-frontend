import { useInfiniteQuery } from '@tanstack/react-query';
import { userService } from '@/shared/api/services/user.service';

type UseGetAllUsersParams = {
  limit?: number;
  [key: string]: any;
};

export const useGetAllUsers = (params: UseGetAllUsersParams = {}) => {
  const limit = params.limit ?? 10;

  return useInfiniteQuery({
    queryKey: ['users', params],
    queryFn: async ({ pageParam = 1 }) => {
      return await userService.getAllUsers(pageParam, limit);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? undefined : allPages.length + 1;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};