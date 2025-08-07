import dayjs from 'dayjs';
import { Journey, SearchParams, TripType } from '../types';

const AGENCIES = ['ExpressGo', 'VoyagePlus', 'QuickTrip', 'CityLines', 'ZenBus'];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function searchTrips(params: SearchParams): Promise<Journey[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 600));

  // Generate deterministic seed from input to keep result stable in a session
  const seed = (params.departureCity + params.destinationCity + params.date + params.tripType).length;
  const resultsCount = Math.max(3, (seed % 6) + 3);

  const baseDate = dayjs(params.date).hour(6).minute(0).second(0);

  const journeys: Journey[] = Array.from({ length: resultsCount }).map((_, i) => {
    const depart = baseDate.add(i * 75 + randomInt(0, 30), 'minute');
    const duration = 60 + (i * 20) + randomInt(0, 40);
    const priceAdultBase = params.tripType === 'VIP' ? 25 : 12;
    const priceChildBase = params.tripType === 'VIP' ? 18 : 8;

    return {
      id: `j_${seed}_${i}`,
      agencyName: AGENCIES[i % AGENCIES.length],
      departureTime: depart.toISOString(),
      durationMinutes: duration,
      priceAdult: priceAdultBase + i * 1.5,
      priceChild: priceChildBase + i * 1.2,
      availableSeats: randomInt(4, 20),
      tripType: params.tripType as TripType,
    };
  });

  return journeys;
}