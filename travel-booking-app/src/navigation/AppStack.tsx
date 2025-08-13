import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import BookingScreen from '../screens/BookingScreen';

export type AppStackParamList = {
  Home: undefined;
  SearchResults: { params: any };
  Booking: { journey: any; params: any };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: 'Résultats' }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Réservation' }} />
    </Stack.Navigator>
  );
}