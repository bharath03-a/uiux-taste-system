import { useState } from 'react';
import { ArrowUpRight, Check, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function SurfaceElevationSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [selectedRow, setSelectedRow] = useState(0);

  const outerPad = dials.density === 'compact' ? 12 : dials.density === 'airy' ? 20 : 16;
  const outerR = dials.baseRadius;
  const innerR = dials.concentricRadii ? Math.max(0, outerR - 4) : outerR;
  const chipR = dials.concentricRadii ? Math.max(0, innerR - 2) : Math.max(2, outerR - 2);

  const title = breakUi
    ? 'Enterprise Production Deployment & Multi-Region Failover Pipeline (US-East / EU-Central)'
    : 'Production Deployment';
  const subtitle = breakUi
    ? 'automated-release-orchestrator-v24.8.1-rc.14@internal.organization.engineering'
    : 'api-gateway · main@84f2c9a';
  const rows = breakUi
    ? [
        {
          label: 'Zero-Downtime Canary Health Verification Across 18 Edge PoPs',
          meta: '99,482 req/s · 142.8ms p99',
          status: 'Healthy',
        },
        {
          label: 'Database Migration Lock & Schema Backward Compatibility Check',
          meta: '12,044,910 rows · 4.18s',
          status: 'Verified',
        },
      ]
    : [
        { label: 'Edge health checks', meta: '14 regions · 18ms', status: 'Healthy' },
        { label: 'Schema migration', meta: '3 tables · 1.2s', status: 'Verified' },
      ];

  const outerStyles: Record<string, React.CSSProperties> = {
    'hairline-architectural': {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'none',
      borderRadius: `${outerR}px`,
      padding: `${outerPad}px`,
    },
    'layered-tactile': {
      background: 'var(--surface-1)',
      border: 'none',
      boxShadow: 'var(--shadow-md)',
      borderRadius: `${outerR}px`,
      padding: `${outerPad}px`,
    },
    'recessed-well': {
      background: 'var(--surface-recessed)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'inset 0 1px 2px rgba(var(--shadow-rgb), calc(0.08 * var(--dial-shadow-depth)))',
      borderRadius: `${outerR + 2}px`,
      padding: `${Math.max(8, outerPad - 4)}px`,
    },
    'quiet-tonal': {
      background: 'var(--surface-1)',
      border: '1px solid transparent',
      boxShadow: 'none',
      borderRadius: `${outerR}px`,
      padding: `${outerPad + 2}px`,
    },
  };

  const getInnerStyle = (active: boolean): React.CSSProperties => {
    switch (variantId) {
      case 'hairline-architectural':
        return {
          background: active ? 'var(--surface-2)' : 'var(--surface-0)',
          border: `1px solid ${active ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
          borderRadius: `${innerR}px`,
        };
      case 'layered-tactile':
        return {
          background: 'var(--surface-1)',
          border: 'none',
          boxShadow: active
            ? '0 2px 8px rgba(var(--shadow-rgb), calc(0.12 * var(--dial-shadow-depth))), 0 0 0 1px var(--border-strong)'
            : 'var(--shadow-sm)',
          borderRadius: `${innerR}px`,
        };
      case 'recessed-well':
        return {
          background: 'var(--surface-1)',
          border: `1px solid ${active ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
          boxShadow: active
            ? 'var(--shadow-sm)'
            : '0 1px 1px rgba(var(--shadow-rgb), calc(0.05 * var(--dial-shadow-depth)))',
          borderRadius: `${innerR}px`,
        };
      case 'quiet-tonal':
      default:
        return {
          background: active ? 'var(--surface-2)' : 'var(--surface-0)',
          border: '1px solid transparent',
          borderRadius: `${innerR}px`,
        };
    }
  };

  return (
    <div style={outerStyles[variantId] ?? outerStyles['hairline-architectural']}>
      {/* Header */}
      <div
        className="flex items-start justify-between gap-3"
        style={{ marginBottom: `${Math.max(10, outerPad - 2)}px`, paddingInline: variantId === 'recessed-well' ? 4 : 0 }}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center"
              style={{
                background: 'var(--accent-soft)',
                color: 'var(--ink-1)',
                borderRadius: `${chipR}px`,
              }}
            >
              {variantId === 'layered-tactile' ? (
                <Layers className="h-3.5 w-3.5" />
              ) : variantId === 'quiet-tonal' ? (
                <Sparkles className="h-3.5 w-3.5" />
              ) : (
                <ShieldCheck className="h-3.5 w-3.5" />
              )}
            </span>
            <h4
              className="truncate text-[13.5px] font-semibold"
              style={{
                color: 'var(--ink-1)',
                letterSpacing: 'var(--dial-tracking-display)',
              }}
            >
              {title}
            </h4>
          </div>
          <p
            className="mt-1 truncate text-[12px]"
            style={{
              color: 'var(--ink-3)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          className="craft-pressable craft-focus inline-flex shrink-0 items-center gap-1 px-2 py-1 text-[11.5px] font-medium"
          style={{
            background: variantId === 'quiet-tonal' ? 'var(--surface-0)' : 'var(--surface-2)',
            color: 'var(--ink-1)',
            borderRadius: `${chipR}px`,
            border: variantId === 'hairline-architectural' ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          Inspect
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </button>
      </div>

      {/* Interactive nested rows demonstrating surface layering + concentric radii */}
      <div className="flex flex-col" style={{ gap: `${Math.max(6, outerPad / 2)}px` }}>
        {rows.map((row, i) => {
          const active = selectedRow === i;
          return (
            <button
              key={row.label}
              type="button"
              onClick={() => setSelectedRow(i)}
              className="craft-pressable craft-focus flex w-full items-center justify-between gap-3 text-left"
              style={{
                ...getInnerStyle(active),
                padding: dials.density === 'compact' ? '9px 11px' : dials.density === 'airy' ? '13px 15px' : '11px 13px',
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium" style={{ color: 'var(--ink-1)' }}>
                  {row.label}
                </div>
                <div
                  className={`mt-0.5 truncate text-[11.5px] ${dials.tabularNums ? 'tabular-nums-auto' : ''}`}
                  style={{ color: 'var(--ink-3)' }}
                >
                  {row.meta}
                </div>
              </div>
              <span
                className="inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-[11px] font-medium"
                style={{
                  background: active ? 'var(--accent)' : 'var(--surface-2)',
                  color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                  borderRadius: `${Math.max(3, chipR - 1)}px`,
                }}
              >
                {active && <Check className="h-2.5 w-2.5" />}
                {row.status}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
