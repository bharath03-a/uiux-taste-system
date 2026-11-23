#!/usr/bin/env node
/**
 * taste-find — Zero-Dependency CLI for Taste-Aware UI Component Discovery
 *
 * Usage:
 *   bun run find:ui "table with saved views and column visibility"
 *   bun run find:ui --ref advanced-table-views/saved-views-column-controls
 *   bun run find:ui --list --taste approved
 *   bun run find:ui --json "rbac permission matrix"
 */

import {
  getComponentReference,
  listComponentCatalog,
  matchComponents,
} from '../lib/component-matcher.mjs';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const tasteOnly = args.includes('--taste-only');
const listMode = args.includes('--list');

function getFlag(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : undefined;
}

const refId = getFlag('--ref');
const framework = getFlag('--framework');
const domain = getFlag('--domain');
const tasteFilter = getFlag('--taste') || 'all';
const limit = Number(getFlag('--limit')) || 6;

const flagValues = new Set(
  ['--ref', '--framework', '--domain', '--taste', '--limit']
    .map((f) => getFlag(f))
    .filter(Boolean),
);
const queryParts = args.filter((a) => !a.startsWith('--') && !flagValues.has(a));
const description = queryParts.join(' ').trim();

if (refId) {
  const res = getComponentReference({ id: refId, framework: framework || 'react' });
  if (asJson) {
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(`\n# ${res.name} (${res.id})`);
    console.log(`Category: ${res.category} · Batch ${res.batch} · Taste: ${res.tasteStatus.toUpperCase()}`);
    console.log(`Archetype: ${res.archetype}`);
    console.log(`Source: ${res.sourceFile} (${res.componentSymbol || res.extractionMode})`);
    if (res.whyNote) console.log(`Why: ${res.whyNote}`);
    if (res.neverNote) console.log(`Never: ${res.neverNote}`);
    console.log('\n--- Reference Implementation ---\n');
    console.log(res.referenceCode || '(no code extracted)');
  }
  process.exit(0);
}

if (listMode) {
  const res = listComponentCatalog({ domain, tasteFilter });
  if (asJson) {
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(`\n[taste-find] ${res.totalCategories} categories · ${res.totalComponents} components (filter: ${tasteFilter})\n`);
    for (const cat of res.categories) {
      console.log(`• ${cat.title} (${cat.id}) [Batch ${cat.batch} · ${cat.domain}]`);
      for (const v of cat.variants) {
        const badge = v.tasteStatus === 'primary' ? '★ PRIMARY' : v.tasteStatus === 'selected' ? '✓ SELECTED' : ' ';
        console.log(`    ${badge.padEnd(10)} ${v.id} — ${v.name}`);
      }
    }
  }
  process.exit(0);
}

if (!description) {
  console.log(`
taste-find — Match natural-language UI descriptions to your calibrated 330+ component library

Examples:
  bun run find:ui "table with saved views, column visibility, and density toggle"
  bun run find:ui "settings page with unsaved changes bar and secrets vault"
  bun run find:ui --ref advanced-table-views/saved-views-column-controls
  bun run find:ui --list --taste approved
`);
  process.exit(0);
}

const res = matchComponents({ description, limit, domain, tasteOnly, framework });
if (asJson) {
  console.log(JSON.stringify(res, null, 2));
} else {
  console.log(`\n[taste-find] Query: "${res.query}" · Matched ${res.matches.length}/${res.totalMatches} (indexed: ${res.totalIndexed})\n`);
  res.matches.forEach((m, i) => {
    const badge =
      m.tasteStatus === 'primary'
        ? '[★ PRIMARY]'
        : m.tasteStatus === 'selected'
          ? '[✓ APPROVED]'
          : '[CATALOG]';
    console.log(`${i + 1}. ${badge} ${m.name}  (${m.id}) · score ${m.score}`);
    console.log(`   ${m.category} · ${m.archetype}`);
    console.log(`   Traits: ${m.traits.join(' · ')}`);
    if (m.whyNote) console.log(`   Rationale: ${m.whyNote}`);
    console.log(`   Pull code: bun run find:ui --ref ${m.id}\n`);
  });
  if (res.avoidAntiPatterns.length > 0) {
    console.log('Avoid (explicitly rejected in taste.json):');
    for (const a of res.avoidAntiPatterns) {
      console.log(`  ✗ ${a.name} (${a.id}) — ${a.neverNote}`);
    }
  }
}
