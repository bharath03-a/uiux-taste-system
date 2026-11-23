import { useState } from 'react';
import {
  ChevronRight,
  Command,
  FolderKanban,
  Inbox,
  Layers,
  PanelLeft,
  PanelRight,
  Pin,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const NAV_ITEMS = [
  { id: 'inbox', label: 'Inbox', breakLabel: 'Triage & Incoming Reviews', icon: Inbox, count: 6 },
  { id: 'projects', label: 'Projects', breakLabel: 'Active Product Workspaces', icon: FolderKanban, count: 12 },
  { id: 'tokens', label: 'Tokens', breakLabel: 'Semantic Design System Tokens', icon: Layers, count: 24 },
  { id: 'settings', label: 'Settings', breakLabel: 'Organization & Harness Settings', icon: Settings },
];

const MASTER_THREADS = [
  {
    id: 't1',
    title: 'Button pressScale audit',
    breakTitle: 'Calibrate Tactile Button pressScale Across All Registry Primitives',
    meta: '2m',
    body: 'Verified 0.975 tactile bevel across dark & light surfaces with zero layout shift.',
    unread: true,
  },
  {
    id: 't2',
    title: 'Concentric radius math',
    breakTitle: 'Enforce Outer Minus Padding Concentric Radii Invariant',
    meta: '18m',
    body: 'Outer 10px card pairs with inner 6px buttons so corners stay optically nested.',
    unread: true,
  },
  {
    id: 't3',
    title: 'Zero-LLM lint rules',
    breakTitle: 'Deterministic Contrast & Anti-Slop Linter Spec',
    meta: '1h',
    body: 'Blocks raw hex colors, arbitrary Tailwind spacing, and sub-4.5:1 text slots.',
    unread: false,
  },
];

export function AppShellSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [active, setActive] = useState('projects');
  const [collapsed, setCollapsed] = useState(false);
  const [peekHover, setPeekHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [moduleId, setModuleId] = useState<'ui' | 'skills'>('ui');

  // Three-pane master-detail state
  const [selectedThreadId, setSelectedThreadId] = useState('t1');

  // Collapsible right inspector state
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [inspectorTab, setInspectorTab] = useState<'props' | 'ai'>('props');

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;
  const activeItem = NAV_ITEMS.find((n) => n.id === active) ?? NAV_ITEMS[0];

  const shellHeight = '248px';

  // 07. Three-Pane Master–Detail Shell
  if (variantId === 'three-pane-master-detail') {
    const selectedThread =
      MASTER_THREADS.find((t) => t.id === selectedThreadId) ?? MASTER_THREADS[0];

    return (
      <div
        className="flex overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        {/* Slim icon rail */}
        {!mobilePreview && (
          <div
            className="flex w-9 shrink-0 flex-col items-center gap-1.5 py-2.5"
            style={{
              background: 'var(--surface-recessed)',
              borderRight: '1px solid var(--border-subtle)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isAct = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  title={item.label}
                  className="craft-pressable inline-flex h-6 w-6 items-center justify-center rounded-md"
                  style={{
                    background: isAct ? 'var(--accent)' : 'transparent',
                    color: isAct ? 'var(--accent-ink)' : 'var(--ink-3)',
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        )}

        {/* Scrollable Master List */}
        <div
          className="flex shrink-0 flex-col overflow-y-auto"
          style={{
            width: mobilePreview ? '126px' : '156px',
            background: 'var(--surface-0)',
            borderRight: '1px solid var(--border-subtle)',
          }}
        >
          <div
            className="flex items-center justify-between px-2.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em]"
            style={{
              borderBottom: '1px solid var(--border-subtle)',
              color: 'var(--ink-3)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            <span>{activeItem.label}</span>
            <span className="tabular-nums-auto">{MASTER_THREADS.length}</span>
          </div>
          <div className="flex flex-col gap-0.5 p-1.5">
            {MASTER_THREADS.map((t) => {
              const isSel = t.id === selectedThreadId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedThreadId(t.id)}
                  className="flex flex-col gap-0.5 px-2 py-1.5 text-left transition-colors"
                  style={{
                    borderRadius: `${innerR}px`,
                    background: isSel ? 'var(--surface-2)' : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="truncate text-[11.5px] font-medium"
                      style={{ color: isSel ? 'var(--ink-1)' : 'var(--ink-2)' }}
                    >
                      {breakUi ? t.breakTitle : t.title}
                    </span>
                    {t.unread && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                  </div>
                  <span
                    className="tabular-nums-auto text-[10px]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {t.meta} ago
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Canvas */}
        <div
          className="flex min-w-0 flex-1 flex-col justify-between p-3.5"
          style={{ background: 'var(--surface-1)' }}
        >
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.06em]"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              Detail · {selectedThread.meta} ago
            </div>
            <div className="mt-1 truncate text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              {breakUi ? selectedThread.breakTitle : selectedThread.title}
            </div>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
              {selectedThread.body}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="px-2 py-0.5 text-[10.5px] font-medium"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${Math.max(4, innerR - 2)}px`,
                color: 'var(--ink-2)',
              }}
            >
              Triage ready
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 08. Minimal Canvas + Floating Bottom Dock
  if (variantId === 'bottom-floating-dock') {
    return (
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div className="flex flex-1 flex-col justify-start p-4 pb-16">
          <div className="flex items-center justify-between">
            <span
              className="text-[10.5px] uppercase tracking-[0.06em]"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              Full-bleed Stage
            </span>
            <span
              className="tabular-nums-auto text-[10.5px]"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              100% canvas width
            </span>
          </div>
          <div className="mt-1 truncate text-[15px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {breakUi ? activeItem.breakLabel : activeItem.label}
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
            Zero sidebars or top bars—navigation lives in a calm floating pill anchored below.
          </p>
        </div>

        {/* Floating Bottom Dock */}
        <div className="pointer-events-none absolute right-0 bottom-3 left-0 flex justify-center px-3">
          <nav
            className="pointer-events-auto inline-flex items-center gap-1 rounded-full p-1"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isAct = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className="craft-pressable inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11.5px] font-medium transition-colors"
                  style={{
                    background: isAct ? 'var(--accent)' : 'transparent',
                    color: isAct ? 'var(--accent-ink)' : 'var(--ink-2)',
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {(!mobilePreview || isAct) && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    );
  }

  // 09. Global Top Bar + Sub-Sidebar
  if (variantId === 'split-header-sidebar') {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        {/* Full-width Global Top Header */}
        <header
          className="flex h-9 shrink-0 items-center justify-between gap-2 px-3"
          style={{
            background: 'var(--surface-recessed)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="flex min-w-0 items-center gap-2 text-[12px]">
            <span
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="truncate font-semibold" style={{ color: 'var(--ink-1)' }}>
              {breakUi ? 'acme-enterprise-org' : 'acme-org'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10.5px]"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--ink-3)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              <Search className="h-2.5 w-2.5" />
              ⌘K
            </span>
          </div>
        </header>

        {/* Sub-Sidebar + Main Stage */}
        <div className="flex min-h-0 flex-1">
          <aside
            className="flex shrink-0 flex-col gap-1 p-2"
            style={{
              width: mobilePreview ? '46px' : '132px',
              background: 'var(--surface-0)',
              borderRight: '1px solid var(--border-subtle)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isAct = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className="flex items-center gap-2 px-2 py-1.5 text-left text-[11.5px] font-medium"
                  style={{
                    borderRadius: `${innerR}px`,
                    background: isAct ? 'var(--surface-2)' : 'transparent',
                    color: isAct ? 'var(--ink-1)' : 'var(--ink-2)',
                    justifyContent: mobilePreview ? 'center' : 'flex-start',
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  {!mobilePreview && (
                    <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                  )}
                </button>
              );
            })}
          </aside>

          <MainStagePreview item={activeItem} breakUi={breakUi} innerR={innerR} />
        </div>
      </div>
    );
  }

  // 10. Canvas + Toggleable Right Inspector
  if (variantId === 'collapsible-inspector-shell') {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div
          className="flex h-9 shrink-0 items-center justify-between gap-2 px-3"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="flex items-center gap-1.5">
            {NAV_ITEMS.slice(0, 3).map((item) => {
              const isAct = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className="px-2 py-1 text-[11.5px] font-medium transition-colors"
                  style={{
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                    background: isAct ? 'var(--surface-2)' : 'transparent',
                    color: isAct ? 'var(--ink-1)' : 'var(--ink-3)',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setInspectorOpen((v) => !v)}
            className="craft-pressable inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium"
            style={{
              borderRadius: `${Math.max(4, innerR - 2)}px`,
              background: inspectorOpen ? 'var(--accent)' : 'var(--surface-1)',
              color: inspectorOpen ? 'var(--accent-ink)' : 'var(--ink-2)',
              border: inspectorOpen ? '1px solid transparent' : '1px solid var(--border-subtle)',
            }}
          >
            <PanelRight className="h-3 w-3" />
            <span>{inspectorOpen ? 'Hide' : 'Inspect'}</span>
          </button>
        </div>

        <div className="flex min-h-0 flex-1">
          <MainStagePreview item={activeItem} breakUi={breakUi} innerR={innerR} />

          {inspectorOpen && (
            <aside
              className="flex shrink-0 flex-col gap-2 p-2.5"
              style={{
                width: mobilePreview ? '140px' : '168px',
                background: 'var(--surface-0)',
                borderLeft: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="grid grid-cols-2 gap-1 p-0.5"
                style={{
                  background: 'var(--surface-recessed)',
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                }}
              >
                {(
                  [
                    ['props', 'Props'],
                    ['ai', 'Copilot'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInspectorTab(id)}
                    className="py-1 text-[10.5px] font-medium"
                    style={{
                      borderRadius: `${Math.max(3, innerR - 3)}px`,
                      background: inspectorTab === id ? 'var(--surface-1)' : 'transparent',
                      color: inspectorTab === id ? 'var(--ink-1)' : 'var(--ink-3)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {inspectorTab === 'props' ? (
                <div className="flex flex-col gap-1.5 text-[11px]">
                  <div className="flex items-center justify-between" style={{ color: 'var(--ink-2)' }}>
                    <span className="inline-flex items-center gap-1">
                      <SlidersHorizontal className="h-3 w-3 opacity-70" />
                      Radius
                    </span>
                    <span
                      className="tabular-nums-auto"
                      style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {outerR}px
                    </span>
                  </div>
                  <div className="flex items-center justify-between" style={{ color: 'var(--ink-2)' }}>
                    <span>Density</span>
                    <span
                      style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {dials.density}
                    </span>
                  </div>
                  <div className="flex items-center justify-between" style={{ color: 'var(--ink-2)' }}>
                    <span>Motion</span>
                    <span
                      style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {dials.motionMode}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 text-[11px]" style={{ color: 'var(--ink-2)' }}>
                  <div className="font-medium" style={{ color: 'var(--ink-1)' }}>
                    Taste Copilot
                  </div>
                  <p className="leading-snug text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
                    All surfaces pass 4.5:1 AA contrast with concentric radii active.
                  </p>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    );
  }

  // 03. Horizontal Top Nav + Tab Strip (Vercel dashboard style)
  if (variantId === 'top-bar-subnav') {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div
          className="flex items-center justify-between px-3.5 py-2"
          style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex min-w-0 items-center gap-1.5 text-[12px]">
            <span
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="truncate font-semibold" style={{ color: 'var(--ink-1)' }}>
              studio
            </span>
            <span style={{ color: 'var(--ink-3)' }}>/</span>
            <span className="truncate" style={{ color: 'var(--ink-2)' }}>
              {breakUi ? 'enterprise-design-system' : 'taste-lab'}
            </span>
          </div>
          <span
            className="rounded px-1.5 py-0.5 text-[10.5px]"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--ink-3)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            ⌘K
          </span>
        </div>

        {/* Subnav strip */}
        <div
          className="flex items-center gap-4 overflow-x-auto px-3.5"
          style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isAct = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className="relative inline-flex shrink-0 items-center gap-1.5 py-2 text-[12px] font-medium"
                style={{ color: isAct ? 'var(--ink-1)' : 'var(--ink-3)' }}
              >
                <Icon className="h-3.5 w-3.5 opacity-80" />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className="tabular-nums-auto rounded-full px-1.5 py-0.2 text-[10px]"
                    style={{
                      background: isAct ? 'var(--accent)' : 'var(--surface-2)',
                      color: isAct ? 'var(--accent-ink)' : 'var(--ink-2)',
                      fontFamily: 'var(--dial-font-mono)',
                    }}
                  >
                    {item.count}
                  </span>
                )}
                {isAct && (
                  <span
                    className="absolute right-0 bottom-0 left-0 h-[2px] rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <MainStagePreview item={activeItem} breakUi={breakUi} innerR={innerR} />
      </div>
    );
  }

  // 05. Chromeless Breadcrumb + ⌘K Shell
  if (variantId === 'command-first-minimal') {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div
          className="flex items-center justify-between gap-2 px-3.5 py-2.5"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex min-w-0 items-center gap-1 text-[12px]">
            <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>
              studio
            </span>
            <ChevronRight className="h-3 w-3 shrink-0" style={{ color: 'var(--ink-3)' }} />
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="truncate bg-transparent font-semibold outline-none"
              style={{ color: 'var(--ink-1)' }}
            >
              {NAV_ITEMS.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() =>
              setActive(NAV_ITEMS[(NAV_ITEMS.findIndex((x) => x.id === active) + 1) % NAV_ITEMS.length].id)
            }
            className="craft-pressable inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px]"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--ink-2)',
            }}
          >
            <Search className="h-3 w-3" />
            <span>Jump</span>
            <kbd style={{ fontFamily: 'var(--dial-font-mono)', opacity: 0.7 }}>⌘K</kbd>
          </button>
        </div>

        <MainStagePreview item={activeItem} breakUi={breakUi} innerR={innerR} />
      </div>
    );
  }

  // 04. Dual-Rail IDE Shell
  if (variantId === 'dual-rail-ide') {
    return (
      <div
        className="flex overflow-hidden"
        style={{
          height: shellHeight,
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        {/* Outer 40px icon rail */}
        <div
          className="flex w-10 shrink-0 flex-col items-center gap-1.5 py-2.5"
          style={{ background: 'var(--surface-recessed)', borderRight: '1px solid var(--border-subtle)' }}
        >
          {(
            [
              ['ui', Layers],
              ['skills', Command],
            ] as const
          ).map(([id, Icon]) => {
            const act = moduleId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setModuleId(id)}
                className="craft-pressable inline-flex h-7 w-7 items-center justify-center rounded-md"
                style={{
                  background: act ? 'var(--accent)' : 'transparent',
                  color: act ? 'var(--accent-ink)' : 'var(--ink-3)',
                }}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>

        {/* Contextual sub-sidebar */}
        {!mobilePreview && (
          <div
            className="flex w-[124px] shrink-0 flex-col gap-1 p-2"
            style={{ background: 'var(--surface-1)', borderRight: '1px solid var(--border-subtle)' }}
          >
            <div
              className="px-1.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {moduleId === 'ui' ? 'UI System' : 'Agent Skills'}
            </div>
            {NAV_ITEMS.map((item) => {
              const isAct = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className="truncate px-2 py-1 text-left text-[11.5px] font-medium"
                  style={{
                    borderRadius: `${innerR}px`,
                    background: isAct ? 'var(--surface-2)' : 'transparent',
                    color: isAct ? 'var(--ink-1)' : 'var(--ink-2)',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        <MainStagePreview item={activeItem} breakUi={breakUi} innerR={innerR} />
      </div>
    );
  }

  // 01. Linear Collapsible Rail, 02. Floating Inset Canvas, 06. Auto-Slim Hover Peek
  const isInset = variantId === 'floating-inset-canvas';
  const isPeek = variantId === 'hover-peek-drawer';
  const isSlim = isPeek ? !peekHover && !pinned : collapsed || mobilePreview;

  return (
    <div
      className="flex overflow-hidden"
      style={{
        height: shellHeight,
        background: isInset ? 'var(--surface-0)' : 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderRadius: `${outerR}px`,
        padding: isInset ? '6px' : '0px',
        gap: isInset ? '6px' : '0px',
      }}
    >
      {/* Sidebar */}
      <aside
        onMouseEnter={() => isPeek && setPeekHover(true)}
        onMouseLeave={() => isPeek && setPeekHover(false)}
        className="flex shrink-0 flex-col justify-between p-2 transition-all duration-200"
        style={{
          width: isSlim ? '46px' : '150px',
          background: isInset ? 'transparent' : 'var(--surface-0)',
          borderRight: isInset ? 'none' : '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="mb-1 flex items-center justify-between px-1">
            {!isSlim && (
              <span className="truncate text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                studio-core
              </span>
            )}
            <button
              type="button"
              onClick={() => (isPeek ? setPinned((v) => !v) : setCollapsed((v) => !v))}
              title={isPeek ? (pinned ? 'Unpin sidebar' : 'Pin sidebar') : 'Toggle collapse'}
              className="craft-pressable inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
              style={{
                background: isPeek && pinned ? 'var(--accent)' : 'transparent',
                color: isPeek && pinned ? 'var(--accent-ink)' : 'var(--ink-3)',
              }}
            >
              {isPeek ? <Pin className="h-3 w-3" /> : <PanelLeft className="h-3.5 w-3.5" />}
            </button>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isAct = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                title={item.label}
                className="flex items-center justify-between gap-2 px-2 py-1.5 text-left text-[12px] font-medium transition-colors"
                style={{
                  borderRadius: `${innerR}px`,
                  background: isAct ? (isInset ? 'var(--surface-1)' : 'var(--surface-2)') : 'transparent',
                  color: isAct ? 'var(--ink-1)' : 'var(--ink-2)',
                  boxShadow: isAct && isInset ? 'var(--shadow-sm)' : 'none',
                  justifyContent: isSlim ? 'center' : 'space-between',
                }}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  {!isSlim && (
                    <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                  )}
                </span>
                {!isSlim && item.count !== undefined && (
                  <span
                    className="tabular-nums-auto text-[10.5px]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!isSlim && (
          <div className="px-2 text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
            {isPeek ? (pinned ? 'Pinned open' : 'Hover peek') : 'Click icon to collapse'}
          </div>
        )}
      </aside>

      {/* Main Content Stage */}
      <div
        className="flex min-w-0 flex-1 flex-col overflow-hidden"
        style={{
          background: 'var(--surface-1)',
          border: isInset ? '1px solid var(--border-subtle)' : 'none',
          borderRadius: isInset ? `${innerR}px` : '0px',
        }}
      >
        <MainStagePreview item={activeItem} breakUi={breakUi} innerR={innerR} />
      </div>
    </div>
  );
}

function MainStagePreview({
  item,
  breakUi,
  innerR,
}: {
  item: (typeof NAV_ITEMS)[number];
  breakUi: boolean;
  innerR: number;
}) {
  return (
    <div className="flex flex-1 flex-col justify-between p-3.5">
      <div>
        <div
          className="text-[10.5px] uppercase tracking-[0.06em]"
          style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
        >
          Active View
        </div>
        <div className="mt-0.5 truncate text-[14px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {breakUi ? item.breakLabel : item.label}
        </div>
        <p className="mt-1 text-[12px] leading-snug text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
          Spatial chrome stays quiet while content owns the focal point.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {['Contrast 100%', '0 drift rules'].map((stat) => (
          <div
            key={stat}
            className="truncate px-2.5 py-2 text-[11.5px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-2)',
            }}
          >
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}
