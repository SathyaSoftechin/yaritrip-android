import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { SlidersHorizontal, ArrowLeft } from 'lucide-react-native';
import { useSearch } from '../hooks/useSearch';
import PackageCard from '../components/PackageCard';
import FilterSheet from '../components/FilterSheet';
import SearchBar from '../../home/components/SearchBar';
import CityPickerModal from '../../home/components/CityPickerModal';
import colors from '../../../theme/colors';

const SearchResultsScreen = ({ navigation, route }) => {
  const initialForm = route?.params?.searchForm || {};
  const [filterVisible, setFilterVisible] = useState(false);
  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [toPickerOpen, setToPickerOpen] = useState(false);

  const {
    form,
    cities,
    packages,
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
  } = useSearch(navigation, initialForm);

  // In no-params mode the list is auto-loaded; show it as soon as data arrives
  const shouldShowList = hasSearched || (noParamsMode && !packagesLoading);

  return (
    <SafeAreaView style={styles.root}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>
          {noParamsMode ? 'All Packages' : 'Search Results'}
        </Text>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterVisible(true)}
        >
          <SlidersHorizontal size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Card — always shown so the user can refine */}
      <SearchBar
        form={form}
        onChange={handleFormChange}
        onSearch={handleSearch}
        onFromCityPress={() => setFromPickerOpen(true)}
        onToCityPress={() => setToPickerOpen(true)}
      />

      {/* Loading */}
      {packagesLoading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )}

      {/* Error */}
      {!packagesLoading && packagesError && (
        <Text style={styles.errorText}>
          Failed to load packages. Please try again.
        </Text>
      )}

      {/* Results list */}
      {!packagesLoading && !packagesError && shouldShowList && (
        <FlatList
          data={packages}
          keyExtractor={item => `result-${String(item.id)}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PackageCard item={item} onPress={handlePackagePress} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No packages found. Try adjusting your search or filters.
            </Text>
          }
        />
      )}

      {/* Hint — only when no params and not yet loaded */}
      {!noParamsMode && !hasSearched && !packagesLoading && (
        <Text style={styles.hintText}>
          Fill in your details above and tap Search.
        </Text>
      )}

      {/* Filter Sheet */}
      <FilterSheet
        visible={filterVisible}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClose={() => setFilterVisible(false)}
      />

      {/* City Picker Modals */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    marginRight: 8,
  },
  screenTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  filterBtn: {
    padding: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    paddingHorizontal: 24,
  },
  hintText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    paddingHorizontal: 24,
  },
});

export default SearchResultsScreen;