import type { KanbanStatus, Poc, Priority, WorkKanbanData } from "./types";

export const STATUS_ORDER: KanbanStatus[] = [
  "inbox",
  "ready",
  "in-progress",
  "blocked",
  "review",
  "done",
];

export const PRIORITY_ORDER: Priority[] = ["critical", "high", "medium", "low"];

export const STATUS_META: Record<KanbanStatus, { label: string; tone: string; ring: string }> = {
  inbox: { 
    label: "Inbox", 
    tone: "bg-zinc-100 text-zinc-700 border border-zinc-200/50 dark:bg-zinc-800/80 dark:text-zinc-300 dark:border-zinc-700/50", 
    ring: "ring-zinc-200 dark:ring-zinc-800" 
  },
  ready: { 
    label: "Ready", 
    tone: "bg-sky-50 text-sky-700 border border-sky-200/60 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/30", 
    ring: "ring-sky-100 dark:ring-sky-950/50" 
  },
  "in-progress": {
    label: "In Progress",
    tone: "bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30",
    ring: "ring-blue-100 dark:ring-blue-950/50",
  },
  blocked: { 
    label: "Blocked", 
    tone: "bg-red-50 text-red-700 border border-red-200/60 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30", 
    ring: "ring-red-100 dark:ring-red-950/50" 
  },
  review: { 
    label: "Review", 
    tone: "bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30", 
    ring: "ring-amber-100 dark:ring-amber-950/50" 
  },
  done: { 
    label: "Done", 
    tone: "bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30", 
    ring: "ring-emerald-100 dark:ring-emerald-950/50" 
  },
};

export const PRIORITY_META: Record<Priority, { label: string; tone: string }> = {
  low: { 
    label: "Low", 
    tone: "border-zinc-200/50 bg-zinc-50/50 text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:text-zinc-400" 
  },
  medium: { 
    label: "Medium", 
    tone: "border-blue-200/40 bg-blue-50/20 text-blue-600 dark:border-blue-900/30 dark:bg-blue-950/10 dark:text-blue-400" 
  },
  high: { 
    label: "High", 
    tone: "border-amber-200/50 bg-amber-50/30 text-amber-700 dark:border-amber-900/20 dark:bg-amber-950/10 dark:text-amber-400" 
  },
  critical: { 
    label: "Critical", 
    tone: "border-red-200/50 bg-red-50/30 text-red-600 dark:border-red-900/20 dark:bg-red-950/10 dark:text-red-400" 
  },
};

export const POC_HEALTH_META: Record<Poc["health"], { label: string; tone: string }> = {
  healthy: { 
    label: "Healthy", 
    tone: "bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30" 
  },
  watch: { 
    label: "Watch", 
    tone: "bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30" 
  },
  "at-risk": { 
    label: "At Risk", 
    tone: "bg-red-50 text-red-700 border border-red-200/60 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30" 
  },
};

export const seedData: WorkKanbanData = {
  version: 1,
  pocs: [
    {
      id: "poc-agent-routing",
      name: "Agent Routing POC",
      goal: "Validate multi-agent routing for support workflows.",
      stage: "Prototype",
      health: "watch",
      confidence: 72,
      dueDate: "2026-06-14",
      nextMilestone: "Route quality review",
      stakeholder: "Platform",
      color: "#18181b",
    },
    {
      id: "poc-internal-jira",
      name: "Internal Jira POC",
      goal: "Create a local-first task tracker for personal delivery control.",
      stage: "Build",
      health: "healthy",
      confidence: 84,
      dueDate: "2026-06-21",
      nextMilestone: "Kanban usability pass",
      stakeholder: "Self",
      color: "#52525b",
    },
    {
      id: "poc-eval-harness",
      name: "Eval Harness POC",
      goal: "Compare prompts, datasets, and regression metrics in one workflow.",
      stage: "Discovery",
      health: "at-risk",
      confidence: 46,
      dueDate: "2026-06-10",
      nextMilestone: "Metric definition",
      stakeholder: "Research",
      color: "#a16207",
    },
  ],
  tasks: [
    {
      id: "task-routing-scorecard",
      title: "Draft route quality scorecard",
      description: "Define pass/fail criteria for routing decisions and escalation handling.",
      pocId: "poc-agent-routing",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-06-06",
      tags: ["eval", "quality"],
      links: [],
      notes: "Focus on observable failure modes before adding metrics.",
      createdAt: "2026-06-01T08:30:00.000Z",
      updatedAt: "2026-06-01T11:15:00.000Z",
    },
    {
      id: "task-kanban-import",
      title: "JSON import and export",
      description: "Allow the full workspace state to be backed up and restored locally.",
      pocId: "poc-internal-jira",
      status: "review",
      priority: "medium",
      dueDate: "2026-06-05",
      tags: ["storage", "backup"],
      links: [],
      notes: "Should preserve tasks, POCs, and activity history.",
      createdAt: "2026-05-31T14:00:00.000Z",
      updatedAt: "2026-06-01T16:40:00.000Z",
    },
    {
      id: "task-eval-blocker",
      title: "Resolve dataset ownership",
      description: "Clarify who owns the first evaluation dataset and update risk notes.",
      pocId: "poc-eval-harness",
      status: "blocked",
      priority: "critical",
      dueDate: "2026-06-04",
      tags: ["risk", "stakeholder"],
      links: [],
      notes: "Blocked on stakeholder alignment.",
      createdAt: "2026-05-30T10:20:00.000Z",
      updatedAt: "2026-06-01T09:20:00.000Z",
    },
    {
      id: "task-routing-fixtures",
      title: "Collect routing fixtures",
      description: "Gather representative support tickets for the first replay run.",
      pocId: "poc-agent-routing",
      status: "ready",
      priority: "medium",
      dueDate: "2026-06-09",
      tags: ["fixtures"],
      links: [],
      notes: "",
      createdAt: "2026-05-29T09:00:00.000Z",
      updatedAt: "2026-05-30T09:00:00.000Z",
    },
    {
      id: "task-kanban-density",
      title: "Tune dashboard density",
      description: "Make the dashboard scannable without turning it into a marketing page.",
      pocId: "poc-internal-jira",
      status: "inbox",
      priority: "high",
      dueDate: "2026-06-08",
      tags: ["ux", "dashboard"],
      links: [],
      notes: "",
      createdAt: "2026-06-01T17:00:00.000Z",
      updatedAt: "2026-06-01T17:00:00.000Z",
    },
    {
      id: "task-eval-readme",
      title: "Write evaluation README",
      description: "Document how to run the first local evaluation harness.",
      pocId: "poc-eval-harness",
      status: "done",
      priority: "low",
      dueDate: "2026-06-02",
      tags: ["docs"],
      links: [],
      notes: "First draft complete.",
      createdAt: "2026-05-28T12:00:00.000Z",
      updatedAt: "2026-06-01T18:30:00.000Z",
    },
  ],
  activity: [
    {
      id: "act-1",
      at: "2026-06-01T18:30:00.000Z",
      type: "task",
      taskId: "task-eval-readme",
      pocId: "poc-eval-harness",
      message: "Moved Write evaluation README to Done.",
    },
    {
      id: "act-2",
      at: "2026-06-01T16:40:00.000Z",
      type: "task",
      taskId: "task-kanban-import",
      pocId: "poc-internal-jira",
      message: "Prepared JSON backup flow for review.",
    },
    {
      id: "act-3",
      at: "2026-06-01T09:20:00.000Z",
      type: "task",
      taskId: "task-eval-blocker",
      pocId: "poc-eval-harness",
      message: "Marked dataset ownership as blocked.",
    },
  ],
};
