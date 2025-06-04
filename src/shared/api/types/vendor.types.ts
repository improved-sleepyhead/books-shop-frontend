export type IVendor = {
  id: string;
  name: string;
  subdomain: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateVendorDto = {
  name: string;
  subdomain: string;
};

export type UpdateVendorDto = Partial<{
  name: string;
  subdomain: string;
}>;