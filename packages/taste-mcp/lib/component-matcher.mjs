import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'that', 'this',
  'is', 'are', 'be', 'as', 'at', 'by', 'from', 'it', 'we', 'i', 'you', 'they', 'my', 'our',
  'need', 'want', 'build', 'make', 'create', 'show', 'give', 'add', 'use', 'using', 'like',
  'some', 'something', 'ui', 'ux', 'component', 'components', 'page', 'screen', 'view', 'app',
]);

// Bidirectional domain synonym clusters so natural-language descriptions match exact patterns
const SYNONYM_CLUSTERS = [
  ['table', 'grid', 'rows', 'columns', 'tabular', 'spreadsheet', 'pagination', 'sort', 'csv', 'export', 'import', 'saved', 'pinned', 'bulk'],
  ['settings', 'config', 'configuration', 'workspace', 'preferences', 'dirty', 'unsaved', 'save', 'reset', 'danger', 'delete'],
  ['secrets', 'env', 'environment', 'variables', 'vault', 'masked', 'reveal', 'credentials', 'api', 'keys', 'tokens', 'webhook', 'webhooks', 'cron', 'scheduled'],
  ['rbac', 'permissions', 'roles', 'role', 'matrix', 'access', 'audit', 'logs', 'trail', 'diff', 'jit', 'approval', 'sso', 'saml', 'scim', 'tenant', 'org', 'members', 'team', 'invites', 'sessions', 'compliance', 'soc2', 'hipaa'],
  ['kanban', 'board', 'wip', 'queue', 'triage', 'inbox', 'roadmap', 'gantt', 'timeline', 'calendar', 'schedule', 'sla', 'escalation', 'workload', 'balancer', 'subtasks', 'checklist', 'comments', 'mentions'],
  ['search', 'filter', 'filters', 'facet', 'facets', 'faceted', 'discover', 'discoverability', 'catalog', 'directory', 'gallery', 'breadcrumb', 'breadcrumbs', 'cmdk', 'command', 'palette', 'shortcuts', 'empty', 'typo', 'recents', 'pinned'],
  ['modal', 'dialog', 'drawer', 'sheet', 'overlay', 'slideover', 'slide-over', 'popup', 'confirm', 'confirmation', 'wizard', 'stepper', 'onboarding'],
  ['popover', 'menu', 'dropdown', 'context', 'tooltip', 'toolbar', 'hover', 'split-button'],
  ['toast', 'toasts', 'notification', 'notifications', 'snackbar', 'alert', 'banner', 'undo', 'sonner'],
  ['navigation', 'nav', 'sidebar', 'rail', 'header', 'topbar', 'shell', 'toc', 'anchor', 'tabs', 'segmented'],
  ['form', 'forms', 'input', 'inputs', 'field', 'fields', 'select', 'combobox', 'picker', 'date', 'upload', 'uploader', 'dropzone', 'validation', 'inline'],
  ['chart', 'charts', 'analytics', 'graph', 'sparkline', 'kpi', 'kpis', 'metric', 'metrics', 'card', 'cards', 'dashboard', 'cockpit', 'slo', 'uptime', 'latency', 'heatgrid', 'quota', 'usage', 'metering'],
  ['ai', 'llm', 'agent', 'streaming', 'chat', 'thinking', 'reasoning', 'tool', 'hitl', 'diff', 'autopilot'],
  ['healthcare', 'medical', 'clinical', 'risk', 'adjustment', 'coding', 'hcc', 'icd', 'icd10', 'raf', 'encounter', 'encounters', 'radv', 'meat', 'pdf', 'annotation', 'highlighter', 'document'],
  ['motion', 'animation', 'micro', 'interaction', 'spring', 'odometer', 'number', 'counter', 'confetti', 'magnetic', 'skeleton', 'shimmer', 'loading', 'error', 'resilience'],
  ['button', 'buttons', 'press', 'tactile', 'cta', 'badge', 'badges', 'avatar', 'avatars', 'chip', 'chips', 'pill', 'pills', 'tag', 'tags'],
  ['checkout', 'commerce', 'pricing', 'cart', 'payment', 'billing', 'plan', 'hero', 'landing', 'login', 'auth', 'mfa', 'passkey', 'security'],
];

