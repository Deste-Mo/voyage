import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ label, value, onChange, min = 0, max = 10 }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={dec} style={styles.btn}><Text style={styles.btnText}>-</Text></TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity onPress={inc} style={styles.btn}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#374151', fontWeight: '600' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  btn: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 18, fontWeight: '700' },
  value: { width: 36, textAlign: 'center', fontWeight: '700' },
});