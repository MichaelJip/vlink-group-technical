import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useGetPostDetail } from '../../api/hooks/posts/useGetPostDetail';
import { useGetUser } from '../../api/hooks/posts/useGetUser';
import { RootStackParamList } from '../../routes';

type HomeDetailRouteProp = RouteProp<RootStackParamList, 'HomeDetail'>;

const useHomeDetail = () => {
  const route = useRoute<HomeDetailRouteProp>();
  const { id, post: routePost } = route.params;
  const postId = parseInt(id, 10);

  const {
    data: apiPost,
    isLoading: isLoadingPost,
    error: postError,
    refetch: refetchPost,
  } = useGetPostDetail(postId);

  const post = routePost || apiPost;

  const { data: author, isLoading: isLoadingAuthor } = useGetUser(
    post?.userId || 0,
  );

  const isLoading = !routePost && isLoadingPost;
  const error = postError?.message || null;

  const handleRetry = () => {
    refetchPost();
  };

  return {
    post,
    author,
    isLoading,
    isLoadingAuthor,
    error,
    handleRetry,
  };
};

export default useHomeDetail;
