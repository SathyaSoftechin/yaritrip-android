import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { loginUser, registerUser } from '../services/authService';
import { useAuthStore } from '../../../store/authStore';

// ── Config ────────────────────────────────────────────────────────────────────
const BACKEND_URL = 'http://192.168.1.16:8085';

const OAUTH_REDIRECT_PREFIX = 'http://192.168.1.16:5173/oauth-success';

// ── Error parser ──────────────────────────────────────────────────────────────
const parseBackendError = (error) => {
  const data = error?.response?.data;
  if (!data) return 'Something went wrong. Please check your connection.';
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.defaultMessage || e.message).join('\n');
  }
  if (typeof data.message === 'string' && data.message.trim()) return data.message;
  if (typeof data === 'string' && data.trim()) return data;
  return 'An unexpected error occurred. Please try again.';
};

// ── Hook ──────────────────────────────────────────────────────────────────────
const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = async (email, password) => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email or mobile number.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Please enter your password.');
      return;
    }
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      setAuth(data.user ?? null, data.token);
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 401) {
        Alert.alert('Login Failed', 'Invalid email/mobile or password.');
      } else if (statusCode === 403) {
        Alert.alert('Login Failed', 'Your account has been suspended. Please contact support.');
      } else {
        Alert.alert('Login Failed', parseBackendError(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Register ───────────────────────────────────────────────────────────────
  const handleRegister = async ({ name, email, mobile, password, confirmPassword, agree }) => {
    if (!name.trim()) return Alert.alert('Validation Error', 'Please enter your full name.');
    if (name.trim().length < 2 || name.trim().length > 50)
      return Alert.alert('Validation Error', 'Name must be between 2 and 50 characters.');
    if (!email.trim()) return Alert.alert('Validation Error', 'Please enter your email address.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()))
      return Alert.alert('Validation Error', 'Please enter a valid email address.');
    if (!mobile.trim()) return Alert.alert('Validation Error', 'Please enter your mobile number.');
    if (!/^[0-9]{10}$/.test(mobile.trim()))
      return Alert.alert('Validation Error', 'Mobile number must be exactly 10 digits.');
    if (!password.trim()) return Alert.alert('Validation Error', 'Please enter a password.');
    if (password.trim().length < 6)
      return Alert.alert('Validation Error', 'Password must be at least 6 characters.');
    if (password !== confirmPassword)
      return Alert.alert('Validation Error', 'Passwords do not match.');
    if (!agree)
      return Alert.alert('Validation Error', 'Please agree to the Terms and Conditions.');

    try {
      setLoading(true);
      await registerUser({ name, email, mobile, password, confirmPassword });
      Alert.alert('Registration Successful', 'Your account has been created. Please log in.', [
        { text: 'OK' },
      ]);
      if (navigation?.setParams) {
        navigation.setParams({ switchToLogin: true });
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 409) {
        Alert.alert('Registration Failed', 'An account with this email or mobile already exists.');
      } else {
        Alert.alert('Registration Failed', parseBackendError(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth via InAppBrowser ──────────────────────────────────────────
  // Opens OAuth in an in-app browser. InAppBrowser watches for the redirect to
  // OAUTH_REDIRECT_PREFIX and returns that URL — token is extracted from it
  const handleGoogleLogin = useCallback(async () => {
    const oauthUrl = `${BACKEND_URL}/oauth2/authorization/google`;

    try {
      const isAvailable = await InAppBrowser.isAvailable();
      if (!isAvailable) {
        Alert.alert('Error', 'In-app browser is not available on this device.');
        return;
      }

      const result = await InAppBrowser.openAuth(oauthUrl, OAUTH_REDIRECT_PREFIX, {
        // Android
        showTitle: false,
        toolbarColor: '#1A1A2E',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: true,
        // iOS
        preferredBarTintColor: '#1A1A2E',
        preferredControlTintColor: '#FFFFFF',
        readerMode: false,
        animated: true,
        modalEnabled: true,
      });

      if (result.type === 'success' && result.url) {
        const tokenMatch = result.url.match(/[?&]token=([^&]+)/);
        if (!tokenMatch) {
          Alert.alert('Login Error', 'Google login did not return a token. Please try again.');
          return;
        }
        const token = decodeURIComponent(tokenMatch[1]);
        setAuth(null, token);
      } else if (result.type === 'cancel') {
        // User dismissed — do nothing
      } else {
        Alert.alert('Login Error', 'Google login failed. Please try again.');
      }
    } catch {
      Alert.alert('Login Error', 'Could not open Google login. Please try again.');
    }
  }, [setAuth]);

  return { loading, handleLogin, handleRegister, handleGoogleLogin };
};

export default useAuth;