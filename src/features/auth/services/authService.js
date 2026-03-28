import apiClient from '../../../services/apiClient';

/**
 * Login
 * POST /api/auth/login
 * Body: { email, password }  ← "email" field accepts email OR mobile (backend handles it)
 *
 * Success response shape (LoginResponse DTO):
 *   { token: string, ...any other fields the backend returns }
 */
export const loginUser = async (email, password) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  return response.data; // LoginResponse DTO
};

/**
 * Register
 * POST /api/auth/register
 * Body: { name, email, mobile, password, confirmPassword }
 *
 * Success: HTTP 201, body is a plain string message (e.g. "User registered successfully")
 */
export const registerUser = async ({ name, email, mobile, password, confirmPassword }) => {
  const response = await apiClient.post('/api/auth/register', {
    name,
    email,
    mobile,
    password,
    confirmPassword,
  });
  return response.data; // plain string message from backend
};

/**
 * Logout
 * POST /api/auth/logout
 * Requires Authorization: Bearer <token> header (apiClient interceptor adds it in Phase 2)
 */
export const logoutUser = async () => {
  const response = await apiClient.post('/api/auth/logout');
  return response.data;
};