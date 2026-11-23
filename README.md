# UI/UX Taste System

> **Colors are project theming, NOT taste.**  
> An interactive, color-agnostic **Taste Lab**, **TASTE.md Compiler**, deterministic **WCAG 2.1 + APCA (`Lc`) Contrast Linter**, **Multi-Registry MCP Starter Pack**, and **Portable Agent `SKILL.md` Suite** so AI coding assistants (Claude Code, Antigravity, Codex, Cursor, Gemini CLI) build crisp, accessible interfaces true to *your* taste—without generic "AI slop."

---

## What's Inside

| Module | Path | Purpose |
| :--- | :--- | :--- |
| **Interactive Taste Lab** | `apps/taste-lab/` | Local React + Vite workbench with **20 categories / 170+ live interactive prototypes** across 4 batches, live Craft Dials, Theme Swapper, `Break UI` + `390px` mobile stress toggles, and a live **Color Contrast Inspector**. |
| **Compiled Taste Contract** | `taste/taste.json` & `taste/TASTE.md` | Machine-saved picks (multi-select + Primary Default + rationale + anti-patterns) compiled into a single portable spec every AI agent can read. |
| **Zero-Dep Contrast & Taste Linter** | `packages/taste-linter/bin/taste-lint.mjs` | Deterministic CLI (`npm run lint:taste`) auditing **WCAG 2.1 AA/AAA** and **APCA W3 `Lc`** perceptual contrast on semantic tokens + auto-fix hex suggestions + anti-slop static checks. |
| **Portable Agent Skills** | `skills/*/SKILL.md` | Four focused, low-bloat skills (`ui-taste-craft`, `ui-contrast-audit`, `pick-ui-library`, `ui-prototype`) compatible with `.agents/skills`, `.claude/skills`, `.gemini/skills`, and `.cursor/skills`. |
| **Multi-Registry & MCP Configs** | `configs/` | Drop-in `components.registries.json` (`@coss`, `@diceui`, `@kibo-ui`, `@motion-primitives`, `@cult-ui`, `@react-bits`) and `mcp.starter.json` (`shadcn`, `21st`, `context7`, `playwright`, `chrome-devtools`). |
| **Semantic Token Starter** | `templates/theme.tokens.css` | Light + Dark semantic CSS variables pre-verified against WCAG 2.1 AA + APCA `Lc`. |
| **Cross-Harness Installer** | `scripts/install-skills.mjs` | One-command script (`npm run install:skills`) to deploy your skills + bundled `TASTE.md` into any work repo or global agent home directory. |

---

## Use It at Work in 60 Seconds

### 1. Install the Portable Agent Skills Anywhere

```bash
# Option A: One-line install from GitHub via the open Agent Skills CLI (works on any laptop!)
npx skills add bharath03-a/uiux-taste-system

# Option B: From a local clone — install into a specific work repository (+ TASTE.md)
npm run install:skills -- --target /path/to/your-work-repo

# Option C: Install globally across every repo on your machine
npm run install:skills -- --global

# Target a single harness if preferred (agents | claude | gemini | cursor)
npm run install:skills -- --target /path/to/your-work-repo --harness claude
```

> Every skill installation automatically bundles your compiled `TASTE.md` as a fallback inside `ui-taste-craft/references/TASTE.md`, so even brand-new work repos immediately follow your calibrated taste with zero extra setup.

### 2. Run Deterministic Color Contrast & Taste Audits Anywhere

```bash
# Audit this repo (or pass any work repo directory)
npm run lint:taste
node packages/taste-linter/bin/taste-lint.mjs /path/to/your-work-repo

# Check any single foreground/background hex pair in <20ms (WCAG 2.1 + APCA Lc + auto-fix)
node packages/taste-linter/bin/taste-lint.mjs --check "#10b981" "#ffffff"

# JSON output for Claude Code / Codex / CI hooks
node packages/taste-linter/bin/taste-lint.mjs /path/to/your-work-repo --json
```

### 3. Empower Your AI Assistant with Live UI Registries & MCPs

Instead of letting coding agents hand-roll dialogs, pickers, tables, and drawers blindly:

1. **Multi-Registry `components.json`:** Merge [`configs/components.registries.json`](./configs/components.registries.json) into your project's `components.json` so `shadcn` can pull source-owned components from `@coss` (Base UI), `@diceui`, `@kibo-ui`, `@motion-primitives`, `@cult-ui`, and `@react-bits`.
2. **Official `shadcn` MCP:** Run `npx shadcn@latest mcp init --client claude` (or `cursor` / `vscode` / `codex` / `opencode`).
3. **Full Frontend MCP Stack:** Copy the servers you need from [`configs/mcp.starter.json`](./configs/mcp.starter.json) (`shadcn`, `21st`, `context7`, `playwright`, `chrome-devtools`, plus `Figma MCP`, `Storybook MCP`, and `Axe MCP` where applicable).

---

## Calibrating Your Own Taste in Taste Lab

```bash
# Install dependencies (first time)
npm --prefix apps/taste-lab install

# Launch the interactive workbench (http://localhost:4173)
npm run lab
```

### 4 Calibrated Prototype Batches
1. **Batch 1 · Foundations (5 categories):** Surfaces & Elevation, Typography Rhythm, Buttons & Controls, Inputs & Forms, Tabs & Segmented Controls.
2. **Batch 2 · UX & Overlays (5 categories × 10 = 50):** Overlays & Drawers, Popovers & Menus, Command Palette (`cmdk`), Toasts (`Sonner`), App Shell & Sidebars.
3. **Batch 3 · Data & AI-Native (5 categories × 10 = 50):** Tables & Bulk Actions, Empty/Loading/Error Resilience, AI Streaming Markdown, Thinking Traces & Tool Chips, HITL Approvals & Diffs.
4. **Batch 4 · Generic App UX (5 categories × 10 = 50):** Cards, KPIs & Bento Layouts; Steppers, Wizards & Onboarding; Pickers, Uploads & Rich Controls; Lists, Feeds & Settings Pages; Data Viz, Progress & Status.

### Built-In Workbench Superpowers
- **Color-Agnostic Theme Slot:** Flip between Neutral Light, Mono Dark, Warm Paper, Test Cobalt, and Test Pine Dark before locking picks—real taste holds up under any brand palette.
- **Live Contrast Inspector:** Click the **Contrast** badge in the top bar to inspect WCAG 2.1 + APCA `Lc` scores across all semantic pairs, or paste your company's brand hexes into the **Work Brand Tester** to auto-fix failing contrast and copy ready-to-use CSS variables.
- **Multi-Select + Primary Default:** Pick multiple patterns that belong in your kit and star one as the **Primary Default**, plus record *When to use* and *Never do* rules that compile straight into `taste/TASTE.md`.

---

## Publishing as Open Source

```bash
git init
git add .
git commit -m "feat: initial open-source release of UI/UX Taste System"
# Create a GitHub repo and push:
# gh repo create uiux-taste-system --public --source=. --remote=origin --push
```

## License

[MIT](./LICENSE)
