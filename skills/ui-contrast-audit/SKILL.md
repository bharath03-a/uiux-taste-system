---
name: ui-contrast-audit
description: Deterministically audit and fix UI component color contrast using WCAG 2.1 AA/AAA and APCA W3 Lc perceptual lightness rules across light themes, dark themes, buttons, badges, inputs, and states.
---

# Color Contrast & Perceptual Legibility Skill (WCAG 2.1 + APCA Lc)

AI coding assistants routinely ship unreadable muted text, low-contrast colored buttons (especially white text on emerald/amber/cyan/light-blue accents), and broken dark-mode contrast when judging colors by intuition. **Never guess contrast by eye.**

## 1. Mandatory Contrast Thresholds

| UI Role | Semantic Pair Examples | WCAG 2.1 Minimum | APCA W3 Minimum | Target Craft |
| :--- | :--- | :--- | :--- | :--- |
| **Primary & Body Text** | `--ink-1` / `--ink-2` on `--surface-0/1/2` | `>= 4.5:1` (AA) | `|Lc| >= 60` | `7.0:1` / `Lc 75+` |
| **Primary & Danger CTA Labels** | `--accent-ink` on `--accent`, `--danger-ink` on `--danger` | `>= 4.5:1` (AA) | `|Lc| >= 60` | High-polarity pair |
| **Error & Validation Copy** | `--danger` on `--surface-1` | `>= 4.5:1` (AA) | `|Lc| >= 55` | Never pale pink/red |
| **Muted Metadata & Hints** | `--ink-3` on `--surface-1` | `>= 3.0:1` (UI/Large) | `|Lc| >= 45` | `>= 4.5:1` if `<14px` |
| **Icons, Active Controls & Focus** | `--accent` / `--success` on `--surface-1` | `>= 3.0:1` | `|Lc| >= 45` | Crisp visible state |
| **Hairline Borders (Structural)** | `rgba(var(--border-rgb), 0.09–0.18)` | Subtle separation | Non-text chrome | Escalate `--border-strong` on inputs (`>= 3:1` for interactive field boundaries when no background contrast exists) |

## 2. Common AI Contrast Traps (Always Prevent)
1. **White Text on Mid-Light Brand Accents:** `#ffffff` on bright green (`#10b981` -> `2.54:1` FAIL!), amber (`#f59e0b`), cyan (`#06b6d4`), or light blue fails WCAG AA badly. Switch `--accent-ink` to deep dark ink (`#052e16` / `#111113`) OR darken the accent fill until `>= 4.5:1` and `|Lc| >= 60`.
2. **Dark Mode Polarity Blindness:** WCAG 2.1 overestimates contrast on very dark backgrounds. Always check APCA `|Lc|` — dark mode body text needs `|Lc| >= 60` (and slightly brighter secondary ink, e.g. `#a1a1aa` on `#131316`, rather than dim `#52525b`).
3. **Tinted Soft Badges (`--accent-soft`, `--danger-soft`):** When placing text on a translucent tinted badge (`rgba(accent, 0.12)`), compute contrast against the **composited** background color over `--surface-1` and pair it with high-contrast text (`--ink-1` or darkened semantic accent), never low-contrast muted ink.
4. **Placeholder & Muted Text Overuse:** Never put critical labels, form errors, or primary table columns in `--ink-3` / `text-muted-foreground` if it sits below `4.5:1`.
5. **Disabled vs. Low-Contrast Confusion:** Truly disabled controls may use reduced opacity (`0.45–0.55`) *only* when non-interactive and paired with `cursor-not-allowed`; never make active secondary buttons look disabled.

## 3. Deterministic Verification Workflow
Run the bundled zero-dependency contrast engine before finalizing any theme or component:

```bash
# Audit an entire repo's CSS variables & theme tokens (WCAG 2.1 + APCA Lc)
node packages/taste-linter/bin/taste-lint.mjs [target-dir]

# Check any single proposed foreground/background hex pair in <20ms
node packages/taste-linter/bin/taste-lint.mjs --check "#6b8077" "#101815"
```

If any pair fails, apply the linter's suggested hue-preserving lightness fix (or adjust lightness in OKLCH while preserving hue) and re-run until `0 errors`.
