import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com/api', // replace with real backend if available
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