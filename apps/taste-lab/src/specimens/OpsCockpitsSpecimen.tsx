import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Check,
  Filter,
  Pin,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function OpsCockpitsSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'live-slo-uptime-strip':
      return <LiveSloUptimeStrip ctx={ctx} />;
    case 'natural-language-filter-bar':
      return <NaturalLanguageFilterBar ctx={ctx} />;
    case 'heatgrid-activity-calendar':
      return <HeatgridActivityCalendar ctx={ctx} />;
    case 'multi-metric-spark-tile':
      return <MultiMetricSparkTile ctx={ctx} />;
    case 'keyboard-first-triage-strip':
      return <KeyboardFirstTriageStrip ctx={ctx} />;
    case 'saved-views-tab-bar':
      return <SavedViewsTabBar ctx={ctx} />;
    case 'alert-escalation-banner':
      return <AlertEscalationBanner ctx={ctx} />;
    case 'quota-budget-segmented-bar':
      return <QuotaBudgetSegmentedBar ctx={ctx} />;
    case 'api-latency-percentile-card':
      return <ApiLatencyPercentileCard ctx={ctx} />;
    case 'quick-switcher-recents-panel':
      return <QuickSwitcherRecentsPanel ctx={ctx} />;
    default:
      return null;
  }
}

function LiveSloUptimeStrip({ ctx }: { ctx: SpecimenContext }) {
  const days = [
    { d: 'D-12', ok: true, pct: '100%' },
    { d: 'D-11', ok: true, pct: '100%' },
    { d: 'D-10', ok: true, pct: '99.98%' },
    { d: 'D-9', ok: false, pct: '98.40%' },
    { d: 'D-8', ok: true, pct: '100%' },
    { d: 'D-7', ok: true, pct: '100%' },
    { d: 'D-6', ok: true, pct: '100%' },
    { d: 'D-5', ok: true, pct: '99.99%' },
    { d: 'D-4', ok: true, pct: '100%' },
    { d: 'D-3', ok: true, pct: '100%' },
    { d: 'D-2', ok: true, pct: '100%' },
    { d: 'Today', ok: true, pct: '100%' },
  ];
  const [hovered, setHovered] = useState(days.length - 1);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Activity className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'OCR & HCC NLP Extraction Pipeline SLO' : 'Pipeline Uptime'}
        </span>
        <span className="tabular-nums-auto text-[10.5px]" style={{ color: days[hovered].ok ? 'var(--success)' : 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}>
          {days[hovered].d} · {days[hovered].pct}
        </span>
      </div>
      <div className="grid grid-cols-12 gap-1">
        {days.map((item, idx) => (
          <button
            key={item.d}
            type="button"
            onMouseEnter={() => setHovered(idx)}
            onClick={() => setHovered(idx)}
            className="h-6 rounded-sm transition-opacity"
            style={{
              background: item.ok ? 'var(--success)' : 'var(--danger)',
              opacity: hovered === idx ? 1 : 0.65,
            }}
            aria-label={`${item.d} ${item.pct}`}
          />
        ))}
      </div>
    </div>
  );
}

