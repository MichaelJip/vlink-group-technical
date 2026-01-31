import { useQuery } from '@tanstack/react-query';
import api from '../../useApi';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  meta: {
    status: number;
    message: string;
  };
  data: T;
}

export const useGetUserMe = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<IUser>>('/auth/me');
      return response.data;
    },
    staleTime: 1000 * 60 * 55,
  });
};
