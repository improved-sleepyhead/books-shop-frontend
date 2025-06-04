export type ICategory = {
  id: string;
  name: string;
  description?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateCategoryDto = {
  name: string;
  description?: string;
};