export type ITag = {
  id: string;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateTagDto = {
  name: string;
};