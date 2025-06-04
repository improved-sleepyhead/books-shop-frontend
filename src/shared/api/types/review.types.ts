export type IReview = {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateReviewDto = {
  bookId: string;
  rating: number;
  comment: string;
};

export type UpdateReviewDto = Partial<{
  rating: number;
  comment: string;
}>;