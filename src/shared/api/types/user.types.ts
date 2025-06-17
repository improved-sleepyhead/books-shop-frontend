export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProfile {
  totalReviews: number;
  totalOrders: number;
  wishlistItemsCount?: number;
  avatarUrl?: string | null;
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

export type UpdateProfileDto = Partial<{
  email: string;
  name: string;
  avatarUrl?: string;
}>;