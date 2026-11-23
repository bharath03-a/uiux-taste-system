import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  RefreshCw,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function BadgesAvatarsChipsSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'semantic-status-badges':
      return <SemanticStatusBadges ctx={ctx} />;
    case 'avatar-stack-overflow':
      return <AvatarStackOverflow ctx={ctx} />;
    case 'interactive-filter-chips':
      return <InteractiveFilterChips ctx={ctx} />;
    case 'keyboard-shortcut-keycaps':
      return <KeyboardShortcutKeycaps ctx={ctx} />;
    case 'progress-pill-badge':
      return <ProgressPillBadge ctx={ctx} />;
    case 'metric-delta-chips':
      return <MetricDeltaChips ctx={ctx} />;
    case 'verified-role-tags':
      return <VerifiedRoleTags ctx={ctx} />;
    case 'copyable-mono-id-chip':
      return <CopyableMonoIdChip ctx={ctx} />;
    case 'live-sync-status-pill':
      return <LiveSyncStatusPill ctx={ctx} />;
    case 'removable-tag-strip':
      return <RemovableTagStrip ctx={ctx} />;
    default:
      return null;
  }
}

function SemanticStatusBadges({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
        style={{ background: 'var(--surface-1)', color: 'var(--success)', border: '1px solid var(--border-subtle)' }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--success)' }} />
        {ctx.breakUi ? 'Operational · 99.99%' : 'Active'}
      </span>
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
        style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}
      >
        In Review
      </span>
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
        style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}
      >
        Degraded
      </span>
      <span
        className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium"
        style={{
          background: 'var(--surface-2)',
          color: 'var(--ink-2)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        v2.4.1
      </span>
    </div>
  );
}

function AvatarStackOverflow({ ctx }: { ctx: SpecimenContext }) {
  const [expanded, setExpanded] = useState(false);
  const people = ['BV', 'AK', 'MR', 'SL', 'JP'];
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center">
        <div className={`flex items-center ${expanded ? 'gap-1.5' : '-space-x-2'}`}>
          {people.map((initials) => (
            <span
              key={initials}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold transition-all"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--ink-1)',
                border: '2px solid var(--surface-0)',
              }}
            >
              {initials}
            </span>
          ))}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="craft-pressable tabular-nums-auto inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[11px] font-semibold"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              border: '2px solid var(--surface-0)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {ctx.breakUi ? '+128' : '+7'}
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-[11px] font-medium"
        style={{ color: 'var(--ink-3)' }}
      >
        {expanded ? 'Stack' : 'Fan out'}
      </button>
    </div>
  );
}

function InteractiveFilterChips({ ctx }: { ctx: SpecimenContext }) {
  const [selected, setSelected] = useState<string[]>(['Design', 'Shipped']);
  const chips = ['Design', 'Frontend', 'Shipped', ctx.breakUi ? 'WCAG-AAA-Verified' : 'A11y'];
  const toggle = (c: string) =>
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((c) => {
        const active = selected.includes(c);
        return (
          <button
            key={c}
            type="button"
            onClick={() => toggle(c)}
            className="craft-pressable inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11.5px] font-medium"
            style={{
              background: active ? 'var(--accent)' : 'var(--surface-1)',
              color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
              border: `1px solid ${active ? 'transparent' : 'var(--border-strong)'}`,
            }}
          >
            {active && <Check className="h-3 w-3" />}
            {c}
          </button>
        );
      })}
    </div>
  );
}

