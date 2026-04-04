import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHome } from '../hooks/useHome';
import HeroHeader from '../components/HeroHeader';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import CityChip from '../components/CityChip';
import AttractionCard from '../components/AttractionCard';
import PromoBanner from '../components/PromoBanner';
import SectionHeader from '../components/SectionHeader';
import BottomTabBar from '../components/BottomTabBar';
import CityPickerModal from '../components/CityPickerModal';
import StaysSection from '../components/StaysSection';
import colors from '../../../theme/colors';
import { useAuthStore } from '../../../store/authStore';

const HomeScreen = ({ navigation }) => {
  const user = useAuthStore(state => state.user);
  const [bottomTab, setBottomTab] = useState('home');
  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [toPickerOpen, setToPickerOpen] = useState(false);

  const safeKey = (prefix) => (item, index) =>
    item?.id ? `${prefix}-${item.id}` : `${prefix}-fallback-${index}`;

  const {
    cities,
    citiesLoading,
    selectedCity,
    setSelectedCity,
    activeTab,
    setActiveTab,
    searchForm,
    handleSearchFormChange,
    handleFromCitySelect,
    handleToCitySelect,
    attractions,
    attractionsLoading,
    attractionsError,
    categoryTabs,
  } = useHome();

  useFocusEffect(
    useCallback(() => {
      setBottomTab('home');
    }, [])
  );

  const handleSearch = useCallback(() => {
    navigation.navigate('SearchResults', { searchForm });
  }, [navigation, searchForm]);

  const handlePackagePress = useCallback((item) => {
    navigation.navigate('PackageDetail', { packageId: item.id });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        overScrollMode="never"
      >
        {/* Hero */}
        <HeroHeader userName={user?.name} avatarUrl={user?.avatarUrl} />

        {/* Search Card */}
        <View style={styles.searchBarWrapper}>
          <SearchBar
            form={searchForm}
            onChange={handleSearchFormChange}
            onSearch={handleSearch}
            onFromCityPress={() => setFromPickerOpen(true)}
            onToCityPress={() => setToPickerOpen(true)}
          />
        </View>

        {/* Category Tabs */}
        <CategoryTabs
          tabs={categoryTabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        {/* Popular Cities */}
        <SectionHeader title="Popular Destinations" />
        {citiesLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <FlatList
            horizontal
            data={cities}
            keyExtractor={safeKey('city')}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cityList}
            renderItem={({ item }) => (
              <CityChip
                city={item.name}
                isSelected={item.name === selectedCity}
                onPress={() => setSelectedCity(item.name)}
              />
            )}
          />
        )}

        {/* Top Packages */}
        <SectionHeader
          title="Top Packages"
          onSeeAll={() => navigation.navigate('SearchResults', {})}
        />
        {attractionsLoading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        )}
        {attractionsError && (
          <Text style={styles.errorText}>
            Failed to load packages. Please try again.
          </Text>
        )}
        {!attractionsLoading && !attractionsError && (
          <FlatList
            horizontal
            data={attractions}
            keyExtractor={safeKey('pkg')}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attractionList}
            renderItem={({ item }) => (
              <AttractionCard item={item} onPress={handlePackagePress} />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No packages found for {selectedCity}.
              </Text>
            }
          />
        )}

        {/* Promo Banner */}
        <PromoBanner onPress={() => {}} />

        {/* Stays */}
        <StaysSection
          onStayPress={(stay) =>
            navigation.navigate('StayDetail', { stayId: stay.id })
          }

        />

        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomTabBar activeTab={bottomTab} navigation={navigation} />

      {/* City Pickers */}
      <CityPickerModal
        visible={fromPickerOpen}
        cities={cities}
        title="From City"
        onSelect={handleFromCitySelect}
        onClose={() => setFromPickerOpen(false)}
      />
      <CityPickerModal
        visible={toPickerOpen}
        cities={cities}
        title="To Destination"
        onSelect={handleToCitySelect}
        onClose={() => setToPickerOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchBarWrapper: {
    marginHorizontal: 16,
    marginTop: -32,
    overflow: 'visible',
    zIndex: 10,
  },
  cityList: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  attractionList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bottomPadding: {
    height: 90,
  },
});

export default HomeScreen;