import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { bookService } from '@/shared/api/services/book.service';
import { IBook, BookQueryDto, RemoveImageDto } from '@/shared/api/types/book.types';
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
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutate: createBook, isPending: isCreating } = useMutation({
    mutationFn: bookService.createBook,
    onSuccess: (newBook) => {
      toast.success('Книга успешно создана');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.setQueryData(['book', newBook.id], newBook);
    },
    onError: () => {
      toast.error('Ошибка при создании книги');
    },
  });

  const { mutate: updateBook, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof bookService.updateBook>[1] }) =>
      bookService.updateBook(id, dto),
    onSuccess: (updatedBook) => {
      toast.success('Книга успешно обновлена');
      queryClient.setQueryData(['book', updatedBook.id], updatedBook);
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении книги');
    },
  });

  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: bookService.deleteBook,
    onSuccess: (_, id) => {
      toast.success('Книга успешно удалена');
      queryClient.removeQueries({ queryKey: ['book', id] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: () => {
      toast.error('Ошибка при удалении книги');
    },
  });

  const { mutate: removeBookImage } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: RemoveImageDto }) =>
      bookService.removeBookImage(id, dto),
    onSuccess: (updatedBook) => {
      queryClient.setQueryData(['book', updatedBook.id], updatedBook);
    },
    onError: () => {
      toast.error('Ошибка при удалении изображения');
    },
  });

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: ({ bookId, userId }: { bookId: string; userId: string }) =>
      bookService.toggleFavorite(bookId, userId),
    onSuccess: (updatedBook) => {
      queryClient.setQueryData(['book', updatedBook.id], updatedBook);
      queryClient.invalidateQueries({ queryKey: ['favorite-books'] });
    },
  });

  const useBooksQuery = (query: BookQueryDto = {}) => {
    return useInfiniteQuery({
      queryKey: ['books', query],
      queryFn: ({ pageParam = 1 }) => 
        bookService.getAllBooks({ ...query, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => 
        lastPage.length === (query.limit || 10) ? allPages.length + 1 : undefined,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useFavoriteBooks = (userId: string, query: Omit<BookQueryDto, 'userId' | 'isFavorite'> = {}) => {
    return useQuery<IBook[]>({
      queryKey: ['favorite-books', userId, query],
      queryFn: () => bookService.getFavorites(userId, query),
      staleTime: 5 * 60 * 1000,
    });
  };

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

    removeBookImage,

    toggleFavorite,

    useBooksQuery,
    useFavoriteBooks,
  };
}