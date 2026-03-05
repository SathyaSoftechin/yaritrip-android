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
toDestination: '',
when: '',
members: '',
});

// Fetch cities
const {
data: cities = [],
isLoading: citiesLoading,
} = useQuery({
queryKey: ['cities'],
queryFn: cityService.getCities,
});

// Auto select first city
const activeCity = selectedCity || cities?.[0]?.name;

// Fetch attractions
const {
data: attractions = [],
isLoading: attractionsLoading,
error: attractionsError,
} = useQuery({
queryKey: ['attractions', 'popular', activeCity],
queryFn: () => attractionService.getPopularByCity(activeCity),
enabled: !!activeCity,
});

const handleSearchFormChange = (field, value) => {
setSearchForm(prev => ({ ...prev, [field]: value }));
};

const handleSearch = () => {
console.log('Search triggered:', searchForm);
};

return {
cities,
citiesLoading,
selectedCity: activeCity,
setSelectedCity,
activeTab,
setActiveTab,
searchForm,
handleSearchFormChange,
handleSearch,
attractions,
attractionsLoading,
attractionsError,
categoryTabs: CATEGORY_TABS,
};
};
