import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import profileService from '../services/profileService';
import { useAuthStore } from '../../../store/authStore';

const LIKES_KEY = ['likedAttractions'];
const LIKES_IDS_KEY = ['likedAttractions', 'ids'];

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

// ─── User Profile ─────────────────────────────────────────────────────────────

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
      clearAuth();
      queryClient.clear();
    },
  });
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

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

// ─── Likes ────────────────────────────────────────────────────────────────────

export const useLikedAttractions = () => {
  return useQuery({
    queryKey: LIKES_KEY,
    queryFn: profileService.getLikedAttractions,
    staleTime: 0,
  });
};

export const useLikedIds = () => {
  return useQuery({
    queryKey: LIKES_IDS_KEY,
    queryFn: profileService.getLikedIds,
    staleTime: 0,
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attraction) => profileService.toggleLike(attraction),

    onMutate: async (attraction) => {
      await queryClient.cancelQueries({ queryKey: LIKES_KEY });

      const prevItems = queryClient.getQueryData(LIKES_KEY) || [];
      const prevIds = queryClient.getQueryData(LIKES_IDS_KEY) || new Set();

      const id = String(attraction.id);
      const isLiked = prevIds instanceof Set ? prevIds.has(id) : false;

      const newItems = isLiked
        ? prevItems.filter(i => String(i.id) !== id)
        : [attraction, ...prevItems];

      const newIds = new Set(prevIds instanceof Set ? prevIds : []);
      isLiked ? newIds.delete(id) : newIds.add(id);

      queryClient.setQueryData(LIKES_KEY, newItems);
      queryClient.setQueryData(LIKES_IDS_KEY, newIds);

      return { prevItems, prevIds };
    },

    onError: (_err, _attraction, context) => {
      if (context?.prevItems !== undefined) {
        queryClient.setQueryData(LIKES_KEY, context.prevItems);
      }
      if (context?.prevIds !== undefined) {
        queryClient.setQueryData(LIKES_IDS_KEY, context.prevIds);
      }
    },

    onSuccess: (result) => {
      queryClient.setQueryData(LIKES_KEY, result.items);
      const ids = new Set(result.items.map(i => String(i.id)));
      queryClient.setQueryData(LIKES_IDS_KEY, ids);
    },
  });
};
