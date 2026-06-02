# Work Kanban Agent Instructions

This project values code readability and UI/UX quality above speed of implementation. Treat every change as product work, not just code editing.

## Priorities

1. Code must be easy to read, locally coherent, and boring to maintain.
2. UI must feel smooth, intentional, and useful for repeated daily work.
3. Design decisions must respect the existing design system boundary.
4. Changes must stay scoped. Do not introduce architecture that the current app does not need.
5. Verification is part of the work. Run the relevant checks before declaring done.

## Product Direction

Work Kanban is a focused personal project/work tracker. It should feel like a quiet, dense, operational tool rather than a marketing page.

- Prioritize scanning, comparison, and repeated action.
- Keep the first screen useful; avoid landing-page patterns.
- Prefer compact but legible layouts over decorative spacing.
- Keep one obvious primary action per surface.
- Do not add explanatory in-app text when a familiar control, label, tooltip, or layout pattern is enough.
- Avoid visual noise: no decorative blobs, oversized hero sections, gimmicky gradients, or ornamental cards.

## Design System Boundary

The design system has a dedicated space and must stay that way.

- `src/components/ui` contains shadcn/ui primitives generated or updated by the shadcn CLI.
- `src/design-system` contains product-facing wrappers, variants, tokens, and exports.
- Feature components should usually import from `src/design-system`, not directly from `src/components/ui`.
- Raw shadcn primitives may be composed directly only when a feature needs a one-off structure that is not yet a reusable product pattern.
- Keep semantic tokens in `src/design-system/tokens.css`.
- Avoid raw hex colors in components unless rendering user/domain data such as POC colors.

## UI/UX Standards

Every UI change should be checked against these expectations:

- Interactive targets are comfortable to click and keyboard reachable.
- Icon-only controls have accessible labels and, where useful, tooltips.
- Focus states remain visible.
- Text does not overflow, overlap, or rely on viewport-width font scaling.
- Layout dimensions are stable; hover, loading, and dynamic content should not shift the page unexpectedly.
- Repeated work surfaces such as kanban cards, toolbars, and sidebars should be compact and consistent.
- Cards are for repeated items, modals, and genuinely framed tools. Do not nest cards inside cards.
- Sidebar is navigation-first. Do not add summaries or secondary content unless it directly improves navigation.
- Dashboard is where summary metrics belong.
- Toolbar actions should be grouped by workflow: search and filters together, primary action obvious, secondary actions tucked into menus when space is limited.

## React And TypeScript Standards

Prefer explicit, readable React code.

- Use named function components.
- Use explicit props types or interfaces for exported components and non-trivial local components.
- Use explicit return types on exported functions and components.
- Avoid `React.FC`.
- Avoid deeply nested JSX reasoning. Extract small named components or variables when JSX becomes hard to scan.
- Keep state and orchestration in controller-level components such as `App`.
- Keep feature components presentation-focused.
- Keep pure shaping logic in `src/lib`.
- Do not mix unrelated refactors into feature work.
- Do not add abstractions only to reduce line count.

## File Structure

Keep the current structure simple.

- `src/components`: shared app-level components.
- `src/components/ui`: shadcn/ui primitives.
- `src/design-system`: product design wrappers and tokens.
- `src/views`: top-level app views.
- `src/lib`: types, data, storage, selectors, and pure helpers.
- `docs`: durable design notes and implementation plans.

Split long files when doing so improves comprehension. Do not create many folders for a small feature.

## Styling Rules

- Prefer semantic Tailwind classes backed by tokens.
- Use `cn` for conditional classes.
- Keep spacing on a small, consistent scale.
- Avoid one-off visual language in feature components.
- Use lucide icons for controls when an icon is appropriate.
- Keep cards at modest radius and elevation.
- Avoid single-hue UI drift. The app should not become dominated by one color family.

## Shadcn Usage

Use shadcn/ui deliberately.

- Add primitives with `npx shadcn@latest add ...`.
- Inspect generated component APIs before using them.
- Wrap recurring product patterns in `src/design-system`.
- Keep Tailwind and token compatibility in mind before accepting generated theme changes.
- Do not migrate major styling infrastructure casually.

## Verification

Before finishing code changes:

- Run `npm run build` for TypeScript and production build validation.
- If a dev server is relevant, start or reuse Vite and give the local URL.
- For visual changes, inspect the affected screen manually when possible.
- Mention any checks that could not be run.

## Documentation

Update documentation when a design decision changes the intended direction of the app.

- Use `docs/ui-shadcn-tuning.md` for shadcn/design-system tuning notes.
- Keep docs concise and decision-oriented.
- Document why a UI pattern exists, not just what file changed.

## Things To Avoid

- Over-designed folder structures.
- Generic component libraries inside the app.
- Raw primitive usage scattered across feature files.
- Large mixed-purpose files.
- Hidden accessibility regressions.
- UI that looks polished but slows down common workflows.
- Decorative elements that do not help the user decide or act.
