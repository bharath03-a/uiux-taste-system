import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Archive,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Copy,
  Filter,
  Globe,
  Grid2x2,
  Kanban,
  List,
  Lock,
  MoreHorizontal,
  MousePointerClick,
  Rocket,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Table,
  Tag,
  Trash2,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const FILTER_OPTIONS = [
  { id: 'design', label: 'Design Systems', count: 14 },
  { id: 'motion', label: 'Motion Physics', count: 6 },
  { id: 'a11y', label: 'WCAG Contrast', count: 9 },
  { id: 'tokens', label: 'Semantic Tokens', count: 18 },
];

const GRID_MODES = [
  { id: 'list', label: 'List', icon: List },
  { id: 'grid', label: 'Grid', icon: Grid2x2 },
  { id: 'board', label: 'Board', icon: Kanban },
  { id: 'table', label: 'Table', icon: Table },
  { id: 'split', label: 'Split', icon: Columns2 },
  { id: 'focus', label: 'Focus', icon: Sparkles },
];

export function PopoversMenusSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [open, setOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState('editor');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['design', 'tokens']);
  const [submenu, setSubmenu] = useState<'root' | 'export'>('root');
  const [viewCompact, setViewCompact] = useState(false);
  const [showMeta, setShowMeta] = useState(true);
  const [groupBy, setGroupBy] = useState<'status' | 'owner'>('status');
  const [gridMode, setGridMode] = useState('board');
  const [ctxPos, setCtxPos] = useState<{ x: number; y: number } | null>({ x: 96, y: 68 });
  const [lastAction, setLastAction] = useState<string | null>(null);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  const fireAction = (label: string) => {
    setLastAction(label);
    window.setTimeout(() => setLastAction(null), 1200);
  };

  // 10. Right-Click Context Menu Surface
  if (variantId === 'context-right-click-menu') {
    return (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          setCtxPos({
            x: Math.min(rect.width - 175, Math.max(10, e.clientX - rect.left)),
            y: Math.min(rect.height - 125, Math.max(10, e.clientY - rect.top)),
          });
        }}
        onClick={() => setCtxPos(null)}
        className="relative flex h-[246px] w-full flex-col items-center justify-center overflow-hidden p-4 select-none"
        style={{
          background: 'var(--surface-1)',
          border: '1px dashed var(--border-strong)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <MousePointerClick className="h-4 w-4" style={{ color: 'var(--ink-3)' }} />
          <span className="text-[12.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
            Right-click anywhere in this surface
          </span>
          <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            {lastAction ? `Executed: ${lastAction}` : 'Or click outside to dismiss'}
          </span>
        </div>

        <AnimatePresence>
          {ctxPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={transition}
              onClick={(e) => e.stopPropagation()}
              className="absolute z-20 w-[168px] p-1"
              style={{
                left: `${ctxPos.x}px`,
                top: `${ctxPos.y}px`,
                transformOrigin: 'top left',
                background: 'var(--surface-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${outerR}px`,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {[
                { label: 'Inspect node', kbd: 'I' },
                { label: 'Copy token path', kbd: '⌘C' },
                { label: 'Duplicate', kbd: '⌘D' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    fireAction(item.label);
                    setCtxPos(null);
                  }}
                  className="craft-hover-surface flex w-full items-center justify-between px-2 py-1.5 text-[12px]"
                  style={{ borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
                >
                  <span>{item.label}</span>
                  <kbd className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                    {item.kbd}
                  </kbd>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 09. Split Primary Action + Caret Menu
  if (variantId === 'split-button-menu') {
    return (
      <div
        className="flex min-h-[246px] flex-col items-start p-4"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className="inline-flex overflow-hidden"
            style={{
              borderRadius: `${innerR}px`,
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.22), 0 1px 2px rgba(var(--shadow-rgb), calc(0.24 * var(--dial-shadow-depth)))',
            }}
          >
            <button
              type="button"
              onClick={() => fireAction('Deployed to production')}
              className="craft-pressable inline-flex h-8 items-center gap-1.5 px-3 text-[12px] font-medium"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>{breakUi ? 'Deploy Production v24.8' : 'Deploy'}</span>
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="More deploy options"
              className="craft-pressable inline-flex h-8 w-7 items-center justify-center"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.18)' }}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          {lastAction && (
            <span className="text-[11px] font-medium" style={{ color: 'var(--success)' }}>
              {lastAction}
            </span>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -3 }}
              transition={transition}
              className="mt-2 w-[min(256px,100%)] p-1.5"
              style={{
                transformOrigin: 'top left',
                background: 'var(--surface-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${outerR}px`,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {[
                { title: 'Deploy to staging', desc: 'Preview URL without switching prod traffic' },
                { title: 'Dry-run diff only', desc: 'Inspect registry & token changes first' },
                { title: 'Schedule window…', desc: 'Queue release for off-peak hours' },
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => fireAction(opt.title)}
                  className="craft-hover-surface flex w-full flex-col px-2.5 py-1.5 text-left"
                  style={{ borderRadius: `${innerR}px` }}
                >
                  <span className="text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
                    {opt.title}
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 07. Entity Preview Hover Card
  if (variantId === 'hover-preview-card') {
    return (
      <div
        className="flex min-h-[246px] flex-col items-start justify-between p-4"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div className="text-[12.5px]" style={{ color: 'var(--ink-2)' }}>
          Assigned to{' '}
          <button
            type="button"
            onMouseEnter={() => setOpen(true)}
            onClick={() => setOpen((v) => !v)}
            className="font-semibold underline decoration-dotted underline-offset-4"
            style={{ color: 'var(--ink-1)' }}
          >
            @studio-core/edge
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -3 }}
              transition={transition}
              className="mt-2 w-[min(300px,100%)] p-3"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${outerR}px`,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {breakUi ? 'studio-core / edge-orchestrator-v24' : 'studio-core / edge'}
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-3)' }}>
                    Updated 12m ago · 14 regions healthy
                  </div>
                </div>
                <span
                  className="rounded px-1.5 py-0.5 text-[10.5px] font-medium"
                  style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}
                >
                  Live
                </span>
              </div>
              <div
                className="mt-2.5 grid grid-cols-3 gap-2 border-y py-2 text-center"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {[
                  ['p99', '18ms'],
                  ['Uptime', '99.98%'],
                  ['Errors', '0'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div
                      className="tabular-nums-auto text-[12px] font-semibold"
                      style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {v}
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
                      {k}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => fireAction('Opened service')}
                className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium"
                style={{ color: 'var(--ink-1)' }}
              >
                <span>{lastAction ?? 'Open service telemetry'}</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 08. Structured Icon / Mode Grid
  if (variantId === 'grid-swatch-picker') {
    return (
      <div
        className="flex min-h-[246px] flex-col items-start p-4"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="craft-pressable inline-flex h-8 items-center gap-1.5 px-2.5 text-[12px] font-medium"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
          }}
        >
          <Grid2x2 className="h-3.5 w-3.5 opacity-75" />
          <span className="capitalize">View: {gridMode}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -3 }}
              transition={transition}
              className="mt-2 grid w-[min(256px,100%)] grid-cols-3 gap-1.5 p-2"
              style={{
                transformOrigin: 'top left',
                background: 'var(--surface-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${outerR}px`,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {GRID_MODES.map(({ id, label, icon: Icon }) => {
                const active = gridMode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setGridMode(id)}
                    className="craft-pressable flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium"
                    style={{
                      borderRadius: `${innerR}px`,
                      background: active ? 'var(--accent)' : 'var(--surface-0)',
                      color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                      border: `1px solid ${active ? 'transparent' : 'var(--border-subtle)'}`,
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 05. Contextual Floating Action Pill (inline toolbar)
  if (variantId === 'floating-action-toolbar') {
    return (
      <div
        className="flex min-h-[228px] flex-col items-center justify-center gap-4 p-4"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div
          className="flex flex-wrap items-center gap-1 p-1"
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: '999px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <span
            className="tabular-nums-auto rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {breakUi ? '1,248 selected' : '3 selected'}
          </span>
          {[
            { icon: Tag, label: 'Label' },
            { icon: Archive, label: 'Archive' },
            { icon: Copy, label: 'Duplicate' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => fireAction(label)}
              className="craft-pressable craft-hover-surface inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium"
              style={{ color: 'var(--ink-1)' }}
            >
              <Icon className="h-3.5 w-3.5 opacity-75" />
              <span>{label}</span>
            </button>
          ))}
          <span className="mx-0.5 h-4 w-[1px]" style={{ background: 'var(--border-subtle)' }} />
          <button
            type="button"
            onClick={() => fireAction('Deleted')}
            className="craft-pressable inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium"
            style={{ color: 'var(--danger)' }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
        <span className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
          {lastAction ? `Executed: ${lastAction}` : 'Floats near active selection—zero dropdown hunting.'}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-[258px] flex-col items-start p-4"
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderRadius: `${outerR}px`,
      }}
    >
      {/* Trigger Row */}
      <div className="flex w-full items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            setSubmenu('root');
            setOpen((v) => !v);
          }}
          className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 px-2.5 text-[12px] font-medium"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
          }}
        >
          {variantId === 'filter-popover' ? (
            <>
              <Filter className="h-3.5 w-3.5 opacity-75" />
              <span>Filter</span>
              <span
                className="tabular-nums-auto rounded px-1.5 py-0.5 text-[10.5px]"
                style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
              >
                {selectedFilters.length}
              </span>
            </>
          ) : variantId === 'quick-settings-popover' ? (
            <>
              <SlidersHorizontal className="h-3.5 w-3.5 opacity-75" />
              <span>Display</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </>
          ) : variantId === 'rich-description-menu' ? (
            <>
              <Shield className="h-3.5 w-3.5 opacity-75" />
              <span>Access: {selectedRole}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </>
          ) : (
            <>
              <MoreHorizontal className="h-3.5 w-3.5" />
              <span>Actions</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </>
          )}
        </button>

        {lastAction && (
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {lastAction}
          </span>
        )}
      </div>

      {/* Origin-aware animated popover body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -3 }}
            transition={transition}
            className="mt-2 w-[min(286px,100%)] overflow-hidden p-1.5"
            style={{
              transformOrigin: 'top left',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${outerR}px`,
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* 01. Precision Hairline Menu */}
            {variantId === 'precision-command-menu' && (
              <div className="flex flex-col gap-0.5">
                <div
                  className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em]"
                  style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  Workspace
                </div>
                {[
                  { icon: Copy, label: breakUi ? 'Duplicate Workspace & Semantic Tokens' : 'Duplicate', kbd: '⌘D' },
                  { icon: Sparkles, label: 'Compile TASTE.md', kbd: '⌘⇧C' },
                  { icon: Archive, label: 'Archive snapshot', kbd: 'E' },
                ].map(({ icon: Icon, label, kbd }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => fireAction(label)}
                    className="craft-hover-surface flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left text-[12.5px]"
                    style={{ borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{label}</span>
                    </span>
                    <kbd
                      className="shrink-0 text-[10.5px]"
                      style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {kbd}
                    </kbd>
                  </button>
                ))}
                <div className="my-1 h-[1px]" style={{ background: 'var(--border-subtle)' }} />
                <button
                  type="button"
                  onClick={() => fireAction('Delete requested')}
                  className="flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left text-[12.5px] font-medium"
                  style={{ borderRadius: `${innerR}px`, color: 'var(--danger)' }}
                >
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete workspace</span>
                  </span>
                  <kbd className="text-[10.5px] opacity-75" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                    ⌫
                  </kbd>
                </button>
              </div>
            )}

            {/* 02. Rich Option Picker */}
            {variantId === 'rich-description-menu' && (
              <div className="flex flex-col gap-1">
                {[
                  {
                    id: 'private',
                    icon: Lock,
                    title: 'Private workspace',
                    desc: breakUi
                      ? 'Restricted to explicitly invited organization members with SSO verification.'
                      : 'Only invited teammates can view.',
                  },
                  {
                    id: 'editor',
                    icon: Shield,
                    title: 'Team editable',
                    desc: 'Everyone in your org can calibrate & commit rules.',
                  },
                  {
                    id: 'public',
                    icon: Globe,
                    title: 'Public registry',
                    desc: 'Installable via shadcn CLI by anyone.',
                  },
                ].map(({ id, icon: Icon, title, desc }) => {
                  const active = selectedRole === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedRole(id)}
                      className="craft-hover-surface flex w-full items-start gap-2.5 p-2 text-left"
                      style={{
                        borderRadius: `${innerR}px`,
                        background: active ? 'var(--surface-0)' : 'transparent',
                      }}
                    >
                      <span
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                        style={{
                          background: active ? 'var(--accent)' : 'var(--surface-2)',
                          color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                            {title}
                          </span>
                          {active && <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-1)' }} />}
                        </div>
                        <p className="mt-0.5 text-[11px] leading-snug text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
                          {desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 03. Searchable Filter Popover */}
            {variantId === 'filter-popover' && (
              <div className="flex flex-col gap-1.5">
                <div
                  className="flex items-center gap-2 px-2 py-1"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
                  <input
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Filter tags…"
                    className="w-full bg-transparent text-[12px] outline-none"
                    style={{ color: 'var(--ink-1)' }}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  {FILTER_OPTIONS.filter((o) =>
                    o.label.toLowerCase().includes(filterQuery.toLowerCase())
                  ).map((opt) => {
                    const checked = selectedFilters.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setSelectedFilters((prev) =>
                            checked ? prev.filter((x) => x !== opt.id) : [...prev, opt.id]
                          )
                        }
                        className="craft-hover-surface flex items-center justify-between gap-2 px-2 py-1.5 text-[12px]"
                        style={{ borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[4px]"
                            style={{
                              background: checked ? 'var(--accent)' : 'transparent',
                              color: 'var(--accent-ink)',
                              border: checked ? '1px solid transparent' : '1px solid var(--border-strong)',
                            }}
                          >
                            {checked && <Check className="h-2.5 w-2.5" />}
                          </span>
                          <span>{opt.label}</span>
                        </span>
                        <span
                          className="tabular-nums-auto text-[11px]"
                          style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                        >
                          {opt.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selectedFilters.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedFilters([])}
                    className="mt-0.5 border-t pt-1.5 text-center text-[11px] font-medium"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--ink-3)' }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {/* 04. Drill-Down Breadcrumb Menu */}
            {variantId === 'drilldown-submenu' && (
              <AnimatePresence mode="wait" initial={false}>
                {submenu === 'root' ? (
                  <motion.div
                    key="root"
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -12, opacity: 0 }}
                    transition={transition}
                    className="flex flex-col gap-0.5"
                  >
                    <button
                      type="button"
                      onClick={() => fireAction('Copied link')}
                      className="craft-hover-surface flex items-center justify-between px-2 py-1.5 text-[12.5px]"
                      style={{ borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
                    >
                      <span>Copy semantic tokens</span>
                      <Copy className="h-3.5 w-3.5 opacity-60" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmenu('export')}
                      className="craft-hover-surface flex items-center justify-between px-2 py-1.5 text-[12.5px] font-medium"
                      style={{
                        borderRadius: `${innerR}px`,
                        color: 'var(--ink-1)',
                        background: 'var(--surface-0)',
                      }}
                    >
                      <span>Export for agent harness…</span>
                      <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fireAction('Reset rules')}
                      className="craft-hover-surface flex items-center justify-between px-2 py-1.5 text-[12.5px]"
                      style={{ borderRadius: `${innerR}px`, color: 'var(--ink-2)' }}
                    >
                      <span>Reset calibration</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="export"
                    initial={{ x: 14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 14, opacity: 0 }}
                    transition={transition}
                    className="flex flex-col gap-0.5"
                  >
                    <button
                      type="button"
                      onClick={() => setSubmenu('root')}
                      className="mb-1 flex items-center gap-1 border-b px-1.5 pb-1.5 text-[11.5px] font-semibold"
                      style={{ borderColor: 'var(--border-subtle)', color: 'var(--ink-2)' }}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Export target</span>
                    </button>
                    {['Claude Code (.claude/skills)', 'Antigravity (.agents/skills)', 'shadcn v4 Registry JSON'].map(
                      (target) => (
                        <button
                          key={target}
                          type="button"
                          onClick={() => {
                            fireAction(`Exported: ${target.split(' ')[0]}`);
                            setSubmenu('root');
                          }}
                          className="craft-hover-surface truncate px-2 py-1.5 text-left text-[12px]"
                          style={{ borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
                        >
                          {target}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* 06. Compact Inspector Popover */}
            {variantId === 'quick-settings-popover' && (
              <div className="flex flex-col gap-2.5 p-1.5 text-[12px]">
                <div className="flex items-center justify-between gap-2">
                  <span style={{ color: 'var(--ink-2)' }}>Group by</span>
                  <div
                    className="flex rounded-md p-0.5 text-[11px]"
                    style={{
                      background: 'var(--surface-recessed)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {(['status', 'owner'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setGroupBy(opt)}
                        className="rounded px-2 py-0.5 font-medium capitalize"
                        style={{
                          background: groupBy === opt ? 'var(--surface-1)' : 'transparent',
                          color: groupBy === opt ? 'var(--ink-1)' : 'var(--ink-3)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {[
                  { label: 'Compact rows', val: viewCompact, toggle: () => setViewCompact((v) => !v) },
                  { label: 'Show tabular counts', val: showMeta, toggle: () => setShowMeta((v) => !v) },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.toggle}
                    className="flex items-center justify-between gap-2 text-left"
                  >
                    <span style={{ color: 'var(--ink-1)' }}>{item.label}</span>
                    <span
                      className="inline-flex h-4 w-7 items-center rounded-full transition-colors"
                      style={{ background: item.val ? 'var(--accent)' : 'var(--surface-2)' }}
                    >
                      <span
                        className="h-3 w-3 rounded-full transition-transform"
                        style={{
                          background: item.val ? 'var(--accent-ink)' : 'var(--ink-3)',
                          transform: item.val ? 'translateX(14px)' : 'translateX(2px)',
                        }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
