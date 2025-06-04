import { useQuery } from '@tanstack/react-query';
import { tagService } from '@/shared/api/services/tag.service';

export const useGetAllTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => tagService.getAllTags(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};