function NaturalLanguageFilterBar({ ctx }: { ctx: SpecimenContext }) {
  const [chips, setChips] = useState<string[]>(['status:open', 'raf:>0.30']);
  const suggestions = ['model:v28', 'meat:missing'];

  const toggleChip = (c: string) => {
    setChips((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  return (
    <div
      className="flex flex-col gap-2 p-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
      }}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
        {chips.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10.5px] font-medium"
            style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {c}
            <button type="button" onClick={() => toggleChip(c)} aria-label={`Remove ${c}`}>
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => toggleChip(s)}
            className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px]"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-3)', border: '1px dashed var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}
          >
            <Plus className="h-2.5 w-2.5" /> {ctx.breakUi && s === 'model:v28' ? 'cms_model:v28_2026' : s}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeatgridActivityCalendar({ ctx }: { ctx: SpecimenContext }) {
  const cells = [1, 3, 2, 4, 4, 2, 0, 2, 4, 3, 4, 4, 3, 1];
  const [idx, setIdx] = useState(4);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? '14-Day Chart Throughput Heatgrid' : 'Daily Volume'}
        </span>
        <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          Day {idx + 1} · {cells[idx] * 14} charts
        </span>
      </div>
      <div className="grid grid-cols-14 gap-1">
        {cells.map((lvl, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setIdx(i)}
            onClick={() => setIdx(i)}
            className="aspect-square rounded-sm"
            style={{
              background: lvl === 0 ? 'var(--surface-0)' : 'var(--accent)',
              opacity: lvl === 0 ? 1 : 0.2 + lvl * 0.2,
              outline: idx === i ? '1.5px solid var(--ink-1)' : 'none',
            }}
            aria-label={`Day ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function MultiMetricSparkTile({ ctx }: { ctx: SpecimenContext }) {
  const pts = [1.08, 1.12, 1.11, 1.18, 1.24, 1.29, 1.34];
  const [active, setActive] = useState(6);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-medium" style={{ color: 'var(--ink-3)' }}>
          {ctx.breakUi ? 'Avg Captured RAF Score (Rolling 7w)' : 'Avg Portfolio RAF'}
        </span>
        <span className="tabular-nums-auto text-[15px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
          {pts[active].toFixed(2)}
        </span>
      </div>
      <div className="flex h-9 items-end gap-1.5">
        {pts.map((v, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className="flex-1 rounded-t-sm transition-opacity"
            style={{
              height: `${Math.round(((v - 1.0) / 0.4) * 100)}%`,
              background: active === i ? 'var(--accent)' : 'var(--surface-2)',
            }}
            aria-label={`Week ${i + 1}: ${v}`}
          />
        ))}
      </div>
    </div>
  );
}

function KeyboardFirstTriageStrip({ ctx }: { ctx: SpecimenContext }) {
  const [cursor, setCursor] = useState(0);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const rows = [
    { code: 'E11.22', title: 'T2DM w/ CKD Stage 3a' },
    { code: 'I50.22', title: ctx.breakUi ? 'Chronic Systolic Congestive Heart Failure' : 'Chronic Systolic HF' },
  ];

  return (
    <div
      className="flex flex-col gap-1.5 p-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {rows.map((r, i) => (
        <button
          key={r.code}
          type="button"
          onClick={() => setCursor(i)}
          className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[11px]"
          style={{
            background: cursor === i ? 'var(--surface-2)' : 'var(--surface-0)',
            borderLeft: `2px solid ${cursor === i ? 'var(--accent)' : 'transparent'}`,
          }}
        >
          <span className="truncate" style={{ color: 'var(--ink-1)' }}>
            <strong style={{ fontFamily: 'var(--dial-font-mono)' }}>{r.code}</strong> · {r.title}
          </span>
          {done[i] && <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--success)' }} />}
        </button>
      ))}
      <div className="flex items-center justify-between pt-1 text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
        <span>J/K Move · A Approve</span>
        <button
          type="button"
          onClick={() => setDone((d) => ({ ...d, [cursor]: !d[cursor] }))}
          className="rounded px-2 py-0.5 font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Approve Row
        </button>
      </div>
    </div>
  );
}

function SavedViewsTabBar({ ctx }: { ctx: SpecimenContext }) {
  const [view, setView] = useState('high-raf');
  const views = [
    { id: 'all', label: 'All', count: 142 },
    { id: 'high-raf', label: ctx.breakUi ? 'High RAF (>0.4)' : 'High RAF', count: 28 },
    { id: 'qa', label: 'QA Flagged', count: 6 },
  ];

  return (
    <div
      className="flex flex-wrap items-center gap-1.5 p-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <Filter className="ml-1 h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
      {views.map((v) => {
        const active = view === v.id;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium"
            style={{
              background: active ? 'var(--accent)' : 'var(--surface-0)',
              color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
            }}
          >
            <span>{v.label}</span>
            <span className="tabular-nums-auto text-[10px] opacity-80" style={{ fontFamily: 'var(--dial-font-mono)' }}>{v.count}</span>
          </button>
        );
      })}
    </div>
  );
}

function AlertEscalationBanner({ ctx }: { ctx: SpecimenContext }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--danger-soft)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--danger)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: 'var(--danger)' }}>
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {ctx.breakUi ? 'RAPS Submission Window Closes in 4h 18m (12 Charts Open)' : '12 Charts Near SLA Cutoff'}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="shrink-0 rounded px-2 py-0.5 text-[10.5px] font-medium"
          style={{ background: 'var(--surface-1)', color: 'var(--ink-1)' }}
        >
          {expanded ? 'Hide' : 'Checklist'}
        </button>
      </div>
      {expanded && (
        <div className="text-[11px]" style={{ color: 'var(--ink-1)' }}>
          1. Reassign 4 stalled queries · 2. Clear 8 pending QA overreads before 17:00 UTC.
        </div>
      )}
    </div>
  );
}

function QuotaBudgetSegmentedBar({ ctx }: { ctx: SpecimenContext }) {
  const [active, setActive] = useState(0);
  const segs = [
    { label: 'Coded', pct: 64, opacity: 1 },
    { label: 'In QA', pct: 22, opacity: 0.55 },
    { label: ctx.breakUi ? 'Pending Retrieval' : 'Pending', pct: 14, opacity: 0.25 },
  ];

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex h-2.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-0)' }}>
        {segs.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            style={{ width: `${s.pct}%`, background: 'var(--accent)', opacity: s.opacity }}
            aria-label={`${s.label} ${s.pct}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        {segs.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            style={{ color: active === i ? 'var(--ink-1)' : 'var(--ink-3)', fontWeight: active === i ? 600 : 400 }}
          >
            {s.label} {s.pct}%
          </button>
        ))}
      </div>
    </div>
  );
}

