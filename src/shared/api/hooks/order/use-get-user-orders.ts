import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/shared/api/services/order.service';

export const useGetOrders = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrdersByUser()
  });

  return {
    orders: data,
    isLoading,
    isError,
  };
};