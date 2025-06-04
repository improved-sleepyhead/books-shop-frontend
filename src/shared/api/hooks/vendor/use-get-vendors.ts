import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/shared/api/services/vendor.service';
import { IVendor } from '@/shared/api/types/vendor.types';

export const useGetAllVendors = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<IVendor[]>({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getAllVendors(),
  });

  return {
    vendors: data,
    isLoading,
    isError,
  };
};