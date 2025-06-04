export type IBook = {
  id: string;
  title: string;
  author: string;
  price: number;
  vendorId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateBookDto = {
  title: string;
  author: string;
  price: number;
};

export type UpdateBookDto = Partial<{
  title: string;
  author: string;
  price: number;
}>;

export type BookQueryDto = {
  search?: string;
  vendorId?: string;
  page?: number;
  limit?: number;
};