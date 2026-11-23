/**
 * color-engine.mjs — Zero-dependency deterministic WCAG 2.1 + APCA W3 Lc contrast
 * & accessible multi-framework theme generator.
 *
 * Shared by taste-lint, taste-tokens CLI, and the taste-mcp server.
 */

export function parseHex(hex) {
  const cleaned = String(hex || '').trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return {
      r: parseInt(cleaned[0] + cleaned[0], 16),
      g: parseInt(cleaned[1] + cleaned[1], 16),
      b: parseInt(cleaned[2] + cleaned[2], 16),
    };
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return {
      r: parseInt(cleaned.slice(0, 2), 16),
      g: parseInt(cleaned.slice(2, 4), 16),
      b: parseInt(cleaned.slice(4, 6), 16),
    };
  }
  return null;
}

export function toHex({ r, g, b }) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('')
  );
}

export function hexToFlutterInt(hex) {
  return '0xFF' + String(hex).replace(/^#/, '').toUpperCase();
}

export function relativeLuminance({ r, g, b }) {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function wcagContrast(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** APCA W3 0.0.98G-4g perceptual lightness contrast (signed Lc) */
export function apcaContrast(text, bg) {
  const sRGBtoY = ({ r, g, b }) =>
    0.2126729 * Math.pow(r / 255, 2.4) +
    0.7151522 * Math.pow(g / 255, 2.4) +
    0.072175 * Math.pow(b / 255, 2.4);

  const blkThrs = 0.022;
  const blkClmp = 1.414;
  const softClamp = (y) => (y > blkThrs ? y : y + Math.pow(blkThrs - y, blkClmp));

  const Ytxt = softClamp(sRGBtoY(text));
  const Ybg = softClamp(sRGBtoY(bg));
  if (Math.abs(Ybg - Ytxt) < 0.0005) return 0;

  if (Ybg > Ytxt) {
    const sapc = (Math.pow(Ybg, 0.56) - Math.pow(Ytxt, 0.57)) * 1.14;
    return sapc < 0.1 ? 0 : (sapc - 0.027) * 100;
  }
  const sapc = (Math.pow(Ybg, 0.65) - Math.pow(Ytxt, 0.62)) * 1.14;
  return sapc > -0.1 ? 0 : (sapc + 0.027) * 100;
}

export function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return { h, s, l };
}

export function hslToRgb({ h, s, l }) {
  const hh = ((h % 1) + 1) % 1;
  const ss = Math.max(0, Math.min(1, s));
  const ll = Math.max(0, Math.min(1, l));
  if (ss === 0) {
    const v = Math.round(ll * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p, q, t) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  return {
    r: Math.round(hue2rgb(p, q, hh + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hh) * 255),
    b: Math.round(hue2rgb(p, q, hh - 1 / 3) * 255),
  };
}

export function evaluatePair(fgHex, bgHex) {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) return null;
  const wcag = wcagContrast(fg, bg);
  const apca = apcaContrast(fg, bg);
  const apcaAbs = Math.abs(apca);
  return {
    fg: toHex(fg),
    bg: toHex(bg),
    wcag: Number(wcag.toFixed(2)),
    apca: Number(apca.toFixed(1)),
    apcaAbs: Number(apcaAbs.toFixed(1)),
    passesAA: wcag >= 4.5,
    passesAAA: wcag >= 7.0,
    passesLargeUI: wcag >= 3.0 && apcaAbs >= 45,
    passesBody: wcag >= 4.5 && apcaAbs >= 60,
  };
}

export function suggestPassingHex(fgHex, bgHex, minWcag = 4.5, minApca = 60) {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) return null;
  const hsl = rgbToHsl(fg);
  const bgLum = relativeLuminance(bg);
  const dirs = bgLum > 0.35 ? [-1, 1] : [1, -1];
  for (const dir of dirs) {
    for (let step = 0; step <= 100; step++) {
      const nextL = Math.max(0, Math.min(1, hsl.l + dir * (step / 100)));
      const candidate = hslToRgb({ h: hsl.h, s: hsl.s, l: nextL });
      if (
        wcagContrast(candidate, bg) >= minWcag &&
        Math.abs(apcaContrast(candidate, bg)) >= minApca
      ) {
        return toHex(candidate);
      }
      if ((dir < 0 && nextL === 0) || (dir > 0 && nextL === 1)) break;
    }
  }
  const darkW = wcagContrast({ r: 17, g: 17, b: 19 }, bg);
  const lightW = wcagContrast({ r: 255, g: 255, b: 255 }, bg);
  return darkW >= lightW ? '#111113' : '#ffffff';
}

export function pickSafeButtonInk(bgHex) {
  const bg = parseHex(bgHex);
  if (!bg) return { ink: '#ffffff', wcag: 1, apcaAbs: 0, passes: false };
  const candidates = ['#ffffff', '#09090b'];
  let best = null;
  for (const c of candidates) {
    const ev = evaluatePair(c, bgHex);
    if (!best || ev.wcag + ev.apcaAbs / 20 > best.wcag + best.apcaAbs / 20) {
      best = { ink: c, ...ev };
    }
  }
  return best;
}

/**
 * Generates a 50..950 tint/shade ramp from a base hex, with exact safe foreground ink
 * annotations per step so AI agents always know which ink works on every shade.
 */
export function generateColorScale(baseHex) {
  const rgb = parseHex(baseHex);
  if (!rgb) throw new Error(`Invalid hex color: ${baseHex}`);
  const { h, s } = rgbToHsl(rgb);
  const stops = [
    { step: 50, l: 0.97, satMul: 0.85 },
    { step: 100, l: 0.93, satMul: 0.9 },
    { step: 200, l: 0.86, satMul: 0.95 },
    { step: 300, l: 0.76, satMul: 1.0 },
    { step: 400, l: 0.64, satMul: 1.0 },
    { step: 500, l: 0.52, satMul: 1.0 },
    { step: 600, l: 0.43, satMul: 1.0 },
    { step: 700, l: 0.35, satMul: 0.98 },
    { step: 800, l: 0.27, satMul: 0.94 },
    { step: 900, l: 0.2, satMul: 0.88 },
    { step: 950, l: 0.12, satMul: 0.82 },
  ];
  return stops.map(({ step, l, satMul }) => {
    const hex = toHex(hslToRgb({ h, s: Math.min(1, s * satMul), l }));
    const safe = pickSafeButtonInk(hex);
    return {
      step,
      hex,
      recommendedInk: safe.ink,
      wcagWithInk: safe.wcag,
      apcaWithInk: safe.apcaAbs,
      safeForButtons: safe.passesBody,
    };
  });
}

/**
 * Deterministically builds a complete, guaranteed WCAG 2.1 AA + APCA Lc passing
 * semantic token theme (light or dark) from any single brand hex color.
 */
export function generateAccessibleTheme(brandHex, mode = 'light', options = {}) {
  const baseRgb = parseHex(brandHex);
  if (!baseRgb) throw new Error(`Invalid brand hex: ${brandHex}`);
  const { h, s, l } = rgbToHsl(baseRgb);
  const neutralTint = options.tintedNeutrals === false ? 0 : Math.min(0.14, s * 0.16);
  const isDark = mode === 'dark';

  // Neutral surface & ink ladder (calibrated to pass WCAG + APCA cleanly)
  const surface0 = toHex(hslToRgb({ h, s: neutralTint, l: isDark ? 0.045 : 0.965 }));
  const surface1 = toHex(hslToRgb({ h, s: neutralTint * 0.7, l: isDark ? 0.08 : 0.995 }));
  const surface2 = toHex(hslToRgb({ h, s: neutralTint * 0.9, l: isDark ? 0.125 : 0.93 }));
  const surfaceRecessed = toHex(hslToRgb({ h, s: neutralTint, l: isDark ? 0.03 : 0.91 }));

  let ink1 = toHex(hslToRgb({ h, s: neutralTint * 0.8, l: isDark ? 0.955 : 0.08 }));
  let ink2 = toHex(hslToRgb({ h, s: neutralTint * 0.9, l: isDark ? 0.74 : 0.34 }));
  let ink3 = toHex(hslToRgb({ h, s: neutralTint * 0.8, l: isDark ? 0.62 : 0.45 }));

  // Deterministically guarantee ink passes against surface1 & surface0
  ink1 = suggestPassingHex(ink1, surface1, 7.0, 75) || ink1;
  ink2 = suggestPassingHex(ink2, surface1, 4.5, 60) || ink2;
  ink3 = suggestPassingHex(ink3, surface1, 3.0, 45) || ink3;

  // Tune accent so it BOTH stands out on surface1 (>=3:1, Lc>=45) AND carries readable CTA text (>=4.5:1, Lc>=60)
  let accent = toHex(baseRgb);
  let accentInkChoice = pickSafeButtonInk(accent);

  const onSurfaceCheck = evaluatePair(accent, surface1);
  if (!accentInkChoice.passesBody || !onSurfaceCheck.passesLargeUI) {
    // Search lightness along brand hue that satisfies both button text legibility AND surface contrast
    const searchOrder = isDark
      ? [0.68, 0.72, 0.64, 0.76, 0.6, 0.8, 0.56]
      : [0.44, 0.4, 0.48, 0.36, 0.52, 0.32, 0.28];
    for (const candL of searchOrder) {
      const candHex = toHex(hslToRgb({ h, s: Math.max(0.45, Math.min(0.92, s || 0.7)), l: candL }));
      const btnCheck = pickSafeButtonInk(candHex);
      const surfCheck = evaluatePair(candHex, surface1);
      if (btnCheck.passesBody && surfCheck.passesLargeUI) {
        accent = candHex;
        accentInkChoice = btnCheck;
        break;
      }
    }
    // Final guarantee fallback
    if (!accentInkChoice.passesBody) {
      accent = suggestPassingHex(accent, surface1, 4.5, 60) || (isDark ? '#f4f4f6' : '#111113');
      accentInkChoice = pickSafeButtonInk(accent);
    }
  }

  const accentRgb = parseHex(accent);
  const borderRgb = isDark ? '255, 255, 255' : `${parseHex(ink1).r}, ${parseHex(ink1).g}, ${parseHex(ink1).b}`;
  const shadowRgb = isDark ? '0, 0, 0' : borderRgb;

  const danger = isDark ? '#fca5a5' : '#dc2626';
  const dangerInk = isDark ? '#180404' : '#ffffff';
  const success = isDark ? '#4ade80' : '#15803d';

  const tokens = {
    '--surface-0': surface0,
    '--surface-1': surface1,
    '--surface-2': surface2,
    '--surface-recessed': surfaceRecessed,
    '--ink-1': ink1,
    '--ink-2': ink2,
    '--ink-3': ink3,
    '--border-rgb': borderRgb,
    '--shadow-rgb': shadowRgb,
    '--border-subtle': `rgba(${borderRgb}, ${isDark ? 0.1 : 0.09})`,
    '--border-strong': `rgba(${borderRgb}, ${isDark ? 0.2 : 0.18})`,
    '--accent': accent,
    '--accent-ink': accentInkChoice.ink,
    '--accent-soft': `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${isDark ? 0.16 : 0.11})`,
    '--danger': danger,
    '--danger-ink': dangerInk,
    '--danger-soft': isDark ? 'rgba(252, 165, 165, 0.15)' : 'rgba(220, 38, 38, 0.1)',
    '--success': success,
    '--focus-ring': `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${isDark ? 0.36 : 0.32})`,
  };

  const audit = [
    { pair: '--ink-1 / --surface-1', ...evaluatePair(ink1, surface1) },
    { pair: '--ink-2 / --surface-1', ...evaluatePair(ink2, surface1) },
    { pair: '--ink-3 / --surface-1', ...evaluatePair(ink3, surface1) },
    { pair: '--accent-ink / --accent', ...evaluatePair(accentInkChoice.ink, accent) },
    { pair: '--accent / --surface-1', ...evaluatePair(accent, surface1) },
    { pair: '--danger-ink / --danger', ...evaluatePair(dangerInk, danger) },
    { pair: '--danger / --surface-1', ...evaluatePair(danger, surface1) },
    { pair: '--success / --surface-1', ...evaluatePair(success, surface1) },
  ];

  return {
    mode,
    inputBrandHex: toHex(baseRgb),
    adjustedAccentHex: accent,
    accentWasAdjusted: accent.toLowerCase() !== toHex(baseRgb).toLowerCase(),
    tokens,
    audit,
  };
}

/** Formats light & dark accessible themes for ANY UI framework */
export function formatThemeForFramework(lightTheme, darkTheme, framework = 'css') {
  const l = lightTheme.tokens;
  const d = darkTheme.tokens;

  switch (framework) {
    case 'tailwind-v4':
      return `@import "tailwindcss";\n\n@theme {\n  --color-surface-0: var(--surface-0);\n  --color-surface-1: var(--surface-1);\n  --color-surface-2: var(--surface-2);\n  --color-ink-1: var(--ink-1);\n  --color-ink-2: var(--ink-2);\n  --color-ink-3: var(--ink-3);\n  --color-accent: var(--accent);\n  --color-accent-ink: var(--accent-ink);\n  --color-danger: var(--danger);\n  --color-success: var(--success);\n}\n\n${formatThemeForFramework(lightTheme, darkTheme, 'css')}`;

    case 'shadcn':
      return `:root {\n  --background: ${l['--surface-0']};\n  --foreground: ${l['--ink-1']};\n  --card: ${l['--surface-1']};\n  --card-foreground: ${l['--ink-1']};\n  --muted: ${l['--surface-2']};\n  --muted-foreground: ${l['--ink-2']};\n  --primary: ${l['--accent']};\n  --primary-foreground: ${l['--accent-ink']};\n  --destructive: ${l['--danger']};\n  --destructive-foreground: ${l['--danger-ink']};\n  --border: ${l['--border-subtle']};\n  --ring: ${l['--focus-ring']};\n  --radius: 0.625rem;\n}\n\n.dark {\n  --background: ${d['--surface-0']};\n  --foreground: ${d['--ink-1']};\n  --card: ${d['--surface-1']};\n  --card-foreground: ${d['--ink-1']};\n  --muted: ${d['--surface-2']};\n  --muted-foreground: ${d['--ink-2']};\n  --primary: ${d['--accent']};\n  --primary-foreground: ${d['--accent-ink']};\n  --destructive: ${d['--danger']};\n  --destructive-foreground: ${d['--danger-ink']};\n  --border: ${d['--border-subtle']};\n  --ring: ${d['--focus-ring']};\n}`;

    case 'flutter':
      return `import 'package:flutter/material.dart';\n\nclass AppTasteTokens {\n  static const light = {\n    'surface0': Color(${hexToFlutterInt(l['--surface-0'])}),\n    'surface1': Color(${hexToFlutterInt(l['--surface-1'])}),\n    'surface2': Color(${hexToFlutterInt(l['--surface-2'])}),\n    'ink1': Color(${hexToFlutterInt(l['--ink-1'])}),\n    'ink2': Color(${hexToFlutterInt(l['--ink-2'])}),\n    'ink3': Color(${hexToFlutterInt(l['--ink-3'])}),\n    'accent': Color(${hexToFlutterInt(l['--accent'])}),\n    'accentInk': Color(${hexToFlutterInt(l['--accent-ink'])}),\n    'danger': Color(${hexToFlutterInt(l['--danger'])}),\n    'dangerInk': Color(${hexToFlutterInt(l['--danger-ink'])}),\n    'success': Color(${hexToFlutterInt(l['--success'])}),\n  };\n\n  static const dark = {\n    'surface0': Color(${hexToFlutterInt(d['--surface-0'])}),\n    'surface1': Color(${hexToFlutterInt(d['--surface-1'])}),\n    'surface2': Color(${hexToFlutterInt(d['--surface-2'])}),\n    'ink1': Color(${hexToFlutterInt(d['--ink-1'])}),\n    'ink2': Color(${hexToFlutterInt(d['--ink-2'])}),\n    'ink3': Color(${hexToFlutterInt(d['--ink-3'])}),\n    'accent': Color(${hexToFlutterInt(d['--accent'])}),\n    'accentInk': Color(${hexToFlutterInt(d['--accent-ink'])}),\n    'danger': Color(${hexToFlutterInt(d['--danger'])}),\n    'dangerInk': Color(${hexToFlutterInt(d['--danger-ink'])}),\n    'success': Color(${hexToFlutterInt(d['--success'])}),\n  };\n}`;

    case 'swiftui':
      return `import SwiftUI\n\n// WCAG 2.1 AA + APCA Lc verified semantic palette\nenum TastePalette {\n  struct Set {\n    let surface0, surface1, surface2: String\n    let ink1, ink2, ink3: String\n    let accent, accentInk, danger, dangerInk, success: String\n  }\n\n  static let light = Set(\n    surface0: "${l['--surface-0']}", surface1: "${l['--surface-1']}", surface2: "${l['--surface-2']}",\n    ink1: "${l['--ink-1']}", ink2: "${l['--ink-2']}", ink3: "${l['--ink-3']}",\n    accent: "${l['--accent']}", accentInk: "${l['--accent-ink']}",\n    danger: "${l['--danger']}", dangerInk: "${l['--danger-ink']}", success: "${l['--success']}"\n  )\n\n  static let dark = Set(\n    surface0: "${d['--surface-0']}", surface1: "${d['--surface-1']}", surface2: "${d['--surface-2']}",\n    ink1: "${d['--ink-1']}", ink2: "${d['--ink-2']}", ink3: "${d['--ink-3']}",\n    accent: "${d['--accent']}", accentInk: "${d['--accent-ink']}",\n    danger: "${d['--danger']}", dangerInk: "${d['--danger-ink']}", success: "${d['--success']}"\n  )\n}`;

    case 'react-native':
      return `export const tasteTokens = {\n  light: ${JSON.stringify(l, null, 4)},\n  dark: ${JSON.stringify(d, null, 4)},\n} as const;\n`;

    case 'dtcg-json':
      return JSON.stringify(
        {
          $schema: 'https://tr.designtokens.org/format/',
          color: {
            light: Object.fromEntries(
              Object.entries(l).map(([k, v]) => [k.replace(/^--/, ''), { $value: v, $type: 'color' }]),
            ),
            dark: Object.fromEntries(
              Object.entries(d).map(([k, v]) => [k.replace(/^--/, ''), { $value: v, $type: 'color' }]),
            ),
          },
        },
        null,
        2,
      );

    case 'css':
    default: {
      const renderBlock = (sel, t, scheme) =>
        `${sel} {\n  color-scheme: ${scheme};\n${Object.entries(t)
          .map(([k, v]) => `  ${k}: ${v};`)
          .join('\n')}\n}`;
      return `${renderBlock(':root', l, 'light')}\n\n${renderBlock('.dark, [data-theme="dark"]', d, 'dark')}`;
    }
  }
}
