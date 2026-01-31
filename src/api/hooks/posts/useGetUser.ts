import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PLACEHOLDER_API } from '../../useApi';
import { IUser } from '../../../types/user';

export const useGetUser = (userId: number) => {
  return useQuery<IUser, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        const response = await axios.get<IUser>(
          `${PLACEHOLDER_API}/users/${userId}`,
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || 'Failed to fetch user',
          );
        }
        throw new Error('An unexpected error occurred');
      }
    },
    enabled: !!userId,
  });
};
