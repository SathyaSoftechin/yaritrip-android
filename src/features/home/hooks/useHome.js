import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { attractionService } from '../services/attractionService';
import { cityService } from '../services/cityService';

const CATEGORY_TABS = ['Packages', 'Flights', 'Cars', 'Hotels'];

export const useHome = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeTab, setActiveTab] = useState('Packages');

  const [searchForm, setSearchForm] = useState({
    fromCity: '',
    fromCityId: null,
    fromCode: '',
    toDestination: '',
    toCityId: null,
    toCode: '',
    when: '',
    members: '',
  });

  // ─── Fetch cities ─────────────────────────────────────────────────────────
  const { data: cities = [], isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: cityService.getCities,
    staleTime: 10 * 60 * 1000,
  });

  // Auto select first city for the Popular Destinations chip list
  const activeCity = selectedCity || cities?.[0]?.name;

  // ─── Fetch attractions ────────────────────────────────────────────────────
  const {
    data: attractions = [],
    isLoading: attractionsLoading,
    error: attractionsError,
  } = useQuery({
    queryKey: ['attractions', 'popular', activeCity],
    queryFn: () => attractionService.getPopularByCity(activeCity),
    enabled: !!activeCity,
  });

  // ─── Search form handlers ─────────────────────────────────────────────────

  // Generic field change (for When, Members plain TextInputs)
  const handleSearchFormChange = (field, value) => {
    // Special case: swap button sends '_swap'
    if (field === '_swap') {
      setSearchForm(prev => ({
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
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  // Called when user picks a city from the From City picker
  const handleFromCitySelect = (city) => {
    setSearchForm(prev => ({
      ...prev,
      fromCity: city.name,
      fromCityId: city.id,
      fromCode: city.code || city.name,
      // Reset destination if same as newly picked from-city
      ...(prev.toDestination === city.name
        ? { toDestination: '', toCityId: null, toCode: '' }
        : {}),
    }));
  };

  // Called when user picks a city from the To City picker
  const handleToCitySelect = (city) => {
    setSearchForm(prev => ({
      ...prev,
      toDestination: city.name,
      toCityId: city.id,
      toCode: city.code || city.name,
    }));
  };

  return {
    // City chip list
    cities,
    citiesLoading,
    selectedCity: activeCity,
    setSelectedCity,

    // Category tabs
    activeTab,
    setActiveTab,
    categoryTabs: CATEGORY_TABS,

    // Search form
    searchForm,
    handleSearchFormChange,
    handleFromCitySelect,
    handleToCitySelect,

    // Attractions / packages
    attractions,
    attractionsLoading,
    attractionsError,
  };
};
