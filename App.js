// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/authStore';
import useOAuthDeepLink from './src/navigation/useOAuthDeepLink';

const queryClient = new QueryClient();

const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Handles yaritrip://oauth-success?token=<jwt> deep-links globally
  useOAuthDeepLink();

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;