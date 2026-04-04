import { useEffect, useCallback } from 'react';
import { Linking, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';

const useOAuthDeepLink = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleUrl = useCallback(
    (url) => {
      if (!url) return;
      try {
        const tokenMatch = url.match(/[?&]token=([^&]+)/);
        if (!tokenMatch) return;
        const token = decodeURIComponent(tokenMatch[1]);
        setAuth(null, token);
      } catch {
        Alert.alert('Login Error', 'Google login failed. Please try again.');
      }
    },
    [setAuth],
  );

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });
    return () => subscription.remove();
  }, [handleUrl]);
};

export default useOAuthDeepLink;