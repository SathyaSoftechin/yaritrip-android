import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCities, fetchDestinations, searchPackages, fetchAllPackages } from '../services/searchService';

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

// Returns true when the form has enough data to trigger a search
const isFormComplete = (form) =>
  !!form.fromCode && !!form.toCode && !!form.when && !!form.members;

export const useSearch = (navigation, initialForm = {}) => {
  const [form, setForm] = useState({ ...DEFAULT_FORM, ...initialForm });
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    budgetRange: null,     // { min, max } — matches pkg.price
    durationRange: null,   // { min, max } — matches pkg.totalDays
    category: null,        // 'DOMESTIC' | 'INTERNATIONAL' — matches pkg.category
  });

  // True when the screen was opened without a complete search form
  const noParamsMode = !isFormComplete({ ...DEFAULT_FORM, ...initialForm });

  // ─── All packages (no-params mode) ───────────────────────────────────────────
  const {
    data: allPackages = [],
    isLoading: allPackagesLoading,
    error: allPackagesError,
  } = useQuery({
    queryKey: ['allPackages'],
    queryFn: fetchAllPackages,
    enabled: noParamsMode,
    staleTime: 5 * 60 * 1000,
  });

  // Mark hasSearched once the all-packages query has resolved
  useEffect(() => {
    if (noParamsMode && allPackages.length > 0) {
      setHasSearched(true);
    }
  }, [noParamsMode, allPackages]);

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

  // ─── Search packages (param mode) ────────────────────────────────────────────
  const {
    data: searchedPackages = [],
    isPending: searchLoading,
    error: searchError,
    mutate: triggerSearch,
  } = useMutation({
    mutationFn: searchPackages,
    onSuccess: () => setHasSearched(true),
  });

  // Auto-fire search if navigated in with a fully populated form
  useEffect(() => {
    if (!noParamsMode) {
      const { fromCode, toCode, when, members } = form;
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

  // ─── Resolve active package list & loading/error states ──────────────────────
  const rawPackages = noParamsMode ? allPackages : searchedPackages;
  const packagesLoading = noParamsMode ? allPackagesLoading : searchLoading;
  const packagesError = noParamsMode ? allPackagesError : searchError;

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
  const filteredPackages = rawPackages.filter(pkg => {
    // Budget filter → pkg.price
    if (filters.budgetRange) {
      const { min, max } = filters.budgetRange;
      const price = pkg.price ?? 0;
      if (price < min || price > max) return false;
    }

    // Duration filter → pkg.totalDays
    if (filters.durationRange) {
      const { min, max } = filters.durationRange;
      const days = pkg.totalDays ?? 0;
      if (days < min || days > max) return false;
    }

    // Category filter → pkg.category ('DOMESTIC' | 'INTERNATIONAL')
    if (filters.category) {
      if ((pkg.category ?? '').toUpperCase() !== filters.category) return false;
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
    noParamsMode,
    handleFormChange,
    handleFromCitySelect,
    handleToCitySelect,
    handleSearch,
    handleFilterChange,
    handlePackagePress,
  };
};