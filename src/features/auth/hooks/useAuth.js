import { useState } from 'react';
import { Alert } from 'react-native';
import { loginUser, registerUser } from '../services/authService';
import useAuthStore from '../../../store/authStore';

const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

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
      setAuth(data.user, data.token);
      navigation.replace('Home');
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password, confirmPassword, agree }) => {
    if (!name.trim()) return Alert.alert('Validation Error', 'Please enter your name.');
    if (!email.trim()) return Alert.alert('Validation Error', 'Please enter your email.');
    if (!password.trim()) return Alert.alert('Validation Error', 'Please enter a password.');
    if (password !== confirmPassword)
      return Alert.alert('Validation Error', 'Passwords do not match.');
    if (!agree)
      return Alert.alert('Validation Error', 'Please agree to Terms and Conditions.');

    try {
      setLoading(true);
      const data = await registerUser(name, email, password);
      setAuth(data.user, data.token);
      navigation.replace('Home');
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Registration failed. Please try again.';
      Alert.alert('Registration Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLogin, handleRegister };
};

export default useAuth;