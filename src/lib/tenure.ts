const plural = (count: number, unit: string) => `${count} ${unit}${count === 1 ? '' : 's'}`;

export function tenure(startIso: string, endIso?: string, now: Date = new Date()): string {
  const [startYear, startMonth] = startIso.split('-').map(Number);
  const [endYear, endMonth] = endIso
    ? endIso.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && plural(years, 'year'), rest && plural(rest, 'month')].filter(Boolean).join(' ');
}

export function refreshTenures(): void {
  document.querySelectorAll<HTMLElement>('[data-tenure-start]').forEach((el) => {
    el.textContent = tenure(el.dataset.tenureStart!, el.dataset.tenureEnd || undefined);
  });
}
