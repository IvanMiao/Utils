import {
  ArrowDownToLine,
  Import,
  Moon,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import type { ChangeEvent, MutableRefObject } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Select,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../design-system";
import { PRIORITY_META, PRIORITY_ORDER } from "../lib/data";
import type { Poc, Priority, Theme, View } from "../lib/types";
import { viewItems } from "./navigation";

type TopBarProps = {
  activeView: View;
  search: string;
  setSearch: (value: string) => void;
  pocFilter: string;
  setPocFilter: (value: string) => void;
  priorityFilter: Priority | "all";
  setPriorityFilter: (value: Priority | "all") => void;
  pocs: Poc[];
  openCreateTask: () => void;
  exportJson: () => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  isSidebarCollapsed: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleSidebarCollapsed: () => void;
};

type CommandToolbarProps = Pick<
  TopBarProps,
  "exportJson" | "fileInputRef" | "openCreateTask" | "setTheme" | "theme"
>;

export function TopBar({
  activeView,
  search,
  setSearch,
  pocFilter,
  setPocFilter,
  priorityFilter,
  setPriorityFilter,
  pocs,
  openCreateTask,
  exportJson,
  importJson,
  fileInputRef,
  isSidebarCollapsed,
  theme,
  setTheme,
  toggleSidebarCollapsed,
}: TopBarProps): JSX.Element {
  const activeLabel = viewItems.find((item) => item.id === activeView)?.label;
  const formattedToday = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <SidebarTriggerButton isCollapsed={isSidebarCollapsed} onClick={toggleSidebarCollapsed} />
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">{formattedToday}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal">{activeLabel}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_160px_160px] lg:w-[620px]">
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
                aria-label="Search tasks"
                placeholder="Search tasks..."
              />
            </div>
            <Select value={pocFilter} onChange={(event) => setPocFilter(event.target.value)}>
              <option value="all">All POCs</option>
              {pocs.map((poc) => (
                <option key={poc.id} value={poc.id}>
                  {poc.name}
                </option>
              ))}
            </Select>
            <Select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value as Priority | "all")}
            >
              <option value="all">All priorities</option>
              {PRIORITY_ORDER.map((priority) => (
                <option key={priority} value={priority}>
                  {PRIORITY_META[priority].label}
                </option>
              ))}
            </Select>
          </div>

          <CommandToolbar
            exportJson={exportJson}
            fileInputRef={fileInputRef}
            openCreateTask={openCreateTask}
            setTheme={setTheme}
            theme={theme}
          />
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importJson} />
        </div>
      </div>
    </header>
  );
}

function SidebarTriggerButton({
  isCollapsed,
  onClick,
}: {
  isCollapsed: boolean;
  onClick: () => void;
}): JSX.Element {
  const label = isCollapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hidden lg:inline-flex"
          aria-label={label}
          onClick={onClick}
        >
          {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

function CommandToolbar({
  exportJson,
  fileInputRef,
  openCreateTask,
  setTheme,
  theme,
}: CommandToolbarProps): JSX.Element {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className="flex items-center gap-2 lg:justify-end">
      <Button type="button" onClick={openCreateTask} className="min-w-32">
        <Plus data-icon="inline-start" className="h-4 w-4" />
        New Task
      </Button>

      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button type="button" variant="outline" size="icon" aria-label="More actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="bottom">More actions</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Workspace</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={exportJson}>
              <ArrowDownToLine className="h-4 w-4" />
              Export JSON
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => fileInputRef.current?.click()}>
              <Import className="h-4 w-4" />
              Import JSON
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setTheme(nextTheme)}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {themeLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
