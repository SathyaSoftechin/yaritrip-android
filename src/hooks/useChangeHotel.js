import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStaysByRegion, FAKE_HOTELS } from '../services/packageService';

const useChangeHotel = (region = 'GOA', currentHotelId = null) => {
  const [selectedHotelId, setSelectedHotelId] = useState(currentHotelId);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: hotels,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stays', region],
    queryFn: () => fetchStaysByRegion(region),
    // Fall back to fake data if API fails
    placeholderData: FAKE_HOTELS,
  });

  const displayHotels = (hotels || FAKE_HOTELS).filter((h) =>
    h.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectHotel = useCallback((hotelId) => {
    setSelectedHotelId(hotelId);
  }, []);

  const getSelectedHotel = useCallback(() => {
    return (hotels || FAKE_HOTELS).find((h) => h.id === selectedHotelId) || null;
  }, [hotels, selectedHotelId]);

  return {
    hotels: displayHotels,
    isLoading,
    isError,
    selectedHotelId,
    searchQuery,
    setSearchQuery,
    handleSelectHotel,
    getSelectedHotel,
  };
};

export default useChangeHotel;
