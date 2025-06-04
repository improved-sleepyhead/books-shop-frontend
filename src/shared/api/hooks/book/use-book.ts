import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '@/shared/api/services/book.service';
import { IBook } from '@/shared/api/types/book.types';
import { toast } from 'sonner';

type UseBookParams = {
  id?: string;
};

export function useBook({ id }: UseBookParams = {}) {
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading: isBookLoading,
    isError: isBookError,
  } = useQuery<IBook>({
    queryKey: ['book', id],
    queryFn: () => {
      if (!id) throw new Error('Book ID is required');
      return bookService.getBookById(id);
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: createBook, isPending: isCreating } = useMutation({
    mutationFn: (dto: Parameters<typeof bookService.createBook>[0]) =>
      bookService.createBook(dto),
    onSuccess: (newBook) => {
      toast.success('Книга успешно создана');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      if (newBook.id) {
        queryClient.invalidateQueries({ queryKey: ['book', newBook.id] });
      }
    },
    onError: () => {
      toast.error('Ошибка при создании книги');
    },
  });

  const { mutate: updateBook, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof bookService.updateBook>[1] }) =>
      bookService.updateBook(id, dto),
    onSuccess: (_, variables) => {
      toast.success('Книга успешно обновлена');
      queryClient.invalidateQueries({ queryKey: ['book', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении книги');
    },
  });

  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => bookService.deleteBook(id),
    onSuccess: () => {
      toast.success('Книга успешно удалена');
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: () => {
      toast.error('Ошибка при удалении книги');
    },
  });

  return {
    book,
    isBookLoading,
    isBookError,

    createBook,
    isCreating,

    updateBook,
    isUpdating,

    deleteBook,
    isDeleting,
  };
}