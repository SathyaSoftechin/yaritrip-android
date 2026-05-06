import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { loginUser, registerUser } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { BASE_URL } from '../services/apiClient';

// ── Config ─────────────────────────────────────────
const BACKEND_URL = BASE_URL;
const OAUTH_REDIRECT_PREFIX = `${BASE_URL}/oauth-success`;

// ── Error parser ───────────────────────────────────
const parseBackendError = (error) => {
  const data = error?.response?.data;

  if (!data) return 'Something went wrong. Please check your connection.';

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.defaultMessage || e.message).join('\n');
  }

  if (typeof data.message === 'string' && data.message.trim())
    return data.message;

  if (typeof data === 'string' && data.trim()) return data;

  return 'An unexpected error occurred. Please try again.';
};

// ── Hook ───────────────────────────────────────────
const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  // ── Login ────────────────────────────────────────
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
        Alert.alert('Login Failed', 'Your account has been suspended.');
      } else {
        Alert.alert('Login Failed', parseBackendError(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Register ─────────────────────────────────────
  const handleRegister = async ({
    name,
    email,
    mobile,
    password,
    confirmPassword,
    agree,
  }) => {
    if (!name.trim())
      return Alert.alert('Validation Error', 'Enter your full name.');

    if (!email.trim())
      return Alert.alert('Validation Error', 'Enter email.');

    if (!mobile.trim())
      return Alert.alert('Validation Error', 'Enter mobile.');

    if (!password.trim())
      return Alert.alert('Validation Error', 'Enter password.');

    if (password !== confirmPassword)
      return Alert.alert('Validation Error', 'Passwords do not match.');

    if (!agree)
      return Alert.alert('Validation Error', 'Accept terms.');

    try {
      setLoading(true);
      await registerUser({ name, email, mobile, password, confirmPassword });

      Alert.alert('Success', 'Account created. Please login.');

      navigation?.setParams?.({ switchToLogin: true });
    } catch (error) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        Alert.alert('Registration Failed', 'User already exists.');
      } else {
        Alert.alert('Registration Failed', parseBackendError(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Google Login ─────────────────────────────────
  const handleGoogleLogin = useCallback(async () => {
    const oauthUrl = `${BACKEND_URL}/oauth2/authorization/google`;

    try {
      const isAvailable = await InAppBrowser.isAvailable();
      if (!isAvailable) {
        Alert.alert('Error', 'Browser not available');
        return;
      }

      const result = await InAppBrowser.openAuth(
        oauthUrl,
        OAUTH_REDIRECT_PREFIX
      );

      if (result.type === 'success' && result.url) {
        const tokenMatch = result.url.match(/[?&]token=([^&]+)/);

        if (!tokenMatch) {
          Alert.alert('Error', 'No token received');
          return;
        }

        const token = decodeURIComponent(tokenMatch[1]);
        setAuth(null, token);
      }
    } catch {
      Alert.alert('Error', 'Google login failed');
    }
  }, [setAuth]);

  return { loading, handleLogin, handleRegister, handleGoogleLogin };
};

export default useAuth;