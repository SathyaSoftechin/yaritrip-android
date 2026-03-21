import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import ProfileNavigator from './ProfileNavigator';
import SearchResults from '../features/search/screens/SearchResultsScreen';

// Package feature screens
import PackageDetailScreen from '../features/package/screens/PackageDetailScreen';
import ChangeHotelScreen from '../features/package/screens/ChangeHotelScreen';
import AddActivityScreen from '../features/package/screens/AddActivityScreen';
import ReviewPackageScreen from '../features/package/screens/ReviewPackageScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      {/* Core */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="ProfileTab" component={ProfileNavigator} />

      {/* Package feature */}
      <Stack.Screen
        name="PackageDetail"
        component={PackageDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ChangeHotel"
        component={ChangeHotelScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="ReviewPackage"
        component={ReviewPackageScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;