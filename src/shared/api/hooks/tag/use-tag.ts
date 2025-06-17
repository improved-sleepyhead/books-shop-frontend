import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '@/shared/api/services/tag.service';
import { CreateTagDto, ITag, UpdateTagDto } from '@/shared/api/types/tag.types';
import { toast } from 'sonner';

export function useTag(tagId?: string) {
  const queryClient = useQueryClient();

  const {
    data: tag,
    isLoading: isTagLoading,
    isError: isTagError,
  } = useQuery<ITag>({
    queryKey: ['tag', tagId],
    queryFn: () => {
      if (!tagId) throw new Error('Tag ID is required');
      return tagService.getTagById(tagId);
    },
    enabled: !!tagId,
  });

  const { mutate: createTag, isPending: isCreating } = useMutation({
    mutationFn: tagService.createTag,
    onSuccess: (newTag) => {
      toast.success('Тег создан');
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.setQueryData(['tag', newTag.id], newTag);
    },
    onError: () => {
      toast.error('Ошибка при создании тега');
    },
  });

  const { mutate: updateTag, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTagDto }) =>
      tagService.updateTag(id, dto),
    onSuccess: (updatedTag) => {
      toast.success('Тег обновлён');
      queryClient.setQueryData(['tag', updatedTag.id], updatedTag);
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении тега');
    },
  });

  const { mutate: deleteTag, isPending: isDeleting } = useMutation({
    mutationFn: tagService.deleteTag,
    onSuccess: (deletedTag) => {
      toast.success('Тег удалён');
      queryClient.invalidateQueries({ queryKey: ['tag', deletedTag.id] });
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
    onError: () => {
      toast.error('Ошибка при удалении тега');
    },
  });

  return {
    tag,
    
    isTagLoading,
    isCreating,
    isUpdating,
    isDeleting,
    
    isTagError,
    
    createTag,
    updateTag,
    deleteTag,
  };
}