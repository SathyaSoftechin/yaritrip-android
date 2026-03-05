import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../../services/apiClient';

const LIKES_KEY = 'yaritrip_liked_attractions';

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
  getLikedAttractions: async () => {
    try {
      const raw = await AsyncStorage.getItem(LIKES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  getLikedIds: async () => {
    try {
      const raw = await AsyncStorage.getItem(LIKES_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return new Set(items.map(item => String(item.id)));
    } catch {
      return new Set();
    }
  },

  toggleLike: async (attraction) => {
    try {
      const raw = await AsyncStorage.getItem(LIKES_KEY);
      const items = raw ? JSON.parse(raw) : [];
      const isLiked = items.some(i => String(i.id) === String(attraction.id));
      const updated = isLiked
        ? items.filter(i => String(i.id) !== String(attraction.id))
        : [attraction, ...items];
      await AsyncStorage.setItem(LIKES_KEY, JSON.stringify(updated));
      return { liked: !isLiked, items: updated };
    } catch (error) {
      throw error;
    }
  },
};

export default profileService;
