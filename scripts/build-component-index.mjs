#!/usr/bin/env bun
/**
 * build-component-index.mjs
 *
 * Compiles catalog/components-index.json directly from:
 *   - apps/taste-lab/src/data/specimens.ts (all 35 categories & 320+ prototypes)
 *   - apps/taste-lab/src/components/SpecimenStage.tsx (specimenId -> *Specimen.tsx map)
 *   - apps/taste-lab/src/specimens/*Specimen.tsx (variantId -> exact component symbol)
 *
 * Zero dependencies. Runs in <100ms via Bun.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPECIMENS } from '../apps/taste-lab/src/data/specimens.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const stagePath = path.join(repoRoot, 'apps/taste-lab/src/components/SpecimenStage.tsx');
const stageCode = fs.readFileSync(stagePath, 'utf8');

// 1. Map imported component symbol -> relative file path from repoRoot
const importMap = new Map();
const importRe = /import\s+\{\s*(\w+)\s*\}\s+from\s+'\.\.\/specimens\/(\w+)'/g;
for (const m of stageCode.matchAll(importRe)) {
  importMap.set(m[1], `apps/taste-lab/src/specimens/${m[2]}.tsx`);
}

// 2. Map specimenId -> specimen source file path via switch cases in SpecimenStage.tsx
const specimenFileMap = new Map();
const caseRe = /case\s+'([^']+)':\s*\n\s*return\s+<(\w+)\s/g;
for (const m of stageCode.matchAll(caseRe)) {
  const filePath = importMap.get(m[2]);
  if (filePath) {
    specimenFileMap.set(m[1], { component: m[2], file: filePath });
  }
}

// 3. Domain classification for high-level browsing
const DOMAIN_BY_SPECIMEN = {
  surfaces: 'foundations',
  typography: 'foundations',
  buttons: 'foundations',
  inputs: 'foundations',
  tabs: 'foundations',
  'badges-avatars-chips': 'foundations',
  'app-shell': 'navigation-overlays',
  'navigation-headers': 'navigation-overlays',
  overlays: 'navigation-overlays',
  popovers: 'navigation-overlays',
  'command-palette': 'navigation-overlays',
  toasts: 'navigation-overlays',
  'data-tables': 'tables-app-management',
  'advanced-table-views': 'tables-app-management',
  'app-management-crud': 'tables-app-management',
  'rbac-teams-audit': 'tables-app-management',
  'work-management-views': 'tables-app-management',
  'search-filter-discoverability': 'tables-app-management',
  'dashboards-ops-cockpits': 'tables-app-management',
  'cards-metrics': 'forms-flows-data',
  'onboarding-wizards': 'forms-flows-data',
  'rich-pickers-uploads': 'forms-flows-data',
  'lists-feeds-details': 'forms-flows-data',
  'charts-analytics': 'forms-flows-data',
  'auth-security': 'forms-flows-data',
  'heroes-landing-blocks': 'forms-flows-data',
  'commerce-checkout': 'forms-flows-data',
  'resilience-states': 'forms-flows-data',
  'ai-streaming': 'ai-docs-craft',
  'ai-thinking-tools': 'ai-docs-craft',
  'ai-hitl-diffs': 'ai-docs-craft',
  'risk-adjustment-coding': 'ai-docs-craft',
  'document-annotation-review': 'ai-docs-craft',
  'micro-interactions-motion': 'ai-docs-craft',
  'canvas-spatial-workflows': 'ai-docs-craft',
};

// 4. For each specimen file, map variantId -> rendered inner component symbol (if routed via switch)
function extractVariantSymbolMap(relFile) {
  const map = new Map();
  if (!relFile) return map;
  const fullPath = path.join(repoRoot, relFile);
  if (!fs.existsSync(fullPath)) return map;
  const src = fs.readFileSync(fullPath, 'utf8');
  const re = /case\s+'([^']+)':\s*\n\s*return\s+<(\w+)[\s/>]/g;
  for (const m of src.matchAll(re)) {
    map.set(m[1], m[2]);
  }
  return map;
}

const categories = [];
const components = [];

for (const spec of SPECIMENS) {
  const fileInfo = specimenFileMap.get(spec.id);
  const symbolMap = extractVariantSymbolMap(fileInfo?.file);
  const domain = DOMAIN_BY_SPECIMEN[spec.id] || 'general';

  categories.push({
    id: spec.id,
    batch: spec.batch,
    domain,
    title: spec.title,
    subtitle: spec.subtitle,
    question: spec.question,
    sourceFile: fileInfo?.file ?? null,
    specimenComponent: fileInfo?.component ?? null,
    variantCount: spec.variants.length,
  });

  for (const v of spec.variants) {
    components.push({
      id: `${spec.id}/${v.id}`,
      specimenId: spec.id,
      variantId: v.id,
      batch: spec.batch,
      domain,
      categoryTitle: spec.title,
      categorySubtitle: spec.subtitle,
      name: v.name,
      archetype: v.archetype,
      summary: v.summary,
      traits: v.traits,
      fullWidth: Boolean(v.fullWidth),
      sourceFile: fileInfo?.file ?? null,
      componentSymbol: symbolMap.get(v.id) ?? null,
    });
  }
}

const out = {
  version: '0.4.0',
  generatedAt: new Date().toISOString(),
  categoryCount: categories.length,
  componentCount: components.length,
  categories,
  components,
};

const outPath = path.join(repoRoot, 'catalog/components-index.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(
  `[components-index] Generated ${path.relative(repoRoot, outPath)} · ${categories.length} categories · ${components.length} components`,
);
