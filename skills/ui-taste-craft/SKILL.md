---
name: ui-taste-craft
description: Apply the project's color-agnostic TASTE.md specification, semantic token architecture, WCAG/APCA contrast rules, and anti-slop craft guardrails when building or refining any UI or UX component.
---

# UI Taste & Craft Execution Skill

Use this skill whenever designing, building, or refactoring frontend UI/UX components, dashboards, forms, overlays, or flows.

## 1. Load the Taste Contract & Match Calibrated Components First
Before writing UI code, discover the exact approved patterns for what the user described:
1. **Intent → Component Discovery (Preferred when `taste-mcp` or `taste-find` is available):**
   - Call `match_ui_components({ description: "<what the user wants in UI>", framework: "<target>" })` (or run `bun run find:ui "<description>"`).
   - Prefer returned matches marked **`PRIMARY`** or **`SELECTED`** in `taste.json`, and strictly obey any **`avoidAntiPatterns`** warnings.
   - Call `get_component_reference({ id: "<specimenId/variantId>", framework: "<target>" })` (or `bun run find:ui --ref <id>`) to pull the exact reference implementation, interaction state model, and active Craft Dials before implementing.
2. **Load `TASTE.md`:**
   - Check `TASTE.md` or `taste/TASTE.md` in the current project root (project override), or call `get_taste_spec`.
   - If absent, read the bundled reference `references/TASTE.md` inside this skill folder.
- Follow the calibrated **Craft Dials** (density, base radius, concentric nesting `inner = max(0, outer - padding)`, border strength, shadow depth, typography pairing, tabular numerals, press compression, motion physics).
- Honor the **Primary Default** and **Approved Secondary Patterns** recorded in `TASTE.md`.
- Strictly obey every **Explicitly Rejected** and **Never Do This** rule.

## 2. Color Abstraction Contract (Colors Are Theme, NOT Taste)
- **Never hardcode brand hex/RGB values** inside reusable components (`bg-[#...]`, `color: '#...'`).
- Bind every surface, ink, hairline, and status role to the project's semantic CSS tokens:
  - Surfaces: `--surface-0` (canvas), `--surface-1` (card/panel), `--surface-2` (elevated/hover), `--surface-recessed` (wells/tracks)
  - Ink: `--ink-1` (primary), `--ink-2` (secondary), `--ink-3` (muted metadata/UI hints only)
  - Hairlines & Depth: `rgba(var(--border-rgb), alpha)` (`--border-subtle`, `--border-strong`), `--shadow-sm/md/lg`
  - Accents & States: `--accent`, `--accent-ink`, `--accent-soft`, `--danger`, `--danger-ink`, `--danger-soft`, `--success`, `--focus-ring`
- If the work repo uses Tailwind/shadcn tokens (`--background`, `--foreground`, `--card`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--destructive`), map your component cleanly onto the repo's existing semantic variables rather than inventing hardcoded colors.

## 3. Registry-First Rule (Stop Blindly Hand-Coding Primitives)
- Before building a dialog, drawer, popover, combobox, toast, command palette, date picker, data table, or uploader from scratch, inspect `package.json` and `components.json`.
- Query available MCP registries (`shadcn MCP`, `21st MCP`, `Storybook MCP`, `Figma MCP`) or pull from approved source-owned registries (`@coss`, `@diceui`, `@kibo-ui`, `@motion-primitives`).
- Immediately restyle installed registry primitives onto the project's semantic tokens and calibrated craft dials so they never look like stock defaults.

## 4. Non-Negotiable Craft & Anti-Slop Guardrails
- **Typography:** Apply `font-variant-numeric: tabular-nums` to all KPIs, prices, timestamps, percentages, counts, and table numbers. Use `text-wrap: balance` on headings and `text-wrap: pretty` on prose.
- **Motion:** Keep interaction transitions `< 300ms` and interruptible. Never animate from `scale(0)` (`scale-0`) — start origin-aware entrances from `scale(0.95)`. Never animate layout properties (`top`, `left`, `width`, `height`) when `transform`/`opacity` suffices. Respect `prefers-reduced-motion`.
- **Resilience:** Design every view for empty, loading (geometry-matched skeleton), error (calm inline retry), long overflowing text (`truncate` / `min-w-0`), and `390px` mobile width.
- **Restraint:** One clear primary action per view or card. Group with whitespace before reaching for extra boxes or nested borders. Avoid decorative eyebrow pills, fake pulsing status dots, and gratuitous gradients.

## 5. Mandatory Deterministic Verification Gate
Before concluding any UI task:
1. Verify all foreground/background color pairs pass WCAG 2.1 AA + APCA `Lc` (use the `ui-contrast-audit` skill or run `taste-lint`).
2. Run `taste-lint` (or `npm run lint:taste` if configured) and resolve all contrast errors and raw-hex warnings.
3. Verify zero horizontal overflow at `390px` mobile width and confirm keyboard focus rings (`:focus-visible`) are crisp.
