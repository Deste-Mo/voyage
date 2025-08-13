import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TripType } from '../types';

interface Props {
  value: TripType;
  onChange: (type: TripType) => void;
}

export default function TripTypeToggle({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {(['Standard', 'VIP'] as TripType[]).map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => onChange(type)}
          style={[styles.option, value === type && styles.optionActive]}
        >
          <Text style={[styles.text, value === type && styles.textActive]}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  option: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  text: { color: '#374151', fontWeight: '600' },
  textActive: { color: 'white' },
});