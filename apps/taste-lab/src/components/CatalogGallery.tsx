import { useMemo, useState } from 'react';
import { ArrowRight, Check, Compass, Search, Sparkles, X } from 'lucide-react';
import { SPECIMENS } from '../data/specimens';
import type { SpecimenId, TasteProfile } from '../types/taste';

type DomainFilter =
  | 'all'
  | 'tables-apps'
  | 'foundations'
  | 'nav-overlays'
  | 'flows-content'
  | 'ai-craft'
  | 'todo';

const DOMAIN_BUCKETS: Record<Exclude<DomainFilter, 'all' | 'todo'>, SpecimenId[]> = {
  'tables-apps': [
    'advanced-table-views',
    'app-management-crud',
    'rbac-teams-audit',
    'work-management-views',
    'search-filter-discoverability',
    'data-tables',
    'dashboards-ops-cockpits',
  ],
  foundations: ['surfaces', 'typography', 'buttons', 'inputs', 'tabs', 'badges-avatars-chips'],
  'nav-overlays': ['app-shell', 'navigation-headers', 'overlays', 'popovers', 'command-palette', 'toasts'],
  'flows-content': [
    'cards-metrics',
    'onboarding-wizards',
    'rich-pickers-uploads',
    'lists-feeds-details',
    'charts-analytics',
    'auth-security',
    'heroes-landing-blocks',
    'commerce-checkout',
    'resilience-states',
  ],
  'ai-craft': [
    'ai-streaming',
    'ai-thinking-tools',
    'ai-hitl-diffs',
    'risk-adjustment-coding',
    'document-annotation-review',
    'micro-interactions-motion',
    'canvas-spatial-workflows',
  ],
};

interface CatalogGalleryProps {
  profile: TasteProfile;
  icons: Record<SpecimenId, React.ComponentType<{ className?: string }>>;
  onJump: (specimenId: SpecimenId, variantId?: string) => void;
}

