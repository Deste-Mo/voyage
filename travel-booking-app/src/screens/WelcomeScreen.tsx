import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';

export default function WelcomeScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'Welcome'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Travel Booking</Text>
      <Text style={styles.subtitle}>Réservez vos trajets facilement</Text>
      <AppButton title="Se connecter" onPress={() => navigation.navigate('SignIn')} style={{ marginTop: 24 }} />
      <AppButton title="Créer un compte" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 12, backgroundColor: '#10b981' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 8, color: '#6b7280' },
});