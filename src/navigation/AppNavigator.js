import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import ProfileNavigator from './ProfileNavigator';
import ChatScreen from '../features/chatbot/screens/ChatScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chatbot" component={ChatScreen} />
      <Stack.Screen name="ProfileTab" component={ProfileNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;