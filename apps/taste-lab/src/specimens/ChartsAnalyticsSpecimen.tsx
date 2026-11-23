import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const BAR_DATA = [
  { day: 'Mon', val: 42 },
  { day: 'Tue', val: 68 },
  { day: 'Wed', val: 54 },
  { day: 'Thu', val: 89 },
  { day: 'Fri', val: 76 },
  { day: 'Sat', val: 61 },
  { day: 'Sun', val: 94 },
];

const AREA_SERIES = {
  '24H': { label: '2,840 visits', path: 'M0,48 L36,40 L72,44 L108,26 L144,30 L180,18 L216,12' },
  '7D': { label: '18,920 visits', path: 'M0,52 L36,42 L72,34 L108,36 L144,20 L180,14 L216,8' },
  '30D': { label: '84,110 visits', path: 'M0,54 L36,48 L72,40 L108,28 L144,24 L180,16 L216,6' },
};

export function ChartsAnalyticsSpecimen({ variantId, ctx }: Props) {
  const { dials, mobilePreview } = ctx;
  const [hoverBar, setHoverBar] = useState(3);
  const [areaRange, setAreaRange] = useState<'24H' | '7D' | '30D'>('7D');
  const [hoverSeg, setHoverSeg] = useState<string | null>(null);
  const [ringPct, setRingPct] = useState(78);
  const [hoverCell, setHoverCell] = useState(14);
  const [hoverUptime, setHoverUptime] = useState<number | null>(null);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Interactive Column Chart + Readout
  if (variantId === 'bar-chart-hover-tooltip') {
    const active = BAR_DATA[hoverBar];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>Daily Signups</span>
          <span className="tabular-nums-auto text-[12px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
            {active.day} · {active.val}
          </span>
        </div>
        <div className="grid h-[100px] grid-cols-7 items-end gap-2 pt-2">
          {BAR_DATA.map((b, idx) => {
            const act = idx === hoverBar;
            return (
              <button
                key={b.day}
                type="button"
                onMouseEnter={() => setHoverBar(idx)}
                onClick={() => setHoverBar(idx)}
                className="flex h-full flex-col items-center justify-end gap-1"
              >
                <span
                  className="w-full transition-all"
                  style={{
                    height: `${b.val}%`,
                    borderRadius: `${Math.max(3, innerR - 2)}px`,
                    background: act ? 'var(--accent)' : 'var(--surface-2)',
                  }}
                />
                <span className="text-[10px]" style={{ color: act ? 'var(--ink-1)' : 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  {b.day}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 02. Monochrome Area Trend + Range Switch
  if (variantId === 'area-trend-chart') {
    const series = AREA_SERIES[areaRange];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <div className="tabular-nums-auto text-[15px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {series.label}
          </div>
          <div className="inline-flex p-0.5" style={{ background: 'var(--surface-recessed)', borderRadius: `${innerR}px` }}>
            {(['24H', '7D', '30D'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setAreaRange(r)}
                className="px-2 py-0.5 text-[10px] font-medium"
                style={{
                  borderRadius: `${Math.max(3, innerR - 2)}px`,
                  background: areaRange === r ? 'var(--surface-1)' : 'transparent',
                  color: areaRange === r ? 'var(--ink-1)' : 'var(--ink-3)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 216 60" className="h-[72px] w-full overflow-visible">
          <path d={`${series.path} L216,60 L0,60 Z`} fill="var(--accent-soft)" />
          <path d={series.path} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  // 03. Proportional Stacked Breakdown Bar
  if (variantId === 'segmented-breakdown-bar') {
    const segs = [
      { id: 'media', label: 'Media', pct: 48, opacity: 1 },
      { id: 'docs', label: 'Docs', pct: 32, opacity: 0.55 },
      { id: 'backups', label: 'Backups', pct: 20, opacity: 0.25 },
    ];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Storage Breakdown</div>
        <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
          {segs.map((s) => (
            <div
              key={s.id}
              onMouseEnter={() => setHoverSeg(s.id)}
              onMouseLeave={() => setHoverSeg(null)}
              style={{
                width: `${s.pct}%`,
                background: 'var(--accent)',
                opacity: hoverSeg && hoverSeg !== s.id ? 0.15 : s.opacity,
                transition: 'opacity 150ms',
              }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-[11.5px]">
          {segs.map((s) => (
            <button
              key={s.id}
              type="button"
              onMouseEnter={() => setHoverSeg(s.id)}
              onMouseLeave={() => setHoverSeg(null)}
              className="inline-flex items-center gap-1.5"
              style={{ color: hoverSeg === s.id ? 'var(--ink-1)' : 'var(--ink-2)' }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent)', opacity: s.opacity }} />
              <span>{s.label}</span>
              <span className="tabular-nums-auto" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                {s.pct}%
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 04. Concentric Radial Progress Ring
  if (variantId === 'radial-ring-gauge') {
    const r = 30;
    const circ = 2 * Math.PI * r;
    const offset = circ - (ringPct / 100) * circ;
    return (
      <div className="flex items-center justify-between gap-4 p-4" style={cardStyle}>
        <div className="relative inline-flex h-[76px] w-[76px] shrink-0 items-center justify-center">
          <svg width="76" height="76" className="-rotate-90">
            <circle cx="38" cy="38" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="6" />
            <circle
              cx="38"
              cy="38"
              r={r}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="tabular-nums-auto absolute text-[13px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
            {ringPct}%
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Profile Completeness</div>
          <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>Add billing info to reach 100%.</div>
          <button
            type="button"
            onClick={() => setRingPct((p) => (p >= 100 ? 45 : Math.min(100, p + 12)))}
            className="craft-pressable mt-0.5 h-7 w-fit px-2.5 text-[11px] font-medium"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
          >
            Simulate +12%
          </button>
        </div>
      </div>
    );
  }

  // 05. Activity / Habit Heatmap Strip
  if (variantId === 'activity-heatmap-grid') {
    const levels = [1, 3, 2, 0, 4, 3, 1, 2, 4, 2, 3, 1, 0, 2, 4, 3, 2, 1, 3, 4, 2];
    const opacities = [0.08, 0.25, 0.5, 0.75, 1];
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex items-center justify-between text-[11.5px]">
          <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>21-Day Activity</span>
          <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
            Day {hoverCell + 1}: {levels[hoverCell] * 3} events
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {levels.map((lvl, idx) => (
            <button
              key={idx}
              type="button"
              onMouseEnter={() => setHoverCell(idx)}
              onClick={() => setHoverCell(idx)}
              className="h-5 w-full rounded"
              style={{
                background: 'var(--accent)',
                opacity: opacities[lvl],
                outline: hoverCell === idx ? '1.5px solid var(--ink-1)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // 06. Service Uptime Health Strip
  if (variantId === 'uptime-status-bars') {
    const bars = Array.from({ length: 24 }, (_, i) => (i === 17 ? 'degraded' : 'ok'));
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>API Availability</span>
          <span className="tabular-nums-auto text-[11.5px] font-semibold" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
            {hoverUptime !== null
              ? `Hour ${hoverUptime + 1}: ${bars[hoverUptime] === 'ok' ? '100% ok' : '98.4% slow'}`
              : '99.98% uptime'}
          </span>
        </div>
        <div className="flex h-8 items-end gap-1">
          {bars.map((st, idx) => (
            <button
              key={idx}
              type="button"
              onMouseEnter={() => setHoverUptime(idx)}
              onMouseLeave={() => setHoverUptime(null)}
              className="h-full flex-1 rounded-sm transition-opacity hover:opacity-80"
              style={{ background: st === 'ok' ? 'var(--success)' : 'var(--danger)' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // 07. Horizontal Conversion Funnel
  if (variantId === 'funnel-conversion-steps') {
    const steps = [
      { name: 'Visited Landing', count: '12,400', pct: 100 },
      { name: 'Started Signup', count: '3,840', pct: 31 },
      { name: 'Activated App', count: '1,490', pct: 12 },
    ];
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        {steps.map((s) => (
          <div key={s.name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="font-medium" style={{ color: 'var(--ink-1)' }}>{s.name}</span>
              <span className="tabular-nums-auto" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
                {s.count} ({s.pct}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: 'var(--accent)' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 08. Ranked Horizontal Bar List
  if (variantId === 'leaderboard-ranked-bars') {
    const pages = [
      { label: '/pricing', val: '8,420', pct: 100 },
      { label: '/templates', val: '5,190', pct: 62 },
      { label: '/changelog', val: '2,810', pct: 34 },
    ];
    return (
      <div className="flex flex-col gap-1.5 p-4" style={cardStyle}>
        {pages.map((p) => (
          <div
            key={p.label}
            className="relative flex items-center justify-between overflow-hidden px-2.5 py-1.5 text-[12px]"
            style={{ borderRadius: `${innerR}px`, background: 'var(--surface-0)' }}
          >
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-0"
              style={{ width: `${p.pct}%`, background: 'var(--accent-soft)' }}
            />
            <span className="relative font-medium" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{p.label}</span>
            <span className="tabular-nums-auto relative font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{p.val}</span>
          </div>
        ))}
      </div>
    );
  }

  // 09. Period-over-Period Comparison Card
  if (variantId === 'comparison-metric-pair') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>Monthly Active Users</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
            <TrendingUp className="h-3 w-3" /> +18.4%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'This Month', val: '24,180' },
            { label: 'Last Month', val: '20,420' },
          ].map((p, i) => (
            <div key={p.label} className="p-2.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px` }}>
              <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{p.label}</div>
              <div className="tabular-nums-auto mt-1 text-[16px] font-semibold" style={{ color: i === 0 ? 'var(--ink-1)' : 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
                {p.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. Compact 3-Metric Hairline Strip
  return (
    <div
      className={`grid overflow-hidden ${mobilePreview ? 'grid-cols-1 divide-y' : 'grid-cols-3 divide-x'}`}
      style={{ ...cardStyle, borderColor: 'var(--border-subtle)' }}
    >
      {[
        { label: 'MRR', val: '$42.8k', sub: '+9.2%' },
        { label: 'Churn', val: '1.14%', sub: '−0.3%' },
        { label: 'NPS', val: '68', sub: 'Top 10%' },
      ].map((m) => (
        <div key={m.label} className="flex flex-col gap-0.5 p-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {m.label}
          </span>
          <span className="tabular-nums-auto text-[18px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {m.val}
          </span>
          <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
            {m.sub}
          </span>
        </div>
      ))}
    </div>
  );
}
