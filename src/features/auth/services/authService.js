import apiClient from '../../../services/apiClient';


export const loginUser = async (email, password) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  return response.data;
};

export const registerUser = async ({ name, email, mobile, password, confirmPassword }) => {
  const response = await apiClient.post('/api/auth/register', {
    name,
    email,
    mobile,
    password,
    confirmPassword,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/api/auth/logout');
  return response.data;
};