const SYNONYM_MAP = new Map();
for (const cluster of SYNONYM_CLUSTERS) {
  for (const word of cluster) {
    const existing = SYNONYM_MAP.get(word) || new Set();
    for (const peer of cluster) {
      if (peer !== word) existing.add(peer);
    }
    SYNONYM_MAP.set(word, existing);
  }
}

export function loadComponentIndex() {
  const indexPath = path.join(repoRoot, 'catalog/components-index.json');
  if (!fs.existsSync(indexPath)) {
    throw new Error('catalog/components-index.json missing. Run: bun scripts/build-component-index.mjs');
  }
  return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
}

export function loadTasteProfile() {
  const tastePath = path.join(repoRoot, 'taste/taste.json');
  if (!fs.existsSync(tastePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(tastePath, 'utf8'));
  } catch {
    return null;
  }
}

export function loadFrameworkCatalog() {
  const fwPath = path.join(repoRoot, 'catalog/framework-libraries.json');
  if (!fs.existsSync(fwPath)) return null;
  return JSON.parse(fs.readFileSync(fwPath, 'utf8'));
}

function getTasteStatus(profile, specimenId, variantId) {
  const dec = profile?.specimens?.[specimenId];
  if (!dec) {
    return { status: 'neutral', whyNote: '', neverNote: '' };
  }
  const selectedIds = Array.isArray(dec.selectedIds) && dec.selectedIds.length
    ? dec.selectedIds
    : dec.winnerId
      ? [dec.winnerId]
      : [];
  const primaryId = dec.winnerId && selectedIds.includes(dec.winnerId) ? dec.winnerId : selectedIds[0];

  if (primaryId === variantId) {
    return { status: 'primary', whyNote: dec.whyNote || '', neverNote: dec.neverNote || '' };
  }
  if (selectedIds.includes(variantId)) {
    return { status: 'selected', whyNote: dec.whyNote || '', neverNote: dec.neverNote || '' };
  }
  if (Array.isArray(dec.rejectedIds) && dec.rejectedIds.includes(variantId)) {
    return { status: 'rejected', whyNote: dec.whyNote || '', neverNote: dec.neverNote || '' };
  }
  return { status: 'neutral', whyNote: dec.whyNote || '', neverNote: dec.neverNote || '' };
}

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, ' ')
    .split(/[\s/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function stemLight(token) {
  if (token.length > 4 && token.endsWith('ing')) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith('ies')) return token.slice(0, -3) + 'y';
  if (token.length > 3 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
}

export function matchComponents({
  description,
  limit = 8,
  includeRejected = false,
  domain,
  tasteOnly = false,
  framework,
} = {}) {
  const index = loadComponentIndex();
  const profile = loadTasteProfile();
  const fwCatalog = loadFrameworkCatalog();

  const rawQuery = String(description || '').trim().toLowerCase();
  const tokens = tokenize(rawQuery);
  const stemmedTokens = [...new Set(tokens.map(stemLight))];

  // Expand synonyms (capped per query so direct matches always outrank synonyms)
  const synonymTokens = new Set();
  for (const t of [...tokens, ...stemmedTokens]) {
    const peers = SYNONYM_MAP.get(t);
    if (peers) {
      for (const p of peers) {
        if (!tokens.includes(p)) synonymTokens.add(p);
      }
    }
  }

  const scored = [];
  const avoided = [];

  for (const comp of index.components) {
    if (domain && comp.domain !== domain) continue;

    const taste = getTasteStatus(profile, comp.specimenId, comp.variantId);
    if (tasteOnly && taste.status !== 'primary' && taste.status !== 'selected') continue;

    const nameL = comp.name.toLowerCase();
    const catL = comp.categoryTitle.toLowerCase();
    const archL = comp.archetype.toLowerCase();
    const sumL = comp.summary.toLowerCase();
    const traitsL = comp.traits.join(' ').toLowerCase();
    const catSubL = comp.categorySubtitle.toLowerCase();
    const idL = `${comp.specimenId} ${comp.variantId}`.toLowerCase();

    let score = 0;
    const matchedReasons = new Set();

    if (rawQuery.length >= 3) {
      if (nameL.includes(rawQuery)) {
        score += 14;
        matchedReasons.add(`exact name match`);
      } else if (catL.includes(rawQuery)) {
        score += 10;
        matchedReasons.add(`exact category match`);
      }
    }

    for (const tok of tokens) {
      const stem = stemLight(tok);
      const hitName = nameL.includes(tok) || (stem.length >= 3 && nameL.includes(stem));
      const hitTraits = traitsL.includes(tok) || (stem.length >= 3 && traitsL.includes(stem));
      const hitId = idL.includes(tok) || (stem.length >= 3 && idL.includes(stem));
      const hitArch = archL.includes(tok) || (stem.length >= 3 && archL.includes(stem));
      const hitCat = catL.includes(tok) || (stem.length >= 3 && catL.includes(stem));
      const hitSum = sumL.includes(tok) || (stem.length >= 3 && sumL.includes(stem));
      const hitCatSub = catSubL.includes(tok);

      if (hitName) {
        score += 6;
        matchedReasons.add(tok);
      }
      if (hitId) {
        score += 4.5;
        matchedReasons.add(tok);
      }
      if (hitTraits) {
        score += 4;
        matchedReasons.add(tok);
      }
      if (hitCat) {
        score += 3.5;
        matchedReasons.add(tok);
      }
      if (hitArch) {
        score += 3;
        matchedReasons.add(tok);
      }
      if (hitSum) {
        score += 2.5;
        matchedReasons.add(tok);
      }
      if (hitCatSub) {
        score += 1.5;
      }
    }

    // Synonym hits (max contribution capped so exact matches dominate)
    let synScore = 0;
    for (const syn of synonymTokens) {
      if (nameL.includes(syn) || idL.includes(syn)) {
        synScore += 2.0;
      } else if (traitsL.includes(syn) || catL.includes(syn)) {
        synScore += 1.4;
      } else if (archL.includes(syn) || sumL.includes(syn)) {
        synScore += 0.9;
      }
    }
    score += Math.min(synScore, 7.5);

    if (score <= 0 && tokens.length > 0) continue;

    // If query was empty, prioritize calibrated primary/selected items
    if (tokens.length === 0) {
      score = taste.status === 'primary' ? 10 : taste.status === 'selected' ? 7 : 1;
    }

    // Apply Taste Profile preference multipliers
    const baseScore = score;
    if (taste.status === 'primary') score *= 1.38;
    else if (taste.status === 'selected') score *= 1.18;

    const entry = {
      id: comp.id,
      specimenId: comp.specimenId,
      variantId: comp.variantId,
      name: comp.name,
      category: comp.categoryTitle,
      domain: comp.domain,
      batch: comp.batch,
      tasteStatus: taste.status,
      score: Number(score.toFixed(2)),
      archetype: comp.archetype,
      summary: comp.summary,
      traits: comp.traits,
      fullWidth: comp.fullWidth,
      sourceFile: comp.sourceFile,
      componentSymbol: comp.componentSymbol,
      whyNote: taste.whyNote || undefined,
      neverNote: taste.neverNote || undefined,
      matchedTokens: Array.from(matchedReasons).slice(0, 6),
    };

    if (taste.status === 'rejected' && !includeRejected) {
      if (baseScore >= 4) avoided.push(entry);
      continue;
    }

    scored.push(entry);
  }

  scored.sort((a, b) => b.score - a.score);
  avoided.sort((a, b) => b.score - a.score);

  // Diversify top results when a multi-part UI prompt hits multiple categories
  const maxPerCategory = tokens.length >= 4 ? 3 : 4;
  const perCat = new Map();
  const top = [];
  for (const item of scored) {
    if (top.length >= limit) break;
    const count = perCat.get(item.specimenId) || 0;
    if (count >= maxPerCategory) continue;
    perCat.set(item.specimenId, count + 1);
    top.push(item);
  }

  const fwInfo = framework && fwCatalog?.frameworks?.[framework] ? fwCatalog.frameworks[framework] : null;

  return {
    query: description || '',
    totalIndexed: index.componentCount,
    totalMatches: scored.length,
    tasteProfileLoaded: Boolean(profile),
    activeDials: profile?.dials || null,
    recommendedFrameworkStack: fwInfo
      ? {
          framework,
          label: fwInfo.label,
          foundations: fwInfo.foundations,
          tokenFormat: fwInfo.tokenFormat,
        }
      : undefined,
    matches: top,
    avoidAntiPatterns: avoided.slice(0, 4).map((a) => ({
      id: a.id,
      name: a.name,
      category: a.category,
      neverNote: a.neverNote || 'Explicitly rejected in user TASTE profile.',
    })),
    nextStepHint: top[0]
      ? `Call get_component_reference with specimenId="${top[0].specimenId}" and variantId="${top[0].variantId}" to inspect the full working implementation and semantic token usage.`
      : 'Try broader terms like "table", "settings", "rbac", "kanban", "drawer", or call list_component_catalog.',
  };
}

/**
 * Extracts a top-level `function SymbolName(...) { ... }` block using balanced braces.
 */
function extractFunctionBlock(source, symbolName) {
  const fnRe = new RegExp(`(?:export\\s+)?function\\s+${symbolName}\\s*\\(`);
  const match = fnRe.exec(source);
  if (!match) return null;

  const startIdx = match.index;
  const openParenIdx = source.indexOf('(', startIdx);
  if (openParenIdx === -1) return null;

  // First advance past the balanced parameter list `(...)` (which may contain destructured `{ ctx }: { ... }`)
  let parenDepth = 0;
  let closeParenIdx = -1;
  for (let i = openParenIdx; i < source.length; i++) {
    const ch = source[i];
    if (ch === '(') parenDepth++;
    else if (ch === ')') {
      parenDepth--;
      if (parenDepth === 0) {
        closeParenIdx = i;
        break;
      }
    }
  }
  if (closeParenIdx === -1) return null;

  // Now locate the opening `{` of the function body (skipping any optional return type annotation)
  const openBraceIdx = source.indexOf('{', closeParenIdx + 1);
  if (openBraceIdx === -1) return null;

  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = openBraceIdx; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    const prev = source[i - 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (prev === '*' && ch === '/') inBlockComment = false;
      continue;
    }
    if (!inSingle && !inDouble && !inTemplate) {
      if (ch === '/' && next === '/') {
        inLineComment = true;
        continue;
      }
      if (ch === '/' && next === '*') {
        inBlockComment = true;
        continue;
      }
    }

    if (ch === "'" && !inDouble && !inTemplate && prev !== '\\') inSingle = !inSingle;
    else if (ch === '"' && !inSingle && !inTemplate && prev !== '\\') inDouble = !inDouble;
    else if (ch === '`' && !inSingle && !inDouble && prev !== '\\') inTemplate = !inTemplate;

    if (!inSingle && !inDouble && !inTemplate) {
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          return source.slice(startIdx, i + 1);
        }
      }
    }
  }
  return null;
}