export function CatalogGallery({ profile, icons, onJump }: CatalogGalleryProps) {
  const [domain, setDomain] = useState<DomainFilter>('all');
  const [query, setQuery] = useState('');

  const totalVariants = useMemo(
    () => SPECIMENS.reduce((sum, s) => sum + s.variants.length, 0),
    [],
  );

  const calibratedCount = useMemo(
    () =>
      SPECIMENS.filter((s) => {
        const dec = profile.specimens[s.id];
        return Boolean(dec?.winnerId || dec?.selectedIds?.length);
      }).length,
    [profile.specimens],
  );

  const normalized = query.trim().toLowerCase();

  const items = useMemo(() => {
    return SPECIMENS.map((spec) => {
      const dec = profile.specimens[spec.id];
      const selectedCount = dec?.selectedIds?.length ? dec.selectedIds.length : dec?.winnerId ? 1 : 0;

      if (domain === 'todo' && selectedCount > 0) return null;
      if (domain !== 'all' && domain !== 'todo' && !DOMAIN_BUCKETS[domain].includes(spec.id)) {
        return null;
      }

      if (!normalized) {
        return { spec, selectedCount, matchingVariants: spec.variants };
      }

      const tokens = normalized.split(/\s+/).filter(Boolean);
      const specHay = `${spec.title} ${spec.subtitle} ${spec.id} batch ${spec.batch} b${spec.batch}`.toLowerCase();
      const specHit = tokens.every((t) => specHay.includes(t));

      const variantHits = spec.variants.filter((v) => {
        const vHay = `${v.name} ${v.archetype} ${v.summary} ${v.traits.join(' ')} ${spec.title}`.toLowerCase();
        return tokens.every((t) => vHay.includes(t));
      });

      if (!specHit && variantHits.length === 0) return null;
      return {
        spec,
        selectedCount,
        matchingVariants: variantHits.length > 0 ? variantHits : spec.variants,
      };
    }).filter((x): x is NonNullable<typeof x> => Boolean(x));
  }, [domain, normalized, profile.specimens]);

  const filterPills: { id: DomainFilter; label: string }[] = [
    { id: 'all', label: `All (${SPECIMENS.length})` },
    { id: 'tables-apps', label: 'Tables & App Management' },
    { id: 'foundations', label: 'Core Foundations' },
    { id: 'nav-overlays', label: 'Navigation & Overlays' },
    { id: 'flows-content', label: 'Forms, Flows & Data' },
    { id: 'ai-craft', label: 'AI, Docs & Craft' },
    { id: 'todo', label: `Uncalibrated (${SPECIMENS.length - calibratedCount})` },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-5">
      {/* Catalog Hero & Instant Search */}
      <div
        className="flex flex-col gap-4 rounded-2xl p-5"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em]"
                style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
              >
                <Compass className="h-3 w-3" /> Component Directory
              </span>
              <span
                className="tabular-nums-auto text-[11px]"
                style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {SPECIMENS.length} categories · {totalVariants} interactive demos · {calibratedCount} calibrated
              </span>
            </div>
            <h1
              className="text-[22px] font-semibold"
              style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-display)', letterSpacing: 'var(--dial-tracking-display)' }}
            >
              Explore All UI/UX Patterns by Use Case
            </h1>
            <p className="max-w-[68ch] text-[13px]" style={{ color: 'var(--ink-2)' }}>
              Click any category card or jump straight to a specific prototype chip below. Use the top Theme Slot to test every pattern color-agnostically.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onJump('advanced-table-views')}
            className="craft-pressable craft-focus inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            New: Batch 7 Tables & App Mgmt
          </button>
        </div>

        {/* Search Input */}
        <div
          className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)' }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--ink-3)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 320+ prototypes (e.g. saved views, RBAC, kanban, webhooks, audit diff, pagination, secrets)…"
            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded p-1"
              style={{ color: 'var(--ink-3)' }}
              aria-label="Clear catalog search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Use-Case Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filterPills.map((p) => {
            const active = domain === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setDomain(p.id)}
                className="craft-pressable craft-focus rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors"
                style={{
                  background: active ? 'var(--accent)' : 'var(--surface-0)',
                  color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                  border: active ? '1px solid transparent' : '1px solid var(--border-subtle)',
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Cards Grid */}
      {items.length === 0 ? (
        <div
          className="flex flex-col items-center gap-2 rounded-2xl p-10 text-center"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="text-[14px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            No matching categories or prototypes
          </div>
          <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
            Try searching for “table”, “RBAC”, “settings”, “kanban”, “drawer”, or reset filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDomain('all');
            }}
            className="mt-1 rounded-lg px-3 py-1.5 text-[12px] font-medium"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Show all {SPECIMENS.length} categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map(({ spec, selectedCount, matchingVariants }) => {
            const Icon = icons[spec.id];
            const previewVariants = normalized ? matchingVariants.slice(0, 6) : matchingVariants.slice(0, 4);
            const remaining = matchingVariants.length - previewVariants.length;

            return (
              <div
                key={spec.id}
                className="flex flex-col justify-between gap-3 rounded-2xl p-4 transition-colors"
                style={{
                  background: 'var(--surface-1)',
                  border: selectedCount > 0 ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onJump(spec.id)}
                      className="flex min-w-0 items-center gap-2 text-left"
                    >
                      <span
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: 'var(--surface-2)', color: 'var(--ink-1)' }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                          {spec.title}
                        </div>
                        <div
                          className="text-[10.5px]"
                          style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                        >
                          Batch {spec.batch} · {spec.variants.length} demos
                        </div>
                      </div>
                    </button>

                    {selectedCount > 0 ? (
                      <span
                        className="tabular-nums-auto inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: 'var(--accent)', color: 'var(--accent-ink)', fontFamily: 'var(--dial-font-mono)' }}
                      >
                        <Check className="h-2.5 w-2.5" /> {selectedCount}
                      </span>
                    ) : (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px]"
                        style={{ background: 'var(--surface-0)', color: 'var(--ink-3)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}
                      >
                        Todo
                      </span>
                    )}
                  </div>

                  <p className="line-clamp-2 text-[12px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                    {spec.subtitle}
                  </p>

                  {/* Clickable deep-link prototype chips */}
                  <div className="flex flex-wrap gap-1">
                    {previewVariants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => onJump(spec.id, v.id)}
                        className="max-w-full truncate rounded-md px-2 py-0.5 text-[10.5px] transition-colors"
                        style={{
                          background: 'var(--surface-0)',
                          color: 'var(--ink-2)',
                          border: '1px solid var(--border-subtle)',
                        }}
                        title={`Jump straight to ${v.name}`}
                      >
                        {v.name}
                      </button>
                    ))}
                    {remaining > 0 && (
                      <button
                        type="button"
                        onClick={() => onJump(spec.id)}
                        className="rounded-md px-2 py-0.5 text-[10.5px]"
                        style={{ background: 'var(--surface-2)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
                      >
                        +{remaining} more
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onJump(spec.id)}
                  className="craft-pressable craft-focus flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-[11.5px] font-medium"
                  style={{
                    background: 'var(--surface-0)',
                    color: 'var(--ink-1)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span>Open interactive stage</span>
                  <ArrowRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
