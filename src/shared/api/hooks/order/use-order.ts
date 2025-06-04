import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/shared/api/services/order.service';
import { IOrder } from '@/shared/api/types/order.types';
import { toast } from 'sonner';

type UseOrderParams = {
  id?: string;
};

export function useOrder({ id }: UseOrderParams = {}) {
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useQuery<IOrder>({
    queryKey: ['order', id],
    queryFn: () => {
      if (!id) throw new Error('Order ID is required');
      return orderService.getOrderById(id);
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: (dto: Parameters<typeof orderService.createOrder>[0]) =>
      orderService.createOrder(dto),
    onSuccess: (newOrder) => {
      toast.success('Заказ успешно создан');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (newOrder.id) {
        queryClient.invalidateQueries({ queryKey: ['order', newOrder.id] });
      }
    },
    onError: () => {
      toast.error('Ошибка при создании заказа');
    },
  });

  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: (deletedId) => {
      toast.success('Заказ успешно удалён');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', deletedId] });
    },
    onError: () => {
      toast.error('Ошибка при удалении заказа');
    },
  });

  return {
    order,
    isOrderLoading,
    isOrderError,

    createOrder,
    isCreating,

    deleteOrder,
    isDeleting,
  };
}