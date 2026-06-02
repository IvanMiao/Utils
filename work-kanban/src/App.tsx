import { RotateCcw } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./design-system";
import { Sidebar } from "./components/Sidebar";
import { TaskDrawer } from "./components/TaskDrawer";
import { TopBar } from "./components/TopBar";
import { ActivityView } from "./views/ActivityView";
import { Dashboard } from "./views/Dashboard";
import { KanbanBoard } from "./views/KanbanBoard";
import { PocView } from "./views/PocView";
import { STATUS_META, seedData } from "./lib/data";
import { todayIso } from "./lib/date";
import { uid } from "./lib/ids";
import { loadWorkspace, saveWorkspace, validateWorkspace } from "./lib/storage";
import { makeTaskForm, splitList } from "./lib/task-form";
import { getWorkspaceMetrics } from "./lib/task-selectors";
import type { KanbanStatus, Poc, Priority, Task, TaskFormState, Theme, View, WorkKanbanData } from "./lib/types";

function App(): JSX.Element {
  const [data, setData] = useState<WorkKanbanData>(() => loadWorkspace());
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [search, setSearch] = useState("");
  const [pocFilter, setPocFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState<TaskFormState>(() => makeTaskForm(seedData.pocs));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    saveWorkspace(data);
  }, [data]);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 3200);
    return () => window.clearTimeout(id);
  }, [notice]);

  const pocsById = useMemo<Record<string, Poc>>(() => {
    return Object.fromEntries(data.pocs.map((poc) => [poc.id, poc]));
  }, [data.pocs]);

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return data.tasks.filter((task) => {
      const poc = pocsById[task.pocId];
      const searchableText = [task.title, task.description, task.notes, poc?.name, task.tags.join(" ")]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !term || searchableText.includes(term);
      const matchesPoc = pocFilter === "all" || task.pocId === pocFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesPoc && matchesPriority;
    });
  }, [data.tasks, pocsById, pocFilter, priorityFilter, search]);

  const metrics = useMemo(() => getWorkspaceMetrics(data.tasks), [data.tasks]);
  const editingTask = editingTaskId ? data.tasks.find((task) => task.id === editingTaskId) : null;

  function openCreateTask(status: KanbanStatus = "inbox"): void {
    setEditingTaskId(null);
    setTaskForm(makeTaskForm(data.pocs, undefined, status));
    setIsDrawerOpen(true);
  }

  function openEditTask(task: Task): void {
    setEditingTaskId(task.id);
    setTaskForm(makeTaskForm(data.pocs, task));
    setIsDrawerOpen(true);
  }

  function closeDrawer(): void {
    setIsDrawerOpen(false);
    setEditingTaskId(null);
  }

  function handleTaskSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const now = new Date().toISOString();

    if (editingTaskId) {
      updateExistingTask(now);
      setNotice("Task updated");
    } else {
      createTask(now);
      setNotice("Task created");
    }

    closeDrawer();
  }

  function updateExistingTask(now: string): void {
    setData((current) => {
      let updatedTask: Task | undefined;
      const tasks = current.tasks.map((task) => {
        if (task.id !== editingTaskId) return task;
        updatedTask = taskFromForm(task.id, task.createdAt, now);
        return updatedTask;
      });

      if (!updatedTask) return current;

      return {
        ...current,
        tasks,
        activity: [
          {
            id: uid("act"),
            at: now,
            type: "task",
            message: `Updated ${updatedTask.title}.`,
            taskId: updatedTask.id,
            pocId: updatedTask.pocId,
          },
          ...current.activity,
        ],
      };
    });
  }

  function createTask(now: string): void {
    const newTask = taskFromForm(uid("task"), now, now);

    setData((current) => ({
      ...current,
      tasks: [newTask, ...current.tasks],
      activity: [
        {
          id: uid("act"),
          at: now,
          type: "task",
          message: `Created ${newTask.title}.`,
          taskId: newTask.id,
          pocId: newTask.pocId,
        },
        ...current.activity,
      ],
    }));
  }

  function taskFromForm(id: string, createdAt: string, updatedAt: string): Task {
    return {
      id,
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      pocId: taskForm.pocId,
      status: taskForm.status,
      priority: taskForm.priority,
      dueDate: taskForm.dueDate,
      tags: splitList(taskForm.tags),
      links: splitList(taskForm.links),
      notes: taskForm.notes.trim(),
      createdAt,
      updatedAt,
    };
  }

  function deleteTask(taskId: string): void {
    const task = data.tasks.find((item) => item.id === taskId);
    const now = new Date().toISOString();

    setData((current) => ({
      ...current,
      tasks: current.tasks.filter((item) => item.id !== taskId),
      activity: [
        ...(task
          ? [
              {
                id: uid("act"),
                at: now,
                type: "system" as const,
                message: `Deleted ${task.title}.`,
                pocId: task.pocId,
              },
            ]
          : []),
        ...current.activity.filter((item) => item.taskId !== taskId),
      ],
    }));

    setNotice("Task deleted");
    closeDrawer();
  }

  function moveTask(taskId: string, status: KanbanStatus): void {
    const task = data.tasks.find((item) => item.id === taskId);
    if (!task || task.status === status) return;

    const now = new Date().toISOString();
    const updatedTask = { ...task, status, updatedAt: now };

    setData((current) => ({
      ...current,
      tasks: current.tasks.map((item) => (item.id === taskId ? updatedTask : item)),
      activity: [
        {
          id: uid("act"),
          at: now,
          type: "task",
          message: `Moved ${task.title} to ${STATUS_META[status].label}.`,
          taskId,
          pocId: task.pocId,
        },
        ...current.activity,
      ],
    }));
  }

  function exportJson(): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `work-kanban-${todayIso()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Workspace exported");
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      if (!validateWorkspace(parsed)) {
        setNotice("Invalid workspace file");
        return;
      }

      setData(parsed);
      setNotice("Workspace imported");
    } catch {
      setNotice("Import failed");
    } finally {
      event.target.value = "";
    }
  }

  function resetWorkspace(): void {
    setData(seedData);
    setNotice("Workspace reset");
  }

  return (
    <div className="min-h-dvh bg-background p-2 sm:p-4 lg:p-6">
      <div className="mx-auto grid w-full max-w-[1780px] gap-3 lg:grid-cols-[auto_minmax(0,1fr)] xl:gap-5">
        <Sidebar
          activeView={activeView}
          isCollapsed={isSidebarCollapsed}
          setActiveView={setActiveView}
        />

        <main className="min-w-0 lg:pl-1">
          <TopBar
            activeView={activeView}
            search={search}
            setSearch={setSearch}
            pocFilter={pocFilter}
            setPocFilter={setPocFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            pocs={data.pocs}
            openCreateTask={openCreateTask}
            exportJson={exportJson}
            importJson={importJson}
            fileInputRef={fileInputRef}
            isSidebarCollapsed={isSidebarCollapsed}
            theme={theme}
            setTheme={setTheme}
            toggleSidebarCollapsed={() => setIsSidebarCollapsed((current) => !current)}
          />

          <div className="mt-5">
            {activeView === "dashboard" && (
              <Dashboard
                data={data}
                metrics={metrics}
                pocsById={pocsById}
                openEditTask={openEditTask}
                setActiveView={setActiveView}
              />
            )}
            {activeView === "kanban" && (
              <KanbanBoard
                tasks={filteredTasks}
                pocsById={pocsById}
                openCreateTask={openCreateTask}
                openEditTask={openEditTask}
                moveTask={moveTask}
              />
            )}
            {activeView === "pocs" && <PocView data={data} openEditTask={openEditTask} />}
            {activeView === "log" && <ActivityView data={data} pocsById={pocsById} />}
          </div>
        </main>
      </div>

      {isDrawerOpen && (
        <TaskDrawer
          task={editingTask}
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          pocs={data.pocs}
          onClose={closeDrawer}
          onSubmit={handleTaskSubmit}
          onDelete={editingTask ? () => deleteTask(editingTask.id) : undefined}
        />
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-5 z-30 shadow-sm lg:hidden"
        aria-label="Reset workspace"
        title="Reset workspace"
        onClick={resetWorkspace}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-lg border bg-card px-4 py-3 text-sm font-medium shadow-sm"
        >
          {notice}
        </div>
      )}
    </div>
  );
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default App;
