#!/usr/bin/env node
/**
 * taste-lint — Zero-dependency deterministic WCAG 2.1 + APCA Lc Contrast & UI Taste Linter
 *
 * Usage:
 *   node packages/taste-linter/bin/taste-lint.mjs [targetDir] [--strict] [--json]
 *   node packages/taste-linter/bin/taste-lint.mjs --check #fgHex #bgHex
 */

import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Color Math: sRGB -> WCAG 2.1 Contrast & APCA W3 0.0.98G-4g Lc
// ---------------------------------------------------------------------------

function parseHex(hex) {
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

function toHex({ r, g, b }) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('')
  );
}

function relativeLuminance({ r, g, b }) {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function wcagContrast(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function apcaContrast(text, bg) {
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

function rgbToHsl({ r, g, b }) {
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

function hslToRgb({ h, s, l }) {
  if (s === 0) {
    const v = Math.round(l * 255);
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
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function suggestPassingHex(fgHex, bgHex, minWcag = 4.5, minApca = 60) {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) return null;
  const hsl = rgbToHsl(fg);
  const bgLum = relativeLuminance(bg);
  const dirs = bgLum > 0.35 ? [-1, 1] : [1, -1];
  for (const dir of dirs) {
    for (let step = 1; step <= 100; step++) {
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

// ---------------------------------------------------------------------------
// Direct CLI Mode: --check <fgHex> <bgHex>
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const checkIdx = args.indexOf('--check');
if (checkIdx !== -1) {
  const fgHex = args[checkIdx + 1];
  const bgHex = args[checkIdx + 2];
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) {
    console.error('Usage: taste-lint --check #fgHex #bgHex');
    process.exit(2);
  }
  const wcag = wcagContrast(fg, bg);
  const apca = apcaContrast(fg, bg);
  const apcaAbs = Math.abs(apca);
  const bodyPass = wcag >= 4.5 && apcaAbs >= 60;
  const uiPass = wcag >= 3.0 && apcaAbs >= 45;
  const suggested = bodyPass ? null : suggestPassingHex(fgHex, bgHex, 4.5, 60);

  if (args.includes('--json')) {
    console.log(
      JSON.stringify(
        {
          fg: fgHex,
          bg: bgHex,
          wcag: Number(wcag.toFixed(2)),
          apca: Number(apca.toFixed(1)),
          passesAA: wcag >= 4.5,
          passesAAA: wcag >= 7.0,
          passesLargeUI: uiPass,
          passesBody: bodyPass,
          suggestedFg: suggested,
        },
        null,
        2,
      ),
    );
  } else {
    console.log(`Contrast Check: ${fgHex} on ${bgHex}`);
    console.log(`  WCAG 2.1 : ${wcag.toFixed(2)}:1  (AA Body >=4.5:1: ${wcag >= 4.5 ? 'PASS' : 'FAIL'} | AAA >=7.0:1: ${wcag >= 7 ? 'PASS' : 'FAIL'})`);
    console.log(`  APCA Lc  : ${apca.toFixed(1)}  (|Lc| >=60 Body: ${apcaAbs >= 60 ? 'PASS' : 'FAIL'} | |Lc| >=45 UI: ${apcaAbs >= 45 ? 'PASS' : 'FAIL'})`);
    if (suggested) {
      console.log(`  Fix      : Adjust foreground to ${suggested} (passes >=4.5:1 & |Lc|>=60)`);
    }
  }
  process.exit(bodyPass ? 0 : 1);
}

// ---------------------------------------------------------------------------
// Directory Walk & Audits
// ---------------------------------------------------------------------------

const jsonMode = args.includes('--json');
const strictMode = args.includes('--strict');
const targetArg = args.find((a) => !a.startsWith('-')) || process.cwd();
const rootDir = path.resolve(targetArg);

const IGNORE_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  '.next',
  '.git',
  '.turbo',
  'coverage',
]);

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (/\.(tsx|jsx|ts|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const SEMANTIC_PAIRS = [
  // Taste System tokens
  { fg: '--ink-1', bg: '--surface-0', minWcag: 4.5, minApca: 60, label: 'Primary text on Canvas' },
  { fg: '--ink-1', bg: '--surface-1', minWcag: 4.5, minApca: 60, label: 'Primary text on Card' },
  { fg: '--ink-1', bg: '--surface-2', minWcag: 4.5, minApca: 60, label: 'Primary text on Elevated' },
  { fg: '--ink-2', bg: '--surface-1', minWcag: 4.5, minApca: 60, label: 'Secondary text on Card' },
  { fg: '--ink-2', bg: '--surface-0', minWcag: 4.5, minApca: 60, label: 'Secondary text on Canvas' },
  { fg: '--ink-3', bg: '--surface-1', minWcag: 3.0, minApca: 45, label: 'Muted metadata on Card' },
  { fg: '--accent-ink', bg: '--accent', minWcag: 4.5, minApca: 60, label: 'Primary CTA text on Accent' },
  { fg: '--accent', bg: '--surface-1', minWcag: 3.0, minApca: 45, label: 'Accent control on Card' },
  { fg: '--danger-ink', bg: '--danger', minWcag: 4.5, minApca: 60, label: 'Destructive CTA text' },
  { fg: '--danger', bg: '--surface-1', minWcag: 4.5, minApca: 55, label: 'Error text on Card' },
  { fg: '--success', bg: '--surface-1', minWcag: 3.0, minApca: 45, label: 'Success indicator on Card' },
  // Common shadcn/Tailwind semantic hex pairs
  { fg: '--foreground', bg: '--background', minWcag: 4.5, minApca: 60, label: 'Foreground on Background' },
  { fg: '--card-foreground', bg: '--card', minWcag: 4.5, minApca: 60, label: 'Card foreground on Card' },
  { fg: '--primary-foreground', bg: '--primary', minWcag: 4.5, minApca: 60, label: 'Primary CTA contrast' },
  { fg: '--muted-foreground', bg: '--background', minWcag: 4.5, minApca: 55, label: 'Muted text on Background' },
  { fg: '--destructive-foreground', bg: '--destructive', minWcag: 4.5, minApca: 60, label: 'Destructive CTA contrast' },
];

function extractTokenBlocks(filePath, content) {
  const blocks = [];
  if (filePath.endsWith('.css')) {
    const cssBlockRe = /([^{}]+)\{([^{}]+)\}/g;
    let m;
    while ((m = cssBlockRe.exec(content)) !== null) {
      const selector = m[1].trim().replace(/\s+/g, ' ');
      const body = m[2];
      const tokens = {};
      const varRe = /(--[a-zA-Z0-9_-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\b/g;
      let vm;
      while ((vm = varRe.exec(body)) !== null) {
        tokens[vm[1]] = vm[2];
      }
      if (Object.keys(tokens).length >= 2) {
        blocks.push({ name: selector, tokens });
      }
    }
  } else if (/themes?\.(ts|tsx|js)$/.test(filePath)) {
    const objRe = /id:\s*['"]([^'"]+)['"][\s\S]*?tokens:\s*\{([\s\S]*?)\}/g;
    let m;
    while ((m = objRe.exec(content)) !== null) {
      const themeName = m[1];
      const body = m[2];
      const tokens = {};
      const varRe = /['"](--[a-zA-Z0-9_-]+)['"]\s*:\s*['"](#[0-9a-fA-F]{3,6})['"]/g;
      let vm;
      while ((vm = varRe.exec(body)) !== null) {
        tokens[vm[1]] = vm[2];
      }
      if (Object.keys(tokens).length >= 2) {
        blocks.push({ name: `theme:${themeName}`, tokens });
      }
    }
  }
  return blocks;
}

const errors = [];
const warnings = [];
let contrastPairsChecked = 0;

const files = walkFiles(rootDir);

for (const file of files) {
  const rel = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf8');

  // 1. Deterministic Contrast Check on Theme / CSS Token Blocks
  const tokenBlocks = extractTokenBlocks(file, content);
  for (const block of tokenBlocks) {
    for (const pair of SEMANTIC_PAIRS) {
      const fgHex = block.tokens[pair.fg];
      const bgHex = block.tokens[pair.bg];
      if (!fgHex || !bgHex) continue;
      const fg = parseHex(fgHex);
      const bg = parseHex(bgHex);
      if (!fg || !bg) continue;
      contrastPairsChecked++;
      const wcag = wcagContrast(fg, bg);
      const apca = apcaContrast(fg, bg);
      const apcaAbs = Math.abs(apca);
      if (wcag < pair.minWcag || apcaAbs < pair.minApca) {
        const fix = suggestPassingHex(fgHex, bgHex, pair.minWcag, pair.minApca);
        errors.push({
          rule: 'contrast/wcag-apca',
          file: rel,
          block: block.name,
          message: `${pair.label} (${pair.fg}: ${fgHex} on ${pair.bg}: ${bgHex}) failed -> WCAG ${wcag.toFixed(2)}:1 (need >=${pair.minWcag}), APCA Lc ${Math.round(apcaAbs)} (need >=${pair.minApca}). Suggested fix: ${pair.fg}: ${fix}`,
        });
      }
    }
  }

  // 2. Component Static Taste Rules (.tsx / .jsx)
  if (/\.(tsx|jsx)$/.test(file)) {
    const isThemeDefinitionOrSandbox =
      /ContrastModal\.tsx$/.test(file) || /themes?\.tsx?$/.test(file);

    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      const lineNo = idx + 1;
      if (line.includes('taste-lint-ignore')) return;

      // Ban scale-0 / scale(0) entrances in className or style/transform definitions
      const isCodeStyleLine =
        /className=|style=|transform|initial=|exit=|animate=/.test(line);
      if (isCodeStyleLine && /\bscale-0\b|scale\(\s*0\s*\)/.test(line)) {
        errors.push({
          rule: 'motion/no-scale-zero',
          file: rel,
          line: lineNo,
          message: 'Avoid scale-0 / scale(0) entrances; start from scale(0.95) with origin-aware motion.',
        });
      }

      // Warn on raw hardcoded hex colors inside JSX className/style attributes
      if (!isThemeDefinitionOrSandbox && isCodeStyleLine) {
        const hexMatches = line.match(/(?:bg|text|border|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]|(?:background|color|borderColor)\s*:\s*['"]#[0-9a-fA-F]{3,8}['"]/g);
        if (hexMatches) {
          warnings.push({
            rule: 'tokens/no-raw-hex',
            file: rel,
            line: lineNo,
            message: `Raw hex color (${hexMatches[0]}) inside component. Bind to semantic CSS tokens (--surface-*, --ink-*, --accent, --danger).`,
          });
        }
      }

      // Warn on arbitrary pixel padding/margin that breaks spacing rhythm
      if (isCodeStyleLine) {
        const arbSpace = line.match(/\b[pm][trblxy]?-\[\d+px\]/g);
        if (arbSpace) {
          warnings.push({
            rule: 'spacing/no-arbitrary-px',
            file: rel,
            line: lineNo,
            message: `Arbitrary spacing (${arbSpace[0]}). Prefer the 4px spacing scale or density CSS variables.`,
          });
        }
      }
    });
  }
}

const report = {
  target: rootDir,
  filesScanned: files.length,
  contrastPairsChecked,
  errors,
  warnings,
  passed: errors.length === 0 && (!strictMode || warnings.length === 0),
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`\n[taste-lint] Scanned ${report.filesScanned} files · Audited ${report.contrastPairsChecked} semantic contrast pairs`);
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✓ All WCAG 2.1 + APCA Lc contrast pairs and taste guardrails passed.\n');
  } else {
    if (errors.length > 0) {
      console.log(`\n✗ Errors (${errors.length}):`);
      for (const e of errors) {
        const loc = e.line ? `${e.file}:${e.line}` : `${e.file} (${e.block})`;
        console.log(`  [${e.rule}] ${loc}\n    ${e.message}`);
      }
    }
    if (warnings.length > 0) {
      console.log(`\n! Warnings (${warnings.length}):`);
      for (const w of warnings) {
        console.log(`  [${w.rule}] ${w.file}:${w.line} — ${w.message}`);
      }
    }
    console.log('');
  }
}

process.exit(report.passed ? 0 : 1);
