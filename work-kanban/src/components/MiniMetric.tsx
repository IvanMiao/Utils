import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export function MiniMetric({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: number | string;
  tone?: string;
  icon?: ReactNode;
}): JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/50 bg-secondary/20 p-3.5 shadow-none transition-all hover:bg-secondary/35 dark:bg-secondary/10 dark:hover:bg-secondary/20">
      <div className="flex items-center justify-between gap-2">
        <div className={cn("text-2xl font-bold tracking-tight tabular-nums", tone)}>{value}</div>
        {icon && <div className="shrink-0 text-muted-foreground/50">{icon}</div>}
      </div>
      <div className="mt-1 text-[11px] font-medium text-muted-foreground">{label}</div>
    </div>
  );
}
