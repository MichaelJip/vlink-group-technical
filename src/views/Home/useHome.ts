import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { IPost } from '../../types/post';
import { useGetPosts } from '../../api/hooks/posts/useGetPosts';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const useHome = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useGetPosts();

  const handlePostPress = useCallback(
    (post: IPost) => {
      navigation.navigate('HomeDetail', { id: String(post.id), post });
    },
    [navigation],
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    posts: posts || [],
    isLoading,
    isRefetching,
    error: error?.message || null,
    handlePostPress,
    handleRefresh,
  };
};

export default useHome;
