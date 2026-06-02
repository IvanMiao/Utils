import { Activity as ActivityIcon, BarChart3, FolderKanban, History } from "lucide-react";
import type { ReactNode } from "react";
import {
  ActivePocsIcon,
  BlockedIcon,
  Button,
  CompletionIcon,
  DueSoonIcon,
  HealthBadge,
  PriorityBadge,
  StatusBadge,
} from "../design-system";
import { STATUS_META, STATUS_ORDER } from "../lib/data";
import { formatDate, formatRelativeDue } from "../lib/date";
import { sortByPriority } from "../lib/task-selectors";
import type { AppMetrics, Poc, Task, View, WorkKanbanData } from "../lib/types";
import { cn } from "../lib/utils";

export function Dashboard({
  data,
  metrics,
  pocsById,
  openEditTask,
  setActiveView,
}: {
  data: WorkKanbanData;
  metrics: AppMetrics;
  pocsById: Record<string, Poc>;
  openEditTask: (task: Task) => void;
  setActiveView: (view: View) => void;
}): JSX.Element {
  const focusTasks = [...metrics.critical, ...metrics.blocked, ...metrics.dueSoon]
    .filter((task, index, list) => list.findIndex((item) => item.id === task.id) === index)
    .sort(sortByPriority)
    .slice(0, 6);
  const doneTaskCount = data.tasks.filter((task) => task.status === "done").length;

  return (
    <div className="space-y-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<CompletionIcon className="h-4 w-4" />}
          label="Completion"
          value={`${metrics.completion}%`}
          detail={`${doneTaskCount} tasks done`}
          tone="border-zinc-900 bg-zinc-950 text-zinc-50 dark:border-zinc-200 dark:bg-zinc-50 dark:text-zinc-950"
        />
        <StatCard
          icon={<BlockedIcon className="h-4 w-4" />}
          label="Blocked"
          value={metrics.blocked.length.toString()}
          detail="Needs intervention"
          tone="border-red-200/40 bg-red-50/50 text-red-600 dark:border-red-900/20 dark:bg-red-950/10 dark:text-red-400"
        />
        <StatCard
          icon={<DueSoonIcon className="h-4 w-4" />}
          label="Due soon"
          value={metrics.dueSoon.length.toString()}
          detail="Within 7 days"
          tone="border-amber-200/40 bg-amber-50/50 text-amber-600 dark:border-amber-900/20 dark:bg-amber-950/10 dark:text-amber-400"
        />
        <StatCard
          icon={<ActivePocsIcon className="h-4 w-4" />}
          label="Active POCs"
          value={data.pocs.length.toString()}
          detail={`${metrics.activeTasks.length} active tasks`}
          tone="border-zinc-200/40 bg-zinc-50 text-zinc-600 dark:border-zinc-800/40 dark:bg-zinc-900/40 dark:text-zinc-400"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <FocusQueue
          focusTasks={focusTasks}
          pocsById={pocsById}
          openEditTask={openEditTask}
          setActiveView={setActiveView}
        />
        <PocHealthPanel pocs={data.pocs} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <ActivityPanel data={data} pocsById={pocsById} />
        <StatusDistribution tasks={data.tasks} />
      </section>
    </div>
  );
}

function FocusQueue({
  focusTasks,
  pocsById,
  openEditTask,
  setActiveView,
}: {
  focusTasks: Task[];
  pocsById: Record<string, Poc>;
  openEditTask: (task: Task) => void;
  setActiveView: (view: View) => void;
}): JSX.Element {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Focus Queue</h3>
          <p className="text-sm text-muted-foreground">Critical, blocked, and near-due work</p>
        </div>
        <Button type="button" variant="outline" onClick={() => setActiveView("kanban")}>
          <FolderKanban className="h-4 w-4" />
          Board
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-border/80">
        <table className="w-full min-w-[720px] border-collapse bg-card text-sm">
          <thead className="border-b border-border bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Task</th>
              <th className="px-4 py-3 font-semibold">POC</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Due</th>
            </tr>
          </thead>
          <tbody>
            {focusTasks.map((task) => (
              <tr
                key={task.id}
                className="cursor-pointer border-t border-border transition hover:bg-muted/50"
                onClick={() => openEditTask(task)}
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{task.title}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{task.description}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{pocsById[task.pocId]?.name}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatRelativeDue(task.dueDate)}</td>
              </tr>
            ))}
            {focusTasks.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>
                  No focus items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PocHealthPanel({ pocs }: { pocs: Poc[] }): JSX.Element {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">POC Health</h3>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4 space-y-3">
        {pocs.map((poc) => (
          <div key={poc.id} className="rounded-lg border border-border/40 bg-secondary/20 p-3 dark:bg-secondary/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: poc.color }} />
                  <h4 className="truncate text-sm font-semibold">{poc.name}</h4>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{poc.goal}</p>
              </div>
              <HealthBadge health={poc.health} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${poc.confidence}%`, backgroundColor: poc.color }} />
              </div>
              <span className="w-10 text-right text-xs font-semibold tabular-nums">{poc.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: string;
}): JSX.Element {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-700">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className={cn("grid h-8 w-8 place-items-center rounded-md border", tone)}>{icon}</div>
      </div>
      <div className="mt-2">
        <div className="text-3xl font-bold tracking-tight tabular-nums">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function StatusDistribution({ tasks }: { tasks: Task[] }): JSX.Element {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Status Distribution</h3>
        <ActivityIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4 space-y-3">
        {STATUS_ORDER.map((status) => {
          const count = tasks.filter((task) => task.status === status).length;
          const width = tasks.length ? Math.max(8, Math.round((count / tasks.length) * 100)) : 0;

          return (
            <div key={status}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{STATUS_META[status].label}</span>
                <span className="tabular-nums text-muted-foreground">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityPanel({ data, pocsById }: { data: WorkKanbanData; pocsById: Record<string, Poc> }): JSX.Element {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent Activity</h3>
        <History className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4 space-y-3">
        {data.activity.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex gap-3 rounded-lg border bg-card p-3">
            <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary">
              <History className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {activity.pocId ? `${pocsById[activity.pocId]?.name} · ` : ""}
                {formatDate(activity.at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
