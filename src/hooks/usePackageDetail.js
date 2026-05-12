import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchPackageById,
  calculatePackagePrice,
  createBooking,
} from '../services/packageService';
import { BASE_URL } from '../services/apiClient';

const resolveImage = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url}`;
};

// Fake day template used when itinerary is missing
const buildFakeDay = (i, packageData, bannerImages) => ({
  dayNumber: i + 1,
  title: packageData.title || 'Package',
  description: null,
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
});

const usePackageDetail = (packageId) => {
  const [travellersCount, setTravellersCount] = useState(2);

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
    [packageId, recalculatePrice]
  );

  const incrementTravellers = useCallback(() => {
    setTravellersCount((prev) => Math.min(prev + 1, 12));
  }, []);

  const decrementTravellers = useCallback(() => {
    setTravellersCount((prev) => Math.max(prev - 1, 1));
  }, []);

  const {
    mutate: initiateBooking,
    isPending: isBookingInitiating,
  } = useMutation({
    mutationFn: () =>
      createBooking({
        packageId,
        totalAmount: displayPrice,
        travellers: [],
      }),
  });

  // ── Images ───────────────────────────────────────────────────
  const bannerImages = packageData?.images?.length
    ? packageData.images.map(resolveImage).filter(Boolean)
    : [];

  // ── Days — real itinerary if present, fake fallback otherwise ─
  const totalDays = packageData?.nights || 3;
  const realItinerary = packageData?.itinerary;
  const hasRealItinerary = Array.isArray(realItinerary) && realItinerary.length > 0;

  const days = packageData
    ? Array.from({ length: totalDays }, (_, i) => {
        const realDay = hasRealItinerary
          ? realItinerary.find((d) => d.dayNumber === i + 1)
          : null;

        const fakeDay = buildFakeDay(i, packageData, bannerImages);

        return {
          ...fakeDay,
          // Override with real data where available
          title: realDay?.title || fakeDay.title,
          description: realDay?.description || null,
        };
      })
    : [];

  const displayPrice = priceData?.finalPrice ?? packageData?.price ?? 0;
  const originalPrice = packageData?.price
    ? Math.round(packageData.price * 1.15)
    : 0;

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
    initiateBooking,
    isBookingInitiating,
  };
};

export default usePackageDetail;