export function getComponentReference({ id, specimenId, variantId, framework = 'react' } = {}) {
  const index = loadComponentIndex();
  const profile = loadTasteProfile();
  const fwCatalog = loadFrameworkCatalog();

  let targetSpecId = specimenId;
  let targetVarId = variantId;
  if (id && id.includes('/')) {
    const [s, v] = id.split('/');
    targetSpecId = targetSpecId || s;
    targetVarId = targetVarId || v;
  }

  const comp = index.components.find(
    (c) =>
      (targetSpecId && targetVarId && c.specimenId === targetSpecId && c.variantId === targetVarId) ||
      (targetVarId && !targetSpecId && c.variantId === targetVarId),
  );

  if (!comp) {
    throw new Error(
      `Component not found (${id || `${targetSpecId}/${targetVarId}`}). Call match_ui_components or list_component_catalog first.`,
    );
  }

  const taste = getTasteStatus(profile, comp.specimenId, comp.variantId);
  let extractedCode = null;
  let extractionMode = 'none';

  if (comp.sourceFile) {
    const fullPath = path.join(repoRoot, comp.sourceFile);
    if (fs.existsSync(fullPath)) {
      const fullSource = fs.readFileSync(fullPath, 'utf8');
      if (comp.componentSymbol) {
        const block = extractFunctionBlock(fullSource, comp.componentSymbol);
        if (block) {
          extractedCode = block;
          extractionMode = 'component-function';
        }
      }
      if (!extractedCode) {
        // Fallback: return first 180 lines of specimen file if inline-rendered
        extractedCode = fullSource.split('\n').slice(0, 180).join('\n');
        extractionMode = 'specimen-excerpt';
      }
    }
  }

  const fwInfo = framework && fwCatalog?.frameworks?.[framework] ? fwCatalog.frameworks[framework] : null;

  return {
    id: comp.id,
    specimenId: comp.specimenId,
    variantId: comp.variantId,
    name: comp.name,
    category: comp.categoryTitle,
    domain: comp.domain,
    batch: comp.batch,
    archetype: comp.archetype,
    summary: comp.summary,
    traits: comp.traits,
    fullWidth: comp.fullWidth,
    tasteStatus: taste.status,
    whyNote: taste.whyNote || null,
    neverNote: taste.neverNote || null,
    activeDials: profile?.dials || null,
    sourceFile: comp.sourceFile,
    componentSymbol: comp.componentSymbol,
    extractionMode,
    referenceCode: extractedCode,
    adaptationGuidance: {
      targetFramework: framework,
      semanticTokensRule:
        'Keep 100% color-agnostic: map --surface-0/1/2, --ink-1/2/3, --border-subtle/strong, --accent, --danger, --success onto the host project theme tokens.',
      recommendedStack: fwInfo
        ? {
            label: fwInfo.label,
            foundations: fwInfo.foundations,
            tokenFormat: fwInfo.tokenFormat,
          }
        : null,
    },
  };
}

