# Research: Building a Best-in-Class UI/UX Skills & Tooling System for Agentic Coding

> **Goal:** Build a portable suite of UI/UX agent skills, design contracts, deterministic linters, and verification tools so AI coding agents (Claude Code, Antigravity, Codex, Cursor, Gemini CLI) consistently produce applications true to **your personal taste**—with zero "AI slop" and zero cross-session drift.

---

## 1. Starting Point: Griffin Wooldridge — *UI Libraries for Claude Code (Ban the AI Look)*

**Source:** [YouTube (`zsCGS-Yzjnw`)](https://www.youtube.com/watch?v=zsCGS-Yzjnw) & companion article on `griffinwooldridge.com` (Oct–Nov 2026).

### Core Thesis
The fastest way to eliminate generic AI UI is to **stop letting coding agents hand-roll UI components from scratch**, and instead steer them onto a curated three-tier component library stack:

| Tier | Purpose | Recommended Libraries | Key Caveat |
| :--- | :--- | :--- | :--- |
| **1. Foundations** | Accessible primitives, keyboard nav, focus trapping, state machines | `shadcn/ui`, `Base UI`, `Radix` | Stock `shadcn/ui` styling *is* now a recognizable "AI look." Override colors, border radius, and typography upfront. |
| **2. Specialists** | Single-purpose interaction primitives AI routinely gets wrong | `Sonner` (toasts), `Vaul` (mobile drawers), `cmdk` (command palettes), `NumberFlow` (animated numbers) | Agents won't pick these unless explicitly told or guided by a lookup skill. |
| **3. Designed Components** | Pre-styled, copy-paste blocks for high-craft & AI-native UI | `Beautiful UI` (streaming text, approval cards, diff views, tool chips), `RareUI`, `Magic UI`, `Aceternity`, `21st.dev` | Use selectively for standout moments—overuse causes visual incoherence. |

### Workflow Pattern Highlighted
1. **Explicitly name libraries** in prompts or persistent instructions.
2. **Install via CLI/registry** so source code lives in-repo where the agent can read and adapt it.
3. **Provide brand tokens upfront** (palette, type scale, radii) before generating screens.
4. **Use a library-picker skill**—specifically Emil Kowalski's **`pick-ui-library`** (`emilkowalski/skills`), which inspects `package.json` first and recommends a single curated library instead of listing options or letting the agent hand-roll a primitive.

---

## 2. State of the Art in 2026: The UI/UX Agent Skills Ecosystem

Across 2025–2026, open-source UI/UX agent tooling converged around the portable `SKILL.md` open standard (installable via `npx skills add` into `.agents/skills`, `.claude/skills`, `.gemini/skills`, `.cursor/`, etc.). Each standout project solves a different slice of the quality problem:

| Project | Creator | Primary Strength | Core Architectural Mechanism | Limitation for Personal Taste |
| :--- | :--- | :--- | :--- | :--- |
| **`impeccable`** | Paul Bakaus (`pbakaus/impeccable`) | End-to-end product UI design, iterative critique & polish | Router `SKILL.md` (24 commands → lazy-loaded playbooks), `PRODUCT.md` + `DESIGN.md`, Rust CLI (`impeccable detect`) with 62 deterministic slop rules, multi-phase hooks (`SessionStart`, `PostToolUse`, `Stop`), bundled subagents | Encodes general high-craft anti-slop rules rather than your personal signature aesthetic & component stack |
| **`emilkowalski/skills`** | Emil Kowalski (`emilkowalski/skills`) | Design engineering craft, motion physics, library selection | ~20 focused skills: `emil-design-eng`, `pick-ui-library` (`disable-model-invocation`), `animate`, `review-animations`, `mobile-native`, `prototype` | Encodes Emil's stack/philosophy; lacks deterministic linting or visual regression gates |
| **`taste-skill`** | Leon Lin (`Leonxlnx/taste-skill`) | High-craft marketing & landing pages | Curated reference datasets (palettes, type, compositions), `copy-lint.mjs` (30ms LLM-copy slop check), `consistency.mjs` (100+ real headless Chrome CDP checks across `1440`/`1024`/`820`/`768`/`390`px), `shoot.mjs`, `gate.mjs` wired to an embedded `Stop` hook (max 3 rounds) | Designed to *vary* aesthetics across sites (randomized dealing) rather than keep *your* apps visually cohesive |
| **`hallmark`** | Together AI (`Nutlope/hallmark`) | Marketing pages & URL style study | 50 curated material themes, licensed photography, browser slop gates, `hallmark study <URL>` → `design.md` | Can lean heavily on its built-in theme layouts across builds |
| **`interface-design`** | `Dammyjay93/interface-design` | Dashboards, SaaS, dense product UI | Persists spacing grids, surface depth, and tokens in `.interface-design/system.md` and reloads them every session to stop multi-day drift | Project-scoped persistence; doesn't include a cross-project personal registry or browser gate |
| **`ui-ux-pro-max`** | `nextlevelbuilder/ui-ux-pro-max-skill` | Multi-stack design reasoning (22 frameworks incl. SwiftUI, Flutter, Vue, React) | Local searchable DB of styles, palettes, font pairings, chart types, and UX guidelines | Broad encyclopedic guidance; blind tests show lower raw polish than focused systems |
| **`frontend-design`** | Anthropic (`anthropics/skills`) | Zero-bloat baseline | Lightweight prompt forcing an explicit aesthetic commitment before coding | Purely probabilistic—no tokens, no linter, no browser verification |
| **`web-design-guidelines`** | Vercel (`vercel-labs/agent-skills`) | Pre-ship UX & accessibility audit | 100+ web convention, focus, keyboard, and a11y audit checks | Audit-only; doesn't establish visual identity |

---

## 3. Critical Empirical Findings (Why Prompt-Only Skills Fail)

Research and production benchmarks from 2026 expose **five concrete failure modes** that our toolkit must solve by design:

1. **Probabilistic Drift:** Agents treat `SKILL.md`, `CLAUDE.md`, and `DESIGN.md` as soft guidance, not hard constraints. Over long sessions, raw hex colors (`bg-[#...]`), arbitrary pixel values (`p-[13px]`), off-scale font sizes, and inconsistent radii silently creep in unless blocked by deterministic static/runtime checks.
2. **The Catalog vs. Rules Gap (Supernova Oct 2026 Benchmark):** Giving an agent a live component catalog via the official `shadcn` MCP server stops API hallucination—but **without explicit usage rules**, agents still broke team design-system rules 20 times in 18 runs (e.g., installing a bare `AlertDialog` instead of using an existing `ConfirmDestructive` wrapper). Pairing the catalog with concise mandatory-wrapper rules dropped violations to **zero**.
3. **The `DESIGN.md` Contrast Blind Spot (Wei & Maalej, Nov 2026):** Across 36,906 linter-passing `DESIGN.md` specs, **43.2%** failed the WCAG AA 4.5:1 contrast floor because Google's official `@google/design.md` linter emits contrast issues as *warnings* (exit code `0`) instead of errors. Contrast enforcement must be deterministic and blocking.
4. **Conflicting Primary Skills Degrade Output:** Activating multiple opinionated generation skills simultaneously (e.g., `frontend-design` + `taste-skill` + `impeccable`) degrades quality due to contradictory rules. The winning architecture is **one coherent primary system** + **orthogonal, explicit utility skills** (library picker, motion, audit, visual check).
5. **Infinite Hook Traps vs. Unchecked Output:** Unbounded `Stop` hooks trap agents in endless fix loops, while absent verification ships broken mobile layouts, z-index collisions, and low-contrast buttons. The best pattern (pioneered in `taste-skill` and `impeccable`) is **fast `PostToolUse` static feedback** + a **bounded `Stop` / CLI finish gate** (e.g., max 3 rounds + explicit waiver escape hatch).

---

## 4. The 5-Layer Architecture for Personal Taste + Consistency

To make every application stay unmistakably true to **your** taste and consistent across sessions and repos, the system should cover all five layers without bloat:

```
┌──────────────────────────────────────────────────────────────────────┐
│ LAYER 5: Visual & Browser Verification Gate                          │
│ Multi-viewport headless checks (1440 / 1024 / 768 / 390px):          │
│ overflow, computed WCAG contrast, 44px touch targets, screenshots    │
├──────────────────────────────────────────────────────────────────────┤
│ LAYER 4: Deterministic Taste Linter + Agent Hooks (Zero-LLM)         │
│ Fast CLI + PostToolUse / Stop hooks: raw hex/arbitrary value bans,   │
│ token adherence, AI slop pattern bans, copy-slop check, wrapper rule │
├──────────────────────────────────────────────────────────────────────┤
│ LAYER 3: Personal Component Registry + Curated Library Picker        │
│ Custom shadcn v4 registry (@your-taste/*) + --preset + shadcn MCP    │
│ + /pick-ui-library tailored to YOUR approved stack & wrappers        │
├──────────────────────────────────────────────────────────────────────┤
│ LAYER 2: Persistent Taste Contract (TASTE.md + DESIGN.md + Tokens)   │
│ Cross-project personal DNA (TASTE.md) + per-repo contract (DESIGN.md │
│ & PRODUCT.md) + canonical CSS variables / Tailwind v4 @theme / DTCG  │
├──────────────────────────────────────────────────────────────────────┤
│ LAYER 1: Modular SKILL.md Suite (Router + Lazy-Loaded Playbooks)     │
│ Low-overhead SKILL.md router with focused commands:                  │
│ init / extract / shape / pick / polish / critique / audit / verify   │
└──────────────────────────────────────────────────────────────────────┘
```

### Why This Beats Off-the-Shelf Kits
- **True to *Your* Taste (Not Generic Craft):** Instead of dealing random themes or borrowing someone else's aesthetic, your personal taste profile (`TASTE.md` + token presets + banned patterns + visual references) is the first-class input to every skill and linter rule.
- **Portable Across Agent Harnesses:** Structured around the open `SKILL.md` spec + a single dependency-light Node/TypeScript CLI (works natively in Claude Code, Antigravity, Codex, Cursor, and Gemini CLI, plus CI).
- **Zero Context Bloat:** Uses progressive disclosure (tiny router `SKILL.md`, lazy-loaded playbooks in `references/`, `disable-model-invocation` for on-demand lookup/audit skills).
- **Hard Guardrails Where Prose Fails:** Static linting + computed-DOM verification catch drift deterministically at near-zero token cost.

---

## 5. Recommended Core Components to Build in This Repo

1. **Skill Suite (`skills/`)** — Portable `SKILL.md` packages:
   - `taste-profile` (onboarding / calibration interview + URL/screenshot reference extractor → generates your personal `TASTE.md`, `DESIGN.md`, and Tailwind v4 / CSS token file).
   - `ui-architect` (primary design & build router with lazy-loaded playbooks: `shape`, `polish`, `critique`, `distill`, `harden`, `animate`, `mobile`).
   - `pick-ui-library` (customized to your exact preferred stack, foundations, specialists, and custom wrappers—inspects `package.json` first).
   - `ui-verify` (runs deterministic linter + multi-viewport headless browser checks + screenshot inspection).
2. **Deterministic CLI & Hook Engine (`packages/taste-cli/` or `scripts/`)**:
   - `taste lint` — zero-LLM static analyzer (raw hex/rgb ban, arbitrary Tailwind class ban, token drift against `DESIGN.md`, WCAG AA contrast math on token pairs, AI visual & copy slop rules, banned raw primitive usage when a wrapper exists).
   - `taste verify` — headless browser (Playwright/CDP) check across desktop/tablet/mobile viewports (horizontal overflow, computed contrast, focus visibility, tap targets, broken media, layout screenshots).
   - `taste hook` — multi-harness hook adapter (`PostToolUse` fast check + bounded `Stop` gate for Claude Code / Codex / Cursor).
3. **Personal Starter Preset & Custom Registry Blueprint (`registry/`)**:
   - `shadcn` v4-compatible custom registry scaffold (`registry.json` + themed foundations & custom wrappers) + portable `--preset` + `components.json` / MCP setup guide so new apps start with *your* design system out of the box.
4. **Harness Installer / Sync Script**:
   - One command to install/symlink skills and hooks cleanly into `.agents/skills`, `.claude/skills`, `.gemini/skills`, or globally via `npx skills`.


---

## 6. Deep Dive: Color-Agnostic Taste & Expanded 2026 Ecosystem

### Core Principle: Colors Are Project Theming, NOT Taste
Brand palettes change from app to app. **Personal taste is structural, behavioral, and craft-level**—it should survive completely intact whether a project is monochrome, warm cream, deep obsidian, or bright indigo.

| Layer | Belongs To | Examples |
| :--- | :--- | :--- |
| **Project Theme (Abstracted)** | Per-project CSS tokens (`THEME.css` / `DESIGN.md`) | Brand hues, light/dark surface shades, semantic slots (`--surface-0..2`, `--ink-1..3`, `--border-subtle/strong`, `--accent`, `--accent-ink`, `--danger`, `--success`) |
| **Personal Taste (Portable DNA)** | Cross-project `TASTE.md` + `taste.json` + Component Registry | Geometry, concentric radii, elevation model (hairlines vs shadows), spatial rhythm & density, typographic hierarchy, motion physics, interaction ergonomics, restraint/anti-slop rules |

The only color rules that belong in **Taste** are *structural* rules: perceptual uniformity (OKLCH), neutral-to-accent ratio (e.g., 90/10 restraint), translucent borders that adapt across surfaces, and non-negotiable WCAG AA/AAA contrast math.

---

### Expanded 2026 Component & UX Library Map

| Category | Standout 2026 Tools | Why They Matter |
| :--- | :--- | :--- |
| **Headless Foundation** | **Base UI (`@base-ui/react`)** | Built by Radix/Floating UI/MUI alumni; v1.3+ includes native Drawer; became `shadcn/ui`'s default primitive layer in July 2026—eliminating portal/focus conflicts across overlays. |
| **Core Styled Systems** | **`coss ui`** (Cal.com's Base UI successor to Origin UI), **`shadcn/ui` v4** | Source-owned Tailwind v4 + Base UI primitives with composed patterns ("Particles") and portable `--preset` scaffolding. |
| **Complex App Widgets** | **`Dice UI`**, **`Kibo UI`** | Accessible, keyboard-first complex SaaS primitives (`Dice UI`: Query Builder, Command Stack, Action Bar, Faceted Filters, Stepper, Tour; `Kibo UI`: Kanban, Gantt, Calendars, Dropzones). |
| **Micro-Interaction Specialists** | **`Sonner`** (toasts), **`Vaul` / Base UI Drawer**, **`cmdk`**, **`NumberFlow`**, **`input-otp`**, **`Liveline`** (real-time charts), **`Virtuoso`**, **`dnd-kit`** | Solved interaction physics & accessibility edge cases agents consistently get wrong from scratch. |
| **Restrained Product Motion** | **`Animate UI`**, **`Motion Primitives`**, **`transitions.dev`**, **Benji Taylor's `Stageshow`** | Drop-in animated Base UI/Radix primitives and subtle, composable SaaS motion without marketing-page gimmicks. |
| **Expressive / Showcase UI** | **`Cult UI`**, **`React Bits 2.0`** (215+ effects, Background Studio, Sound Lab), **`Magic UI`**, **`Aceternity`**, **`RareUI`**, **`21st.dev`** | Selective standout moments (heroes, shaders, device mockups); should be strictly bounded to avoid mixing conflicting motion runtimes. |
| **AI-Native UX Layer** | **Official `shadcn/ui` AI Elements** (Oct 2026, replacing deprecated `vercel/ai-elements`), **`Beautiful UI`** (21 crafted agent primitives), **`assistant-ui`**, **`Streamdown v2`** | Streaming Markdown without jitter (`Streamdown`), thinking/reasoning traces, HITL approval cards, diff tables, tool-call chips, and thread lifecycle state (`assistant-ui`). |

---

### Notable Videos, Creators & Craft Playbooks to Study

#### Videos on Banning the AI Look & Building UI Taste
- **Griffin Wooldridge:** *UI Libraries for Claude Code (Ban the AI Look)*, *How to Make AI-Generated UI Look Expensive (7 Fixes)*, *Claude Skills for Designers (Ban AI Slop Forever)* (Parts 1 & 2).
- **Emil Kowalski:** *The Ridiculous Engineering Of Animations* + `aiforui.dev` (`emilkowalski/skills`: `/prototype`, `/break-ui`, `/learn-taste`, `/pick-ui-library`, `/animate`, `/mobile-native`).
- **Peter Yang & Nate Parrott (Anthropic):** *How to Get Claude to Design Without AI Slop in 40 Minutes* — covers the 4 tells of AI designs and how to test design skills when AI cannot judge taste.
- **Dive Club (feat. Kyle Zantos):** *Designer's Toolkit for Claude Code* — building custom design-engineering skills and using **live control panels (Leva)** to feel and tune parameters directly in the browser.
- **UI Collective / Anti-Slop Pipelines:** *How to Fix AI Slop in Your App Designs*, *unslop / unslop-ui* walkthroughs (stripping eyebrow badges, fake pulsing dots, decorative gradients, and repetitive LLM copy).

#### Foundational Design Engineering Craft Sources
- **Rauno Freiberg — *Devouring Details* (`devouringdetails.com`) & `rauno.me`:** Interactive prototypes paired with deep analysis (*Invisible Details of Interaction Design*, *Designing Depth*, *Web Interface Guidelines*). Core lesson: **taste is forged by dissecting *why* an interaction feels right via interactive prototypes.**
- **Emil Kowalski — `animations.dev` & `aiforui.dev`:** Frequency-based animation restraint, `<300ms` discipline, interruptible transitions, origin-aware scaling (`0.95 -> 1`, never `0 -> 1`), subtle press compression (`scale(0.97)`), hover media-query guards, and adversarial `/break-ui` stress testing.
- **Jakub Krehel — `interfaces.dev` & `jakubkrehel/skills`:** Concentric border radii, optical alignment, `text-wrap: pretty`, tabular numerals, grouping via space instead of lines, single primary action per view, plus `/variant` (3 live variants) and `/break` workflows.
- **Raphael Salaja — `userinterface.wiki`:** 152 prioritized interface craft rules across 12 categories, springs vs. easing physics (stiffness/damping/mass), dynamic container bounds, shape-morphing icons, and subtle Web Audio UI sound design.

---

## 7. What We Can Do Better: The **Taste Lab → Compiler** Architecture

Every existing 2026 toolkit has a major blind spot:
- `Impeccable`, `emilkowalski/skills`, and `jakubkrehel/skills` encode **someone else's** finished taste.
- `taste-skill` and `hallmark` **randomize themes** for variety rather than building *your* coherent signature.
- None of them help you **discover, feel, calibrate, and codify your own taste** through live prototyping with color abstracted out.

### Our Better Approach: Build Taste by Touching Prototypes, Then Compile It into Agent Tooling

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. INTERACTIVE TASTE LAB (Local Prototyping Workbench)                  │
│ • Side-by-side interactive UI & UX component variants (3–4 per pattern) │
│ • Color-abstracted: live Neutral / Dark / Warm / Brand theme swapper    │
│ • Live craft dials (density, concentric radius, border vs shadow,       │
│   typography rhythm, spring stiffness/damping, press scale, timing)     │
│ • 1-click "Break UI" adversarial stress toggle (long text, 0 items,     │
│   huge numbers, slow loading, 390px mobile width)                       │
│ • Pick Winner + Record "Why / Never Do X" rationale per component       │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │  Compile Taste
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. PORTABLE TASTE ARTIFACTS & AGENT TOOLING                             │
│ • taste.json + TASTE.md       (color-agnostic structural & UX DNA)      │
│ • Custom SKILL.md Suite       (/prototype, /pick-ui-library, /ui-craft, │
│                                /break-ui, /unslop, /learn-taste)        │
│ • Personal shadcn v4 Registry (your exact winning components, semantic  │
│                                tokens only — ready for any brand color) │
│ • Deterministic Linter & Gate (enforces your chosen radii/spacing/      │
│                                motion/wrapper/no-slop rules via hooks)  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Suggested Prototyping Track (UI + UX Components to Calibrate First)
1. **Foundational Surfaces & Geometry:** Elevation (hairline vs shadow vs recessed), concentric radius nesting, spacing density, typography scale & tabular numerals.
2. **Core Interactive Primitives:** Buttons (press feel, loading, focus rings), Inputs & Forms (inline validation, labels, focus states), Tabs/Segmented Controls (shared-layout indicator motion), Cards & Lists (grouping via space vs dividers).
3. **Overlays & Navigation UX:** Dialog vs Drawer/Sheet (desktop vs mobile Vaul/Base UI), Popovers & Dropdowns (origin-aware motion), Command Palette (`cmdk` keyboard ergonomics), Toasts (`Sonner` stacking & tone), App Shell & Sidebar hierarchy.
4. **Data & Resilience UX:** Tables & Filters (row density, hover affordance, sticky headers), Empty / Loading / Skeleton / Error states, Optimistic actions & Destructive confirmations.
5. **AI-Native UX Patterns:** Streaming text (`Streamdown`), Reasoning/Thinking traces, Tool-call chips, Diff views, Human-in-the-loop approval cards, Prompt composer.
6. **Generic Everyday App UX (Batch 4):** Cards/KPIs/Bento grids, Steppers/Wizards/Onboarding checklists, Rich Pickers & File Uploaders, Lists/Settings/Comments/Invoices, and Monochrome/Single-Accent Data Visualization.

---

## 8. Empowering AI Coding Assistants: Live UI MCP Stack & Deterministic Contrast

To stop AI coding assistants from blindly inventing markup and guessing colors from training memory, pair `TASTE.md` + `SKILL.md` with **live component discovery MCPs** and **deterministic contrast verification**:

### Tiered Frontend MCP Stack (2025–2026)

| Layer | MCP Server / Registry | What It Gives the AI Assistant | Setup |
| :--- | :--- | :--- | :--- |
| **Component Discovery & Install** | **Official `shadcn` MCP** (`npx shadcn@latest mcp`) | Searches, inspects source code, and installs components from `shadcn` plus **any** third-party registry configured in `components.json` (`@coss`, `@diceui`, `@kibo-ui`, `@motion-primitives`, `@cult-ui`, `@react-bits`). | `npx shadcn@latest mcp init --client <claude\|cursor\|vscode\|codex\|opencode>` |
| **Visual Block Discovery** | **`21st MCP`** (formerly Magic MCP, `https://21st.dev/api/mcp`) | Searches 12,000+ community-crafted UI blocks & interactive demos so agents inspect proven layouts before writing code. | See `configs/mcp.starter.json` |
| **Up-to-Date Docs** | **`Context7 MCP`** (`@upstash/context7-mcp`) | Pulls live, version-accurate docs for Base UI, Tailwind v4, Motion, TanStack Table, and Sonner so agents never hallucinate deprecated APIs. | `npx -y @upstash/context7-mcp@latest` |
| **Design System Grounding** | **`Storybook MCP`** (`@storybook/addon-mcp`) & **`Figma MCP`** (`mcp.figma.com/mcp`) | Reads your work repo's real component stories, props, tokens, and Figma frame specs directly before generating new screens. | Enable in existing work design systems |
| **Live Browser & A11y Verification** | **`Playwright MCP`**, **`Chrome DevTools MCP`**, **`Axe MCP`** | Inspects live rendered DOM at `1440px` and `390px`, catches horizontal overflow, verifies keyboard focus, and runs Deque `axe-core` WCAG audits. | See `configs/mcp.starter.json` |

### Why Deterministic Contrast Enforcement Requires Both WCAG 2.1 AND APCA (`Lc`)
- **WCAG 2.1 (`4.5:1` body, `3.0:1` large/UI)** remains the legal/compliance floor (ADA / EN 301 549), but its luminance formula overestimates legibility of light text on dark backgrounds and underestimates some saturated hues.
- **APCA W3 (`|Lc| >= 60` body, `|Lc| >= 45` large/UI)** models human perceptual lightness polarity (normal vs. reverse polarity on dark surfaces), preventing dim gray-on-charcoal text and illegible white-on-emerald buttons that slip past casual review.
- **Zero-Dependency Enforcement (`taste-lint`):** Rather than relying on prompt reminders alone, `packages/taste-linter/bin/taste-lint.mjs` computes both WCAG 2.1 and APCA `Lc` in `<40ms` with zero external dependencies and outputs exact hue-preserving lightness fixes (`--check #fg #bg` or full-repo audit).

