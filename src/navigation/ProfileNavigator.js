import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import PersonalInfoScreen from '../features/profile/screens/PersonalInfoScreen';
import MyBookingsScreen from '../features/profile/screens/MyBookingsScreen';
import LikesScreen from '../features/profile/screens/LikesScreen';
import PrivacyPolicyScreen from '../features/profile/screens/PrivacyPolicyScreen';
import LanguageScreen from '../features/profile/screens/LanguageScreen';
import TermsScreen from '../features/profile/screens/TermsScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
