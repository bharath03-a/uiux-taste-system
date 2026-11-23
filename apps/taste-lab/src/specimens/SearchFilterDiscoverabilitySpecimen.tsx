import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Filter,
  Keyboard,
  LayoutGrid,
  List,
  Pin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function SearchFilterDiscoverabilitySpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'global-omni-search-tabs':
      return <GlobalOmniSearchTabs ctx={ctx} />;
    case 'visual-category-gallery':
      return <VisualCategoryGallery ctx={ctx} />;
    case 'horizontal-facet-chip-bar':
      return <HorizontalFacetChipBar ctx={ctx} />;
    case 'left-faceted-sidebar-results':
      return <LeftFacetedSidebarResults ctx={ctx} />;
    case 'breadcrumb-sibling-switcher':
      return <BreadcrumbSiblingSwitcher ctx={ctx} />;
    case 'shortcut-overlay-coachmark':
      return <ShortcutOverlayCoachmark ctx={ctx} />;
    case 'smart-empty-search-recovery':
      return <SmartEmptySearchRecovery ctx={ctx} />;
    case 'recently-viewed-pinned-strip':
      return <RecentlyViewedPinnedStrip ctx={ctx} />;
    case 'sticky-section-jump-pills':
      return <StickySectionJumpPills ctx={ctx} />;
    case 'progressive-disclosure-inspector':
      return <ProgressiveDisclosureInspector ctx={ctx} />;
    default:
      return null;
  }
}

