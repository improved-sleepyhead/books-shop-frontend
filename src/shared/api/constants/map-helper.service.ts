import { UpdateBookDto } from "../types/book.types";

type FormFieldOptions = {
  toString?: boolean;
  isArray?: boolean;
};

const formFieldsMap = new Map<keyof UpdateBookDto | 'existingImageUrls', FormFieldOptions>(
  [
    ['title', {}],
    ['price', { toString: true }],
    ['isbn', {}],
    ['description', {}],
    ['digital', { toString: true }],
    ['author', {}],
    ['publishedAt', {}],
    ['publisher', {}],
    ['categoryIds', { isArray: true }],
    ['tagIds', { isArray: true }],
    ['existingImageUrls', { isArray: true }],
  ] as Array<[keyof UpdateBookDto | 'existingImageUrls', FormFieldOptions]>
);

export const appendFormDataFields = (formData: FormData, dto: UpdateBookDto) => {
  formFieldsMap.forEach((options, field) => {
    const value = dto[field];
    if (value !== undefined && value !== null) {
      if (options.isArray && Array.isArray(value)) {
        value.forEach(item => formData.append(`${field}[]`, item));
      } else {
        const fieldValue = options.toString ? String(value) : value;
        formData.append(field, fieldValue as string);
      }
    }
  });
}