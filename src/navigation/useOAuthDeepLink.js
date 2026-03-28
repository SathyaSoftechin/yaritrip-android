// src/navigation/useOAuthDeepLink.js
//
// Handles the deep-link redirect from Google OAuth:
//   yaritrip://oauth-success?token=<jwt>
//
// Usage: call this hook once inside your root navigator component.
//
// Prerequisites:
//   Android — AndroidManifest.xml must have an intent-filter:
//     <intent-filter>
//       <action android:name="android.intent.action.VIEW" />
//       <category android:name="android.intent.category.DEFAULT" />
//       <category android:name="android.intent.category.BROWSABLE" />
//       <data android:scheme="yaritrip" android:host="oauth-success" />
//     </intent-filter>
//
//   iOS — Info.plist must have CFBundleURLSchemes: ["yaritrip"]
//
// In Phase 2, replace the in-memory token storage here with AsyncStorage
// and wire up the axios interceptor.

import { useEffect, useCallback } from 'react';
import { Linking, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';

const useOAuthDeepLink = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  // useCallback satisfies exhaustive-deps — handleUrl is stable as long as
  // setAuth is stable (Zustand guarantees this).
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
  }, [handleUrl]); // ✅ no ESLint warning
};

export default useOAuthDeepLink;