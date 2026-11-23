---
name: ui-prototype
description: Prototype 3-4 genuinely distinct, interactive, color-agnostic UI/UX variants side-by-side with live state, Break-UI stress data, and 390px mobile preview so the user can feel and choose the best UX before committing.
---

# Interactive Side-by-Side UI/UX Prototyping Skill

Use this skill when exploring a new component, flow, or screen architecture where the best UX choice isn't obvious on paper.

## 1. Prototyping Principles
- **Real Interaction, Not Static Mocks:** Every variant must be clickable, typeable, toggleable, or keyboard-navigable with realistic state transitions (hover, focus, press, loading, empty, error).
- **Structural Contrast Between Variants:** Vary the *UX model* (e.g., Centered Dialog vs. Right Drawer vs. Inline Pop-Confirm; Horizontal Stepper vs. Slim Progress Flow vs. Single-Question Focus), never just cosmetic colors.
- **100% Color-Agnostic:** Build every prototype strictly on semantic CSS tokens (`--surface-0..2`, `--ink-1..3`, `--border-subtle/strong`, `--accent`, `--accent-ink`, `--danger`, `--success`) so the user judges layout, density, hierarchy, and motion independently of brand hues.

## 2. Adversarial Stress Checks (Always Include)
Wire two quick switches into any prototype stage:
1. **`Break UI` Toggle:** Injects 140-character titles, unbreakable mono slugs (`prod_us_east_2_replica_shard_00481920`), huge tabular numbers (`$98,412,900.00`), 0-item empty states, and inline error banners to prove the layout never clips or overflows.
2. **`390px` Mobile Toggle:** Constrains each variant card to a `390px` mobile column to catch horizontal scroll traps, cramped toolbars, and undersized tap targets (`< 40–44px`).

## 3. Capture Decision Back into `TASTE.md`
Once the user picks a winner (or primary + secondary patterns):
- Record the chosen pattern(s), **when to use each**, and **what to never do** back into `TASTE.md` (or `taste/taste.json` via Taste Lab) so future sessions inherit the exact decision automatically.
