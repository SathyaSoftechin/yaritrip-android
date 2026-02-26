// src/services/api.js
// ─── Base URL ──────────────────────────────────────────────────────────────
// 10.0.2.2 maps to your laptop's localhost from Android emulator
const BASE_URL = 'http://10.0.2.2:8082';

// ─── Helper ────────────────────────────────────────────────────────────────
const request = async (path, options = {}) => {
  const url = `${BASE_URL}${path}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
};

// ─── Auth ──────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (payload) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// ─── Protected (attach JWT) ────────────────────────────────────────────────
export const protectedAPI = (token) => ({
  getMe: () =>
    request('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPackages: (params = '') =>
    request(`/api/packages/search${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPopularAttractions: () =>
    request('/api/attractions/popular', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getCities: () =>
    request('/api/cities', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getDestinations: () =>
    request('/api/destinations', {
      headers: { Authorization: `Bearer ${token}` },
    }),
});

export default { authAPI, protectedAPI };