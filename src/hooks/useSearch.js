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
};

const isFormComplete = (form) =>
  !!form.fromCode && !!form.toCode;

export const useSearch = (navigation, initialForm = {}) => {
  const [form, setForm] = useState({ ...DEFAULT_FORM, ...initialForm });
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    budgetRange: null,
    durationRange: null,
    category: null,
  });

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

  useEffect(() => {
    if (noParamsMode && allPackages.length > 0) {
      setHasSearched(true);
    }
  }, [noParamsMode, allPackages]);

  // ─── Cities ──────────────────────────────────────────────────────────────────
  const {
    data: cities = [],
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    staleTime: 10 * 60 * 1000,
  });

  // ─── Destinations ─────────────────────────────────────────────────────────────
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
      const { fromCode, toCode } = form;
      triggerSearch({ fromCode, toCode });
    }
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
    const { fromCode, toCode } = form;
    if (!fromCode || !toCode) return;
    triggerSearch({ fromCode, toCode });
  }, [form, triggerSearch]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handlePackagePress = useCallback((pkg) => {
    navigation.navigate('PackageDetail', { packageId: pkg.id });
  }, [navigation]);

  // ─── Client-side filter application ──────────────────────────────────────────
  const filteredPackages = rawPackages.filter(pkg => {
    if (filters.budgetRange) {
      const { min, max } = filters.budgetRange;
      const price = pkg.price ?? 0;
      if (price < min || price > max) return false;
    }

    if (filters.durationRange) {
      const { min, max } = filters.durationRange;
      const days = pkg.totalDays ?? 0;
      if (days < min || days > max) return false;
    }

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