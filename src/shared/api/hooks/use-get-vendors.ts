import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/shared/api/services/vendor.service';

export const useGetAllVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getAllVendors(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};