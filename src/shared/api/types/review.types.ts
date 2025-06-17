export type IReview = {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
};

export type CreateReviewDto = {
  bookId: string;
  rating: number;
  comment?: string;
};

export type UpdateReviewDto = {
  rating?: number;
  comment?: string;
};

export type PaginationParams = {
  skip?: number;
  limit?: number;
};