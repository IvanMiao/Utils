import { FolderKanban, ShieldAlert, Sparkles } from "lucide-react";
import { HealthBadge, StatusBadge } from "../design-system";
import { MiniMetric } from "../components/MiniMetric";
import { formatDate } from "../lib/date";
import type { Task, WorkKanbanData } from "../lib/types";

export function PocView({
  data,
  openEditTask,
}: {
  data: WorkKanbanData;
  openEditTask: (task: Task) => void;
}): JSX.Element {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {data.pocs.map((poc) => {
        const tasks = data.tasks.filter((task) => task.pocId === poc.id);
        const open = tasks.filter((task) => task.status !== "done").length;
        const blocked = tasks.filter((task) => task.status === "blocked").length;

        return (
          <section key={poc.id} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: poc.color }} />
                  <h3 className="truncate text-base font-semibold">{poc.name}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{poc.goal}</p>
              </div>
              <HealthBadge health={poc.health} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <MiniMetric label="Open" value={open} icon={<FolderKanban className="h-4 w-4" strokeWidth={1.75} />} />
              <MiniMetric label="Blocked" value={blocked} tone="text-red-600 dark:text-red-400" icon={<ShieldAlert className="h-4 w-4" strokeWidth={1.75} />} />
              <MiniMetric label="Confidence" value={`${poc.confidence}%`} tone="text-primary" icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />} />
            </div>

            <dl className="mt-4 space-y-2 text-sm">
              <InfoRow label="Stage" value={poc.stage} />
              <InfoRow label="Milestone" value={poc.nextMilestone} />
              <InfoRow label="Owner" value={poc.stakeholder} />
              <InfoRow label="Due" value={formatDate(poc.dueDate)} />
            </dl>

            <div className="mt-4 space-y-2">
              {tasks.slice(0, 4).map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => openEditTask(task)}
                  className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-card px-3 text-left text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <span className="min-w-0 truncate font-medium">{task.title}</span>
                  <StatusBadge status={task.status} />
                </button>
              ))}
              {tasks.length === 0 && (
                <div className="rounded-lg border border-dashed border-border/50 bg-secondary/10 p-4 text-center text-sm text-muted-foreground">
                  No tasks
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
