import { AlertCircle, ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "../lib/utils";
import type { Priority } from "../lib/types";

export function CompletionIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlockedIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function DueSoonIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="5" fill="var(--background, #fff)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 14v2l1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ActivePocsIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 3l1 2 2-1-1-2-2 1zM19 19l1 2 2-1-1-2-2 1z" fill="currentColor" />
    </svg>
  );
}

export function PriorityIcon({
  priority,
  className,
}: {
  priority: Priority;
  className?: string;
}): JSX.Element {
  const strokeWidth = 2.5;
  const icons = {
    low: <ArrowDown className={cn("text-zinc-400 dark:text-zinc-500", className)} strokeWidth={strokeWidth} />,
    medium: <Minus className={cn("text-blue-500 dark:text-blue-400", className)} strokeWidth={strokeWidth} />,
    high: <ArrowUp className={cn("text-amber-500 dark:text-amber-400", className)} strokeWidth={strokeWidth} />,
    critical: <AlertCircle className={cn("text-red-500 dark:text-red-400", className)} strokeWidth={strokeWidth} />,
  };

  return icons[priority];
}
