import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const ok = await signIn({ phone, password });
    setLoading(false);
    if (!ok) Alert.alert('Erreur', 'Identifiants invalides');
  };

  return (
    <View style={{ padding: 16 }}>
      <AppInput label="Téléphone" placeholder="Ex: +33601020304" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <AppInput label="Mot de passe" placeholder="••••••" secureTextEntry value={password} onChangeText={setPassword} />
      <AppButton title={loading ? 'Connexion…' : 'Se connecter'} onPress={submit} />
    </View>
  );
}