// 01 · Global Omni-Search with Scoped Entity Tabs
function GlobalOmniSearchTabs({ ctx }: { ctx: SpecimenContext }) {
  const [scope, setScope] = useState<'all' | 'apps' | 'people' | 'settings'>('all');
  const [q, setQ] = useState('');
  const entries = [
    { id: '1', type: 'apps', title: 'Billing Core API', sub: 'Production · us-east' },
    { id: '2', type: 'people', title: 'A. Chen (Admin)', sub: 'achen@acme.io' },
    { id: '3', type: 'settings', title: 'SAML / SCIM Provisioning', sub: 'Security Settings' },
    { id: '4', type: 'apps', title: 'Claims Ingestion Worker', sub: 'Degraded · p95 284ms' },
  ];
  const filtered = entries.filter(
    (e) =>
      (scope === 'all' || e.type === scope) &&
      (!q.trim() || `${e.title} ${e.sub}`.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <Search className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search apps, people, or settings…"
          className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
          style={{ color: 'var(--ink-1)' }}
        />
        <kbd className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-2)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>⌘K</kbd>
      </div>
      <div className="flex gap-1 px-3 py-1.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        {(['all', 'apps', 'people', 'settings'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className="rounded px-2 py-0.5 text-[10.5px] font-medium capitalize"
            style={{ background: scope === s ? 'var(--accent)' : 'var(--surface-1)', color: scope === s ? 'var(--accent-ink)' : 'var(--ink-2)' }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {filtered.map((e) => (
          <div key={e.id} className="flex items-center justify-between px-3 py-2 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{ctx.breakUi ? `${e.title} · Primary` : e.title}</div>
              <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{e.sub}</div>
            </div>
            <span className="rounded px-1.5 py-0.5 text-[9.5px] uppercase" style={{ background: 'var(--surface-1)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{e.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 02 · Visual Category Gallery & Bento Directory
function VisualCategoryGallery({ ctx }: { ctx: SpecimenContext }) {
  const [selected, setSelected] = useState('Tables');
  const cards = [
    { name: 'Tables', count: 20, tags: ['Saved Views', 'Pinned Cols', 'Bulk'] },
    { name: 'RBAC', count: 10, tags: ['Matrix', 'Audit Diff', 'JIT'] },
    { name: 'App Config', count: 10, tags: ['Flags', 'Secrets', 'Webhooks'] },
  ];

  return (
    <div className={`grid gap-2 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {cards.map((c) => (
        <button
          key={c.name}
          type="button"
          onClick={() => setSelected(c.name)}
          className="flex flex-col gap-1.5 rounded-xl p-3 text-left"
          style={{
            background: selected === c.name ? 'var(--surface-2)' : 'var(--surface-0)',
            border: `1px solid ${selected === c.name ? 'var(--accent)' : 'var(--border-subtle)'}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>{c.name}</span>
            <span className="tabular-nums-auto rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{c.count}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {c.tags.map((t) => (
              <span key={t} className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)' }}>{t}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

// 03 · Horizontal Collapsible Facet Bar + Active Filter Chips
function HorizontalFacetChipBar({ ctx }: { ctx: SpecimenContext }) {
  const [chips, setChips] = useState(['Env: Production', 'Region: us-east', 'Owner: Platform']);
  const presets = ['Status: Degraded', 'Tier: Enterprise', 'Alerts: Active'];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex flex-wrap items-center gap-1.5">
        <Filter className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
        {chips.map((c) => (
          <span key={c} className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px]" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
            {c}
            <button type="button" onClick={() => setChips((prev) => prev.filter((x) => x !== c))} aria-label={`Remove ${c}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {chips.length > 0 && (
          <button type="button" onClick={() => setChips([])} className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-1.5 pt-1" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <span className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>Quick add:</span>
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setChips((prev) => (prev.includes(p) ? prev : [...prev, p]))}
            className="rounded px-2 py-0.5 text-[10.5px]"
            style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
          >
            + {ctx.breakUi ? `${p} (v2)` : p}
          </button>
        ))}
      </div>
    </div>
  );
}

// 04 · Left Faceted Sidebar + Result Sort & Grid/List Switcher
function LeftFacetedSidebarResults({ ctx }: { ctx: SpecimenContext }) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedEnv, setSelectedEnv] = useState<string>('All');
  const items = [
    { name: 'Auth Gateway', env: 'Prod' },
    { name: 'Billing API', env: 'Prod' },
    { name: 'Preview Worker', env: 'Staging' },
    { name: 'Docs Indexer', env: 'Staging' },
  ].filter((i) => selectedEnv === 'All' || i.env === selectedEnv);

  return (
    <div className={`grid overflow-hidden ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-[140px_1fr]'}`} style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex flex-col gap-1 p-2.5" style={{ background: 'var(--surface-1)', borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
        <span className="px-1 text-[10px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>Environment</span>
        {['All', 'Prod', 'Staging'].map((env) => (
          <button key={env} type="button" onClick={() => setSelectedEnv(env)} className="rounded px-2 py-1 text-left text-[11.5px]" style={{ background: selectedEnv === env ? 'var(--surface-2)' : 'transparent', color: selectedEnv === env ? 'var(--ink-1)' : 'var(--ink-2)' }}>
            {env}
          </button>
        ))}
      </div>
      <div className="p-2.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{items.length} results</span>
          <div className="flex gap-1">
            <button type="button" onClick={() => setLayout('grid')} className="rounded p-1" style={{ background: layout === 'grid' ? 'var(--surface-2)' : 'transparent', color: 'var(--ink-1)' }} aria-label="Grid view">
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => setLayout('list')} className="rounded p-1" style={{ background: layout === 'list' ? 'var(--surface-2)' : 'transparent', color: 'var(--ink-1)' }} aria-label="List view">
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className={layout === 'grid' ? 'grid grid-cols-2 gap-1.5' : 'flex flex-col gap-1'}>
          {items.map((i) => (
            <div key={i.name} className="rounded-md p-2 text-[11.5px]" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
              <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{i.name}</div>
              <div className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{i.env}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 05 · Visual Breadcrumb + Sibling Dropdown Switcher
function BreadcrumbSiblingSwitcher({ ctx }: { ctx: SpecimenContext }) {
  const [service, setService] = useState('Billing Core API');
  const [open, setOpen] = useState(false);
  const siblings = ['Billing Core API', 'Claims Ingestion Worker', 'Identity SSO Gateway'];

  return (
    <div className="relative flex flex-wrap items-center gap-1.5 rounded-xl px-3 py-2.5 text-[12px]" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <span style={{ color: 'var(--ink-3)' }}>Acme Org</span>
      <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
      <span style={{ color: 'var(--ink-3)' }}>Applications</span>
      <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold"
        style={{ background: 'var(--surface-2)', color: 'var(--ink-1)' }}
      >
        <span>{ctx.breakUi ? `${service} (v4)` : service}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute left-36 top-full z-20 mt-1 flex w-52 flex-col gap-0.5 rounded-lg p-1" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-md)' }}>
          {siblings.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setService(s);
                setOpen(false);
              }}
              className="rounded px-2 py-1.5 text-left text-[11.5px]"
              style={{ background: s === service ? 'var(--surface-2)' : 'transparent', color: 'var(--ink-1)' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 06 · Keyboard Shortcut Overlay & Feature Discovery Coachmark
function ShortcutOverlayCoachmark({ ctx }: { ctx: SpecimenContext }) {
  const [dismissed, setDismissed] = useState(false);
  const keys = [
    { chord: '⌘ K', desc: 'Global quick jump' },
    { chord: 'G then A', desc: 'Go to Applications' },
    { chord: '/', desc: 'Focus table filter' },
    { chord: 'Shift + ?', desc: 'Toggle shortcuts' },
  ];

  return (
    <div className="flex flex-col gap-2">
      {!dismissed && (
        <div className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[11.5px]" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}>
          <span className="flex items-center gap-1.5" style={{ color: 'var(--ink-1)' }}>
            <Sparkles className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
            New: Press ⌘K anywhere to jump straight to any table view or setting.
          </span>
          <button type="button" onClick={() => setDismissed(true)} className="text-[11px] font-medium" style={{ color: 'var(--ink-2)' }}>
            Got it
          </button>
        </div>
      )}
      <div className={`grid gap-1.5 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {keys.map((k) => (
          <div key={k.chord} className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11.5px]" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
            <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--ink-2)' }}>
              <Keyboard className="h-3 w-3" style={{ color: 'var(--ink-3)' }} /> {k.desc}
            </span>
            <kbd className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-2)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{k.chord}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

// 07 · Smart Empty Search + Typo Suggestion & Popular Jumps
function SmartEmptySearchRecovery({ ctx }: { ctx: SpecimenContext }) {
  const [query, setQuery] = useState('bilng-api');
  const recovered = query === 'Billing Core API';

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl p-4 text-center" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      {recovered ? (
        <div className="text-[12px] font-medium" style={{ color: 'var(--success)' }}>
          ✓ Showing 4 results for “Billing Core API”
        </div>
      ) : (
        <>
          <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            No results for “{ctx.breakUi ? 'bilng-api-prod-cluster-2026' : query}”
          </div>
          <div className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
            Did you mean{' '}
            <button type="button" onClick={() => setQuery('Billing Core API')} className="font-semibold underline" style={{ color: 'var(--accent)' }}>
              Billing Core API
            </button>
            ?
          </div>
          <div className="mt-1 flex flex-wrap justify-center gap-1.5">
            {['Saved Views', 'Audit Logs', 'Feature Flags'].map((tag) => (
              <button key={tag} type="button" onClick={() => setQuery('Billing Core API')} className="rounded-md px-2 py-0.5 text-[11px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}>
                Jump: {tag}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 08 · Recently Viewed, Pinned & Favorites Strip
function RecentlyViewedPinnedStrip({ ctx }: { ctx: SpecimenContext }) {
  const [pinned, setPinned] = useState<string[]>(['v1']);
  const items = [
    { id: 'v1', name: 'Prod Applications Grid', time: '2m ago' },
    { id: 'v2', name: 'RBAC Role Matrix', time: '18m ago' },
    { id: 'v3', name: 'Webhook Delivery Log', time: '1h ago' },
  ];

  return (
    <div className={`grid gap-2 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {items.map((it) => {
        const isPin = pinned.includes(it.id);
        return (
          <div key={it.id} className="flex items-start justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-0)', border: `1px solid ${isPin ? 'var(--accent)' : 'var(--border-subtle)'}` }}>
            <div className="min-w-0">
              <div className="truncate text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>{it.name}</div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                <Clock className="h-2.5 w-2.5" /> {it.time}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPinned((p) => (p.includes(it.id) ? p.filter((x) => x !== it.id) : [...p, it.id]))}
              aria-label="Pin item"
              style={{ color: isPin ? 'var(--accent)' : 'var(--ink-3)' }}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// 09 · Sticky Inline Section Jump Bar (Page TOC Pills)
function StickySectionJumpPills({ ctx }: { ctx: SpecimenContext }) {
  const [active, setActive] = useState('Overview');
  const sections = ['Overview', 'Environments', 'Secrets', 'RBAC', 'Webhooks', 'Audit'];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex flex-wrap items-center gap-1.5">
        <Compass className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            className="rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors"
            style={{
              background: active === s ? 'var(--accent)' : 'var(--surface-1)',
              color: active === s ? 'var(--accent-ink)' : 'var(--ink-2)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="rounded-lg p-2.5 text-[11.5px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)' }}>
        Focused section: <strong style={{ color: 'var(--ink-1)' }}>{ctx.breakUi ? `${active} Configuration & Guardrails` : active}</strong> — zero scroll hunting on long pages.
      </div>
    </div>
  );
}

// 10 · Progressive Disclosure Inspector (Summary -> Advanced Fields)
function ProgressiveDisclosureInspector({ ctx }: { ctx: SpecimenContext }) {
  const [advanced, setAdvanced] = useState(false);

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>Billing Core API · Deployment Policy</div>
          <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>Auto-deploy on main · Canary 10% · Rollback enabled</div>
        </div>
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          className="rounded-md px-2 py-1 text-[11px] font-medium"
          style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
        >
          {advanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
      </div>
      {advanced && (
        <div className="rounded-lg p-2.5 text-[11px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)', border: '1px solid var(--border-subtle)' }}>
          {ctx.breakUi
            ? '{"maxSurge":"25%","healthGraceSec":45,"drainTimeoutSec":120,"circuitBreaker":"strict"}'
            : '{"maxSurge":"25%","healthGraceSec":45,"rollbackOn5xx":true}'}
        </div>
      )}
    </div>
  );
}
