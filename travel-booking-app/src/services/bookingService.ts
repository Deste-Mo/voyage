import api from './api';
import { Booking, Journey } from '../types';

export async function createBooking(journey: Journey, userId: string, adults: number, children: number): Promise<Booking> {
  const res = await api.post('/trips/reserve', { journeyId: journey.id, adults, children });
  return res.data as Booking;
}