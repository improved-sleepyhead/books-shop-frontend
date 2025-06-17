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
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: (dto: Parameters<typeof orderService.createOrder>[0]) =>
      orderService.createOrder(dto),
    onSuccess: (newOrder) => {
      toast.success('Заказ успешно создан');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.setQueryData(['order', newOrder.id], newOrder);
    },
    onError: () => {
      toast.error('Ошибка при создании заказа');
    },
  });

  const { mutate: updateOrderStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateOrderStatus(id, status),
    onSuccess: (updatedOrder) => {
      toast.success('Статус заказа успешно изменён');
      queryClient.setQueryData(['order', updatedOrder.id], updatedOrder);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => {
      toast.error('Ошибка при изменении статуса заказа');
    },
  });

  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: (_, deletedId) => {
      toast.success('Заказ успешно удалён');
      queryClient.removeQueries({ queryKey: ['order', deletedId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
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

    updateOrderStatus,
    isUpdatingStatus,

    deleteOrder,
    isDeleting,
  };
}