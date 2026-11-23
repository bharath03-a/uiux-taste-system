import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Layers,
  Package,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const SPARK_DATA = {
  '7D': { total: '$48,290', delta: '+14.2%', points: '0,32 22,26 44,29 66,18 88,21 110,12 132,8' },
  '30D': { total: '$192,840', delta: '+28.6%', points: '0,36 22,31 44,24 66,26 88,15 110,10 132,5' },
};

export function CardsMetricsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [range, setRange] = useState<'7D' | '30D'>('7D');
  const [plan, setPlan] = useState<'starter' | 'pro'>('pro');
  const [expanded, setExpanded] = useState(true);
  const [annual, setAnnual] = useState(true);
  const [followed, setFollowed] = useState(false);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. KPI Stat Card + Sparkline
  if (variantId === 'kpi-sparkline-card') {
    const d = SPARK_DATA[range];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Net Revenue
          </span>
          <div
            className="inline-flex p-0.5"
            style={{ background: 'var(--surface-recessed)', borderRadius: `${innerR}px` }}
          >
            {(['7D', '30D'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className="px-2 py-0.5 text-[10.5px] font-medium"
                style={{
                  borderRadius: `${Math.max(3, innerR - 2)}px`,
                  background: range === r ? 'var(--surface-1)' : 'transparent',
                  color: range === r ? 'var(--ink-1)' : 'var(--ink-3)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="tabular-nums-auto text-[24px] font-semibold tracking-tight" style={{ color: 'var(--ink-1)' }}>
              {breakUi ? '$14,892,410.85' : d.total}
            </div>
            <div className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-medium" style={{ color: 'var(--success)' }}>
              <TrendingUp className="h-3 w-3" />
              <span className="tabular-nums-auto">{d.delta} vs prior period</span>
            </div>
          </div>
          <svg width="132" height="40" viewBox="0 0 132 40" className="shrink-0 overflow-visible">
            <polyline
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={d.points}
            />
          </svg>
        </div>
      </div>
    );
  }

  // 02. Concentric Bento Summary Grid
  if (variantId === 'bento-feature-grid') {
    return (
      <div className={`grid gap-2 p-2.5 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-[1.25fr_1fr]'}`} style={cardStyle}>
        <div
          className="flex flex-col justify-between p-3"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-subtle)',
            borderRadius: `${innerR}px`,
          }}
        >
          <span className="text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            Active Members
          </span>
          <div className="tabular-nums-auto mt-3 text-[22px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            12,480
          </div>
          <span className="mt-1 text-[11px]" style={{ color: 'var(--ink-3)' }}>
            98.4% weekly retention
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Conversion', val: '4.82%' },
            { label: 'Avg. Session', val: '6m 18s' },
          ].map((tile) => (
            <div
              key={tile.label}
              className="flex items-center justify-between px-3 py-2.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
              }}
            >
              <span className="text-[11.5px]" style={{ color: 'var(--ink-2)' }}>{tile.label}</span>
              <span className="tabular-nums-auto text-[13px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                {tile.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 03. Tactile Radio / Plan Choice Card
  if (variantId === 'selectable-plan-card') {
    const choices = [
      { id: 'starter' as const, name: 'Standard Delivery', price: 'Free', desc: 'Arrives in 3–5 business days' },
      { id: 'pro' as const, name: 'Express Priority', price: '$12', desc: 'Next-day tracked courier' },
    ];
    return (
      <div className={`grid gap-2.5 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {choices.map((c) => {
          const active = plan === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setPlan(c.id)}
              className="craft-pressable flex flex-col items-start gap-1 p-3.5 text-left"
              style={{
                background: active ? 'var(--accent-soft)' : 'var(--surface-1)',
                border: active ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
                borderRadius: `${outerR}px`,
              }}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? `${c.name} · International Customs Included` : c.name}
                </span>
                <span
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: active ? 'var(--accent)' : 'var(--surface-0)',
                    border: active ? 'none' : '1px solid var(--border-strong)',
                    color: 'var(--accent-ink)',
                  }}
                >
                  {active && <Check className="h-2.5 w-2.5" />}
                </span>
              </div>
              <span className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>{c.desc}</span>
              <span className="tabular-nums-auto mt-1 text-[12px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                {c.price}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // 04. Aspect-Locked Media + Meta Card
  if (variantId === 'media-content-card') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div
          className="relative flex aspect-[16/7] items-end justify-between p-3"
          style={{
            background: 'var(--surface-recessed)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span
            className="rounded px-2 py-0.5 text-[10.5px] font-medium"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--ink-1)',
            }}
          >
            Product Guide
          </span>
          <span className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            16:7 locked
          </span>
        </div>
        <div className="p-3.5">
          <div className="line-clamp-1 text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {breakUi
              ? 'Designing Color-Agnostic Interface Architecture That Scales Across Every Product Brand'
              : 'Designing Resilient Product Architecture'}
          </div>
          <p className="mt-1 line-clamp-2 text-[12px] leading-snug" style={{ color: 'var(--ink-2)' }}>
            Structured surfaces, locked aspect ratios, and clean contrast pairing keep content grids crisp on every viewport.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px]" style={{ color: 'var(--ink-3)' }}>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> 4 min read</span>
            <span className="inline-flex items-center gap-0.5 font-medium" style={{ color: 'var(--ink-1)' }}>
              Read <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 05. Chronological Activity Feed Card
  if (variantId === 'activity-timeline-card') {
    const events = [
      { id: 'e1', text: 'Maya approved Invoice #4082', time: '4m ago' },
      { id: 'e2', text: 'Order #914 shipped via Express', time: '22m ago' },
      { id: 'e3', text: 'Devon invited 2 team members', time: '1h ago' },
    ];
    return (
      <div className="p-4" style={cardStyle}>
        <div className="mb-3 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Recent Activity
        </div>
        <div className="relative ml-1.5 flex flex-col gap-3 pl-4" style={{ borderLeft: '1px solid var(--border-strong)' }}>
          {events.map((ev) => (
            <div key={ev.id} className="relative flex items-baseline justify-between gap-2 text-[12px]">
              <span
                className="absolute -left-[20px] top-1.5 h-2 w-2 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              <span className="truncate" style={{ color: 'var(--ink-1)' }}>{ev.text}</span>
              <span className="tabular-nums-auto shrink-0 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                {ev.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 06. Usage & Quota Progress Card
  if (variantId === 'quota-usage-meter') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            <Layers className="h-3.5 w-3.5 opacity-75" />
            <span>Workspace Storage</span>
          </div>
          <span className="tabular-nums-auto text-[11.5px] font-medium" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
            74.2 / 100 GB
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
          <div className="h-full rounded-full" style={{ width: '74%', background: 'var(--accent)' }} />
        </div>
        <div className="flex items-center justify-between text-[11.5px]">
          <span style={{ color: 'var(--ink-3)' }}>25.8 GB remaining in current cycle</span>
          <span className="font-medium" style={{ color: 'var(--ink-1)' }}>Manage →</span>
        </div>
      </div>
    );
  }

  // 07. Compact Horizontal Entity Card
  if (variantId === 'compact-horizontal-row-card') {
    return (
      <div className="flex flex-col gap-2">
        {[
          { title: 'Autumn Launch Campaign', meta: '14 assets · Updated 10m ago', status: 'Live' },
          { title: 'Q4 Customer Onboarding', meta: '8 assets · Updated 2h ago', status: 'Draft' },
        ].map((item) => (
          <div
            key={item.title}
            className="craft-hover-border flex items-center justify-between gap-3 px-3.5 py-2.5"
            style={cardStyle}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center"
                style={{
                  background: 'var(--surface-0)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: `${innerR}px`,
                  color: 'var(--ink-2)',
                }}
              >
                <Package className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? `${item.title} — Global Multi-Region Rollout` : item.title}
                </div>
                <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                  {item.meta}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span
                className="rounded px-1.5 py-0.5 text-[10.5px]"
                style={{
                  background: 'var(--surface-0)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--ink-2)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {item.status}
              </span>
              <ChevronRight className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 08. Expandable Summary Accordion Card
  if (variantId === 'collapsible-detail-card') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard className="h-4 w-4 opacity-75" style={{ color: 'var(--ink-2)' }} />
            <div>
              <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                Order #8841 Breakdown
              </div>
              <div className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
                3 items · Paid via Visa •••• 4242
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="tabular-nums-auto text-[13px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
              $148.00
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform"
              style={{ color: 'var(--ink-3)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </div>
        </button>
        {expanded && (
          <div
            className="flex flex-col gap-1.5 px-4 py-3 text-[11.5px]"
            style={{ background: 'var(--surface-0)', borderTop: '1px solid var(--border-subtle)' }}
          >
            <div className="flex justify-between" style={{ color: 'var(--ink-2)' }}>
              <span>Subtotal (3 items)</span>
              <span className="tabular-nums-auto" style={{ fontFamily: 'var(--dial-font-mono)' }}>$136.00</span>
            </div>
            <div className="flex justify-between" style={{ color: 'var(--ink-2)' }}>
              <span>Express shipping</span>
              <span className="tabular-nums-auto" style={{ fontFamily: 'var(--dial-font-mono)' }}>$12.00</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 09. Pricing Tier Card + Cadence Toggle
  if (variantId === 'pricing-comparison-card') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[14px] font-semibold" style={{ color: 'var(--ink-1)' }}>Team Plan</div>
            <div className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>For growing product teams</div>
          </div>
          <button
            type="button"
            onClick={() => setAnnual((a) => !a)}
            className="craft-pressable px-2.5 py-1 text-[11px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-1)',
            }}
          >
            {annual ? 'Annual (−20%)' : 'Monthly'}
          </button>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="tabular-nums-auto text-[26px] font-semibold tracking-tight" style={{ color: 'var(--ink-1)' }}>
            {annual ? '$24' : '$30'}
          </span>
          <span className="text-[12px]" style={{ color: 'var(--ink-3)' }}>/ seat / mo</span>
        </div>
        <div className="flex flex-col gap-1.5 text-[12px]" style={{ color: 'var(--ink-2)' }}>
          {['Unlimited projects & collaborators', 'SSO & role-based permissions', 'Priority email support'].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--success)' }} />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. User / Team Profile Summary Card
  return (
    <div className="flex flex-col gap-3 p-4" style={cardStyle}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            MP
          </span>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              Maya Patel
            </div>
            <div className="truncate text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
              Product Lead · San Francisco
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setFollowed((v) => !v)}
          className="craft-pressable inline-flex h-7 shrink-0 items-center gap-1 px-2.5 text-[11.5px] font-medium"
          style={{
            background: followed ? 'var(--surface-0)' : 'var(--accent)',
            color: followed ? 'var(--ink-1)' : 'var(--accent-ink)',
            border: followed ? '1px solid var(--border-strong)' : '1px solid transparent',
            borderRadius: `${innerR}px`,
          }}
        >
          {followed ? <Check className="h-3 w-3" /> : <UserPlus className="h-3 w-3" />}
          {followed ? 'Connected' : 'Connect'}
        </button>
      </div>
      <div
        className="grid grid-cols-3 divide-x pt-2.5 text-center"
        style={{ borderTop: '1px solid var(--border-subtle)', borderColor: 'var(--border-subtle)' }}
      >
        {[
          { k: 'Projects', v: '18' },
          { k: 'Team', v: '12' },
          { k: 'Reviews', v: '94' },
        ].map((s) => (
          <div key={s.k} style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="tabular-nums-auto text-[13px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
              {s.v}
            </div>
            <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
              <Users className="mr-0.5 hidden h-2.5 w-2.5" />
              {s.k}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
