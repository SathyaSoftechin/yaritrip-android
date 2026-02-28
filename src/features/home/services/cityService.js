import apiClient from '../../../services/apiClient';

// City images mapped by name (backend doesn't provide images yet)
export const CITY_IMAGES = {
  Maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200',
  Bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200',
  Santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200',
  Maui: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=200',
  Phuket: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=200',
  Dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200',
  Paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200',
  Tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200',
};

export const cityService = {
  getCities: async () => {
    const response = await apiClient.get('/api/cities');
    return response.data;
  },
};
