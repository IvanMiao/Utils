import { Archive, FolderKanban, History, LayoutDashboard } from "lucide-react";
import type { ReactNode } from "react";
import type { View } from "../lib/types";

export const viewItems: Array<{ id: View; label: string; icon: ReactNode }> = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" strokeWidth={1.75} /> },
  { id: "kanban", label: "Kanban", icon: <FolderKanban className="h-4 w-4" strokeWidth={1.75} /> },
  { id: "pocs", label: "POCs", icon: <Archive className="h-4 w-4" strokeWidth={1.75} /> },
  { id: "log", label: "Activity", icon: <History className="h-4 w-4" strokeWidth={1.75} /> },
];
