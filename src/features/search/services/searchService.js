import apiClient from '../../../services/apiClient';

export const fetchCities = async () => {
  const response = await apiClient.get('/api/cities');
  return response.data;
};

export const fetchDestinations = async (fromCityId) => {
  const response = await apiClient.get('/api/destinations', {
    params: { fromCityId },
  });
  return response.data;
};

export const searchPackages = async ({ fromCode, toCode, date, rooms, guests }) => {
  const response = await apiClient.get('/api/packages/search', {
    params: { fromCode, toCode, date, rooms, guests },
  });
  return response.data;
};

export const fetchAllPackages = async () => {
  const response = await apiClient.get('/api/packages');
  return response.data;
};