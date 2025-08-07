export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidPhone(phone: string): boolean {
  // Very simple check for digits with optional leading +, length 9-15
  return /^\+?\d{9,15}$/.test(phone.trim());
}

export function isStrongEnoughPassword(password: string): boolean {
  return password.length >= 6;
}

export function isValidDate(isoDate: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(isoDate);
}