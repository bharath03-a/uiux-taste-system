import { useState } from 'react';
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

function DocsTocAnchorRail({ ctx }: { ctx: SpecimenContext }) {
  const [active, setActive] = useState('Contrast Math');
  const sections = ['Overview', 'Semantic Tokens', 'Contrast Math', ctx.breakUi ? 'Multi-Framework Exports' : 'MCP Setup'];
  return (
    <div
      className="flex flex-col gap-1 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em]"
        style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
      >
        On this page
      </div>
      <div className="flex flex-col" style={{ borderLeft: '1px solid var(--border-subtle)' }}>
        {sections.map((s) => {
          const isAct = active === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setActive(s)}
              className="-ml-px py-1 pl-3 text-left text-[11.5px] font-medium"
              style={{
                borderLeft: `2px solid ${isAct ? 'var(--accent)' : 'transparent'}`,
                color: isAct ? 'var(--ink-1)' : 'var(--ink-3)',
              }}
            >
              {s}
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
