import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import profileService from '../services/profileService';
import { useAuthStore } from '../../../store/authStore';

// Fake bookings data (until real API is ready)
const FAKE_BOOKINGS = [
  {
    id: '1',
    title: 'Maldives Paradise',
    city: 'Maldives',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.9,
    reviews: 2847,
    status: 'Confirmed',
    bookingDate: '2025-03-10',
    travelDate: '2025-06-15',
  },
  {
    id: '2',
    title: 'Bali Retreat',
    city: 'Bali',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    rating: 4.7,
    reviews: 1923,
    status: 'Upcoming',
    bookingDate: '2025-02-20',
    travelDate: '2025-08-01',
  },
  {
    id: '3',
    title: 'Swiss Alps Tour',
    city: 'Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    rating: 4.8,
    reviews: 3102,
    status: 'Completed',
    bookingDate: '2024-12-01',
    travelDate: '2025-01-10',
  },
];

const FAKE_LIKES = [
  {
    id: '4',
    title: 'Maldives Paradise',
    city: 'Maldives',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.9,
    reviews: 2847,
  },
  {
    id: '5',
    title: 'Santorini Dream',
    city: 'Greece',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    rating: 4.8,
    reviews: 2100,
  },
  {
    id: '6',
    title: 'Tokyo Explorer',
    city: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    rating: 4.6,
    reviews: 1540,
  },
  {
    id: '7',
    title: 'Paris Getaway',
    city: 'France',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    rating: 4.7,
    reviews: 3200,
  },
  {
    id: '8',
    title: 'Bali Retreat',
    city: 'Bali',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    rating: 4.7,
    reviews: 1923,
  },
  {
    id: '9',
    title: 'Dubai Luxury',
    city: 'UAE',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    rating: 4.9,
    reviews: 4100,
  },
];

export const useProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: profileService.getUserProfile,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore(state => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
    onError: () => {
      // Even if API fails, clear local auth and redirect
      clearAuth();
      queryClient.clear();
    },
  });
};

export const useBookings = () => {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 800));
      return FAKE_BOOKINGS;
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useLikes = () => {
  return useQuery({
    queryKey: ['userLikes'],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 600));
      return FAKE_LIKES;
    },
    staleTime: 2 * 60 * 1000,
  });
};
