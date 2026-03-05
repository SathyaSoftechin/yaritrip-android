import apiClient from '../../../services/apiClient';

const profileService = {
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/api/users/me');
      return response.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  updateUserProfile: async (payload) => {
    try {
      const response = await apiClient.put('/api/users/me', payload);
      return response.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post('/api/auth/logout');
      return response.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  getUserBookings: async () => {
    try {
      const response = await apiClient.get('/api/user/bookings');
      return response.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  getUserLikes: async () => {
    try {
      const response = await apiClient.get('/api/user/likes');
      return response.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },
};

export default profileService;
