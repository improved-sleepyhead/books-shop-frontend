import { useQuery } from '@tanstack/react-query';
import { tagService } from '@/shared/api/services/tag.service';
import { ITag } from '@/shared/api/types/tag.types';

export const useGetAllTags = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<ITag[]>({
    queryKey: ['tags'],
    queryFn: () => tagService.getAllTags(),
  });

  return {
    tags: data,
    isLoading,
    isError,
  };
};