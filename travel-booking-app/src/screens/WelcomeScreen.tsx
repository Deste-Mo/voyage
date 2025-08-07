import React from 'react';
import { View, Text } from 'react-native';
import AppButton from '../components/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';

export default function WelcomeScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'Welcome'>) {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-xl font-extrabold text-gray-900">Bienvenue sur Travel Booking</Text>
      <Text className="mt-2 text-gray-500">Réservez vos trajets facilement</Text>
      <AppButton title="Se connecter" onPress={() => navigation.navigate('SignIn')} style={{ marginTop: 24 }} />
      <AppButton title="Créer un compte" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 12, backgroundColor: '#10b981' }} />
    </View>
  );
}