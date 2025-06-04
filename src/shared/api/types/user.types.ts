export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IUserProfile {
  totalBooks: number;
  totalReviews: number;
  totalOrders: number;
  vendorProfile?: {
    displayName: string;
    subdomain: string;
    totalBooks: number;
  };
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export type UpdateUserDto = Partial<{
  email: string;
  password: string;
  name: string;
  role: UserRole;
}>;