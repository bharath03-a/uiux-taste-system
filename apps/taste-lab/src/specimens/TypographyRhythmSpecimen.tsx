import { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function TypographyRhythmSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [liveTick, setLiveTick] = useState(true);
  const [value, setValue] = useState(48291);

  // Subtle ticking number so you can feel tabular-nums vs proportional jitter
  useEffect(() => {
    if (!liveTick) return;
    const id = window.setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 19) + 1);
    }, 950);
    return () => window.clearInterval(id);
  }, [liveTick]);

  const pad = dials.density === 'compact' ? 14 : dials.density === 'airy' ? 22 : 18;
  const displayNumber = breakUi ? `${(value * 213).toLocaleString()}.84` : value.toLocaleString();

  const heading = breakUi
    ? 'Quarterly Cumulative Net Retention Across Enterprise Self-Hosted Workspaces'
    : 'Active Workspaces';

  const summary = breakUi
    ? 'Measured across 142 distributed production clusters including legacy v2 accounts, trial conversions, and non-Latin locales (日本語 / العربية / Deutsch) without artificial rounding.'
    : 'Teams shipping weekly builds with verified design contracts across web and mobile.';

  const rows = breakUi
    ? [
        { k: 'Median p95 Latency (Global Edge)', v: '1,482.90 ms' },
        { k: 'Unresolved Contrast Violations', v: '0 / 18,490' },
        { k: 'Longest Workspace Identifier', v: 'acme-corp-international-design-systems' },
      ]
    : [
        { k: 'Median latency', v: '42.4 ms' },
        { k: 'Contrast checks', v: '100% pass' },
        { k: 'Active streak', v: '18 days' },
      ];

  const isEditorial = variantId === 'editorial-contrast';
  const isMono = variantId === 'technical-mono';
  const isSpacious = variantId === 'spacious-minimal';

  return (
    <div
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderRadius: `${dials.baseRadius}px`,
        padding: `${isSpacious ? pad + 6 : pad}px`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className="text-balance-craft"
            style={{
              fontFamily: isEditorial
                ? "'Instrument Serif', Georgia, serif"
                : isMono
                  ? 'var(--dial-font-mono)'
                  : 'var(--dial-font-display)',
              fontSize: isEditorial ? '23px' : isMono ? '12px' : isSpacious ? '13.5px' : '13px',
              fontWeight: isEditorial ? 400 : isSpacious ? 500 : 600,
              letterSpacing: isEditorial
                ? '-0.01em'
                : isMono
                  ? '0.04em'
                  : 'var(--dial-tracking-display)',
              textTransform: isMono ? 'uppercase' : 'none',
              color: isEditorial ? 'var(--ink-1)' : 'var(--ink-2)',
              lineHeight: isEditorial ? 1.15 : 1.35,
            }}
          >
            {heading}
          </div>

          {/* Primary figure */}
          <div
            className={`mt-1.5 flex items-baseline gap-2.5 ${dials.tabularNums ? 'tabular-nums-auto' : ''}`}
          >
            <span
              className="truncate"
              style={{
                fontFamily: isMono
                  ? 'var(--dial-font-mono)'
                  : isEditorial
                    ? "'Instrument Serif', Georgia, serif"
                    : 'var(--dial-font-display)',
                fontSize: isSpacious ? '34px' : isEditorial ? '36px' : isMono ? '26px' : '30px',
                fontWeight: isEditorial ? 400 : isSpacious ? 400 : 600,
                letterSpacing: isMono ? '-0.03em' : '-0.035em',
                lineHeight: 1.05,
                color: 'var(--ink-1)',
              }}
            >
              {displayNumber}
            </span>
            <span
              className="shrink-0 text-[12px] font-medium"
              style={{
                color: 'var(--success)',
                fontFamily: isMono ? 'var(--dial-font-mono)' : 'var(--dial-font-sans)',
              }}
            >
              +12.4%
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLiveTick((v) => !v)}
          title={liveTick ? 'Pause live number tick' : 'Resume live number tick'}
          className="craft-pressable craft-focus inline-flex h-7 w-7 shrink-0 items-center justify-center"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-subtle)',
            borderRadius: `${Math.max(4, dials.baseRadius - 4)}px`,
            color: 'var(--ink-2)',
          }}
        >
          {liveTick ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
      </div>

      {/* Narrative copy */}
      <p
        className="text-pretty-craft"
        style={{
          marginTop: isSpacious ? '14px' : '10px',
          fontSize: isSpacious ? '13.5px' : '12.5px',
          lineHeight: isSpacious ? 1.65 : isEditorial ? 1.55 : 1.48,
          color: 'var(--ink-2)',
        }}
      >
        {summary}
      </p>

      {/* Key-value rows: notice grouping via spacing vs hairline divider */}
      <div
        className="flex flex-col"
        style={{
          marginTop: isSpacious ? '18px' : '14px',
          paddingTop: isSpacious ? '0px' : '12px',
          borderTop: isSpacious ? 'none' : '1px solid var(--border-subtle)',
          gap: isSpacious ? '10px' : '7px',
        }}
      >
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-4">
            <span
              className="truncate text-[12px]"
              style={{
                color: 'var(--ink-3)',
                fontFamily: isMono ? 'var(--dial-font-mono)' : 'var(--dial-font-sans)',
              }}
            >
              {r.k}
            </span>
            <span
              className={`truncate text-right text-[12.5px] font-medium ${dials.tabularNums ? 'tabular-nums-auto' : ''}`}
              style={{
                color: 'var(--ink-1)',
                fontFamily: isMono ? 'var(--dial-font-mono)' : 'var(--dial-font-sans)',
              }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
