import axios from 'axios';
import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra || {}) as any;
const baseURL = extra.apiBaseUrl || process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3002';

const api = axios.create({
  baseURL,
  timeout: 8000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export default api;