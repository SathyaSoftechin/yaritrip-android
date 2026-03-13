import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCities, fetchDestinations, searchPackages } from '../services/searchService';

const DEFAULT_FORM = {
  fromCity: '',
  fromCityId: null,
  fromCode: '',
  toDestination: '',
  toCityId: null,
  toCode: '',
  when: '',
  members: '',
};

export const useSearch = (navigation, initialForm = {}) => {
  const [form, setForm] = useState({ ...DEFAULT_FORM, ...initialForm });
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    budgetRange: null,       // e.g. { min: 10000, max: 15000 }
    hotelCategory: [],       // e.g. [2, 3, 4, 5]
    cities: [],              // selected city names
    themes: [],
    packageType: null,       // 'Customization' | 'Group Packages'
    premiumPackages: false,
    buyNowPayLater: false,
  });

  // Auto-fire search if navigated in with a fully populated form
  useEffect(() => {
    const { fromCode, toCode, when, members } = form;
    if (fromCode && toCode && when && members) {
      const [rooms, guests] = members.split(',').map(Number);
      triggerSearch({
        fromCode,
        toCode,
        date: when,
        rooms: rooms || 1,
        guests: guests || 1,
      });
    }
    // Only runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Cities (From City dropdown) ────────────────────────────────────────────
  const {
    data: cities = [],
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    staleTime: 10 * 60 * 1000,
  });

  // ─── Destinations (depends on fromCityId) ────────────────────────────────────
  const {
    data: destinations = [],
    isLoading: destinationsLoading,
  } = useQuery({
    queryKey: ['destinations', form.fromCityId],
    queryFn: () => fetchDestinations(form.fromCityId),
    enabled: !!form.fromCityId,
    staleTime: 5 * 60 * 1000,
  });

  // ─── Search packages ─────────────────────────────────────────────────────────
  const {
    data: packages = [],
    isPending: packagesLoading,
    error: packagesError,
    mutate: triggerSearch,
  } = useMutation({
    mutationFn: searchPackages,
    onSuccess: () => setHasSearched(true),
  });

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleFormChange = useCallback((field, value) => {
    if (field === '_swap') {
      setForm(prev => ({
        ...prev,
        fromCity: prev.toDestination,
        fromCityId: prev.toCityId,
        fromCode: prev.toCode,
        toDestination: prev.fromCity,
        toCityId: prev.fromCityId,
        toCode: prev.fromCode,
      }));
      return;
    }
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFromCitySelect = useCallback((city) => {
    setForm(prev => ({
      ...prev,
      fromCity: city.name,
      fromCityId: city.id,
      fromCode: city.code || city.name,
      ...(prev.toDestination === city.name
        ? { toDestination: '', toCityId: null, toCode: '' }
        : {}),
    }));
  }, []);

  const handleToCitySelect = useCallback((dest) => {
    setForm(prev => ({
      ...prev,
      toDestination: dest.name,
      toCityId: dest.id,
      toCode: dest.code || dest.name,
    }));
  }, []);

  const handleSearch = useCallback(() => {
    const { fromCode, toCode, when, members } = form;
    if (!fromCode || !toCode || !when || !members) return;

    const [rooms, guests] = members.split(',').map(Number);
    triggerSearch({
      fromCode,
      toCode,
      date: when,
      rooms: rooms || 1,
      guests: guests || 1,
    });
  }, [form, triggerSearch]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handlePackagePress = useCallback((pkg) => {
    navigation.navigate('PackageDetail', { packageId: pkg.id });
  }, [navigation]);

  // ─── Client-side filter application ──────────────────────────────────────────
  const filteredPackages = packages.filter(pkg => {
    if (filters.budgetRange) {
      const { min, max } = filters.budgetRange;
      if (pkg.price < min || pkg.price > max) return false;
    }
    if (filters.hotelCategory.length > 0) {
      if (!filters.hotelCategory.includes(pkg.hotelCategory)) return false;
    }
    return true;
  });

  return {
    form,
    cities,
    citiesLoading,
    citiesError,
    destinations,
    destinationsLoading,
    packages: filteredPackages,
    packagesLoading,
    packagesError,
    hasSearched,
    filters,
    handleFormChange,
    handleFromCitySelect,
    handleToCitySelect,
    handleSearch,
    handleFilterChange,
    handlePackagePress,
  };
};
