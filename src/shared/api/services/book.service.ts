import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import {
  BookQueryDto,
  CreateBookDto,
  IBook,
  UpdateBookDto,
  RemoveImageDto,
} from '@/shared/api/types/book.types';
import { appendFormDataFields } from '../constants/map-helper.service';

class BookService {
  private BASE_URL = '/books';

  async getAllBooks(query: BookQueryDto = {}): Promise<IBook[]> {
    const response = await axiosWithAuth.get<IBook[]>(this.BASE_URL, {
      params: query,
    });
    return response.data;
  }

  async getBookById(id: string): Promise<IBook> {
    const response = await axiosWithAuth.get<IBook>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async createBook(dto: CreateBookDto): Promise<IBook> {
    const formData = new FormData();
    
    appendFormDataFields(formData, dto as UpdateBookDto);
    
    if (dto.coverImage) formData.append('coverImage', dto.coverImage);
    if (dto.additionalImages) {
      dto.additionalImages.forEach(img => formData.append('additionalImages', img));
    }

    const response = await axiosWithAuth.post<IBook>(this.BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateBook(id: string, dto: UpdateBookDto): Promise<IBook> {
    const formData = new FormData();
    
    appendFormDataFields(formData, dto);
    
    if (dto.coverImage) formData.append('coverImage', dto.coverImage);
    if (dto.additionalImages) {
      dto.additionalImages.forEach(img => formData.append('additionalImages', img));
    }

    const response = await axiosWithAuth.patch<IBook>(`${this.BASE_URL}/${id}`, formData);
    return response.data;
  }

  async deleteBook(id: string): Promise<void> {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }

  async removeBookImage(id: string, dto: RemoveImageDto): Promise<IBook> {
    const response = await axiosWithAuth.delete<IBook>(`${this.BASE_URL}/${id}/image`, {
      data: dto,
    });
    return response.data;
  }

  async toggleFavorite(bookId: string, userId: string): Promise<IBook> {
    const response = await axiosWithAuth.post<IBook>(`${this.BASE_URL}/${bookId}/favorite`, {
      userId,
    });
    return response.data;
  }

  async getFavorites(userId: string, query: Omit<BookQueryDto, 'userId' | 'isFavorite'>): Promise<IBook[]> {
    const response = await axiosWithAuth.get<IBook[]>(`${this.BASE_URL}/user/favorites`, {
      params: { ...query, userId },
    });
    return response.data;
  }
}

export const bookService = new BookService();