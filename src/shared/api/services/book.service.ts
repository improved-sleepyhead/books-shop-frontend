import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { BookQueryDto, CreateBookDto, IBook, UpdateBookDto } from '@/shared/api/types/book.types';

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
    const response = await axiosWithAuth.post<IBook>(this.BASE_URL, dto);
    return response.data;
  }

  async updateBook(id: string, dto: UpdateBookDto): Promise<IBook> {
    const response = await axiosWithAuth.patch<IBook>(`${this.BASE_URL}/${id}`, dto);
    return response.data;
  }

  async deleteBook(id: string): Promise<void> {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }
}

export const bookService = new BookService();