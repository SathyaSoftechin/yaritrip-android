import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileNavigator from './ProfileNavigator';
import SearchResults from '../screens/SearchResultsScreen';

// Package screens
import PackageDetailScreen from '../screens/PackageDetailScreen';
import ChangeHotelScreen from '../screens/ChangeHotelScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import ReviewPackageScreen from '../screens/ReviewPackageScreen';

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