---
name: ui-typography-styles
description: Select curated font pairings, responsive type scales, and structural style archetypes (Linear Precision, Calm OS, Swiss Sharp, Editorial, Dense Ops, Warm Tactile) for any web or native UI framework.
---

# Curated Typography & Style Archetypes Skill

Use this skill whenever choosing fonts, defining a type scale, or switching visual posture across any UI framework (React, Vue, Svelte, Angular, Solid, Vanilla CSS, React Native, Flutter, SwiftUI).

## 1. Curated Font Pairings (Never Default to Generic Arial/Roboto)

| Pairing ID | Display + Body + Mono | Best For |
| :--- | :--- | :--- |
| `geometric` | `Plus Jakarta Sans` + `Inter` + `JetBrains Mono` | Modern SaaS, dashboards, everyday web apps |
| `mono-accent` | `Inter` + `Inter` + `JetBrains Mono` | Developer tools, issue trackers, Linear/Vercel precision |
| `swiss-grotesk` | `Space Grotesk` + `DM Sans` + `IBM Plex Mono` | Technical products, fintech, hardware, architectural UI |
| `editorial` | `Instrument Serif` + `Inter` + `JetBrains Mono` | Flagship marketing, publishing, design studios |
| `humanist-warm` | `Fraunces` + `Plus Jakarta Sans` + `JetBrains Mono` | Consumer apps, e-commerce, warm brand experiences |
| `dense-ops` | `IBM Plex Sans` + `IBM Plex Sans` + `IBM Plex Mono` | Financial tables, observability, enterprise ops (`11–13px`) |
| `neo-studio` | `Outfit` + `DM Sans` + `Fira Code` | Startups, creative tools, interactive studios |
| `newsprint-docs` | `Newsreader` + `Source Sans 3` + `JetBrains Mono` | Documentation portals, wikis, long-form reading |
| `terminal-craft` | `IBM Plex Mono` + `Inter` + `IBM Plex Mono` | CLI companions, infra/cloud consoles, security tools |
| `system` | `-apple-system` / `SF Pro` / `Segoe UI` + `SF Mono` | Zero-latency native apps & desktop-class utilities |

If `taste-mcp` is connected, call `pick_typography_and_style({ mood })` to fetch exact Google Fonts URLs, CSS stacks, and matching Craft Dial presets dynamically.

## 2. Six Structural Style Archetypes (Color-Agnostic)
Choose one coherent posture per app and keep it consistent across every screen:
1. **Linear Precision:** Balanced density (`36px` controls), `10px` concentric radius, `1px` hairlines, subtle spring physics (`420 / 32`).
2. **Calm Native OS:** Airy density (`42px`), `14px` concentric radius, soft ambient shadow, native system font stack.
3. **Swiss Architectural:** Crisp `4px` radius, strong hairlines (`1.35x`), zero blur shadow, tight negative heading tracking (`-0.038em`).
4. **Editorial Publishing:** Generous whitespace, serif display (`Instrument Serif` / `Newsreader`), quiet dividers, `60–68ch` prose measure.
5. **High-Density Ops / Finance:** Compact (`32px`), `6px` radius, instant zero-delay transitions, tabular `IBM Plex Mono` numbers everywhere.
6. **Warm Consumer Tactile:** Airy spacing, `16px` radius, tactile press compression (`scale(0.965)`), layered soft elevation.

## 3. Non-Negotiable Type Rules
- Always enforce `font-variant-numeric: tabular-nums` on prices, KPIs, counters, timestamps, and table columns.
- Apply `text-wrap: balance` on headings (`h1–h3`) and `text-wrap: pretty` on paragraphs.
- Keep body measure between `55ch–70ch`; tighten display tracking (`-0.02em` to `-0.035em`) on headings `>= 22px` and widen uppercase micro-labels (`+0.05em` to `+0.08em`).
