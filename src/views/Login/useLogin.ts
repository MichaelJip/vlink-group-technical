import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../../api/hooks/auth/useLoginMutation';
import { useGoogleSignIn } from '../../api/hooks/auth/useGoogleSignIn';
import { useCallback, useState } from 'react';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const useLogin = () => {
  const loginMutation = useLoginMutation();
  const googleSignIn = useGoogleSignIn();
  const [googleError, setGoogleError] = useState<Error | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await loginMutation.mutateAsync({
          identifier: data.email,
          password: data.password,
        });
      } catch (error) {
        throw error;
      }
    },
    [loginMutation],
  );

  const handleLogin = form.handleSubmit(onSubmit);

  const handleGoogleLogin = useCallback(async () => {
    setGoogleError(null);
    const result = await googleSignIn.signIn();

    if (!result.success && result.error) {
      setGoogleError(result.error);
    }
  }, [googleSignIn]);

  return {
    form,
    handleLogin,
    handleGoogleLogin,
    isLoading: loginMutation.isPending || googleSignIn.isLoading,
    error: loginMutation.error || googleError,
    isSuccess: loginMutation.isSuccess,
  };
};

export default useLogin;
