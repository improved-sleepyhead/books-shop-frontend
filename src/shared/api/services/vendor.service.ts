import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { CreateVendorDto, IVendor, UpdateVendorDto } from '../types/vendor.types';

class VendorService {
  private BASE_URL = '/vendors';

  async getAllVendors(): Promise<IVendor[]> {
    const response = await axiosWithAuth.get<IVendor[]>(this.BASE_URL);
    return response.data;
  }

  async getVendorById(id: string): Promise<IVendor> {
    const response = await axiosWithAuth.get<IVendor>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async createVendor(dto: CreateVendorDto): Promise<IVendor> {
    const response = await axiosWithAuth.post<IVendor>(this.BASE_URL, dto);
    return response.data;
  }

  async updateVendor(id: string, dto: UpdateVendorDto): Promise<IVendor> {
    const response = await axiosWithAuth.patch<IVendor>(`${this.BASE_URL}/${id}`, dto);
    return response.data;
  }

  async deleteVendor(id: string): Promise<void> {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }
}

export const vendorService = new VendorService();