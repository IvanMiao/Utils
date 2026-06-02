import { seedData } from "./data";
import type { WorkKanbanData } from "./types";

export const STORAGE_KEY = "work-kanban:data:v1";

export function loadWorkspace(): WorkKanbanData {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return seedData;
  }

  try {
    const parsed = JSON.parse(raw) as WorkKanbanData;
    if (parsed.version === 1 && Array.isArray(parsed.tasks) && Array.isArray(parsed.pocs)) {
      return parsed;
    }
  } catch {
    return seedData;
  }

  return seedData;
}

export function saveWorkspace(data: WorkKanbanData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function validateWorkspace(value: unknown): value is WorkKanbanData {
  const data = value as WorkKanbanData;
  return (
    data?.version === 1 &&
    Array.isArray(data.pocs) &&
    Array.isArray(data.tasks) &&
    Array.isArray(data.activity)
  );
}
