import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { CreateTagDto, ITag, UpdateTagDto } from '@/shared/api/types/tag.types';

class TagService {
  private BASE_URL = '/tags';

  async getAllTags(): Promise<ITag[]> {
    const response = await axiosWithAuth.get<ITag[]>(this.BASE_URL);
    return response.data;
  }

  async getTagById(id: string): Promise<ITag> {
    const response = await axiosWithAuth.get<ITag>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async createTag(dto: CreateTagDto): Promise<ITag> {
    const response = await axiosWithAuth.post<ITag>(this.BASE_URL, dto);
    return response.data;
  }

  async updateTag(id: string, dto: UpdateTagDto): Promise<ITag> {
    const response = await axiosWithAuth.patch<ITag>(`${this.BASE_URL}/${id}`, dto);
    return response.data;
  }

  async deleteTag(id: string): Promise<ITag> {
    const response = await axiosWithAuth.delete<ITag>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}

export const tagService = new TagService();