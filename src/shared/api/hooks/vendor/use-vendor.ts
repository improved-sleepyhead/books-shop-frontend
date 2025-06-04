import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorService } from '@/shared/api/services/vendor.service';
import { IVendor } from '@/shared/api/types/vendor.types';
import { toast } from 'sonner';

type UseVendorParams = {
  id?: string;
};

export function useVendor({ id }: UseVendorParams = {}) {
  const queryClient = useQueryClient();

  const {
    data: vendor,
    isLoading: isVendorLoading,
    isError: isVendorError,
  } = useQuery<IVendor>({
    queryKey: ['vendor', id],
    queryFn: () => {
      if (!id) throw new Error('Vendor ID is required');
      return vendorService.getVendorById(id);
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: createVendor, isPending: isCreating } = useMutation({
    mutationFn: (dto: Parameters<typeof vendorService.createVendor>[0]) =>
      vendorService.createVendor(dto),
    onSuccess: (newVendor) => {
      toast.success('Продавец успешно создан');
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      if (newVendor.id) {
        queryClient.invalidateQueries({ queryKey: ['vendor', newVendor.id] });
      }
    },
    onError: () => {
      toast.error('Ошибка при создании продавца');
    },
  });

  const { mutate: updateVendor, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof vendorService.updateVendor>[1] }) =>
      vendorService.updateVendor(id, dto),
    onSuccess: (_, variables) => {
      toast.success('Продавец успешно обновлён');
      queryClient.invalidateQueries({ queryKey: ['vendor', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении продавца');
    },
  });

  const { mutate: deleteVendor, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => vendorService.deleteVendor(id),
    onSuccess: (deletedId) => {
      toast.success('Продавец успешно удалён');
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', deletedId] });
    },
    onError: () => {
      toast.error('Ошибка при удалении продавца');
    },
  });

  return {
    vendor,
    isVendorLoading,
    isVendorError,

    createVendor,
    isCreating,

    updateVendor,
    isUpdating,

    deleteVendor,
    isDeleting,
  };
}