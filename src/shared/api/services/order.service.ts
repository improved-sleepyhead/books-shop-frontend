import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { CreateOrderDto, IOrder, PaginationParams } from '@/shared/api/types/order.types';

class OrderService {
  private BASE_URL = '/orders';

  async createOrder(dto: CreateOrderDto): Promise<IOrder> {
    const response = await axiosWithAuth.post<IOrder>(this.BASE_URL, dto);
    return response.data;
  }

  async getOrderById(id: string): Promise<IOrder> {
    const response = await axiosWithAuth.get<IOrder>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async getOrdersByUser(userId: string, pagination?: PaginationParams): Promise<IOrder[]> {
    const response = await axiosWithAuth.get<IOrder[]>(this.BASE_URL, {
      params: { ...pagination, userId }
    });
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }

  async updateOrderStatus(id: string, status: string): Promise<IOrder> {
    const response = await axiosWithAuth.patch<IOrder>(
      `${this.BASE_URL}/${id}/status`,
      { status }
    );
    return response.data;
  }
}

export const orderService = new OrderService();