export function listComponentCatalog({ domain, batch, tasteFilter = 'all' } = {}) {
  const index = loadComponentIndex();
  const profile = loadTasteProfile();

  const categories = index.categories
    .filter((c) => (!domain || c.domain === domain) && (!batch || c.batch === Number(batch)))
    .map((cat) => {
      const variants = index.components
        .filter((comp) => comp.specimenId === cat.id)
        .map((comp) => {
          const taste = getTasteStatus(profile, comp.specimenId, comp.variantId);
          return {
            id: comp.id,
            variantId: comp.variantId,
            name: comp.name,
            tasteStatus: taste.status,
            traits: comp.traits,
          };
        })
        .filter((v) => {
          if (tasteFilter === 'primary') return v.tasteStatus === 'primary';
          if (tasteFilter === 'approved') return v.tasteStatus === 'primary' || v.tasteStatus === 'selected';
          if (tasteFilter === 'uncalibrated') return v.tasteStatus === 'neutral';
          return true;
        });

      return {
        id: cat.id,
        title: cat.title,
        domain: cat.domain,
        batch: cat.batch,
        subtitle: cat.subtitle,
        sourceFile: cat.sourceFile,
        variants,
      };
    })
    .filter((c) => c.variants.length > 0);

  return {
    totalCategories: categories.length,
    totalComponents: categories.reduce((s, c) => s + c.variants.length, 0),
    domains: ['tables-app-management', 'foundations', 'navigation-overlays', 'forms-flows-data', 'ai-docs-craft'],
    tasteFilter,
    categories,
  };
}
