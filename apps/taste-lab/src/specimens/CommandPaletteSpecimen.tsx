import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  CornerDownLeft,
  FileText,
  Folder,
  Layers,
  Pencil,
  Search,
  Settings,
  Sparkles,
  Tag,
  Terminal,
  UserPlus,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

interface CommandItem {
  id: string;
  group: 'Actions' | 'Navigation';
  label: string;
  breakLabel: string;
  kbd: string;
  desc: string;
  scope?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const COMMANDS: CommandItem[] = [
  {
    id: 'compile',
    group: 'Actions',
    label: 'Compile TASTE.md',
    breakLabel: 'Compile Color-Agnostic TASTE.md & Sync Hooks Across Harnesses',
    kbd: '⌘⇧C',
    desc: 'Writes calibrated dials, specimen winners, and never-do rules directly into taste/TASTE.md.',
    icon: Sparkles,
  },
  {
    id: 'lint',
    group: 'Actions',
    label: 'Run Taste Linter',
    breakLabel: 'Execute Zero-LLM Deterministic Contrast & Slop Audit',
    kbd: '⌘L',
    desc: 'Checks raw hex violations, arbitrary Tailwind spacing, and WCAG AA contrast in <40ms.',
    icon: Terminal,
  },
  {
    id: 'tokens',
    group: 'Navigation',
    label: 'Semantic Tokens',
    breakLabel: 'Workspace Semantic CSS Variables & Theme Slots',
    kbd: 'G T',
    desc: 'Inspect root --surface-*, --ink-*, and --border-* bindings abstracted from project colors.',
    scope: 'Tokens',
    icon: Code2,
  },
  {
    id: 'registry',
    group: 'Navigation',
    label: 'Component Registry',
    breakLabel: 'Personal shadcn v4 Registry Blueprint (@taste/*)',
    kbd: 'G R',
    desc: 'Browse source-owned Base UI components calibrated to your tactile precision specs.',
    scope: 'Registry',
    icon: Layers,
  },
  {
    id: 'settings',
    group: 'Navigation',
    label: 'Workspace Settings',
    breakLabel: 'Organization Permissions & Harness Configuration',
    kbd: 'G S',
    desc: 'Configure Claude Code, Antigravity, Codex, and Cursor skill sync targets.',
    icon: Settings,
  },
];

const PARAM_ACTIONS = [
  {
    id: 'rename',
    label: 'Rename workspace',
    breakLabel: 'Rename Enterprise Design System Workspace',
    placeholder: 'e.g. studio-v2',
    verb: 'Renamed to',
    icon: Pencil,
  },
  {
    id: 'invite',
    label: 'Invite collaborator',
    breakLabel: 'Invite Organization Collaborator via Email',
    placeholder: 'alex@acme.dev',
    verb: 'Invited',
    icon: UserPlus,
  },
  {
    id: 'tag',
    label: 'Add release tag',
    breakLabel: 'Create Semantic Release Tag on HEAD',
    placeholder: 'v2.4.0-rc1',
    verb: 'Tagged',
    icon: Tag,
  },
];

const CHORD_COMMANDS = [
  { id: 'c1', label: 'Compile Taste', breakLabel: 'Compile TASTE.md Specs', chord: ['C', 'T'], icon: Sparkles },
  { id: 'c2', label: 'Run Linter', breakLabel: 'Run Deterministic Audit', chord: ['C', 'L'], icon: Terminal },
  { id: 'c3', label: 'Go to Tokens', breakLabel: 'Inspect Semantic Tokens', chord: ['G', 'T'], icon: Code2 },
  { id: 'c4', label: 'Go to Registry', breakLabel: 'Open shadcn v4 Registry', chord: ['G', 'R'], icon: Layers },
  { id: 'c5', label: 'Workspace Settings', breakLabel: 'Harness Configuration', chord: ['G', 'S'], icon: Settings },
  { id: 'c6', label: 'Invite Member', breakLabel: 'Invite Collaborator', chord: ['I', 'M'], icon: UserPlus },
];

export function CommandPaletteSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [scope, setScope] = useState<string | null>(
    variantId === 'scoped-pill-palette' ? 'Workspace' : null
  );
  const [ran, setRan] = useState<string | null>(null);
  const [inlineExpanded, setInlineExpanded] = useState(true);

  // Multi-step argument runner state
  const [pendingAction, setPendingAction] = useState<(typeof PARAM_ACTIONS)[number] | null>(null);
  const [argValue, setArgValue] = useState('');

  // Bottom dock upward reveal state
  const [dockOpen, setDockOpen] = useState(true);

