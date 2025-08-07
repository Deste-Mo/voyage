import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUpPayload, User, AuthCredentials } from '../types';

const USERS_KEY = 'MOCK_USERS';
const TOKEN_KEY = 'AUTH_TOKEN';
const PENDING_SIGNUP_KEY = 'PENDING_SIGNUP';
const OTP_CODE = '123456';

interface StoredUser extends User {
  password: string;
}

async function readUsers(): Promise<Record<string, StoredUser>> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function writeUsers(users: Record<string, StoredUser>) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function signUp(payload: SignUpPayload): Promise<{ otpSent: boolean; phone: string }> {
  const users = await readUsers();
  if (users[payload.phone]) {
    throw new Error('Un compte existe déjà avec ce numéro');
  }
  const newUser: StoredUser = {
    id: `u_${Date.now()}`,
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
    password: payload.password,
  };
  await AsyncStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(newUser));
  // Simulate sending OTP via SMS (mock). In real app, call backend/Twilio here.
  return { otpSent: true, phone: payload.phone };
}

export async function verifyOtp(code: string): Promise<{ user: User; token: string } | null> {
  if (code !== OTP_CODE) {
    return null;
  }
  const raw = await AsyncStorage.getItem(PENDING_SIGNUP_KEY);
  if (!raw) return null;
  const newUser: StoredUser = JSON.parse(raw);
  const users = await readUsers();
  users[newUser.phone] = newUser;
  await writeUsers(users);
  await AsyncStorage.removeItem(PENDING_SIGNUP_KEY);

  const token = `token_${Date.now()}`;
  await AsyncStorage.setItem(TOKEN_KEY, token);
  return { user: newUser, token };
}

export async function signIn(credentials: AuthCredentials): Promise<{ user: User; token: string } | null> {
  const users = await readUsers();
  const match = users[credentials.phone];
  if (!match || match.password !== credentials.password) {
    return null;
  }
  const token = `token_${Date.now()}`;
  await AsyncStorage.setItem(TOKEN_KEY, token);
  return { user: match, token };
}

export async function signOut(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getSavedToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getOtpHelpCode(): Promise<string> {
  // Helper to display in demo (do not do this in production)
  return OTP_CODE;
}