import apiClient from '../../../services/apiClient';

const stayService = {
  getStaysByRegion: async (region) => {
    const response = await apiClient.get('/api/stays', {
      params: { region },
    });
    return response.data;
  },
};

export default stayService;