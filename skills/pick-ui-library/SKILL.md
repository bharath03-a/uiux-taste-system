---
name: pick-ui-library
description: Choose the single best accessible, source-owned UI component library or registry (Base UI, shadcn, coss, Dice UI, Kibo UI, Sonner, cmdk, Motion Primitives, 21st MCP) instead of hand-rolling complex primitives.
---

# Curated UI Library & Registry Picker Skill

Never hand-roll focus traps, portals, roving tabindex, drag-and-drop physics, virtualized lists, or accessible drawers from scratch when a proven primitive exists.

## Step 1: Inspect the Repo First
Before recommending or installing anything, read:
1. `package.json` — Check what primitive layer is already installed (`@base-ui/react`, `@radix-ui/*`, `lucide-react`, `motion`/`framer-motion`, `sonner`, `cmdk`, `@tanstack/react-table`).
2. `components.json` — Check configured `shadcn` registries (`@coss`, `@diceui`, `@kibo-ui`, `@motion-primitives`, `@cult-ui`, `@react-bits`).
3. Existing `components/ui/` — Reuse existing team wrappers before adding new dependencies.

**Golden Rule:** Never mix competing headless layers unnecessarily (don't install Radix dialogs in a Base UI app unless forced), and always pick **one** clear recommendation rather than dumping a laundry list.

## Step 2: Single-Best-Choice Decision Matrix

| Need | Best Pick (2026 Stack) | Install / Lookup Path |
| :--- | :--- | :--- |
| **Core primitives (Dialog, Popover, Select, Tabs, Tooltip, Drawer)** | **`@coss`** (Base UI + Tailwind v4) or **`shadcn/ui`** (matching repo's existing primitive layer) | Query `shadcn MCP` or `npx shadcn@latest add @coss/<name>` |
| **Toasts & async promise notifications** | **`sonner`** | `npm i sonner` |
| **Command palette (`⌘K`)** | **`cmdk`** | `npm i cmdk` |
| **Mobile bottom sheet / drawer** | **`@base-ui/react` Drawer** (or `vaul` on Radix apps) | Built into Base UI v1.3+ / `npm i vaul` |
| **Complex SaaS controls (Faceted filters, Action Bar, Stepper, Query Builder, Combobox, File Upload)** | **`@diceui`** | `npx shadcn@latest add @diceui/<name>` |
| **Workspace widgets (Kanban, Gantt, Calendars, Dropzone, Pill)** | **`@kibo-ui`** | `npx shadcn@latest add @kibo-ui/<name>` |
| **Data tables (sorting, filtering, pinning, pagination)** | **`@tanstack/react-table`** | `npm i @tanstack/react-table` |
| **Animated numbers / KPI tickers** | **`@number-flow/react`** | `npm i @number-flow/react` |
| **Restrained product motion & layout springs** | **`motion`** (`motion/react`) + **`@motion-primitives`** | `npx shadcn@latest add @motion-primitives/<name>` |
| **AI streaming Markdown & agent UI (Tool chips, Reasoning, Diffs, HITL)** | **`streamdown`** + **`shadcn` AI Elements** / **`assistant-ui`** | Query `shadcn MCP` / `npm i streamdown` |
| **High-craft hero / showcase blocks (use sparingly)** | **`21st MCP`** / **`@cult-ui`** / **`@react-bits`** | Search via `21st MCP` or `@react-bits/<name>` |
| **Live accessibility & contrast audit** | **`Axe MCP`** + **`taste-lint`** | Run `taste-lint` + Axe MCP check |

## Step 3: Post-Install Adaptation (Mandatory)
Every component pulled from a registry must be immediately adapted to:
1. The project's semantic color tokens (`--surface-*`, `--ink-*`, `--border-*`, `--accent`, `--danger`) with verified WCAG/APCA contrast.
2. The calibrated `TASTE.md` Craft Dials (density, concentric radius, tabular numerals, `<300ms` motion).
