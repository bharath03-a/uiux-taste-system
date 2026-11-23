---
name: ui-contrast-audit
description: Deterministically audit, generate, and adapt UI component color palettes and contrast using WCAG 2.1 AA/AAA and APCA W3 Lc perceptual lightness rules across ANY UI framework (CSS, Tailwind v4, shadcn, Vue, Svelte, Flutter, SwiftUI, React Native).
---

# Dynamic Color & Contrast Intelligence Skill (WCAG 2.1 + APCA Lc)

AI coding assistants routinely ship unreadable muted text, low-contrast colored buttons (especially white text on emerald, amber, cyan, or light-blue accents), and broken dark-mode contrast when judging colors by intuition. **Never guess contrast by eye — compute and adapt colors deterministically.**

## 1. Mandatory Contrast Thresholds

| UI Role | Semantic Pair Examples | WCAG 2.1 Minimum | APCA W3 Minimum | Target Craft |
| :--- | :--- | :--- | :--- | :--- |
| **Primary & Body Text** | `--ink-1` / `--ink-2` on `--surface-0/1/2` | `>= 4.5:1` (AA) | `|Lc| >= 60` | `7.0:1` / `Lc 75+` |
| **Primary & Danger CTA Labels** | `--accent-ink` on `--accent`, `--danger-ink` on `--danger` | `>= 4.5:1` (AA) | `|Lc| >= 60` | High-polarity pair |
| **Error & Validation Copy** | `--danger` on `--surface-1` | `>= 4.5:1` (AA) | `|Lc| >= 55` | Never pale pink/red |
| **Muted Metadata & Hints** | `--ink-3` on `--surface-1` | `>= 3.0:1` (UI/Large) | `|Lc| >= 45` | `>= 4.5:1` if `<14px` |
| **Icons, Active Controls & Focus** | `--accent` / `--success` on `--surface-1` | `>= 3.0:1` | `|Lc| >= 45` | Crisp visible state |

## 2. Actively Adapt & Generate Accessible Themes (MCP + CLI)
When choosing or modifying colors for a project, use the deterministic color tools so every light/dark token is guaranteed accessible:

### Option A: Live MCP Tools (`taste-mcp`)
- `check_contrast({ foreground, background, role })` — Returns WCAG ratio, APCA `Lc`, pass/fail, and an exact hue-preserving passing hex fix.
- `generate_accessible_theme({ brandHex, framework, tintedNeutrals })` — Builds a full WCAG + APCA passing Light & Dark palette for `css`, `tailwind-v4`, `shadcn`, `flutter`, `swiftui`, `react-native`, or `dtcg-json`.
- `suggest_color_scale({ baseHex })` — Builds a 50–950 tint/shade scale with safe ink (`#ffffff` vs `#09090b`) and button-safety flags on every single swatch.

### Option B: Zero-Dependency CLI (`taste-tokens` & `taste-lint`)
```bash
# Generate an accessible light + dark theme for ANY UI framework from a brand hex
node packages/taste-linter/bin/taste-tokens.mjs --brand "#2563eb" --format tailwind-v4
node packages/taste-linter/bin/taste-tokens.mjs --brand "#10b981" --format flutter

# Generate a contrast-annotated 50-950 scale
node packages/taste-linter/bin/taste-tokens.mjs --scale "#7c3aed"

# Check any single pair in <20ms with an exact passing hex suggestion
node packages/taste-linter/bin/taste-lint.mjs --check "#10b981" "#ffffff"

# Audit an entire repo (React, Vue, Svelte, HTML, CSS, SCSS, Flutter, SwiftUI)
node packages/taste-linter/bin/taste-lint.mjs [target-dir]
```

## 3. Common AI Contrast Traps to Eliminate
1. **White on Mid-Light Brand Accents:** `#ffffff` on `#10b981` (`2.54:1`), `#f59e0b`, or `#06b6d4` fails WCAG AA. Automatically flip `--accent-ink` to `#09090b` OR shift `--accent` lightness until `>= 4.5:1` and `|Lc| >= 60`.
2. **Dark Mode Polarity Blindness:** WCAG 2.1 overestimates legibility on dark surfaces. Always require APCA `|Lc| >= 60` for dark body text and `>= 45` for muted metadata.
3. **Tinted Soft Badges (`--accent-soft`, `--danger-soft`):** Pair translucent tinted backgrounds with full-contrast foreground text (`--ink-1`, darkened semantic accent, or `--danger`), never white-on-pastel.
