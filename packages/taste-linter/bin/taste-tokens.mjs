#!/usr/bin/env node
/**
 * taste-tokens — Universal Multi-Framework Accessible Theme & Color Scale Generator
 *
 * Generates WCAG 2.1 AA + APCA Lc verified light & dark semantic palettes from any
 * brand hex color for CSS, Tailwind v4, shadcn, Flutter, SwiftUI, React Native, or W3C DTCG JSON.
 *
 * Usage:
 *   node packages/taste-linter/bin/taste-tokens.mjs --brand "#2563eb" --format tailwind-v4
 *   node packages/taste-linter/bin/taste-tokens.mjs --brand "#10b981" --format flutter
 *   node packages/taste-linter/bin/taste-tokens.mjs --scale "#7c3aed"
 */

import {
  formatThemeForFramework,
  generateAccessibleTheme,
  generateColorScale,
} from '../lib/color-engine.mjs';

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
};

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
taste-tokens — Accessible Theme & Contrast-Safe Palette Generator

Options:
  --brand <hex>       Seed brand color (e.g. "#2563eb", "#10b981")
  --format <target>   css | tailwind-v4 | shadcn | flutter | swiftui | react-native | dtcg-json
  --neutral           Keep neutral surfaces pure grayscale (no subtle brand tint)
  --scale <hex>       Generate a 50-950 contrast-annotated ramp for a single color
  --json              Output full JSON payload with WCAG 2.1 + APCA Lc audit table
`);
  process.exit(0);
}

const scaleHex = getArg('--scale', null);
if (scaleHex) {
  const scale = generateColorScale(scaleHex);
  if (args.includes('--json')) {
    console.log(JSON.stringify({ base: scaleHex, scale }, null, 2));
  } else {
    console.log(`\nContrast-Safe Scale for ${scaleHex}:`);
    for (const s of scale) {
      console.log(
        `  ${String(s.step).padStart(3)}  ${s.hex}  -> ink ${s.recommendedInk}  (WCAG ${s.wcagWithInk}:1 · Lc ${s.apcaWithInk}) ${s.safeForButtons ? '✓ CTA-safe' : '· subtle fill'}`,
      );
    }
    console.log('');
  }
  process.exit(0);
}

const brand = getArg('--brand', '#2563eb');
const format = getArg('--format', 'css');
const tintedNeutrals = !args.includes('--neutral');

const light = generateAccessibleTheme(brand, 'light', { tintedNeutrals });
const dark = generateAccessibleTheme(brand, 'dark', { tintedNeutrals });
const code = formatThemeForFramework(light, dark, format);

if (args.includes('--json')) {
  console.log(JSON.stringify({ brand, format, light, dark, code }, null, 2));
} else {
  console.log(code);
}