  // Category-filtered tab state
  const [category, setCategory] = useState<'All' | 'Actions' | 'Navigation'>('All');

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  const filtered = COMMANDS.filter((c) => {
    if (variantId === 'tabbed-category-palette' && category !== 'All' && c.group !== category) {
      return false;
    }
    const text = `${c.label} ${c.desc} ${c.group}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  const safeIndex = filtered.length === 0 ? 0 : Math.min(activeIndex, filtered.length - 1);
  const highlighted = filtered[safeIndex];

  const runItem = (item?: CommandItem) => {
    if (!item) return;
    setRan(item.label);
    window.setTimeout(() => setRan(null), 1300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(highlighted);
    } else if (e.key === 'Backspace' && !query && scope) {
      setScope(null);
    }
  };

  // 07. Inline Parameter / Argument Runner
  if (variantId === 'multi-step-action-runner') {
    const filteredParams = PARAM_ACTIONS.filter((a) =>
      a.label.toLowerCase().includes(query.trim().toLowerCase())
    );
    const submitArg = () => {
      if (!pendingAction) return;
      const val = argValue.trim() || pendingAction.placeholder;
      setRan(`${pendingAction.verb} “${val}”`);
      setPendingAction(null);
      setArgValue('');
      setQuery('');
      window.setTimeout(() => setRan(null), 1800);
    };

    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-strong)',
          borderRadius: `${outerR}px`,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          className="flex items-center gap-2 px-3"
          style={{ height: '42px', borderBottom: '1px solid var(--border-subtle)' }}
        >
          {pendingAction ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setPendingAction(null);
                  setArgValue('');
                }}
                className="craft-pressable inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                style={{
                  background: 'var(--surface-0)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--ink-2)',
                }}
                title="Back (Esc)"
              >
                <ArrowLeft className="h-3 w-3" />
              </button>
              <span
                className="inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium"
                style={{
                  background: 'var(--accent-soft)',
                  color: 'var(--ink-1)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {pendingAction.label}
              </span>
              <input
                autoFocus
                value={argValue}
                onChange={(e) => setArgValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitArg();
                  } else if (e.key === 'Escape' || (e.key === 'Backspace' && !argValue)) {
                    setPendingAction(null);
                  }
                }}
                placeholder={pendingAction.placeholder}
                className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none"
                style={{ color: 'var(--ink-1)' }}
              />
              <button
                type="button"
                onClick={submitArg}
                className="craft-pressable shrink-0 px-2 py-0.5 text-[11px] font-medium"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-ink)',
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                }}
              >
                Run
              </button>
            </>
          ) : (
            <>
              <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pick a parameterized action…"
                className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none"
                style={{ color: 'var(--ink-1)' }}
              />
              {ran && (
                <span
                  className="shrink-0 text-[11px] font-medium"
                  style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  {ran}
                </span>
              )}
            </>
          )}
        </div>

        <div className="p-1.5">
          {pendingAction ? (
            <div
              className="flex items-center justify-between px-2.5 py-3 text-[11.5px]"
              style={{ color: 'var(--ink-2)' }}
            >
              <span>Type an argument and press Enter to execute inline.</span>
              <kbd
                className="rounded px-1.5 py-0.5 text-[10px]"
                style={{
                  background: 'var(--surface-0)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--ink-3)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                Esc back
              </kbd>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {filteredParams.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      setPendingAction(act);
                      setArgValue('');
                    }}
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-left text-[12.5px] transition-colors hover:bg-[var(--surface-2)]"
                    style={{ borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-75" />
                      <span className="truncate font-medium">
                        {breakUi ? act.breakLabel : act.label}
                      </span>
                    </span>
                    <span
                      className="inline-flex shrink-0 items-center gap-1 text-[10.5px]"
                      style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      arg <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between px-3 py-1.5 text-[10.5px]"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-0)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span>{pendingAction ? 'Step 2/2 · Parameter' : 'Step 1/2 · Command'}</span>
          <span>Zero modal handoff</span>
        </div>
      </div>
    );
  }

  // 08. Bottom-Anchored Command Pill (Upward Reveal)
  if (variantId === 'floating-bottom-dock-bar') {
    return (
      <div
        className="relative flex h-[242px] flex-col justify-end overflow-hidden p-3"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div
          className="pointer-events-none absolute top-3 right-3 left-3 flex items-center justify-between text-[11px]"
          style={{ color: 'var(--ink-3)' }}
        >
          <span>Workspace canvas</span>
          {ran ? (
            <span style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
              Ran: {ran}
            </span>
          ) : (
            <span>Results expand upward</span>
          )}
        </div>

        <div className="relative mx-auto flex w-full max-w-[360px] flex-col gap-1.5">
          <AnimatePresence>
            {dockOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={transition}
                className="flex max-h-[144px] flex-col gap-0.5 overflow-y-auto p-1.5"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: `${outerR}px`,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {filtered.slice(0, 4).map((item, idx) => {
                  const Icon = item.icon;
                  const active = idx === safeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => runItem(item)}
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-left text-[12px]"
                      style={{
                        background: active ? 'var(--surface-2)' : 'transparent',
                        color: active ? 'var(--ink-1)' : 'var(--ink-2)',
                        borderRadius: `${innerR}px`,
                      }}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-75" />
                        <span className="truncate font-medium">
                          {breakUi ? item.breakLabel : item.label}
                        </span>
                      </span>
                      <kbd
                        className="shrink-0 text-[10px]"
                        style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                      >
                        {item.kbd}
                      </kbd>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
            <input
              value={query}
              onFocus={() => setDockOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setDockOpen(true);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask or jump from bottom dock…"
              className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
              style={{ color: 'var(--ink-1)' }}
            />
            <button
              type="button"
              onClick={() => setDockOpen((v) => !v)}
              className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--ink-2)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {dockOpen ? 'Hide' : '⌘K'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 10. Two-Column Chord Launcher
  if (variantId === 'keyboard-chord-cheatsheet') {
    const chordMatches = CHORD_COMMANDS.filter((c) =>
      c.label.toLowerCase().includes(query.trim().toLowerCase())
    );
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-strong)',
          borderRadius: `${outerR}px`,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter chords (e.g. Tokens, Linter)…"
            className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
          {ran && (
            <span
              className="shrink-0 text-[11px] font-medium"
              style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {ran} ✓
            </span>
          )}
        </div>

        <div
          className={`grid gap-1.5 p-2 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}
          style={{ background: 'var(--surface-0)' }}
        >
          {chordMatches.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setRan(item.label);
                  window.setTimeout(() => setRan(null), 1300);
                }}
                className="craft-pressable craft-hover-border flex items-center justify-between gap-2 px-2.5 py-2 text-left"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: `${innerR}px`,
                }}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-75" style={{ color: 'var(--ink-2)' }} />
                  <span className="truncate text-[11.5px] font-medium" style={{ color: 'var(--ink-1)' }}>
                    {breakUi ? item.breakLabel : item.label}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-0.5">
                  {item.chord.map((k, idx) => (
                    <span key={k} className="inline-flex items-center gap-0.5">
                      {idx > 0 && (
                        <span className="text-[9px]" style={{ color: 'var(--ink-3)' }}>
                          →
                        </span>
                      )}
                      <kbd
                        className="inline-flex h-4 min-w-4 items-center justify-center rounded px-1 text-[10px]"
                        style={{
                          background: 'var(--surface-0)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--ink-2)',
                          fontFamily: 'var(--dial-font-mono)',
                        }}
                      >
                        {k}
                      </kbd>
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 05. Embedded Header Command Bar
  if (variantId === 'inline-workspace-bar') {
    return (
      <div
        className="flex flex-col overflow-hidden"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <div
          className="flex items-center justify-between gap-2 px-3 py-2"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <span className="hidden sm:inline text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            studio-core
          </span>
          <div
            className="flex flex-1 items-center gap-2 px-2.5 py-1"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
            }}
          >
            <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
            <input
              value={query}
              onFocus={() => setInlineExpanded(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Jump or run command…"
              className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
              style={{ color: 'var(--ink-1)' }}
            />
            <kbd
              className="rounded px-1 text-[10px]"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-3)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              /
            </kbd>
          </div>
        </div>

        {inlineExpanded && (
          <div className="flex flex-col gap-0.5 p-1.5">
            {filtered.slice(0, 4).map((item, idx) => {
              const Icon = item.icon;
              const active = idx === safeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => runItem(item)}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-left text-[12px]"
                  style={{
                    background: active ? 'var(--surface-2)' : 'transparent',
                    color: active ? 'var(--ink-1)' : 'var(--ink-2)',
                    borderRadius: `${innerR}px`,
                  }}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0 opacity-75" />
                    <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                  </span>
                  <span
                    className="shrink-0 text-[10.5px]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {item.kbd}
                  </span>
                </button>
              );
            })}
            {ran && (
              <div className="px-2.5 pt-1 text-[11px] font-medium" style={{ color: 'var(--success)' }}>
                Ran: {ran}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--border-strong)',
        borderRadius: `${outerR}px`,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Search Input Header */}
      <div
        className="flex items-center gap-2 px-3"
        style={{
          height: variantId === 'minimal-spotlight' ? '46px' : '40px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />

        {variantId === 'scoped-pill-palette' && scope && (
          <button
            type="button"
            onClick={() => setScope(null)}
            title="Click or press Backspace to exit scope"
            className="inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium"
            style={{
              background: 'var(--accent-soft)',
              color: 'var(--ink-1)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Folder className="h-3 w-3" />
            <span>{scope}</span>
            <ArrowRight className="h-2.5 w-2.5 opacity-60" />
          </button>
        )}

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            variantId === 'scoped-pill-palette' && scope
              ? `Search inside ${scope}… (Backspace pops)`
              : 'Type a command or search…'
          }
          className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
          style={{ color: 'var(--ink-1)' }}
        />

        {ran ? (
          <span
            className="shrink-0 text-[11px] font-medium"
            style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Ran ✓
          </span>
        ) : (
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
        )}
      </div>

      {/* Category Filter Bar (09. Tabbed Category Palette) */}
      {variantId === 'tabbed-category-palette' && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5"
          style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-0)' }}
        >
          {(['All', 'Actions', 'Navigation'] as const).map((cat) => {
            const count =
              cat === 'All'
                ? COMMANDS.length
                : COMMANDS.filter((c) => c.group === cat).length;
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat);
                  setActiveIndex(0);
                }}
                className="craft-pressable inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium transition-colors"
                style={{
                  borderRadius: `${innerR}px`,
                  background: active ? 'var(--accent)' : 'var(--surface-1)',
                  color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                  border: active ? '1px solid transparent' : '1px solid var(--border-subtle)',
                }}
              >
                <span>{cat}</span>
                <span
                  className="tabular-nums-auto text-[10px] opacity-80"
                  style={{ fontFamily: 'var(--dial-font-mono)' }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Pinned Tiles (06. Pinned Hybrid) when query empty */}
      {variantId === 'pinned-hybrid-palette' && !query && (
        <div
          className="grid grid-cols-3 gap-1.5 p-2"
          style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-0)' }}
        >
          {COMMANDS.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => runItem(item)}
                className="craft-pressable craft-hover-border flex flex-col items-start gap-1 p-2 text-left"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: `${innerR}px`,
                }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: 'var(--ink-2)' }} />
                <span className="w-full truncate text-[11px] font-medium" style={{ color: 'var(--ink-1)' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Body: Split Preview vs Single List */}
      <div
        className={
          variantId === 'raycast-split-preview' && !mobilePreview
            ? 'grid grid-cols-[1.1fr_0.9fr]'
            : 'flex flex-col'
        }
      >
        <div className="flex max-h-[186px] flex-col gap-0.5 overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-[12px]" style={{ color: 'var(--ink-3)' }}>
              No matching commands for “{query}”
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const active = idx === safeIndex;
              const showGroup =
                variantId === 'linear-grouped-palette' &&
                (idx === 0 || filtered[idx - 1].group !== item.group);

              return (
                <div key={item.id}>
                  {showGroup && (
                    <div
                      className="px-2 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.06em]"
                      style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {item.group}
                    </div>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      if (variantId === 'scoped-pill-palette' && item.scope && !scope) {
                        setScope(item.scope);
                      } else {
                        runItem(item);
                      }
                    }}
                    className="flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left text-[12.5px] transition-colors"
                    style={{
                      background: active ? 'var(--surface-2)' : 'transparent',
                      color: active ? 'var(--ink-1)' : 'var(--ink-2)',
                      borderRadius: `${innerR}px`,
                    }}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-75" />
                      <span className="truncate font-medium">
                        {breakUi ? item.breakLabel : item.label}
                      </span>
                    </span>
                    {variantId !== 'minimal-spotlight' && (
                      <kbd
                        className="shrink-0 text-[10.5px]"
                        style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                      >
                        {item.kbd}
                      </kbd>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Live Preview Pane (02. Raycast Split) */}
        {variantId === 'raycast-split-preview' && !mobilePreview && (
          <div
            className="flex flex-col justify-between p-3"
            style={{
              borderLeft: '1px solid var(--border-subtle)',
              background: 'var(--surface-0)',
            }}
          >
            {highlighted ? (
              <>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--ink-3)' }}>
                    <FileText className="h-3 w-3" />
                    <span>{highlighted.group}</span>
                  </div>
                  <div className="mt-1 text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {highlighted.label}
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
                    {highlighted.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
                  <span>Shortcut</span>
                  <kbd
                    className="rounded px-1.5 py-0.5"
                    style={{
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--dial-font-mono)',
                    }}
                  >
                    {highlighted.kbd}
                  </kbd>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* Footer legend (omitted in minimal-spotlight) */}
      {variantId !== 'minimal-spotlight' && (
        <div
          className="flex items-center justify-between px-3 py-1.5 text-[10.5px]"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-0)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span>↑↓ navigate</span>
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" />
            run
          </span>
        </div>
      )}
    </div>
  );
}