function ApiLatencyPercentileCard({ ctx }: { ctx: SpecimenContext }) {
  const [win, setWin] = useState<'1h' | '24h'>('1h');
  const rows =
    win === '1h'
      ? [
          { p: 'P50', ms: '118ms', w: '36%' },
          { p: 'P95', ms: '284ms', w: '68%' },
          { p: 'P99', ms: '412ms', w: '92%' },
        ]
      : [
          { p: 'P50', ms: '132ms', w: '40%' },
          { p: 'P95', ms: '310ms', w: '74%' },
          { p: 'P99', ms: '490ms', w: '96%' },
        ];

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Sparkles className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'Clinical NLP Inference Latency' : 'Inference Latency'}
        </span>
        <div className="flex gap-1">
          {(['1h', '24h'] as const).map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWin(w)}
              className="rounded px-1.5 py-0.5 text-[10px]"
              style={{
                background: win === w ? 'var(--surface-2)' : 'transparent',
                color: win === w ? 'var(--ink-1)' : 'var(--ink-3)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <div key={r.p} className="flex items-center gap-2 text-[10.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
            <span className="w-7" style={{ color: 'var(--ink-3)' }}>{r.p}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--surface-0)' }}>
              <div className="h-full rounded-full" style={{ width: r.w, background: 'var(--accent)' }} />
            </div>
            <span className="tabular-nums-auto w-12 text-right" style={{ color: 'var(--ink-1)' }}>{r.ms}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickSwitcherRecentsPanel({ ctx }: { ctx: SpecimenContext }) {
  const [pinned, setPinned] = useState<Record<string, boolean>>({ 'MA-2026': true });
  const items = [
    { id: 'MA-2026', label: ctx.breakUi ? 'Medicare Advantage 2026 RADV Audit' : 'MA-2026 Audit Queue' },
    { id: 'ACA-Q4', label: 'ACA Q4 Suspect Triage' },
  ];

  return (
    <div
      className="flex flex-col gap-1.5 p-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[11px]" style={{ background: 'var(--surface-0)' }}>
          <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>{item.label}</span>
          <button
            type="button"
            onClick={() => setPinned((p) => ({ ...p, [item.id]: !p[item.id] }))}
            className="rounded p-1"
            style={{ color: pinned[item.id] ? 'var(--accent)' : 'var(--ink-3)' }}
            aria-label={`Pin ${item.id}`}
          >
            <Pin className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
