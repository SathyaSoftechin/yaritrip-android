import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import LikesScreen from '../screens/LikesScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import LanguageScreen from '../screens/LanguageScreen';
import TermsScreen from '../screens/TermsScreen';

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
