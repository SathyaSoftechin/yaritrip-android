import apiClient from '../../../services/apiClient';

export const CITY_IMAGES = {
  Hyderabad: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200',
  Delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200',
  Mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=200',
  Kerala: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=200',
  Kashmir: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=200',
  Andaman: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200',

  Dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200',
  Singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=200',
  'Kuala Lumpur': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200',
  Bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200',
  Bangkok: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=200',
  Vietnam: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200',
  Male: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=200',
};

const HARDCODED_CITIES = [
  { name: 'Dubai', code: 'DXB', country: 'UAE' },
  { name: 'Singapore', code: 'SIN', country: 'Singapore' },
  { name: 'Hyderabad', code: 'HYD', country: 'India' },
  { name: 'Delhi', code: 'DEL', country: 'India' },
  { name: 'Kerala', code: 'KD', country: 'India' },
  { name: 'Kashmir', code: 'SXR', country: 'India' },
  { name: 'Andaman', code: 'IXZ', country: 'India' },
  { name: 'Mumbai', code: 'BOM', country: 'India' },
  { name: 'Kuala Lumpur', code: 'KUL', country: 'Malaysia' },
  { name: 'Vietnam', code: 'VN', country: 'Vietnam' },
  { name: 'Bali', code: 'DPS', country: 'Indonesia' },
  { name: 'Bangkok', code: 'PG', country: 'Thailand' },
  { name: 'Male', code: 'MLE', country: 'Maldives' },
];

export const cityService = {
  getCities: async () => {
    try {
      // trying API first
      const response = await apiClient.get('/api/cities');
      return response.data;
    } catch (error) {
      console.warn('Using hardcoded cities (API not available yet)');
      
      //fallback to hardcoded
      return HARDCODED_CITIES;
    }
  },
};