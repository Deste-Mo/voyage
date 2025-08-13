import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppInput from './AppInput';
import AppButton from './AppButton';
import TripTypeToggle from './TripTypeToggle';
import QuantitySelector from './QuantitySelector';
import { SearchParams, TripType } from '../types';
import { isNonEmpty, isValidDate } from '../utils/validators';

interface Props {
  onSubmit: (params: SearchParams) => void;
}

export default function SearchForm({ onSubmit }: Props) {
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [date, setDate] = useState('');
  const [tripType, setTripType] = useState<TripType>('Standard');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const canSearch =
    isNonEmpty(departureCity) &&
    isNonEmpty(destinationCity) &&
    isValidDate(date) &&
    adults > 0;

  const submit = () => {
    if (!canSearch) return;
    onSubmit({ departureCity, destinationCity, date, tripType, adults, children });
  };

  return (
    <View>
      <AppInput label="Ville de départ" placeholder="Ex: Paris" value={departureCity} onChangeText={setDepartureCity} />
      <AppInput label="Ville d'arrivée" placeholder="Ex: Lyon" value={destinationCity} onChangeText={setDestinationCity} />
      <AppInput label="Date (YYYY-MM-DD)" placeholder="2025-08-20" value={date} onChangeText={setDate} />
      <TripTypeToggle value={tripType} onChange={setTripType} />
      <QuantitySelector label="Adultes" value={adults} onChange={setAdults} min={1} />
      <QuantitySelector label="Enfants" value={children} onChange={setChildren} min={0} />
      <AppButton title="Rechercher" onPress={submit} style={!canSearch ? styles.disabled : undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.6 },
});