export type IBook = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  isbn: string;
  digital: boolean;
  author?: string | null;
  publishedAt?: Date | null;
  publisher?: string | null;
  coverUrl?: string | null;
  imageUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number | null;
  isFavorite?: boolean;
  commentsCount?: number | null;
};

export type CreateBookDto = {
  title: string;
  description?: string;
  price: number;
  isbn: string;
  digital?: boolean;
  author?: string;
  publishedAt?: string;
  publisher?: string;
  categoryIds?: string[];
  tagIds?: string[];
  coverUrl?: string;
  imageUrls?: string[];
  coverImage?: File;
  additionalImages?: File[];
};

export type UpdateBookDto = Partial<CreateBookDto> & {
  existingImageUrls?: string[];
};

export type BookQueryDto = {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
  isbn?: string;
  digital?: boolean;
  minPrice?: number;
  maxPrice?: number;
  userId?: string;
  isFavorite?: boolean;
  search?: string;
};

export type RemoveImageDto = {
  imageUrl: string;
};