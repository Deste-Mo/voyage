import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OtpScreen from '../screens/OtpScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Otp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenue' }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Se connecter' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Créer un compte' }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'Vérification OTP' }} />
    </Stack.Navigator>
  );
}