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

  // ─── Fetch cities ─────────────────────────────────────────
  const { data: cities = [], isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: cityService.getCities,
    staleTime: 10 * 60 * 1000,
  });

  const activeCity = selectedCity || cities?.[0]?.name || null;

  // ─── Fetch attractions ────────────────────────────────────
  const {
    data: rawAttractions = [],
    isLoading: attractionsLoading,
    error: attractionsError,
  } = useQuery({
    queryKey: ['attractions', 'popular', activeCity],
    queryFn: () => attractionService.getPopularByCity(activeCity),
    enabled: !!activeCity,
  });


  const attractions = rawAttractions.map((item, index) => ({
    ...item,
    id: item?.id ?? `fallback-${index}`,
  }));


  const handleSearchFormChange = (field, value) => {
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

  const handleFromCitySelect = (city) => {
    setSearchForm(prev => ({
      ...prev,
      fromCity: city.name,
      fromCityId: city.id,
      fromCode: city.code || city.name,
      ...(prev.toDestination === city.name
        ? { toDestination: '', toCityId: null, toCode: '' }
        : {}),
    }));
  };

  const handleToCitySelect = (city) => {
    setSearchForm(prev => ({
      ...prev,
      toDestination: city.name,
      toCityId: city.id,
      toCode: city.code || city.name,
    }));
  };

  return {
    cities,
    citiesLoading,
    selectedCity: activeCity,
    setSelectedCity,

    activeTab,
    setActiveTab,
    categoryTabs: CATEGORY_TABS,

    searchForm,
    handleSearchFormChange,
    handleFromCitySelect,
    handleToCitySelect,

    attractions,
    attractionsLoading,
    attractionsError,
  };
};