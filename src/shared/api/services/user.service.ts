import { axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { CreateUserDto, IUser, IUserProfile, UpdateUserDto } from '@/shared/api/types/user.types';

class UserService {
  private BASE_URL = '/users';

  async getCurrentUser(): Promise<IUser> {
    const response = await axiosWithAuth.get<IUser>(`${this.BASE_URL}/me`);
    return response.data;
  }

  async getCurrentUserProfile(): Promise<IUserProfile> {
    const response = await axiosWithAuth.get<IUserProfile>(`${this.BASE_URL}/me/profile`);
    return response.data;
  }

  async getUserById(id: string): Promise<IUser> {
    const response = await axiosWithAuth.get<IUser>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<IUser[]> {
    const response = await axiosWithAuth.get<IUser[]>(`${this.BASE_URL}`, {
      params: { page, limit },
    });
    return response.data;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const response = await axiosWithAuth.get<IUser>(`${this.BASE_URL}/email/${email}`);
    return response.data;
  }

  async createUser(data: CreateUserDto): Promise<IUser> {
    const response = await axiosWithAuth.post<IUser>(`${this.BASE_URL}`, data);
    return response.data;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<IUser> {
    const response = await axiosWithAuth.patch<IUser>(`${this.BASE_URL}/${id}`, data);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }
}

export const userService = new UserService();