import { useMutation } from '@tanstack/react-query';
import api from '../../useApi';
import { useAuth } from '../../../helper/useAuth';

export interface ILoginRequest {
  identifier: string;
  password: string;
}

interface ApiResponse<T> {
  meta: {
    status: number;
    message: string;
  };
  data: T;
}

export const useLoginMutation = () => {
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: async (credentials: ILoginRequest) => {
      const response = await api.post<ApiResponse<string>>(
        '/auth/login',
        credentials,
      );
      const token = response.data.data;

      await setToken(token);

      return response.data;
    },
  });
};
