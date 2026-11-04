export function formatKzt(amount: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + ' ₸';
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('ru-KZ').format(val);
}
