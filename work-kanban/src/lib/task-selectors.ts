import { PRIORITY_ORDER } from "./data";
import { relativeDays } from "./date";
import type { AppMetrics, Task } from "./types";

export function getWorkspaceMetrics(tasks: Task[]): AppMetrics {
  const activeTasks = tasks.filter((task) => task.status !== "done");
  const blocked = tasks.filter((task) => task.status === "blocked");
  const critical = activeTasks.filter((task) => task.priority === "critical");
  const dueSoon = activeTasks.filter((task) => relativeDays(task.dueDate) <= 7);
  const done = tasks.filter((task) => task.status === "done");
  const completion = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;

  return { activeTasks, blocked, critical, dueSoon, completion };
}

export function sortByPriority(a: Task, b: Task): number {
  return PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
}
