import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLoginMutation } from '../../api/hooks/auth/useLoginMutation';

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

  return {
    form,
    handleLogin,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
};

export default useLogin;
