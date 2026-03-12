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
import FloatingChatButton from '../../chatbot/components/FloatingChatButton';
import colors from '../../../theme/colors';
import { useAuthStore } from '../../../store/authStore';

const HomeScreen = ({ navigation }) => {
  const user = useAuthStore(state => state.user);
  const [bottomTab, setBottomTab] = useState('home');

  const openChat = () => {
    navigation.navigate('Chatbot');
  };

  const {
    cities,
    citiesLoading,
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

  useFocusEffect(
    useCallback(() => {
      setBottomTab('home');
    }, [])
  );

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroHeader userName={user?.name} avatarUrl={user?.avatarUrl} />

        <SearchBar
          form={searchForm}
          onChange={handleSearchFormChange}
          onSearch={handleSearch}
        />

        <CategoryTabs
          tabs={categoryTabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        <SectionHeader title="Popular Destinations" />
        {citiesLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <FlatList
            horizontal
            data={cities}
            keyExtractor={item => item.id}
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
              <AttractionCard item={item} onPress={() => {}} />
            )}
          />
        )}

        <PromoBanner onPress={() => {}} />

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

        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomTabBar
        activeTab={bottomTab}
        navigation={navigation}
      />

      {/* Chatbot Component */}
      <FloatingChatButton onPress={openChat} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  cityList: { paddingHorizontal: 16, paddingVertical: 4 },
  attractionList: { paddingHorizontal: 16, gap: 12 },
  loader: { marginVertical: 20 },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
  },
  bottomPadding: { height: 160 },
});

export default HomeScreen;