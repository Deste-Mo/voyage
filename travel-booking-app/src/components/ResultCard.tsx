import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Journey } from '../types';
import { formatDuration, formatPrice, formatTime } from '../utils/format';

interface Props {
  journey: Journey;
  onPress: () => void;
}

export default function ResultCard({ journey, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.time}>{formatTime(journey.departureTime)}</Text>
        <Text style={styles.duration}>{formatDuration(journey.durationMinutes)}</Text>
      </View>
      <Text style={styles.agency}>{journey.agencyName} · {journey.tripType}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>Adulte: {formatPrice(journey.priceAdult)}</Text>
        <Text style={styles.price}>Enfant: {formatPrice(journey.priceChild)}</Text>
      </View>
      <Text style={styles.availability}>Places dispo: {journey.availableSeats}</Text>
      <TouchableOpacity onPress={onPress} style={styles.cta}>
        <Text style={styles.ctaText}>Réserver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: 'white' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  time: { fontSize: 18, fontWeight: '700', color: '#111827' },
  duration: { color: '#6b7280' },
  agency: { marginBottom: 6, color: '#374151', fontWeight: '600' },
  price: { color: '#111827' },
  availability: { marginTop: 4, color: '#6b7280' },
  cta: { marginTop: 8, backgroundColor: '#10b981', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
});