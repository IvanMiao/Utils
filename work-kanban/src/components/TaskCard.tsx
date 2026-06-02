import { CalendarClock } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  PriorityBadge,
  PriorityIcon,
} from "../design-system";
import { formatRelativeDue, relativeDays } from "../lib/date";
import type { Poc, Task } from "../lib/types";
import { cn } from "../lib/utils";

export function TaskCard({
  task,
  poc,
  openEditTask,
}: {
  task: Task;
  poc?: Poc;
  openEditTask: (task: Task) => void;
}): JSX.Element {
  const dueDays = relativeDays(task.dueDate);
  const isUrgent = task.status !== "done" && dueDays <= 3;

  return (
    <Card
      size="sm"
      draggable
      onDragStart={(event) => event.dataTransfer.setData("text/plain", task.id)}
      onClick={() => openEditTask(task)}
      className="cursor-pointer border-border/70 shadow-sm transition-all hover:border-zinc-400 hover:shadow-md focus-within:ring-1 focus-within:ring-ring dark:hover:border-zinc-500"
    >
      <CardHeader>
        <CardTitle className="line-clamp-2 text-sm font-semibold leading-5">{task.title}</CardTitle>
        <CardAction>
          <PriorityIcon priority={task.priority} className="mt-0.5 h-4 w-4 shrink-0" />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">{task.description}</p>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: poc?.color ?? "#0f766e" }} />
          <span className="truncate text-xs font-medium text-muted-foreground">{poc?.name ?? "No POC"}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/50 bg-secondary/50 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-2 bg-transparent pt-0">
        <PriorityBadge priority={task.priority} />
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isUrgent ? "text-red-600 dark:text-red-400" : "text-muted-foreground",
          )}
        >
          <CalendarClock className="h-3.5 w-3.5" strokeWidth={1.75} />
          {formatRelativeDue(task.dueDate)}
        </span>
      </CardFooter>
    </Card>
  );
}
