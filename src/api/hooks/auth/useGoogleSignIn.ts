import { useState } from 'react';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAuth } from '../../../helper/useAuth';

export const useGoogleSignIn = () => {
  const { setGoogleUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;

        await setGoogleUser({
          email: user.email,
          name: user.name || '',
          photo: user.photo || '',
          idToken: idToken || '',
        });

        return { success: true, idToken, user };
      } else {
        throw new Error('Google Sign-In was cancelled');
      }
    } catch (err) {
      let errorMessage = 'Google Sign-In failed';

      if (isErrorWithCode(err)) {
        switch (err.code) {
          case statusCodes.IN_PROGRESS:
            errorMessage = 'Sign-in already in progress';
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            errorMessage = 'Google Play Services not available';
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            errorMessage = 'Sign-in was cancelled';
            break;
          default:
            errorMessage = err.message || 'Unknown error occurred';
        }
      }

      const error = new Error(errorMessage);
      setError(error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (err) {
      console.error('Google Sign-Out error:', err);
    }
  };

  return {
    signIn,
    signOut,
    isLoading,
    error,
  };
};
