export type IOrder = {
  id: string;
  userId: string;
  bookId: string;
  status: string;
  totalPrice: number;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateOrderDto = {
  bookId: string;
  quantity?: number;
};