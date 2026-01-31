import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../helper/useAuth';
import { useTheme } from '../theme/useTheme';
import { Colors } from '../theme/colors';
import Login from '../views/Login';
import Home from '../views/Home';
import HomeDetail from '../views/HomeDetail';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HomeDetail: {
    id: string;
    post?: {
      id: number;
      userId: number;
      title: string;
      body: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom navigation theme untuk dark/light mode
const LightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.card,
    text: Colors.light.text,
    border: Colors.light.border,
  },
};

const DarkNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.card,
    text: Colors.dark.text,
    border: Colors.dark.border,
  },
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Stack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={{ title: 'Detail' }}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDark, colors } = useTheme();

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={isDark ? DarkNavigationTheme : LightNavigationTheme}
    >
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
