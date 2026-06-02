# Shadcn UI Tuning Plan

This app uses shadcn/ui as the low-level component source and `src/design-system` as the product-facing design layer. New UI work should prefer this path:

1. Add or update primitives in `src/components/ui` with the shadcn CLI.
2. Wrap product-specific variants in `src/design-system`.
3. Keep feature components importing from `src/design-system` unless they need a one-off primitive composition.

## Phase 1: Card + Badge

Use shadcn `Card` and `Badge` to standardize task surfaces and semantic labels.

- Task cards should use `Card`, `CardHeader`, `CardAction`, `CardContent`, and `CardFooter`.
- Priority, status, and health labels should be implemented through shadcn `Badge`.
- Domain color classes stay in `src/lib/data.ts`; component structure stays in `src/design-system`.
- The task card should keep compact density because the kanban board is a repeated-work surface.

## Phase 2: Toolbar

Refine `TopBar` into a page header plus a command toolbar.

- Keep "New Task" as the only primary action.
- Group import, export, and theme into icon actions with tooltips or a dropdown menu.
- Keep search and filters visually grouped but not oversized.

Implementation status: started. `TopBar` now separates filters from a compact command toolbar, uses shadcn `DropdownMenu` for workspace actions, and uses shadcn `Tooltip` for the overflow trigger.

## Phase 3: Sheet

Replace the hand-rolled task drawer with shadcn `Sheet`.

- Use `SheetContent` from the right side.
- Use `SheetHeader`, `SheetTitle`, and `SheetFooter` for stable structure.
- Keep form fields routed through `src/design-system`.

## Phase 4: Sidebar

Avoid a full shadcn `Sidebar` migration until the app needs collapse, mobile drawer behavior, or icon rail navigation. For now, tune the existing sidebar with lighter design-system primitives.

Implementation status: simplified. The sidebar is now pure navigation with a desktop collapse control. Expanded mode shows brand and labels; collapsed mode becomes an icon rail with tooltips. POC cards and metric summaries were removed because they duplicated dedicated views and created layout pressure.

Follow-up adjustment: the collapsed sidebar follows the shadcn `sidebar-07` / `collapsible="icon"` pattern more closely. Width is controlled by the sidebar rail itself, labels fade out with width/opacity transitions, and the collapse trigger lives in the main header instead of floating over the sidebar logo.
