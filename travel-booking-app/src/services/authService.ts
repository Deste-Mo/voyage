import api, { setAuthToken } from './api';
import { SignUpPayload, User, AuthCredentials } from '../types';

export async function signUp(payload: SignUpPayload): Promise<{ otpSent: boolean; phone: string; devOtp?: string }> {
  const res = await api.post('/register', payload);
  return { otpSent: !!res.data.success, phone: payload.phone, devOtp: res.data.devOtp };
}

export async function verifyOtpApi(phone: string, code: string): Promise<{ user: User; token: string } | null> {
  try {
    const res = await api.post('/verify-otp', { phone, code });
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function signIn(credentials: AuthCredentials): Promise<{ user: User; token: string } | null> {
  try {
    const res = await api.post('/login', credentials);
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function signOut(): Promise<void> {
  setAuthToken(null);
}

export function applyToken(token: string | null) {
  setAuthToken(token);
}