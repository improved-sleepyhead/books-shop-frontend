import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { CreateCategoryDto, ICategory, UpdateCategoryDto } from '@/shared/api/types/category.types';

class CategoryService {
  private BASE_URL = '/categories';

  async getAllCategories(): Promise<ICategory[]> {
    const response = await axiosWithAuth.get<ICategory[]>(this.BASE_URL);
    return response.data;
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const response = await axiosWithAuth.get<ICategory>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async createCategory(dto: CreateCategoryDto): Promise<ICategory> {
    const response = await axiosWithAuth.post<ICategory>(this.BASE_URL, dto);
    return response.data;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<ICategory> {
    const response = await axiosWithAuth.patch<ICategory>(`${this.BASE_URL}/${id}`, dto);
    return response.data;
  }

  async deleteCategory(id: string): Promise<ICategory> {
    const response = await axiosWithAuth.delete<ICategory>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}

export const categoryService = new CategoryService();