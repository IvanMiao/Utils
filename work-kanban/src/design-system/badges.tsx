import { Badge } from "../components/ui/badge";
import { POC_HEALTH_META, PRIORITY_META, STATUS_META } from "../lib/data";
import { cn } from "../lib/utils";
import type { KanbanStatus, Poc, Priority } from "../lib/types";
import { PriorityIcon } from "./icons";

export function CountBadge({ value }: { value: number | string }): JSX.Element {
  return (
    <Badge variant="secondary" className="h-5 min-w-5 rounded-full px-1.5 text-[11px] tabular-nums">
      {value}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: KanbanStatus }): JSX.Element {
  return (
    <Badge variant="outline" className={cn("text-[11px]", STATUS_META[status].tone)}>
      {STATUS_META[status].label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }): JSX.Element {
  return (
    <Badge variant="outline" className={cn("text-[11px]", PRIORITY_META[priority].tone)}>
      <PriorityIcon priority={priority} data-icon="inline-start" className="h-3 w-3 shrink-0" />
      {PRIORITY_META[priority].label}
    </Badge>
  );
}

export function HealthBadge({ health }: { health: Poc["health"] }): JSX.Element {
  return (
    <Badge variant="outline" className={cn("text-[11px]", POC_HEALTH_META[health].tone)}>
      {POC_HEALTH_META[health].label}
    </Badge>
  );
}
