import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchPackageById,
  calculatePackagePrice,
} from '../services/packageService';

// API serves images as relative paths — prefix them with the base URL
const BASE_URL = 'http://192.168.1.10:8085';

const resolveImage = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url}`;
};

const usePackageDetail = (packageId) => {
  const [travellersCount, setTravellersCount] = useState(2);

  // ── Fetch package details ────────────────────────────────────────────────
  const {
    data: packageData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['package', packageId],
    queryFn: () => fetchPackageById(packageId),
    enabled: !!packageId,
    staleTime: 5 * 60 * 1000,
  });

  // ── Price calculation ────────────────────────────────────────────────────
  const {
    mutate: recalculatePrice,
    data: priceData,
    isPending: isPriceLoading,
  } = useMutation({
    mutationFn: (activityIds) => calculatePackagePrice(packageId, activityIds),
  });

  const handleRecalculate = useCallback(
    (activityIds = []) => {
      if (packageId) recalculatePrice(activityIds);
    },
    [packageId, recalculatePrice],
  );

  const incrementTravellers = useCallback(() => {
    setTravellersCount((prev) => Math.min(prev + 1, 12));
  }, []);

  const decrementTravellers = useCallback(() => {
    setTravellersCount((prev) => Math.max(prev - 1, 1));
  }, []);

  // ── Resolve all image URLs from the API response ─────────────────────────
  const bannerImages = packageData?.images?.length
    ? packageData.images.map(resolveImage).filter(Boolean)
    : [];

  // ── Build days array from package nights ─────────────────────────────────
  const days = packageData
    ? Array.from({ length: packageData.nights || 3 }, (_, i) => ({
        dayNumber: i + 1,
        label: packageData.title || 'Package',
        included: 'Flight, Hotel and Transport',
        hotel: {
          name: 'Sharanam Greens Resort',
          location: `${packageData.location || 'Destination'} Hotel`,
          includes: 'Breakfast',
          roomType: 'Deluxe Room With Balcony',
          rating: 5,
          nights: packageData.nights || 3,
          imageUrl: bannerImages[1] || bannerImages[0] || null,
        },
        transport: {
          name: 'Private Transport',
          description: `Comfortable private transport from airport to hotel in ${packageData.location || 'destination'}.`,
          imageUrl: null,
        },
        flight:
          i === 0
            ? {
                airline: 'IndiGo',
                flightNo: '6E1465',
                departTime: '02:00',
                arriveTime: '02:00',
                duration: '2h 15m - Direct',
                from: 'DEL T3',
                to: 'HYB T3',
                cabin: '7kgs',
                checkIn: '7kgs',
              }
            : null,
      }))
    : [];

  const displayPrice = priceData?.finalPrice ?? packageData?.price ?? 0;
  const originalPrice = packageData?.price
    ? Math.round(packageData.price * 1.15)
    : 0;

  // overview is null in current API — fall back to a generated description
  const overview =
    packageData?.overview ||
    (packageData
      ? `${packageData.title} offers an unforgettable experience. Explore the best of ${packageData.location} with flights, hotel stays, and transport all included.`
      : '');

  return {
    packageData,
    bannerImages,
    days,
    overview,
    isLoading,
    isError,
    error,
    refetch,
    travellersCount,
    incrementTravellers,
    decrementTravellers,
    displayPrice,
    originalPrice,
    handleRecalculate,
    isPriceLoading,
  };
};

export default usePackageDetail;