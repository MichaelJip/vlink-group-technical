import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller } from 'react-hook-form';
import useLogin from './useLogin';
import { useTheme } from '../../theme/useTheme';

export default function Login() {
  const { colors, isDark } = useTheme();
  const { form, handleLogin, handleGoogleLogin, isLoading, error } = useLogin();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Login</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Masuk ke akun Anda
        </Text>

        {error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: colors.errorLight },
            ]}
          >
            <Text style={[styles.errorText, { color: colors.error }]}>
              {error.message || 'Login gagal. Silakan coba lagi.'}
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.email ? colors.error : colors.border,
                    backgroundColor: isDark ? colors.card : '#fafafa',
                    color: colors.text,
                  },
                ]}
                placeholder="Masukkan email"
                placeholderTextColor={colors.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isLoading}
              />
            )}
          />
          {errors.email && (
            <Text style={[styles.fieldError, { color: colors.error }]}>
              {errors.email.message}
            </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.password ? colors.error : colors.border,
                    backgroundColor: isDark ? colors.card : '#fafafa',
                    color: colors.text,
                  },
                ]}
                placeholder="Masukkan password"
                placeholderTextColor={colors.textTertiary}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isLoading}
              />
            )}
          />
          {errors.password && (
            <Text style={[styles.fieldError, { color: colors.error }]}>
              {errors.password.message}
            </Text>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            { backgroundColor: colors.primary },
            pressed && styles.buttonPressed,
            isLoading && { backgroundColor: colors.primaryLight },
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>

        <View style={styles.divider}>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.border }]}
          />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
            atau
          </Text>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.border }]}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.googleButton,
            { borderColor: colors.border, backgroundColor: colors.card },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleGoogleLogin}
          disabled={isLoading}
        >
          <Text style={[styles.googleButtonText, { color: colors.text }]}>
            Login dengan Google
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  fieldError: {
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
