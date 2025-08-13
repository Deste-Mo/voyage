import dayjs from 'dayjs';

export function formatTime(iso: string): string {
  return dayjs(iso).format('HH:mm');
}

export function formatDate(iso: string): string {
  return dayjs(iso).format('DD/MM/YYYY');
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export function formatPrice(amount: number): string {
  return `${amount.toFixed(2)} €`;
}