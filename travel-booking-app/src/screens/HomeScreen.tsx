import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import SearchForm from '../components/SearchForm';
import { useAuth } from '../context/AuthContext';
import AppButton from '../components/AppButton';

export default function HomeScreen({ navigation }: NativeStackScreenProps<AppStackParamList, 'Home'>) {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bonjour, {user?.firstName ?? 'Utilisateur'}</Text>
      <SearchForm onSubmit={(params) => navigation.navigate('SearchResults', { params })} />
      <AppButton title="Se déconnecter" onPress={signOut} style={{ marginTop: 12, backgroundColor: '#ef4444' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  greeting: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
});