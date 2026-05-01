# Agent instructions — Personal Webpage

## Project overview

- **Framework**: React 19, Vite 7, TypeScript 5.
- **Styling**: Tailwind CSS 4, Shadcn/ui components.
- **Routing**: React Router DOM v7.
- **Icons**: Lucide React.

## Architecture and structure

- **Entry**: `src/main.tsx` renders `App`.
- **Routing**: `src/App.tsx` defines routes (`/`, `/projects`).
- **Layout**: `src/Layout.tsx` provides the global layout with `SidebarProvider` and the app sidebar.
- **Components**:
  - `src/components/ui/`: Atomic, reusable UI components (Shadcn/ui). Do not modify these unless necessary for global style changes.
  - `src/components/sections/`: Specific sections of pages (e.g. `Bio.tsx`, `Hero.tsx`).
  - `src/components/app-sidebar.tsx`: Main navigation sidebar.
- **Pages**: `src/pages/` contains top-level page components.

## Conventions

- **Imports**: Use the `@/` alias for `src/` (e.g. `import { Button } from "@/components/ui/button"`).
- **Styling**:
  - Use Tailwind CSS utility classes.
  - Use the `cn()` utility from `@/lib/utils` for conditional class merging.
  - Example: `className={cn("base-class", condition && "conditional-class", className)}`.
- **Components**:
  - Prefer functional components.
  - Use `lucide-react` for icons.
  - Follow Shadcn/ui patterns for component composition.

## Development workflow

- **Start dev server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Key files

- `src/lib/utils.ts`: Contains the `cn` helper.
- `src/Layout.tsx`: Main layout wrapper.
- `src/App.tsx`: Route definitions.
- `docs/superpowers/specs/2026-04-30-visual-enhancement-design.md`: Baseline visual direction (ambient layering, framing, motion). When changing UI appearance, read this spec and follow the project skill **Visual design spec** in `.cursor/skills/visual-design-spec/SKILL.md`.

## Browser-based UI testing (MCP)

When you need to drive a browser, run scripts in the page, or capture a11y snapshots for this app, follow the project skill **Browser UI testing (MCP)** in `.cursor/skills/browser-ui-testing/SKILL.md` (or rely on the agent to load it by description). **Always** read the MCP tool schema in Cursor for your enabled server before calling tools, since tool names differ by integration.

## Do not

1. Modify files in `src/components/ui/` unless necessary for global style changes.
