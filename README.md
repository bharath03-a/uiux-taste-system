# UI/UX Taste System

> **Colors are project theming, NOT taste.**  
> A framework-agnostic **Taste Lab**, **Local Design MCP Server (`taste-mcp`)**, **Universal Multi-Framework Theme & Scale Generator (`taste-tokens`)**, deterministic **WCAG 2.1 + APCA (`Lc`) Contrast Linter (`taste-lint`)**, **Curated Typography / Style / Framework Catalogs**, and **5 Portable Agent Skills** so AI coding assistants (Claude Code, Antigravity, Codex, Cursor, Gemini CLI) build crisp, accessible interfaces in **any UI framework**—without generic "AI slop."

---

## What's Inside (v0.3.0 · Bun-Powered)

| Module | Path | Purpose |
| :--- | :--- | :--- |
| **Interactive Taste Lab** | `apps/taste-lab/` | Local React + Vite + Bun workbench with **30 categories / 270+ live interactive prototypes** across 6 batches (including **Risk Adjustment & HCC Coding**, **Clinical Docs & Evidence**, **Kinetic Motion**, **Spatial Workflows**, and **Ops Cockpits**), **10 curated font pairings**, **6 Style Archetypes**, Theme Swapper, `Break UI` + `390px` stress toggles, and a live **Color Contrast Inspector**. |
| **Zero-Dep Local MCP Server** | `packages/taste-mcp/server.mjs` | Stdio JSON-RPC 2.0 MCP server (runs on `bun` or `node`) giving AI agents **6 active design tools** (`check_contrast`, `generate_accessible_theme`, `suggest_color_scale`, `pick_typography_and_style`, `recommend_ui_stack`, `get_taste_spec`) so agents can understand, adapt, and fix colors, fonts, and libraries dynamically. |
| **Multi-Framework Token Generator** | `packages/taste-linter/bin/taste-tokens.mjs` | Zero-dependency CLI generating verified light/dark semantic palettes & 50–950 contrast-annotated scales from any brand hex into **CSS, Tailwind v4, shadcn, Flutter, SwiftUI, React Native, or W3C DTCG JSON**. |
| **Contrast & Taste Linter** | `packages/taste-linter/bin/taste-lint.mjs` | Deterministic CLI (`bun run lint:taste`) auditing **WCAG 2.1 AA/AAA** and **APCA W3 `Lc`** contrast + auto-fix hex suggestions + static taste checks across `.tsx`, `.jsx`, `.vue`, `.svelte`, `.html`, `.css`, `.scss`, `.dart`, and `.swift`. |
| **Machine-Readable Catalogs** | `catalog/` | `typography-and-styles.json` (10 curated font pairings + 6 style archetypes) & `framework-libraries.json` (accessible primitive stacks for **9 UI frameworks**: React, Vue/Nuxt, Svelte, Angular, Solid, Vanilla/Web Components, React Native, Flutter, SwiftUI). |
| **5 Portable Agent Skills** | `skills/*/SKILL.md` | `ui-taste-craft`, `ui-contrast-audit`, `ui-typography-styles`, `pick-ui-library`, and `ui-prototype` — compatible with `.agents/skills`, `.claude/skills`, `.gemini/skills`, and `.cursor/skills`. |
| **Compiled Taste Contract** | `taste/taste.json` & `taste/TASTE.md` | Machine-saved picks (multi-select + Primary Default + rationale + anti-patterns) compiled into a single portable spec every AI agent can read. |
| **Multi-Registry & MCP Configs** | `configs/` | Drop-in `components.registries.json` (`@coss`, `@diceui`, `@kibo-ui`, `@motion-primitives`, `@cult-ui`, `@react-bits`) and `mcp.starter.json` (includes local `uiux-taste` MCP + `shadcn`, `21st`, `context7`, `playwright`, `chrome-devtools`). |

---

## Use It at Work in 60 Seconds

### 1. Install All 5 Portable Agent Skills Anywhere

```bash
# Option A: One-line install from GitHub via the open Agent Skills CLI (works on any laptop!)
bunx skills add bharath03-a/uiux-taste-system

# Option B: From a local clone — install into a specific work repository (+ TASTE.md)
bun run install:skills -- --target /path/to/your-work-repo

# Option C: Install globally across every repo on your machine
bun run install:skills -- --global

# Target a single harness if preferred (agents | claude | gemini | cursor)
bun run install:skills -- --target /path/to/your-work-repo --harness claude
```

### 2. Connect the Local `uiux-taste` MCP Server (Zero Dependencies)

Add this to your Claude Code / Cursor / Codex / Antigravity MCP config (also in [`configs/mcp.starter.json`](./configs/mcp.starter.json); works with `bun` or `node`):

```json
{
  "mcpServers": {
    "uiux-taste": {
      "command": "bun",
      "args": ["/absolute/path/to/uiux-taste-system/packages/taste-mcp/server.mjs"]
    }
  }
}
```

