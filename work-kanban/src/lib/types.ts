export type KanbanStatus =
  | "inbox"
  | "ready"
  | "in-progress"
  | "blocked"
  | "review"
  | "done";

export type Priority = "low" | "medium" | "high" | "critical";
export type PocHealth = "healthy" | "watch" | "at-risk";
export type View = "dashboard" | "kanban" | "pocs" | "log";
export type Theme = "light" | "dark";

export type Poc = {
  id: string;
  name: string;
  goal: string;
  stage: string;
  health: PocHealth;
  confidence: number;
  dueDate: string;
  nextMilestone: string;
  stakeholder: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  pocId: string;
  status: KanbanStatus;
  priority: Priority;
  dueDate: string;
  tags: string[];
  links: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  at: string;
  type: "task" | "poc" | "system";
  message: string;
  taskId?: string;
  pocId?: string;
};

export type WorkKanbanData = {
  version: 1;
  pocs: Poc[];
  tasks: Task[];
  activity: Activity[];
};

export type TaskFormState = {
  title: string;
  description: string;
  pocId: string;
  status: KanbanStatus;
  priority: Priority;
  dueDate: string;
  tags: string;
  links: string;
  notes: string;
};

export type AppMetrics = {
  activeTasks: Task[];
  blocked: Task[];
  critical: Task[];
  dueSoon: Task[];
  completion: number;
};
