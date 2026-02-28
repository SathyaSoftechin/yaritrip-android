import apiClient from '../../../services/apiClient';

export const attractionService = {
  getPopularByCity: async (city) => {
    const response = await apiClient.get('/api/attractions/popular', {
      params: { city },
    });
    return response.data;
  },

  getAttractionById: async (id) => {
    const response = await apiClient.get(`/api/attractions/${id}`);
    return response.data;
  },
};
