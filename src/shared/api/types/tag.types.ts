export interface ITag {
  id: string;
  name: string;
  slug: string;
}

export interface CreateTagDto {
  name: string;
}

export interface UpdateTagDto extends Partial<CreateTagDto> {}