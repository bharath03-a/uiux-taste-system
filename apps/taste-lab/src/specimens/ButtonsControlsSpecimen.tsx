import { useState } from 'react';
import { Check, Loader2, Plus, Trash2, Command } from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function ButtonsControlsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const triggerPrimary = () => {
    if (status === 'loading') return;
    setStatus('loading');
    window.setTimeout(() => {
      setStatus('done');
      window.setTimeout(() => setStatus('idle'), 1100);
    }, 950);
  };

  const h = dials.density === 'compact' ? 32 : dials.density === 'airy' ? 42 : 36;
  const radius =
    variantId === 'soft-pill'
      ? 999
      : variantId === 'architectural-sharp'
        ? Math.min(3, dials.baseRadius)
        : Math.max(4, dials.baseRadius - 2);

  const fontSize = dials.density === 'compact' ? '12.5px' : '13px';
  const isMonoSharp = variantId === 'architectural-sharp';

  const primaryStyle: React.CSSProperties = {
    height: `${h}px`,
    borderRadius: `${radius}px`,
    background: 'var(--accent)',
    color: 'var(--accent-ink)',
    fontSize: isMonoSharp ? '11.5px' : fontSize,
    fontFamily: isMonoSharp ? 'var(--dial-font-mono)' : 'var(--dial-font-sans)',
    letterSpacing: isMonoSharp ? '0.04em' : '-0.01em',
    textTransform: isMonoSharp ? 'uppercase' : 'none',
    border: '1px solid transparent',
    boxShadow:
      variantId === 'tactile-bevel'
        ? 'inset 0 1px 0 rgba(255,255,255,0.22), 0 1px 2px rgba(var(--shadow-rgb), calc(0.28 * var(--dial-shadow-depth))), 0 0 0 1px rgba(var(--border-rgb), 0.14)'
        : 'none',
  };

  const secondaryStyle: React.CSSProperties = {
    height: `${h}px`,
    borderRadius: `${radius}px`,
    background:
      variantId === 'soft-pill'
        ? 'var(--accent-soft)'
        : variantId === 'tactile-bevel'
          ? 'var(--surface-1)'
          : 'var(--surface-1)',
    color: 'var(--ink-1)',
    fontSize: isMonoSharp ? '11.5px' : fontSize,
    fontFamily: isMonoSharp ? 'var(--dial-font-mono)' : 'var(--dial-font-sans)',
    letterSpacing: isMonoSharp ? '0.03em' : '-0.005em',
    textTransform: isMonoSharp ? 'uppercase' : 'none',
    border: variantId === 'soft-pill' ? '1px solid transparent' : '1px solid var(--border-subtle)',
    boxShadow:
      variantId === 'tactile-bevel'
        ? 'inset 0 1px 0 rgba(255,255,255,0.55), var(--shadow-sm)'
        : 'none',
  };

  const ghostStyle: React.CSSProperties = {
    height: `${h}px`,
    borderRadius: `${radius}px`,
    background: 'transparent',
    color: 'var(--ink-2)',
    fontSize: isMonoSharp ? '11.5px' : fontSize,
    fontFamily: isMonoSharp ? 'var(--dial-font-mono)' : 'var(--dial-font-sans)',
    textTransform: isMonoSharp ? 'uppercase' : 'none',
    border: '1px solid transparent',
  };

  const primaryLabel = breakUi ? 'Publish Production Release v24.8' : 'Deploy changes';
  const secondaryLabel = breakUi ? 'Preview Staging Branch' : 'Preview';

  return (
    <div
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderRadius: `${dials.baseRadius}px`,
        padding: `${dials.density === 'compact' ? 14 : dials.density === 'airy' ? 20 : 16}px`,
      }}
    >
      {/* Main action row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Primary with zero-layout-shift loading */}
        <button
          type="button"
          onClick={triggerPrimary}
          className="craft-pressable craft-focus relative inline-flex items-center justify-center px-3.5 font-medium"
          style={primaryStyle}
        >
          <span
            className="inline-flex items-center gap-1.5 transition-opacity"
            style={{ opacity: status === 'idle' ? 1 : 0 }}
          >
            <Plus className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{primaryLabel}</span>
          </span>
          {status !== 'idle' && (
            <span className="absolute inset-0 inline-flex items-center justify-center gap-1.5">
              {status === 'loading' ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved</span>
                </>
              )}
            </span>
          )}
        </button>

        {/* Secondary */}
        <button
          type="button"
          className="craft-pressable craft-focus craft-hover-border inline-flex items-center justify-center gap-1.5 px-3 font-medium"
          style={secondaryStyle}
        >
          <span className="truncate">{secondaryLabel}</span>
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 text-[10px]"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-3)',
              borderRadius: `${Math.max(3, Math.min(6, radius - 2))}px`,
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            <Command className="h-2.5 w-2.5" />P
          </kbd>
        </button>

        {/* Ghost */}
        <button
          type="button"
          className="craft-pressable craft-focus craft-hover-surface inline-flex items-center justify-center px-2.5 font-medium"
          style={ghostStyle}
        >
          Cancel
        </button>
      </div>

      {/* Destructive two-step confirmation bar (never accidental 1-click delete) */}
      <div
        className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <span className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
          {confirmDelete ? 'Click again to confirm deletion' : 'Destructive confirmation ergonomics'}
        </span>
        <button
          type="button"
          onClick={() => setConfirmDelete((v) => !v)}
          className="craft-pressable craft-focus inline-flex items-center gap-1.5 px-2.5 font-medium"
          style={{
            height: `${Math.max(28, h - 4)}px`,
            borderRadius: `${radius}px`,
            fontSize: '12px',
            background: confirmDelete ? 'var(--danger)' : 'var(--danger-soft)',
            color: confirmDelete ? 'var(--danger-ink)' : 'var(--danger)',
            border: '1px solid transparent',
          }}
        >
          <Trash2 className="h-3 w-3" />
          {confirmDelete ? 'Confirm delete' : 'Delete workspace'}
        </button>
      </div>
    </div>
  );
}
