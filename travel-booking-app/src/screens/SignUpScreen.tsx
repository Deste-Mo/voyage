import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';

export default function SignUpScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'SignUp'>) {
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const ok = await signUp({ firstName, lastName, phone, password });
      if (ok) {
        navigation.navigate('Otp');
      } else {
        Alert.alert('Erreur', "Impossible d'envoyer le code OTP");
      }
    } catch (e: any) {
      Alert.alert('Erreur', e.message ?? 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <AppInput label="Prénom" value={firstName} onChangeText={setFirstName} />
      <AppInput label="Nom" value={lastName} onChangeText={setLastName} />
      <AppInput label="Téléphone" placeholder="Ex: +33601020304" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <AppInput label="Mot de passe" placeholder="••••••" secureTextEntry value={password} onChangeText={setPassword} />
      <AppButton title={loading ? 'Envoi du code…' : 'Créer un compte'} onPress={submit} />
    </View>
  );
}