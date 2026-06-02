import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../design-system";
import type { View } from "../lib/types";
import { cn } from "../lib/utils";
import { viewItems } from "./navigation";

type SidebarProps = {
  activeView: View;
  isCollapsed: boolean;
  setActiveView: (view: View) => void;
};

export function Sidebar({
  activeView,
  isCollapsed,
  setActiveView,
}: SidebarProps): JSX.Element {
  return (
    <aside
      className={cn(
        "relative rounded-lg border bg-card px-3 py-3 shadow-sm transition-[width,padding] duration-200 ease-linear lg:sticky lg:top-6 lg:flex lg:h-[calc(100dvh-3rem)] lg:flex-col",
        isCollapsed ? "lg:w-16 lg:px-2" : "lg:w-[280px] lg:px-4",
      )}
      data-collapsed={isCollapsed}
    >
      <div
        className={cn(
          "flex h-12 items-center gap-3 border-b border-border/60 pb-4 transition-[gap] duration-200 ease-linear",
          isCollapsed && "lg:gap-0 lg:justify-center",
        )}
      >
        <LogoMark isCollapsed={isCollapsed} />
        <div
          className={cn(
            "min-w-0 overflow-hidden transition-[max-width,opacity] duration-200 ease-linear",
            isCollapsed ? "lg:max-w-0 lg:opacity-0" : "lg:max-w-40 lg:opacity-100",
          )}
        >
          <h1 className="text-base font-semibold tracking-normal">Work Kanban</h1>
          <p className="text-xs font-medium text-muted-foreground">Personal Jira</p>
        </div>
      </div>

      <nav className="mt-6 grid grid-cols-2 gap-1.5 lg:grid-cols-1" aria-label="Primary navigation">
        {viewItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            icon={item.icon}
            isActive={activeView === item.id}
            isCollapsed={isCollapsed}
            label={item.label}
            onClick={() => setActiveView(item.id)}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarNavItem({
  icon,
  isActive,
  isCollapsed,
  label,
  onClick,
}: {
  icon: ReactNode;
  isActive: boolean;
  isCollapsed: boolean;
  label: string;
  onClick: () => void;
}): JSX.Element {
  const button = (
    <Button
      type="button"
      variant={isActive ? "primary" : "ghost"}
      onClick={onClick}
      className={cn(
        "w-full overflow-hidden rounded-md text-sm transition-[width,padding] duration-200 ease-linear",
        isCollapsed ? "justify-between px-3 lg:w-10 lg:justify-center lg:px-0" : "justify-between px-3",
        !isActive && "text-muted-foreground hover:text-foreground",
      )}
      aria-label={label}
    >
      <span className="flex min-w-0 items-center gap-2">
        {icon}
        <span
          className={cn(
            "truncate transition-[max-width,opacity] duration-200 ease-linear",
            isCollapsed ? "lg:max-w-0 lg:opacity-0" : "lg:max-w-32 lg:opacity-100",
          )}
        >
          {label}
        </span>
      </span>
      <ChevronRight className={cn("h-4 w-4 shrink-0", isCollapsed && "lg:hidden", isActive ? "opacity-70" : "opacity-30")} />
    </Button>
  );

  if (!isCollapsed) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

function LogoMark({ isCollapsed }: { isCollapsed: boolean }): JSX.Element {
  return (
    <div
      className={cn(
        "relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-sm transition-[width,height,border-radius] duration-200 ease-linear",
        isCollapsed && "lg:h-10 lg:w-10",
      )}
    >
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px p-1.5 opacity-30">
        <span className="rounded-[3px] bg-white" />
        <span className="rounded-[3px] bg-white/40" />
        <span className="rounded-[3px] bg-white/55" />
        <span className="rounded-[3px] bg-white" />
      </div>
      <div className="relative flex items-baseline gap-0.5 text-[13px] font-semibold tracking-normal">
        <span>W</span>
        <span className="text-white/72">K</span>
      </div>
      <span className="absolute bottom-1.5 left-1.5 h-0.5 w-7 rounded-full bg-white/80" />
    </div>
  );
}
