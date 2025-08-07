import api from './api';
import { Journey, SearchParams, TripType } from '../types';

export async function searchTrips(params: SearchParams): Promise<Journey[]> {
  const res = await api.get('/trips/search', { params });
  const rows = res.data as any[];
  return rows.map((r) => ({
    id: r.id,
    agencyName: r.agencyName,
    departureTime: `${r.departureDate}T${r.departureTime}:00.000Z`,
    durationMinutes: r.durationMinutes,
    priceAdult: Number(r.priceAdult),
    priceChild: Number(r.priceChild),
    availableSeats: r.availableSeats,
    tripType: r.tripType as TripType,
  }));
}