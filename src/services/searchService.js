import apiClient from './apiClient';

export const fetchCities = async () => {
  const response = await apiClient.get('/api/packages/cities'); // ← was /api/cities
  return response.data;
};

export const fetchDestinations = async (fromCityId) => {
  const response = await apiClient.get('/api/packages/destinations', { // ← was /api/destinations
    params: { fromCityId },
  });
  return response.data;
};

export const searchPackages = async ({ fromCode, toCode }) => {
  const response = await apiClient.get('/api/packages/search', {
    params: { from: fromCode, to: toCode },
  });
  return response.data;
};

export const fetchAllPackages = async () => {
  const response = await apiClient.get('/api/packages');
  return response.data;
};