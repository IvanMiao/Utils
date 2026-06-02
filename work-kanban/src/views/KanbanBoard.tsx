import { Plus } from "lucide-react";
import { Button } from "../design-system";
import { STATUS_META, STATUS_ORDER } from "../lib/data";
import { sortByPriority } from "../lib/task-selectors";
import type { KanbanStatus, Poc, Task } from "../lib/types";
import { cn } from "../lib/utils";
import { TaskCard } from "../components/TaskCard";

export function KanbanBoard({
  tasks,
  pocsById,
  openCreateTask,
  openEditTask,
  moveTask,
}: {
  tasks: Task[];
  pocsById: Record<string, Poc>;
  openCreateTask: (status?: KanbanStatus) => void;
  openEditTask: (task: Task) => void;
  moveTask: (taskId: string, status: KanbanStatus) => void;
}): JSX.Element {
  return (
    <div className="overflow-x-auto pb-4 scrollbar-soft">
      <div className="grid min-w-[1180px] grid-cols-6 gap-3">
        {STATUS_ORDER.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status).sort(sortByPriority);

          return (
            <section
              key={status}
              className="min-h-[calc(100dvh-180px)] rounded-lg border border-border/60 bg-muted/20 p-3 shadow-none transition-colors duration-200 dark:bg-muted/5"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const taskId = event.dataTransfer.getData("text/plain");
                moveTask(taskId, status);
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_META[status].tone)}>
                    {STATUS_META[status].label}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">{columnTasks.length}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label={`Add task to ${STATUS_META[status].label}`}
                  title={`Add task to ${STATUS_META[status].label}`}
                  onClick={() => openCreateTask(status)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} poc={pocsById[task.pocId]} openEditTask={openEditTask} />
                ))}
                {columnTasks.length === 0 && (
                  <div className="grid min-h-32 place-items-center rounded-lg border border-dashed border-border/50 bg-background/50 text-center text-sm text-muted-foreground">
                    Empty
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
