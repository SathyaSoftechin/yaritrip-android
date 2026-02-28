import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { useHome } from '../hooks/useHome';
import HeroHeader from '../components/HeroHeader';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import CityChip from '../components/CityChip';
import AttractionCard from '../components/AttractionCard';
import PromoBanner from '../components/PromoBanner';
import SectionHeader from '../components/SectionHeader';
import BottomTabBar from '../components/BottomTabBar';
import colors from '../../../theme/colors';
import { useAuthStore } from '../../../store/authStore';

const POPULAR_CITIES = ['Maldives', 'Bali', 'Santorini', 'Maui', 'Phuket'];

const HomeScreen = ({ navigation }) => {
  const user = useAuthStore(state => state.user);
  const {
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
    categoryTabs,
  } = useHome();

  const [bottomTab, setBottomTab] = React.useState('home');

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <HeroHeader
          userName={user?.name}
          avatarUrl={user?.avatarUrl}
        />

        {/* Search Card */}
        <SearchBar
          form={searchForm}
          onChange={handleSearchFormChange}
          onSearch={handleSearch}
        />

        {/* Category Tabs */}
        <CategoryTabs
          tabs={categoryTabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        {/* Popular Cities */}
        <SectionHeader title="Popular Destinations" />
        <FlatList
          horizontal
          data={POPULAR_CITIES}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityList}
          renderItem={({ item }) => (
            <CityChip
              city={item}
              isSelected={item === selectedCity}
              onPress={setSelectedCity}
            />
          )}
        />

        {/* Attractions */}
        <SectionHeader title="Top Packages" onSeeAll={() => {}} />

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
            keyExtractor={item => item.id?.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attractionList}
            renderItem={({ item }) => (
              <AttractionCard
                item={item}
                onPress={() => {}}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No packages found for {selectedCity}.</Text>
            }
          />
        )}

        {/* Promo Banner */}
        <PromoBanner onPress={() => {}} />

        {/* Second Attractions Row */}
        <SectionHeader title="Exclusive Deals" onSeeAll={() => {}} />
        {!attractionsLoading && !attractionsError && (
          <FlatList
            horizontal
            data={attractions}
            keyExtractor={item => `deal-${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attractionList}
            renderItem={({ item }) => (
              <AttractionCard item={item} onPress={() => {}} />
            )}
          />
        )}

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomTabBar activeTab={bottomTab} onTabPress={setBottomTab} />
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
