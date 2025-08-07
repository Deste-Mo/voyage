export type TripType = 'VIP' | 'Standard';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthCredentials {
  phone: string;
  password: string;
}

export interface SignUpPayload extends AuthCredentials {
  firstName: string;
  lastName: string;
}

export interface SearchParams {
  departureCity: string;
  destinationCity: string;
  date: string; // ISO string (YYYY-MM-DD)
  tripType: TripType;
  adults: number;
  children?: number;
}

export interface Journey {
  id: string;
  agencyName: string;
  departureTime: string; // ISO time or full datetime
  durationMinutes: number;
  priceAdult: number; // per person
  priceChild: number; // per person
  availableSeats: number;
  tripType: TripType;
}

export interface Booking {
  id: string;
  journeyId: string;
  userId: string;
  totalPrice: number;
  seatsAdults: number;
  seatsChildren: number;
  createdAt: string; // ISO datetime
}