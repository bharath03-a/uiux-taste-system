import { useId, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  Home,
  LayoutGrid,
  MoreHorizontal,
  Search,
  Settings,
  User,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function NavigationHeadersSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'crisp-marketing-navbar':
      return <CrispMarketingNavbar ctx={ctx} />;
    case 'mega-menu-popover':
      return <MegaMenuPopover ctx={ctx} />;
    case 'breadcrumb-overflow-trail':
      return <BreadcrumbOverflowTrail ctx={ctx} />;
    case 'sticky-page-header-actions':
      return <StickyPageHeaderActions ctx={ctx} />;
    case 'mobile-bottom-tab-bar':
      return <MobileBottomTabBar ctx={ctx} />;
    case 'pagination-with-pagesize':
      return <PaginationWithPageSize ctx={ctx} />;
    case 'tree-folder-sidebar':
      return <TreeFolderSidebar ctx={ctx} />;
    case 'docs-toc-anchor-rail':
      return <DocsTocAnchorRail ctx={ctx} />;
    case 'workspace-org-switcher':
      return <WorkspaceOrgSwitcher ctx={ctx} />;
    case 'global-search-header':
      return <GlobalSearchHeader ctx={ctx} />;
    default:
      return null;
  }
}

function CrispMarketingNavbar({ ctx }: { ctx: SpecimenContext }) {
  const [active, setActive] = useState('Product');
  const links = ['Product', 'Pricing', 'Docs', 'Changelog'];
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'var(--ink-1)' }}>
        {ctx.breakUi ? 'Meridian Cloud Platform' : 'Meridian'}
      </span>
      <div className="flex items-center gap-1">
        {links.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setActive(l)}
            className="rounded-md px-2 py-1 text-[11.5px] font-medium"
            style={{
              background: active === l ? 'var(--surface-2)' : 'transparent',
              color: active === l ? 'var(--ink-1)' : 'var(--ink-2)',
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="craft-pressable rounded-md px-2.5 py-1 text-[11.5px] font-semibold"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        Start Free
      </button>
    </div>
  );
}

function MegaMenuPopover({ ctx }: { ctx: SpecimenContext }) {
  const [open, setOpen] = useState(true);
  const items = [
    { title: 'Edge Functions', desc: 'Zero-cold-start compute at 35 regions' },
    { title: 'Vector Store', desc: 'Sub-10ms hybrid semantic search' },
    { title: 'Observability', desc: 'Live traces, logs & latency histograms' },
    { title: 'Audit Vault', desc: 'SOC2 immutable compliance exports' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="craft-pressable inline-flex w-fit items-center gap-1 rounded-md px-2.5 py-1.5 text-[12px] font-medium"
        style={{
          background: 'var(--surface-1)',
          color: 'var(--ink-1)',
          border: '1px solid var(--border-strong)',
        }}
      >
        Platform
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div
          className="grid grid-cols-1 gap-1.5 p-2 sm:grid-cols-2"
          style={{
            background: 'var(--surface-1)',
            borderRadius: 'var(--dial-radius)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {items.map((it) => (
            <button
              key={it.title}
              type="button"
              className="rounded-md p-2 text-left transition-colors hover:opacity-90"
              style={{ background: 'var(--surface-0)' }}
            >
              <div className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                {it.title}
              </div>
              <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                {ctx.breakUi ? `${it.desc} with automated failover & multi-region replication` : it.desc}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BreadcrumbOverflowTrail({ ctx }: { ctx: SpecimenContext }) {
  const [expanded, setExpanded] = useState(false);
  const middle = ['Platform', 'Billing Services', 'Invoices'];
  return (
    <div
      className="flex flex-wrap items-center gap-1 px-3 py-2.5 text-[12px]"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span style={{ color: 'var(--ink-3)' }}>Acme</span>
      <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
      {expanded ? (
        middle.map((m) => (
          <span key={m} className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--ink-2)' }}>{m}</span>
            <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
          </span>
        ))
      ) : (
        <>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center rounded px-1.5 py-0.5"
            style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}
            title="Expand hidden segments"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
          <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
        </>
      )}
      <span className="truncate font-semibold" style={{ color: 'var(--ink-1)' }}>
        {ctx.breakUi ? 'INV-2026-Q4-ENTERPRISE-CONSOLIDATED-00918' : 'INV-2026-0918'}
      </span>
    </div>
  );
}

function StickyPageHeaderActions({ ctx }: { ctx: SpecimenContext }) {
  const [saved, setSaved] = useState(false);
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="min-w-0">
        <div className="truncate text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? 'Production Deployment Pipeline & Rollback Policies' : 'Deployments'}
        </div>
        <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
          us-east-1 · 4 active replicas · healthy
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          className="craft-pressable rounded-md px-2.5 py-1.5 text-[11.5px] font-medium"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-strong)',
          }}
        >
          Logs
        </button>
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="craft-pressable rounded-md px-3 py-1.5 text-[11.5px] font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {saved ? 'Deploying…' : 'New Release'}
        </button>
      </div>
    </div>
  );
}

