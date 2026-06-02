export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function relativeDays(value: string): number {
  const now = new Date(todayIso()).getTime();
  const target = new Date(value).getTime();
  return Math.ceil((target - now) / 86_400_000);
}

export function formatRelativeDue(value: string): string {
  const days = relativeDays(value);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days}d`;
}
