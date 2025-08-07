import dayjs from 'dayjs';
import { Booking, Journey } from '../types';

export async function createBooking(journey: Journey, userId: string, adults: number, children: number): Promise<Booking> {
  await new Promise((r) => setTimeout(r, 500));
  const totalPrice = journey.priceAdult * adults + journey.priceChild * children;
  return {
    id: `b_${Date.now()}`,
    journeyId: journey.id,
    userId,
    totalPrice,
    seatsAdults: adults,
    seatsChildren: children,
    createdAt: dayjs().toISOString(),
  };
}