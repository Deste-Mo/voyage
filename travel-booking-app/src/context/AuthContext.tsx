import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, SignUpPayload, AuthCredentials } from '../types';
import { getSavedToken, signIn as serviceSignIn, signOut as serviceSignOut, signUp as serviceSignUp, verifyOtp as serviceVerifyOtp, getOtpHelpCode } from '../services/authService';
import { setAuthToken } from '../services/api';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isBootstrapping: boolean;
  hasPendingVerification: boolean;
  otpHelpCode: string | null; // demo helper
  signIn: (credentials: AuthCredentials) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [hasPendingVerification, setHasPendingVerification] = useState(false);
  const [otpHelpCode, setOtpHelpCode] = useState<string | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const savedToken = await getSavedToken();
        if (savedToken) {
          setAuthToken(savedToken);
          setToken(savedToken);
          // In a real app, fetch user profile here. We'll mock a placeholder user.
          const savedUserRaw = await AsyncStorage.getItem('CURRENT_USER');
          if (savedUserRaw) {
            setUser(JSON.parse(savedUserRaw));
          }
        }
        const help = await getOtpHelpCode();
        setOtpHelpCode(help);
      } catch (e) {
        // noop
      } finally {
        setIsBootstrapping(false);
      }
    };
    bootstrap();
  }, []);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const signIn = async (credentials: AuthCredentials) => {
    const res = await serviceSignIn(credentials);
    if (!res) return false;
    setUser(res.user);
    setToken(res.token);
    await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(res.user));
    return true;
  };

  const signUp = async (payload: SignUpPayload) => {
    const res = await serviceSignUp(payload);
    if (!res.otpSent) return false;
    setHasPendingVerification(true);
    await AsyncStorage.setItem('PENDING_SIGNUP_DATA', JSON.stringify(payload));
    return true;
  };

  const verifyOtp = async (code: string) => {
    const res = await serviceVerifyOtp(code);
    if (!res) return false;
    setUser(res.user);
    setToken(res.token);
    setHasPendingVerification(false);
    await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(res.user));
    await AsyncStorage.removeItem('PENDING_SIGNUP_DATA');
    return true;
  };

  const signOut = async () => {
    await serviceSignOut();
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('CURRENT_USER');
  };

  const value = useMemo(
    () => ({ user, token, isBootstrapping, hasPendingVerification, otpHelpCode, signIn, signOut, signUp, verifyOtp }),
    [user, token, isBootstrapping, hasPendingVerification, otpHelpCode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}