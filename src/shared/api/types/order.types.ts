export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface IOrderItem {
  bookId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  customerId: string;
  status: OrderStatus;
  items: IOrderItem[];
  stripePaymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  get totalPrice(): number
}

export interface CreateOrderDto {
  items: {
    bookId: string;
    quantity: number;
    price: number;
  }[];
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}