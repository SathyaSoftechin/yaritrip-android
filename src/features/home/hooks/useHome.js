import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { attractionService } from '../services/attractionService';

const DEFAULT_CITY = 'Maldives';

const CATEGORY_TABS = ['Packages', 'Flights', 'Cars', 'Hotels'];

export const useHome = () => {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [activeTab, setActiveTab] = useState('Packages');
  const [searchForm, setSearchForm] = useState({
    fromCity: '',
    toDestination: '',
    when: '',
    members: '',
  });

  const {
    data: attractions = [],
    isLoading: attractionsLoading,
    error: attractionsError,
    refetch: refetchAttractions,
  } = useQuery({
    queryKey: ['attractions', 'popular', selectedCity],
    queryFn: () => attractionService.getPopularByCity(selectedCity),
  });

  const handleSearchFormChange = (field, value) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Search navigation will be implemented in Phase 2
    console.log('Search triggered:', searchForm);
  };

  return {
    selectedCity,
    setSelectedCity,
    activeTab,
    setActiveTab,
    searchForm,
    handleSearchFormChange,
    handleSearch,
    attractions,
    attractionsLoading,
    attractionsError,
    refetchAttractions,
    categoryTabs: CATEGORY_TABS,
  };
};
