import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { useAuth } from '../context/AuthContext';

export default function OtpScreen() {
  const { verifyOtp, devOtp, pendingPhone } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const ok = await verifyOtp(code);
    setLoading(false);
    if (!ok) Alert.alert('Erreur', 'Code OTP invalide');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.info}>Un code OTP a été envoyé par SMS {pendingPhone ? `au ${pendingPhone}` : ''}.</Text>
      {devOtp ? <Text style={styles.helper}>Code de dev: {devOtp}</Text> : null}
      <AppInput label="Code OTP" placeholder="123456" keyboardType="number-pad" value={code} onChangeText={setCode} />
      <AppButton title={loading ? 'Vérification…' : 'Vérifier'} onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  info: { marginBottom: 8, color: '#374151' },
  helper: { marginBottom: 8, color: '#6b7280' },
});