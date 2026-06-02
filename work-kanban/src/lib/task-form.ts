import type { KanbanStatus, Poc, Task, TaskFormState } from "./types";
import { todayIso } from "./date";

export function makeTaskForm(
  pocs: Poc[],
  task?: Task,
  status: KanbanStatus = "inbox",
): TaskFormState {
  return {
    title: task?.title ?? "",
    description: task?.description ?? "",
    pocId: task?.pocId ?? pocs[0]?.id ?? "",
    status: task?.status ?? status,
    priority: task?.priority ?? "medium",
    dueDate: task?.dueDate ?? todayIso(),
    tags: task?.tags.join(", ") ?? "",
    links: task?.links.join(", ") ?? "",
    notes: task?.notes ?? "",
  };
}

export function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
