import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const WEB_CLIENT_ID =
  '720875424060-urc96jag7uskdgfjisrqqg0efces6rf9.apps.googleusercontent.com';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
  });
};
