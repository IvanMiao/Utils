import { CheckCircle2, FileJson, History } from "lucide-react";
import { formatDate } from "../lib/date";
import type { Poc, WorkKanbanData } from "../lib/types";

export function ActivityView({
  data,
  pocsById,
}: {
  data: WorkKanbanData;
  pocsById: Record<string, Poc>;
}): JSX.Element {
  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Activity Log</h3>
        <FileJson className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4 divide-y rounded-lg border bg-card">
        {data.activity.map((activity) => (
          <div key={activity.id} className="flex gap-3 p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary">
              {activity.type === "task" ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <History className="h-4 w-4 text-muted-foreground" />
              )}
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
    </section>
  );
}
