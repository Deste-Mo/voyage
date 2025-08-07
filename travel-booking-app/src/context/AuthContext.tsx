import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, SignUpPayload, AuthCredentials } from '../types';
import { signIn as serviceSignIn, signOut as serviceSignOut, signUp as serviceSignUp, verifyOtpApi, applyToken } from '../services/authService';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isBootstrapping: boolean;
  hasPendingVerification: boolean;
  devOtp?: string; // only in dev from API
  pendingPhone?: string | null;
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
  const [devOtp, setDevOtp] = useState<string | undefined>(undefined);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  useEffect(() => {
    // No persistence; bootstrapping is just immediate ready
    setIsBootstrapping(false);
  }, []);

  useEffect(() => {
    applyToken(token);
  }, [token]);

  const signIn = async (credentials: AuthCredentials) => {
    const res = await serviceSignIn(credentials);
    if (!res) return false;
    setUser(res.user);
    setToken(res.token);
    return true;
  };

  const signUp = async (payload: SignUpPayload) => {
    const res = await serviceSignUp(payload);
    if (!res.otpSent) return false;
    setHasPendingVerification(true);
    setPendingPhone(payload.phone);
    setDevOtp(res.devOtp);
    return true;
  };

  const verifyOtp = async (code: string) => {
    if (!pendingPhone) return false;
    const res = await verifyOtpApi(pendingPhone, code);
    if (!res) return false;
    setUser(res.user);
    setToken(res.token);
    setHasPendingVerification(false);
    setPendingPhone(null);
    setDevOtp(undefined);
    return true;
  };

  const signOut = async () => {
    await serviceSignOut();
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, isBootstrapping, hasPendingVerification, devOtp, pendingPhone, signIn, signOut, signUp, verifyOtp }),
    [user, token, isBootstrapping, hasPendingVerification, devOtp, pendingPhone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}