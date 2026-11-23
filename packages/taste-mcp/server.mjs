#!/usr/bin/env node
/**
 * taste-mcp — Zero-Dependency Local MCP Server (JSON-RPC 2.0 over stdio)
 *
 * Equips any MCP-compatible AI coding assistant (Claude Code, Cursor, Codex,
 * Antigravity, VS Code) with live, deterministic UI/UX design-engineering tools:
 *   1. check_contrast            — WCAG 2.1 + APCA Lc math + hue-preserving fix
 *   2. generate_accessible_theme — Accessible light/dark semantic tokens for ANY framework
 *   3. suggest_color_scale       — 50-950 tint/shade ramp with safe foreground ink per swatch
 *   4. pick_typography_and_style — Curated font pairings & style archetypes by mood
 *   5. recommend_ui_stack        — Best accessible UI primitives for any framework
 *   6. get_taste_spec            — Reads calibrated TASTE.md (full or filtered by topic)
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import {
  evaluatePair,
  formatThemeForFramework,
  generateAccessibleTheme,
  generateColorScale,
  suggestPassingHex,
} from '../taste-linter/lib/color-engine.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relPath), 'utf8'));
}

const typographyCatalog = readJson('catalog/typography-and-styles.json');
const frameworkCatalog = readJson('catalog/framework-libraries.json');

const TOOLS = [
  {
    name: 'check_contrast',
    description:
      'Deterministically compute WCAG 2.1 contrast ratio and APCA W3 Lc perceptual lightness for a foreground/background hex pair, plus a hue-preserving passing hex fix if it fails.',
    inputSchema: {
      type: 'object',
      properties: {
        foreground: { type: 'string', description: 'Foreground hex color (e.g. "#10b981" or "#ffffff")' },
        background: { type: 'string', description: 'Background hex color (e.g. "#ffffff" or "#131316")' },
        role: {
          type: 'string',
          enum: ['body', 'ui', 'aaa'],
          description: 'Target role: body (4.5:1 & Lc 60), ui/large (3.0:1 & Lc 45), or aaa (7.0:1 & Lc 75). Defaults to body.',
        },
      },
      required: ['foreground', 'background'],
    },
  },
  {
    name: 'generate_accessible_theme',
    description:
      'Generate a complete, guaranteed WCAG 2.1 AA + APCA Lc passing Light & Dark semantic token theme from any single brand hex color, formatted for CSS, Tailwind v4, shadcn, Flutter, SwiftUI, React Native, or W3C DTCG JSON.',
    inputSchema: {
      type: 'object',
      properties: {
        brandHex: { type: 'string', description: 'Primary brand hex color (e.g. "#2563eb", "#0f766e", "#f97316")' },
        framework: {
          type: 'string',
          enum: ['css', 'tailwind-v4', 'shadcn', 'flutter', 'swiftui', 'react-native', 'dtcg-json'],
          description: 'Output code format for target UI framework (default: "css")',
        },
        tintedNeutrals: {
          type: 'boolean',
          description: 'Subtly tint neutral surfaces/inks with the brand hue (default: true). Set false for pure grayscale.',
        },
      },
      required: ['brandHex'],
    },
  },
  {
    name: 'suggest_color_scale',
    description:
      'Generate a 50-950 color ramp from a base hex with safe ink recommendations (#ffffff vs #09090b), WCAG ratio, APCA Lc, and button-safety flag on every swatch.',
    inputSchema: {
      type: 'object',
      properties: {
        baseHex: { type: 'string', description: 'Base hex color (e.g. "#6366f1")' },
      },
      required: ['baseHex'],
    },
  },
  {
    name: 'pick_typography_and_style',
    description:
      'Recommend curated font pairings (with Google Fonts URLs and CSS font stacks) and UI style archetype dials (density, radius, borders, shadow depth, motion physics) for a desired product mood.',
    inputSchema: {
      type: 'object',
      properties: {
        mood: {
          type: 'string',
          description: 'Optional mood/domain keyword (e.g. "saas", "editorial", "developer", "swiss", "finance", "warm", "docs", "native", "terminal")',
        },
      },
    },
  },
  {
    name: 'recommend_ui_stack',
    description:
      'Recommend the best accessible, source-owned UI primitive libraries and specialists for ANY UI framework (React, Vue, Svelte, Angular, Solid, Vanilla/Web Components, React Native, Flutter, SwiftUI).',
    inputSchema: {
      type: 'object',
      properties: {
        framework: {
          type: 'string',
          enum: ['react', 'vue', 'svelte', 'angular', 'solid', 'vanilla', 'react-native', 'flutter', 'swiftui'],
          description: 'Target UI framework',
        },
        need: {
          type: 'string',
          description: 'Optional specific UI need (e.g. "toasts", "tables", "drawers", "motion", "command-palette")',
        },
      },
      required: ['framework'],
    },
  },
  {
    name: 'get_taste_spec',
    description:
      'Retrieve the calibrated color-agnostic TASTE.md specification (Craft Dials, Primary Defaults, Secondary Patterns, Anti-Patterns, Contrast & Registry Rules).',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Optional topic filter (e.g. "tables", "buttons", "toasts", "contrast", "dials", "charts")',
        },
      },
    },
  },
];

function handleToolCall(name, args = {}) {
  switch (name) {
    case 'check_contrast': {
      const role = args.role || 'body';
      const minWcag = role === 'aaa' ? 7.0 : role === 'ui' ? 3.0 : 4.5;
      const minApca = role === 'aaa' ? 75 : role === 'ui' ? 45 : 60;
      const metrics = evaluatePair(args.foreground, args.background);
      if (!metrics) throw new Error('Invalid hex colors. Provide #RGB or #RRGGBB values.');
      const pass = metrics.wcag >= minWcag && metrics.apcaAbs >= minApca;
      const suggestedForeground = pass
        ? null
        : suggestPassingHex(args.foreground, args.background, minWcag, minApca);
      return {
        ...metrics,
        role,
        thresholds: { minWcag, minApca },
        passesTarget: pass,
        suggestedForeground,
      };
    }

    case 'generate_accessible_theme': {
      const framework = args.framework || 'css';
      const tintedNeutrals = args.tintedNeutrals !== false;
      const light = generateAccessibleTheme(args.brandHex, 'light', { tintedNeutrals });
      const dark = generateAccessibleTheme(args.brandHex, 'dark', { tintedNeutrals });
      const code = formatThemeForFramework(light, dark, framework);
      return {
        brandHex: args.brandHex,
        framework,
        lightAccentAdjusted: light.accentWasAdjusted ? light.adjustedAccentHex : null,
        darkAccentAdjusted: dark.accentWasAdjusted ? dark.adjustedAccentHex : null,
        lightAudit: light.audit,
        darkAudit: dark.audit,
        code,
      };
    }

    case 'suggest_color_scale': {
      return {
        baseHex: args.baseHex,
        scale: generateColorScale(args.baseHex),
      };
    }

    case 'pick_typography_and_style': {
      const q = String(args.mood || '').toLowerCase().trim();
      const pairings = q
        ? typographyCatalog.fontPairings.filter(
            (p) =>
              p.id.includes(q) ||
              p.name.toLowerCase().includes(q) ||
              p.mood.some((m) => m.includes(q)) ||
              p.notes.toLowerCase().includes(q),
          )
        : typographyCatalog.fontPairings;
      const archetypes = q
        ? typographyCatalog.styleArchetypes.filter(
            (a) =>
              a.id.includes(q) ||
              a.name.toLowerCase().includes(q) ||
              a.summary.toLowerCase().includes(q),
          )
        : typographyCatalog.styleArchetypes;
      return {
        query: q || 'all',
        fontPairings: pairings.length ? pairings : typographyCatalog.fontPairings,
        styleArchetypes: archetypes.length ? archetypes : typographyCatalog.styleArchetypes,
      };
    }

    case 'recommend_ui_stack': {
      const fw = frameworkCatalog.frameworks[args.framework];
      if (!fw) throw new Error(`Unsupported framework: ${args.framework}`);
      const need = String(args.need || '').toLowerCase().trim();
      if (need && fw.specialists) {
        const matched = Object.entries(fw.specialists).filter(
          ([k, v]) => k.includes(need) || v.toLowerCase().includes(need),
        );
        return {
          framework: args.framework,
          label: fw.label,
          foundations: fw.foundations,
          matchedSpecialists: Object.fromEntries(matched),
          allSpecialists: fw.specialists,
          recommendedTokenFormat: fw.tokenFormat,
        };
      }
      return { framework: args.framework, ...fw };
    }

    case 'get_taste_spec': {
      const tastePath = path.join(repoRoot, 'taste', 'TASTE.md');
      const fullText = fs.existsSync(tastePath)
        ? fs.readFileSync(tastePath, 'utf8')
        : 'TASTE.md not yet compiled. Open Taste Lab and compile TASTE.md.';
      const q = String(args.query || '').toLowerCase().trim();
      if (!q) return { markdown: fullText };
      const sections = fullText.split(/\n(?=##+ )/);
      const matched = sections.filter((s) => s.toLowerCase().includes(q));
      return {
        query: q,
        markdown: matched.length ? matched.join('\n\n') : fullText,
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ---------------------------------------------------------------------------
// JSON-RPC 2.0 over stdio transport (MCP protocol 2024-11-05)
// ---------------------------------------------------------------------------

process.stdout.on('error', (err) => {
  if (err && err.code === 'EPIPE') process.exit(0);
});

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let req;
  try {
    req = JSON.parse(trimmed);
  } catch {
    return;
  }

  const { id, method, params } = req;

  if (method === 'notifications/initialized') return;

  try {
    if (method === 'initialize') {
      send({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'uiux-taste-mcp', version: '0.2.0' },
        },
      });
    } else if (method === 'tools/list') {
      send({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
    } else if (method === 'tools/call') {
      const data = handleToolCall(params?.name, params?.arguments);
      send({
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        },
      });
    } else if (method === 'ping') {
      send({ jsonrpc: '2.0', id, result: {} });
    } else if (id !== undefined) {
      send({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      });
    }
  } catch (err) {
    if (id !== undefined) {
      send({
        jsonrpc: '2.0',
        id,
        result: {
          isError: true,
          content: [{ type: 'text', text: String(err?.message || err) }],
        },
      });
    }
  }
});
