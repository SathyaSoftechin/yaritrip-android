import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';
import PackagesScreen from '../screens/PackagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';

enableScreens();

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Packages" component={PackagesScreen} />
         <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
        <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// src/navigation/AppNavigator.js
// src/navigation/AppNavigator.js

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { enableScreens } from 'react-native-screens';
// import { View, ActivityIndicator, StyleSheet } from 'react-native';

// import { useAuth } from '../hooks/AuthContext';

// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';
// import CardDetailsScreen from '../screens/CardDetailsScreen';

// enableScreens();

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   const { token, loading } = useAuth();

//   // Loading screen while checking token
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#F5A623" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
        
//         {token ? (
//           <>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//             <Stack.Screen name="Signup" component={SignupScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//           </>
//         )}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0B0F1A',
//   },
// });