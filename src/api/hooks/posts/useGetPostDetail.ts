import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPost } from '../../../types/post';
import { PLACEHOLDER_API } from '../../useApi';

export const useGetPostDetail = (postId: number) => {
  return useQuery<IPost, Error>({
    queryKey: ['post', postId],
    queryFn: async () => {
      try {
        const response = await axios.get<IPost>(
          `${PLACEHOLDER_API}/posts/${postId}`,
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            throw new Error('Post not found');
          }
          throw new Error(
            error.response?.data?.message || 'Failed to fetch post',
          );
        }
        throw new Error('An unexpected error occurred');
      }
    },
    enabled: !!postId,
  });
};
