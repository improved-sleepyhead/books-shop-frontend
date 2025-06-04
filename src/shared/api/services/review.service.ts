import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import {
  IReview,
  CreateReviewDto,
  UpdateReviewDto,
} from '@/shared/api/types/review.types';

class ReviewService {
  private BASE_URL = '/reviews';

  async createReview(dto: CreateReviewDto): Promise<IReview> {
    const response = await axiosWithAuth.post<IReview>(this.BASE_URL, dto);
    return response.data;
  }

  async getReviewById(id: string): Promise<IReview> {
    const response = await axiosWithAuth.get<IReview>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async getMyReviews(): Promise<IReview[]> {
    const response = await axiosWithAuth.get<IReview[]>(`${this.BASE_URL}/user/me`);
    return response.data;
  }

  async getReviewsByBookId(bookId: string): Promise<IReview[]> {
    const response = await axiosWithAuth.get<IReview[]>(`${this.BASE_URL}/book/${bookId}`);
    return response.data;
  }

  async updateReview(id: string, dto: UpdateReviewDto): Promise<IReview> {
    const response = await axiosWithAuth.patch<IReview>(`${this.BASE_URL}/${id}`, dto);
    return response.data;
  }

  async deleteReview(id: string): Promise<void> {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }
}

export const reviewService = new ReviewService();