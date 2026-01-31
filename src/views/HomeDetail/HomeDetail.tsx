import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PostCard from '../../components/PostCard';
import useHomeDetail from './useHomeDetail';
import { useTheme } from '../../theme/useTheme';

export default function HomeDetail() {
  const { colors } = useTheme();
  const { post, author, isLoading, isLoadingAuthor, error, handleRetry } =
    useHomeDetail();

  if (isLoading) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading post...
        </Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: colors.background }]}
      >
        <View
          style={[styles.errorIcon, { backgroundColor: colors.errorLight }]}
        >
          <Text style={[styles.errorIconText, { color: colors.error }]}>!</Text>
        </View>
        <Text style={[styles.errorTitle, { color: colors.text }]}>
          {error || 'Post not found'}
        </Text>
        <Text style={[styles.errorMessage, { color: colors.textSecondary }]}>
          Unable to load post details. Please try again.
        </Text>
        <TouchableOpacity
          style={[styles.retryBtn, { backgroundColor: colors.primary }]}
          onPress={handleRetry}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <PostCard post={post} onPress={() => {}} />

      <View style={[styles.contentSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Full Content
        </Text>
        <Text style={[styles.fullBody, { color: colors.text }]}>
          {post.body}
        </Text>
      </View>

      <View style={[styles.authorSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Author Information
        </Text>
        {isLoadingAuthor ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : author ? (
          <View style={styles.authorCard}>
            <View
              style={[styles.authorAvatar, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.authorAvatarText}>
                {author.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { color: colors.text }]}>
                {author.name}
              </Text>
              <Text style={[styles.authorUsername, { color: colors.primary }]}>
                @{author.username}
              </Text>
              <Text
                style={[styles.authorEmail, { color: colors.textSecondary }]}
              >
                {author.email}
              </Text>
              {author.company && (
                <Text
                  style={[styles.authorCompany, { color: colors.textTertiary }]}
                >
                  {author.company.name}
                </Text>
              )}
            </View>
          </View>
        ) : (
          <Text style={[styles.noAuthor, { color: colors.textTertiary }]}>
            Author information not available
          </Text>
        )}
      </View>

      <View style={[styles.metaSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Post Details
        </Text>
        <View style={[styles.metaRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
            Post ID:
          </Text>
          <Text style={[styles.metaValue, { color: colors.text }]}>
            {post.id}
          </Text>
        </View>
        <View style={[styles.metaRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
            User ID:
          </Text>
          <Text style={[styles.metaValue, { color: colors.text }]}>
            {post.userId}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorIconText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  contentSection: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fullBody: {
    fontSize: 16,
    lineHeight: 24,
  },
  authorSection: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  authorUsername: {
    fontSize: 14,
  },
  authorEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  authorCompany: {
    fontSize: 13,
    marginTop: 2,
  },
  noAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  metaSection: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  metaLabel: {
    fontSize: 14,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
