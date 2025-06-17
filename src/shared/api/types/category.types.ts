export interface ICategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

export interface CreateCategoryDto {
  name: string;
  imageUrl?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}