Once connected, your AI assistant can actively call:
- `check_contrast` — Compute exact WCAG 2.1 ratio + APCA `Lc` + hue-preserving passing hex fix for any foreground/background pair.
- `generate_accessible_theme` — Generate complete verified light + dark semantic tokens from any brand hex, formatted for `css`, `tailwind-v4`, `shadcn`, `flutter`, `swiftui`, `react-native`, or `dtcg-json`.
- `suggest_color_scale` — Build a 50–950 shade ramp with WCAG & APCA annotations against white and dark surfaces.
- `pick_typography_and_style` — Choose from 10 curated font pairings & 6 style archetypes (`linear-precision`, `apple-calm`, `swiss-sharp`, `editorial-craft`, `dense-ops`, `warm-tactile`) with font import links and CSS dials.
- `recommend_ui_stack` — Pick the best accessible primitive/component library stack for **any** framework (`react`, `vue`, `svelte`, `angular`, `solid`, `vanilla`, `react-native`, `flutter`, `swiftui`).
- `get_taste_spec` — Read the user's compiled `TASTE.md` contract on demand.

### 3. Generate Accessible Multi-Framework Themes & Color Scales via CLI

```bash
# Generate verified light + dark tokens for any framework
bun run tokens:generate -- --brand "#2563eb" --format tailwind-v4
bun run tokens:generate -- --brand "#10b981" --format flutter
bun run tokens:generate -- --brand "#7c3aed" --format swiftui
bun run tokens:generate -- --brand "#e11d48" --format shadcn
bun run tokens:generate -- --brand "#0ea5e9" --format react-native

# Generate a contrast-annotated 50-950 scale from any brand hex
bun run tokens:generate -- --scale "#2563eb"
```

### 4. Run Deterministic Color Contrast & Taste Audits Anywhere

```bash
# Audit this repo (or pass any work repo directory — React, Vue, Svelte, Flutter, SwiftUI, CSS)
bun run lint:taste
bun packages/taste-linter/bin/taste-lint.mjs /path/to/your-work-repo

# Check any single foreground/background hex pair in <20ms (WCAG 2.1 + APCA Lc + auto-fix)
bun packages/taste-linter/bin/taste-lint.mjs --check "#10b981" "#ffffff"

# JSON output for Claude Code / Codex / CI hooks
bun packages/taste-linter/bin/taste-lint.mjs /path/to/your-work-repo --json
```

---

## Calibrating Your Own Taste in Taste Lab

```bash
# Install dependencies (first time — super fast with Bun)
bun install --cwd apps/taste-lab

# Launch the interactive workbench (http://localhost:4173)
bun run lab
```

### 6 Calibrated Prototype Batches (30 Categories · 270+ Interactive Prototypes)
1. **Batch 1 · Foundations (5 categories):** Surfaces & Elevation, Typography Rhythm, Buttons & Controls, Inputs & Forms, Tabs & Segmented Controls.
2. **Batch 2 · UX & Overlays (5 categories × 10 = 50):** Overlays & Drawers, Popovers & Menus, Command Palette (`cmdk`), Toasts (`Sonner`), App Shell & Sidebars.
3. **Batch 3 · Data & AI-Native (5 categories × 10 = 50):** Tables & Bulk Actions, Empty/Loading/Error Resilience, AI Streaming Markdown, Thinking Traces & Tool Chips, HITL Approvals & Diffs.
4. **Batch 4 · Generic App UX (5 categories × 10 = 50):** Cards, KPIs & Bento Layouts; Steppers, Wizards & Onboarding; Pickers, Uploads & Rich Controls; Lists, Feeds & Settings Pages; Data Viz, Progress & Status.
5. **Batch 5 · Auth, Nav, Landing & Commerce (5 categories × 10 = 50):** Auth, Login & Security; Topbars, Headers & Stepped-SVG TOC Rail; Badges, Avatars, Chips & Tags; Heroes, Pricing & Landing Blocks; Pricing Tables, Cart & Checkout.
6. **Batch 6 · Risk Adjustment Coding, Evidence & Kinetic Craft (5 categories × 10 = 50):** Risk Adjustment & HCC Coding (M.E.A.T., V28 RAF & hierarchy suppression, AI suspect triage, QA overread diffs, CDI queries); Clinical Docs, Evidence & PHI Redaction; Kinetic Motion & Micro-Interactions (morphing islands, spring pills, rolling odometers, hold-to-confirm, spotlights, waveforms); Spatial Workflows & Draggable Split-Panes; Ops Cockpits & Power Search.

### Built-In Workbench Superpowers
- **10 Curated Font Pairings & 6 Style Archetypes:** Live-swap between `Geist`, `Inter`, `Plus Jakarta Sans`, `Satoshi`, `IBM Plex`, `Editorial Serif` (`Instrument Serif` + `Inter`), `Display Mono` (`Space Grotesk` + `JetBrains Mono`), `Bricolage` (`Bricolage Grotesque`), `Outfit`, and `System Native` — or click one of 6 Style Archetypes (`Linear Precision`, `Apple Calm`, `Swiss Sharp`, `Editorial Craft`, `Dense Ops`, `Warm Tactile`) to snap density, radius, borders, motion, and typography simultaneously.
- **Color-Agnostic Theme Slot:** Flip between Neutral Light, Mono Dark, Warm Paper, Test Cobalt, and Test Pine Dark before locking picks—real taste holds up under any brand palette.
- **Live Contrast Inspector:** Inspect WCAG 2.1 + APCA `Lc` scores across all semantic pairs, or paste your company's brand hexes into the **Work Brand Tester** to auto-fix failing contrast and copy ready-to-use CSS variables.
- **Multi-Select + Primary Default:** Pick multiple patterns that belong in your kit and star one as the **Primary Default**, plus record *When to use* and *Never do* rules that compile straight into `taste/TASTE.md`.

---

## License

[MIT](./LICENSE)
