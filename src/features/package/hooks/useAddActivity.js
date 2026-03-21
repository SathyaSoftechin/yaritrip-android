import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchActivitiesByDay, FAKE_ACTIVITIES } from '../services/packageService';

const useAddActivity = (packageId, day) => {
  const [activeTab, setActiveTab] = useState('Activity'); // 'Activity' | 'Transport'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities', packageId, day],
    queryFn: () => fetchActivitiesByDay(packageId, day),
    placeholderData: FAKE_ACTIVITIES,
  });

  const allItems = activities || FAKE_ACTIVITIES;

  const displayItems = allItems.filter(
    (item) =>
      item.type === activeTab &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectActivity = useCallback((activityId) => {
    setSelectedActivityId((prev) => (prev === activityId ? null : activityId));
  }, []);

  const getSelectedActivity = useCallback(() => {
    return allItems.find((a) => a.id === selectedActivityId) || null;
  }, [allItems, selectedActivityId]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    displayItems,
    isLoading,
    selectedActivityId,
    handleSelectActivity,
    getSelectedActivity,
  };
};

export default useAddActivity;
