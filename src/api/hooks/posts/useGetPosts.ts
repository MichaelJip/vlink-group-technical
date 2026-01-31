import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPost } from '../../../types/post';
import { PLACEHOLDER_API } from '../../useApi';

export const useGetPosts = () => {
  return useQuery<IPost[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const response = await axios.get<IPost[]>(`${PLACEHOLDER_API}/posts`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || 'Failed to fetch posts',
          );
        }
        throw new Error('An unexpected error occurred');
      }
    },
  });
};
