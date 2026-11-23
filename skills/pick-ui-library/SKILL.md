---
name: pick-ui-library
description: Choose the single best accessible, source-owned UI component library or primitive stack for ANY UI framework (React, Vue, Svelte, Angular, Solid, Vanilla/Web Components, React Native, Flutter, SwiftUI) instead of hand-rolling complex primitives.
---

# Universal Multi-Framework UI Library & Registry Picker Skill

Never hand-roll focus traps, portals, roving tabindex, drag-and-drop physics, virtualized lists, or accessible drawers from scratch when a proven primitive exists for your target framework.

## Step 1: Detect the Repo's Framework & Existing Primitives First
Inspect `package.json`, `pubspec.yaml`, `Package.swift`, `angular.json`, `svelte.config.*`, `nuxt.config.*`, or `components.json`.
- If `taste-mcp` is connected, call `recommend_ui_stack({ framework, need })` directly.
- Reuse existing wrappers in `components/ui/` before adding new dependencies.
- Never mix competing headless layers in the same app (e.g., don't add Radix dialogs into a Base UI app).

## Step 2: Universal Multi-Framework Decision Matrix

| Framework | Accessible Foundations | Key Specialists (Toasts, Tables, Drawers, Motion) | Token Format |
| :--- | :--- | :--- | :--- |
| **React / Next.js / Vite** | **`@base-ui/react`** + **`@coss`** (or `shadcn/ui` v4 matching existing repo) | `sonner`, `cmdk`, `@base-ui/react` Drawer / `vaul`, `@tanstack/react-table`, `@number-flow/react`, **`@diceui`** (filters/steppers/upload), **`@kibo-ui`** (kanban/calendars), `motion` + `@motion-primitives`, `streamdown` (AI), `21st MCP` | `tailwind-v4` / `shadcn` / `css` |
| **Vue 3 / Nuxt** | **`Reka UI`** + **`shadcn-vue`** (or **`Nuxt UI v3`**) | `vue-sonner`, `vaul-vue`, `@tanstack/vue-table`, `@number-flow/vue`, `motion-v` | `tailwind-v4` / `css` |
| **Svelte 5 / SvelteKit** | **`Bits UI`** + **`shadcn-svelte`** (or **`Melt UI`**) | `svelte-sonner`, `vaul-svelte`, `@tanstack/svelte-table`, `@number-flow/svelte`, `svelte/motion` | `tailwind-v4` / `css` |
| **Angular 19+** | **`Spartan UI`** (`spartan-ng` Brain + Tailwind) or Angular CDK + Material 3 | `ngx-sonner`, `@tanstack/angular-table`, CSS `@starting-style` / Web Animations | `css` / `tailwind-v4` |
| **SolidJS** | **`Kobalte`** + **`Corvu`** (or `solid-ui`) | `solid-sonner`, `corvu` Drawer, `@tanstack/solid-table` | `tailwind-v4` / `css` |
| **Vanilla HTML / Astro / HTMX / Web Components** | **Web Awesome (Shoelace)** or native `<dialog>`, HTML `popover`, CSS Anchor Positioning | Native `<dialog>` + `@starting-style`, View Transitions API | `css` |
| **React Native / Expo** | **React Native Reusables** (`rn-primitives`) + **NativeWind v4 / Uniwind** | `@gorhom/bottom-sheet`, `burnt` / `sonner-native`, `react-native-reanimated`, `@shopify/flash-list` | `react-native` |
| **Flutter** | **`forui`** or **`shadcn_ui`** (Flutter) + custom `ThemeExtension` semantic tokens | `toastification`, `wolt_modal_sheet`, `flutter_animate` | `flutter` |
| **SwiftUI** | Native SwiftUI primitives + semantic `Color` / `ViewModifier` design tokens | `.sheet` + `.presentationDetents`, `.spring(duration:bounce:)`, `matchedGeometryEffect` | `swiftui` |

## Step 3: Post-Install Adaptation (Mandatory)
Every installed primitive must be immediately restyled onto the project's semantic color tokens (`--surface-*`, `--ink-*`, `--border-*`, `--accent`, `--danger`) generated/verified with WCAG + APCA contrast math, and aligned to the calibrated `TASTE.md` Craft Dials.
