const plural = (count: number, unit: string) => `${count} ${unit}${count === 1 ? '' : 's'}`;

/**
 * Time in a role, counting both the first and the last month (November 2020 to November 2021 is
 * 1 year 1 month, the way LinkedIn shows it). A current role (no end) is measured up to `now`.
 */
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

/**
 * The page is static, so a current role's duration baked in at build time goes stale.
 * This recomputes it in the browser against today's date.
 */
export function refreshTenures(): void {
  document.querySelectorAll<HTMLElement>('[data-tenure-start]').forEach((el) => {
    el.textContent = tenure(el.dataset.tenureStart!, el.dataset.tenureEnd || undefined);
  });
}
