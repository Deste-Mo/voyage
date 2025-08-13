import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
}

export default function AppInput({ label, style, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, style]} placeholderTextColor="#9ca3af" {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#374151' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#111827',
  },
});