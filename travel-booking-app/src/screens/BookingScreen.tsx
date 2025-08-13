import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { Journey, SearchParams } from '../types';
import { formatDate, formatDuration, formatPrice, formatTime } from '../utils/format';
import AppButton from '../components/AppButton';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

export default function BookingScreen({ route }: NativeStackScreenProps<AppStackParamList, 'Booking'>) {
  const { journey, params } = route.params as { journey: Journey; params: SearchParams };
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const total = journey.priceAdult * params.adults + journey.priceChild * (params.children ?? 0);

  const confirm = async () => {
    if (!user) return;
    setLoading(true);
    const booking = await createBooking(journey, user.id, params.adults, params.children ?? 0);
    setLoading(false);
    Alert.alert('Réservation confirmée', `Référence: ${booking.id}\nTotal: ${formatPrice(total)}`);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.title}>Votre trajet</Text>
      <Text>{params.departureCity} → {params.destinationCity}</Text>
      <Text>Date: {formatDate(params.date)}</Text>
      <Text>Départ: {formatTime(journey.departureTime)} ({formatDuration(journey.durationMinutes)})</Text>
      <Text>Agence: {journey.agencyName} · {journey.tripType}</Text>
      <Text>Passagers: {params.adults} adulte(s){(params.children ?? 0) > 0 ? `, ${params.children} enfant(s)` : ''}</Text>
      <Text style={styles.total}>Total: {formatPrice(total)}</Text>
      <AppButton title={loading ? 'Réservation…' : 'Confirmer la réservation'} onPress={confirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  total: { marginVertical: 12, fontSize: 16, fontWeight: '700' },
});