function MobileBottomTabBar({ ctx }: { ctx: SpecimenContext }) {
  const [tab, setTab] = useState('home');
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: ctx.breakUi ? 'Directory' : 'Apps', icon: LayoutGrid },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  return (
    <div
      className="grid grid-cols-4 gap-1 px-2 py-1.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
      }}
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className="craft-pressable flex flex-col items-center gap-0.5 rounded-md py-1.5"
            style={{
              background: active ? 'var(--accent-soft)' : 'transparent',
              color: active ? 'var(--ink-1)' : 'var(--ink-3)',
            }}
          >
            <Icon className="h-4 w-4" />
            <span className="text-[10.5px] font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PaginationWithPageSize({ ctx }: { ctx: SpecimenContext }) {
  const [page, setPage] = useState(2);
  const [size, setSize] = useState(25);
  const totalPages = ctx.breakUi ? 148 : 12;

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-2 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
        <span>Rows</span>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="rounded px-1.5 py-0.5 text-[11.5px]"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="tabular-nums-auto text-[11.5px]"
          style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
        >
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="craft-pressable inline-flex h-7 w-7 items-center justify-center rounded-md"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-subtle)',
          }}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="craft-pressable inline-flex h-7 w-7 items-center justify-center rounded-md"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-subtle)',
          }}
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function TreeFolderSidebar({ ctx }: { ctx: SpecimenContext }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('tokens.css');
  return (
    <div
      className="flex flex-col gap-1 p-2.5 text-[12px]"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 font-medium"
        style={{ color: 'var(--ink-1)' }}
      >
        {open ? <FolderOpen className="h-3.5 w-3.5" /> : <Folder className="h-3.5 w-3.5" />}
        <span>{ctx.breakUi ? 'design-system-semantic-primitives' : 'design-system'}</span>
      </button>
      {open && (
        <div className="ml-4 flex flex-col gap-0.5 pl-2" style={{ borderLeft: '1px solid var(--border-subtle)' }}>
          {['tokens.css', 'Button.tsx', 'Dialog.tsx'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelected(f)}
              className="rounded px-2 py-1 text-left text-[11.5px]"
              style={{
                background: selected === f ? 'var(--surface-2)' : 'transparent',
                color: selected === f ? 'var(--ink-1)' : 'var(--ink-2)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface TocItem {
  id: string;
  label: string;
  depth: 0 | 1;
}

interface MeasuredSlot {
  top: number;
  height: number;
}

function DocsTocAnchorRail({ ctx }: { ctx: SpecimenContext }) {
  const [activeId, setActiveId] = useState('contrast');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [railMode, setRailMode] = useState<'glide' | 'trail'>('glide');
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slots, setSlots] = useState<MeasuredSlot[]>([]);
  const [svgHeight, setSvgHeight] = useState(140);
  const uid = useId().replace(/:/g, '');

  const sections: TocItem[] = [
    { id: 'overview', label: 'Overview', depth: 0 },
    { id: 'tokens', label: 'Semantic Tokens', depth: 0 },
    { id: 'contrast', label: 'Contrast Math', depth: 1 },
    {
      id: 'apca',
      label: ctx.breakUi ? 'APCA W3 Perceptual Lightness (Lc)' : 'APCA W3 Lc',
      depth: 1,
    },
    {
      id: 'mcp',
      label: ctx.breakUi ? 'Multi-Framework Exports & MCP' : 'MCP Setup',
      depth: 0,
    },
  ];

  const activeIdx = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  );

  useLayoutEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const measure = () => {
      const next: MeasuredSlot[] = sections.map((_, i) => {
        const el = itemRefs.current[i];
        return el ? { top: el.offsetTop, height: el.offsetHeight } : { top: i * 26, height: 26 };
      });
      setSlots(next);
      setSvgHeight(Math.max(container.offsetHeight, 120));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [ctx.breakUi, ctx.mobilePreview, ctx.dials.density, ctx.dials.fontPairing]);

  // Build continuous stepped SVG rail following H2 (x=3) -> diagonal chamfer -> H3 (x=13)
  const X0 = 3;
  const X1 = 13;
  const INSET = 4;

  const pathD = (() => {
    if (slots.length === 0) return '';
    const cmds: string[] = [];
    slots.forEach((slot, i) => {
      const x = sections[i]?.depth === 1 ? X1 : X0;
      const yTop = slot.top + INSET;
      const yBot = slot.top + Math.max(slot.height - INSET, INSET + 6);
      if (i === 0) {
        cmds.push(`M ${x} ${yTop}`);
      } else {
        cmds.push(`L ${x} ${yTop}`);
      }
      cmds.push(`L ${x} ${yBot}`);
    });
    return cmds.join(' ');
  })();

  const activeSlot = slots[activeIdx] ?? { top: activeIdx * 26, height: 26 };
  const firstSlot = slots[0] ?? { top: 0, height: 26 };
  const hoverSlot = hoveredIdx !== null ? slots[hoveredIdx] ?? activeSlot : activeSlot;

  const activeClipY = railMode === 'trail' ? firstSlot.top + 2 : activeSlot.top + 2;
  const activeClipH =
    railMode === 'trail'
      ? Math.max(10, activeSlot.top + activeSlot.height - 2 - (firstSlot.top + 2))
      : Math.max(10, activeSlot.height - 4);

  const hoverClipY = hoverSlot.top + 2;
  const hoverClipH = Math.max(10, hoverSlot.height - 4);

  const railTransition =
    ctx.dials.motionMode === 'instant'
      ? { duration: 0 }
      : ctx.dials.motionMode === 'spring'
        ? {
            type: 'spring' as const,
            stiffness: ctx.dials.springStiffness,
            damping: ctx.dials.springDamping,
            mass: 0.65,
          }
        : {
            duration: ctx.dials.durationMs / 1000,
            ease: [0.22, 1, 0.36, 1] as const,
          };

  const hoverTransition =
    ctx.dials.motionMode === 'instant'
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 520, damping: 38, mass: 0.5 };

  const activeClipId = `toc-active-${uid}`;
  const hoverClipId = `toc-hover-${uid}`;

  return (
    <div
      className="flex flex-col gap-1.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="mb-0.5 flex items-center justify-between gap-2">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
        >
          On this page
        </span>
        <div
          className="inline-flex rounded-md p-0.5 text-[10px] font-medium"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {(['glide', 'trail'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setRailMode(m)}
              className="rounded px-1.5 py-0.5 capitalize transition-colors"
              style={{
                background: railMode === m ? 'var(--surface-2)' : 'transparent',
                color: railMode === m ? 'var(--ink-1)' : 'var(--ink-3)',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={listRef}
        className="relative flex flex-col"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {pathD && (
          <svg
            width={18}
            height={svgHeight}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 overflow-visible"
          >
            <defs>
              <clipPath id={hoverClipId}>
                <motion.rect
                  x={-2}
                  width={22}
                  initial={false}
                  animate={{ y: hoverClipY, height: hoverClipH }}
                  transition={hoverTransition}
                />
              </clipPath>
              <clipPath id={activeClipId}>
                <motion.rect
                  x={-2}
                  width={22}
                  initial={false}
                  animate={{ y: activeClipY, height: activeClipH }}
                  transition={railTransition}
                />
              </clipPath>
            </defs>

            {/* Continuous stepped base track */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Subtle hover ghost gliding along the stepped track */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              clipPath={`url(#${hoverClipId})`}
              style={{
                opacity: hoveredIdx !== null && hoveredIdx !== activeIdx ? 0.85 : 0,
                transition: 'opacity 140ms ease',
              }}
            />

            {/* Spring-animated active accent rail gliding around diagonal bends */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              clipPath={`url(#${activeClipId})`}
            />
          </svg>
        )}

        {sections.map((s, idx) => {
          const isAct = idx === activeIdx;
          const isPast = railMode === 'trail' && idx < activeIdx;
          return (
            <button
              key={s.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => setActiveId(s.id)}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`${s.depth === 1 ? 'pl-7' : 'pl-5'} py-1 text-left text-[11.5px] font-medium leading-snug transition-colors duration-150`}
              style={{
                color: isAct ? 'var(--ink-1)' : isPast ? 'var(--ink-2)' : 'var(--ink-3)',
              }}
            >
              <span
                className="inline-block transition-transform duration-150"
                style={{ transform: isAct ? 'translateX(2px)' : 'translateX(0px)' }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorkspaceOrgSwitcher({ ctx }: { ctx: SpecimenContext }) {
  const [org, setOrg] = useState('Acme Core');
  const orgs = ['Acme Core', 'Design Ops', 'Sandbox'];
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {org[0]}
        </span>
        <span className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? `${org} · Enterprise Production` : org}
        </span>
      </div>
      <div className="flex gap-1">
        {orgs.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setOrg(o)}
            className="rounded px-2 py-0.5 text-[11px] font-medium"
            style={{
              background: org === o ? 'var(--surface-2)' : 'transparent',
              color: org === o ? 'var(--ink-1)' : 'var(--ink-3)',
            }}
          >
            {o.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

function GlobalSearchHeader({ ctx }: { ctx: SpecimenContext }) {
  const [q, setQ] = useState('');
  return (
    <div
      className="flex items-center gap-2 px-3 py-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
      }}
    >
      <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={ctx.breakUi ? 'Search projects, deployments, team members, or run commands…' : 'Search or jump to…'}
        className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
        style={{ color: 'var(--ink-1)' }}
      />
      <kbd
        className="shrink-0 rounded px-1.5 py-0.5 text-[10px]"
        style={{
          background: 'var(--surface-0)',
          color: 'var(--ink-3)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        ⌘K
      </kbd>
    </div>
  );
}