function KeyboardShortcutKeycaps({ ctx }: { ctx: SpecimenContext }) {
  const rows = [
    { action: ctx.breakUi ? 'Open Global Command Switcher' : 'Command Palette', keys: ['⌘', 'K'] },
    { action: 'Quick Contrast Audit', keys: ['⇧', '⌘', 'C'] },
  ];
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r) => (
        <div
          key={r.action}
          className="flex items-center justify-between gap-2 rounded-lg px-3 py-2"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}
        >
          <span className="truncate text-[12px]" style={{ color: 'var(--ink-2)' }}>
            {r.action}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {r.keys.map((k) => (
              <kbd
                key={k}
                className="inline-flex h-5 min-w-5 items-center justify-center rounded px-1.5 text-[10.5px] font-medium"
                style={{
                  background: 'var(--surface-0)',
                  color: 'var(--ink-1)',
                  border: '1px solid var(--border-strong)',
                  boxShadow: 'inset 0 -1px 0 var(--border-subtle)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {k}
              </kbd>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProgressPillBadge({ ctx }: { ctx: SpecimenContext }) {
  const [pct, setPct] = useState(68);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => setPct((p) => (p >= 100 ? 25 : p + 25))}
        className="craft-pressable inline-flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border-strong)' }}
      >
        <span className="h-1.5 w-16 overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
          <span
            className="block h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, pct)}%`, background: 'var(--accent)' }}
          />
        </span>
        <span
          className="tabular-nums-auto text-[11px] font-semibold"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          {Math.min(100, pct)}% {ctx.breakUi ? 'indexing' : ''}
        </span>
      </button>
      <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
        Click pill to step progress
      </span>
    </div>
  );
}

function MetricDeltaChips({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="tabular-nums-auto inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[11.5px] font-semibold"
        style={{
          background: 'var(--surface-1)',
          color: 'var(--success)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        <ArrowUpRight className="h-3.5 w-3.5" />
        {ctx.breakUi ? '+1,420.8%' : '+14.2%'}
      </span>
      <span
        className="tabular-nums-auto inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[11.5px] font-semibold"
        style={{
          background: 'var(--danger-soft)',
          color: 'var(--danger)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        <ArrowDownRight className="h-3.5 w-3.5" />
        −3.8%
      </span>
      <span
        className="tabular-nums-auto rounded-md px-2 py-1 text-[11.5px] font-medium"
        style={{
          background: 'var(--surface-2)',
          color: 'var(--ink-2)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        0.0% flat
      </span>
    </div>
  );
}

function VerifiedRoleTags({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] font-semibold"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        {ctx.breakUi ? 'Organization Owner' : 'Owner'}
      </span>
      <span
        className="inline-flex items-center rounded-md px-2 py-1 text-[11.5px] font-medium"
        style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-strong)' }}
      >
        Maintainer
      </span>
      <span
        className="inline-flex items-center rounded-md px-2 py-1 text-[11.5px] font-medium"
        style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}
      >
        Guest
      </span>
    </div>
  );
}

function CopyableMonoIdChip({ ctx }: { ctx: SpecimenContext }) {
  const [copied, setCopied] = useState(false);
  const id = ctx.breakUi ? 'req_01J9X8Z2W4P7Q3R6T8V1Y5N0M2K' : 'req_01J9X8Z2W4';
  return (
    <button
      type="button"
      onClick={() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="craft-pressable inline-flex max-w-full items-center gap-2 rounded-md px-2.5 py-1.5"
      style={{
        background: 'var(--surface-1)',
        color: 'var(--ink-1)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <code className="truncate text-[11.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        {id}
      </code>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--success)' }} />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
      )}
    </button>
  );
}

function LiveSyncStatusPill({ ctx }: { ctx: SpecimenContext }) {
  const states = ['Synced', 'Syncing…', 'Offline (2 queued)'] as const;
  const [idx, setIdx] = useState(0);
  const state = states[idx];
  return (
    <button
      type="button"
      onClick={() => setIdx((i) => (i + 1) % states.length)}
      className="craft-pressable inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] font-medium"
      style={{
        background: 'var(--surface-1)',
        color: idx === 2 ? 'var(--danger)' : 'var(--ink-1)',
        border: `1px solid ${idx === 2 ? 'var(--danger)' : 'var(--border-subtle)'}`,
      }}
    >
      <RefreshCw className={`h-3 w-3 ${idx === 1 ? 'animate-spin' : ''}`} />
      <span>{ctx.breakUi ? `${state} · 14ms RTT` : state}</span>
    </button>
  );
}

function RemovableTagStrip({ ctx }: { ctx: SpecimenContext }) {
  const initial = ['react', 'vue', 'svelte', 'flutter', ctx.breakUi ? 'accessibility-wcag-apca' : 'tokens'];
  const [tags, setTags] = useState(initial);
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] font-medium"
          style={{
            background: 'var(--surface-1)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {t}
          <button
            type="button"
            onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
            style={{ color: 'var(--ink-3)' }}
            aria-label={`Remove ${t}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {tags.length < initial.length && (
        <button
          type="button"
          onClick={() => setTags(initial)}
          className="text-[11px] font-medium underline-offset-2 hover:underline"
          style={{ color: 'var(--ink-2)' }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
