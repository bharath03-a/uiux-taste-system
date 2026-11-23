import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  Layers,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function OverlaysDrawerSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  // Allow Escape to close open overlay inside card
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;
  const btnH = dials.density === 'compact' ? 30 : dials.density === 'airy' ? 36 : 32;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? {
            type: 'spring' as const,
            stiffness: dials.springStiffness,
            damping: dials.springDamping,
            mass: 0.9,
          }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  const title = breakUi
    ? 'Archive Production Workspace & Revoke 14 Active Edge Tokens'
    : variantId === 'side-inspector-sheet'
      ? 'Deployment Settings'
      : variantId === 'sticky-header-wizard'
        ? 'Create Workspace'
        : 'Archive workspace?';

  const bodyCopy = breakUi
    ? 'Archiving acme-global-design-systems-2026 immediately disables webhooks, pauses 8 scheduled sync pipelines, and preserves read-only audit snapshots for 30 days before permanent purge.'
    : variantId === 'side-inspector-sheet'
      ? 'Adjust routing rules, concurrency limits, and webhook retries without leaving the live release table.'
      : 'Members lose active access immediately, while billing history and exports stay recoverable for 30 days.';

  const bevelPrimary: React.CSSProperties = {
    height: `${btnH}px`,
    borderRadius: `${innerR}px`,
    background: 'var(--accent)',
    color: 'var(--accent-ink)',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.22), 0 1px 2px rgba(var(--shadow-rgb), calc(0.24 * var(--dial-shadow-depth)))',
  };

  const triggerAction = () => {
    setConfirmed(true);
    window.setTimeout(() => {
      setConfirmed(false);
      setOpen(false);
      setStep(1);
    }, 650);
  };

  return (
    <div
      className="relative flex h-[276px] w-full flex-col overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderRadius: `${outerR}px`,
      }}
    >
      {/* Simulated mini workspace backdrop */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 text-[12px] font-medium" style={{ color: 'var(--ink-2)' }}>
          <Layers className="h-3.5 w-3.5 opacity-70" />
          <span className="truncate">studio-core / releases</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setOpen((v) => !v);
          }}
          className="craft-pressable craft-focus inline-flex items-center gap-1.5 px-2.5 text-[11.5px] font-medium"
          style={bevelPrimary}
        >
          {variantId === 'side-inspector-sheet' ? (
            <SlidersHorizontal className="h-3 w-3" />
          ) : variantId === 'inline-morph-confirm' ? (
            <Trash2 className="h-3 w-3" />
          ) : null}
          {open ? 'Close preview' : 'Trigger overlay'}
        </button>
      </div>

      {/* Dummy background rows so you can judge spatial context */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {['v24.8.1 · production', 'v24.8.0 · staging', 'v24.7.9 · archived'].map((row, idx) => (
          <div
            key={row}
            className="flex items-center justify-between rounded-md px-3 py-2 text-[12px]"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              color: idx === 0 ? 'var(--ink-1)' : 'var(--ink-3)',
            }}
          >
            <span style={{ fontFamily: 'var(--dial-font-mono)' }}>{row}</span>
            <span className="text-[11px]">{idx === 0 ? 'Active' : 'Idle'}</span>
          </div>
        ))}
      </div>

      {/* Overlay Layer */}
      <AnimatePresence>
        {open && variantId === 'inline-morph-confirm' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -3 }}
            transition={transition}
            className="absolute top-[46px] right-3 z-20 w-[min(290px,calc(100%-24px))] p-3"
            style={{
              transformOrigin: 'top right',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${outerR}px`,
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--danger)' }} />
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {title}
                </div>
                <p className="mt-1 text-[11.5px] leading-snug text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
                  {bodyCopy}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="craft-pressable px-2.5 text-[11.5px] font-medium"
                style={{
                  height: `${btnH - 2}px`,
                  borderRadius: `${innerR}px`,
                  color: 'var(--ink-2)',
                  background: 'var(--surface-0)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={triggerAction}
                className="craft-pressable inline-flex items-center gap-1 px-2.5 text-[11.5px] font-medium"
                style={{
                  height: `${btnH - 2}px`,
                  borderRadius: `${innerR}px`,
                  background: 'var(--danger)',
                  color: 'var(--danger-ink)',
                }}
              >
                {confirmed ? <Check className="h-3 w-3" /> : null}
                {confirmed ? 'Archived' : 'Archive'}
              </button>
            </div>
          </motion.div>
        )}

        {open && variantId !== 'inline-morph-confirm' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dials.motionMode === 'instant' ? 0 : 0.16 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 z-20 flex"
            style={{
              background:
                variantId === 'frosted-tactile-dialog'
                  ? 'rgba(0, 0, 0, 0.34)'
                  : 'rgba(0, 0, 0, 0.42)',
              backdropFilter: variantId === 'frosted-tactile-dialog' ? 'blur(5px)' : 'none',
              alignItems:
                variantId === 'bottom-draggable-drawer'
                  ? 'flex-end'
                  : variantId === 'command-top-drop'
                    ? 'flex-start'
                    : variantId === 'side-inspector-sheet' ||
                        variantId === 'detached-floating-sheet' ||
                        variantId === 'full-bleed-focus-takeover'
                      ? 'stretch'
                      : 'center',
              justifyContent:
                variantId === 'side-inspector-sheet' || variantId === 'detached-floating-sheet'
                  ? 'flex-end'
                  : 'center',
              padding:
                variantId === 'bottom-draggable-drawer' ||
                variantId === 'side-inspector-sheet' ||
                variantId === 'full-bleed-focus-takeover'
                  ? '0px'
                  : variantId === 'detached-floating-sheet'
                    ? '10px'
                    : variantId === 'command-top-drop'
                      ? '16px 14px 14px'
                      : '14px',
            }}
          >
            {/* Right Slide-Over Sheet & Floating Inset Side Drawer */}
            {(variantId === 'side-inspector-sheet' || variantId === 'detached-floating-sheet') && (
              <motion.div
                initial={{ x: '100%', opacity: variantId === 'detached-floating-sheet' ? 0.6 : 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: variantId === 'detached-floating-sheet' ? 0.6 : 1 }}
                transition={transition}
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-[min(290px,86%)] flex-col overflow-hidden"
                style={{
                  background: 'var(--surface-1)',
                  border:
                    variantId === 'detached-floating-sheet'
                      ? '1px solid var(--border-strong)'
                      : 'none',
                  borderLeft: '1px solid var(--border-strong)',
                  borderRadius: variantId === 'detached-floating-sheet' ? `${outerR}px` : '0px',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  className="flex items-center justify-between px-3.5 py-2.5"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <span className="truncate text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {title}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded p-1"
                    style={{ color: 'var(--ink-3)' }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3.5">
                  <p className="text-[12px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
                    {bodyCopy}
                  </p>
                  <div
                    className="mt-3 rounded-lg p-2.5 text-[11.5px]"
                    style={{
                      background: 'var(--surface-0)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--ink-2)',
                    }}
                  >
                    {variantId === 'detached-floating-sheet'
                      ? '10px breathing room keeps the underlying canvas visually present.'
                      : 'Auto-rollback on p99 > 350ms'}
                  </div>
                </div>
                <div
                  className="flex items-center justify-end gap-2 px-3.5 py-2.5"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="craft-pressable px-2.5 text-[11.5px] font-medium"
                    style={{ height: `${btnH - 2}px`, color: 'var(--ink-2)' }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="craft-pressable px-3 text-[11.5px] font-medium"
                    style={{ ...bevelPrimary, height: `${btnH - 2}px` }}
                  >
                    {confirmed ? 'Saved' : 'Save changes'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Calm Full-Canvas Focus Sheet */}
            {variantId === 'full-bleed-focus-takeover' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={transition}
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-full flex-col"
                style={{ background: 'var(--surface-1)' }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <span className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {title}
                  </span>
                  <div className="flex items-center gap-2">
                    <kbd
                      className="rounded px-1.5 py-0.5 text-[10px]"
                      style={{
                        background: 'var(--surface-0)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--ink-3)',
                        fontFamily: 'var(--dial-font-mono)',
                      }}
                    >
                      ESC
                    </kbd>
                    <button type="button" onClick={() => setOpen(false)} style={{ color: 'var(--ink-2)' }}>
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mx-auto flex w-full max-w-[340px] flex-1 flex-col justify-center gap-3 px-4 py-3">
                  <p className="text-[12px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
                    {bodyCopy}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={triggerAction}
                      className="craft-pressable px-3.5 text-[12px] font-medium"
                      style={bevelPrimary}
                    >
                      {confirmed ? 'Published' : 'Publish release'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="craft-pressable px-2.5 text-[12px] font-medium"
                      style={{ height: `${btnH}px`, color: 'var(--ink-3)' }}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Two-Column Split Modal */}
            {variantId === 'split-media-dialog' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={transition}
                onClick={(e) => e.stopPropagation()}
                className="grid max-h-[246px] w-[min(410px,100%)] grid-cols-1 overflow-hidden sm:grid-cols-[0.85fr_1.15fr]"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: `${outerR}px`,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  className="hidden flex-col justify-between p-3.5 sm:flex"
                  style={{
                    background: 'var(--surface-0)',
                    borderRight: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    Impact summary
                  </div>
                  <div className="flex flex-col gap-1.5 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
                    <span>• 14 edge tokens paused</span>
                    <span>• 30-day audit recovery</span>
                    <span>• Zero billing impact</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-3.5">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                        {title}
                      </h4>
                      <button type="button" onClick={() => setOpen(false)} style={{ color: 'var(--ink-3)' }}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                      {bodyCopy}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="craft-pressable px-2.5 text-[11.5px] font-medium"
                      style={{ height: `${btnH - 2}px`, color: 'var(--ink-2)' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={triggerAction}
                      className="craft-pressable px-3 text-[11.5px] font-medium"
                      style={{ ...bevelPrimary, height: `${btnH - 2}px` }}
                    >
                      {confirmed ? 'Done' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Sheet / Vaul Drawer */}
            {variantId === 'bottom-draggable-drawer' && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={transition}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[82%] w-full flex-col px-4 pt-2 pb-4"
                style={{
                  background: 'var(--surface-1)',
                  borderTop: '1px solid var(--border-strong)',
                  borderRadius: `${outerR + 6}px ${outerR + 6}px 0 0`,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div className="mx-auto mb-3 h-1 w-9 rounded-full" style={{ background: 'var(--border-strong)' }} />
                <div className="text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {title}
                </div>
                <p className="mt-1 line-clamp-3 text-[12px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
                  {bodyCopy}
                </p>
                <div className="mt-3.5 flex flex-col gap-1.5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="craft-pressable px-3 text-[12px] font-medium"
                    style={{
                      height: `${btnH}px`,
                      borderRadius: `${innerR}px`,
                      background: 'var(--surface-0)',
                      color: 'var(--ink-2)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    Keep active
                  </button>
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="craft-pressable px-3.5 text-[12px] font-medium"
                    style={bevelPrimary}
                  >
                    {confirmed ? 'Archived' : 'Archive workspace'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Multi-Step Wizard Modal */}
            {variantId === 'sticky-header-wizard' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 4 }}
                transition={transition}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[246px] w-[min(360px,100%)] flex-col overflow-hidden"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: `${outerR}px`,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                      {title}
                    </span>
                    <span
                      className="tabular-nums-auto rounded px-1.5 py-0.5 text-[10.5px]"
                      style={{
                        background: 'var(--surface-2)',
                        color: 'var(--ink-2)',
                        fontFamily: 'var(--dial-font-mono)',
                      }}
                    >
                      {step}/2
                    </span>
                  </div>
                  <button type="button" onClick={() => setOpen(false)} style={{ color: 'var(--ink-3)' }}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3 text-[12px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {step === 1 ? (
                    <>
                      <div className="font-medium" style={{ color: 'var(--ink-1)' }}>
                        Step 1 · Name & Region
                      </div>
                      <p className="mt-1 text-pretty-craft">{bodyCopy}</p>
                    </>
                  ) : (
                    <>
                      <div className="font-medium" style={{ color: 'var(--ink-1)' }}>
                        Step 2 · Guardrails & Tokens
                      </div>
                      <p className="mt-1 text-pretty-craft">
                        Semantic color slots and concentric radii will be scaffolded automatically.
                      </p>
                    </>
                  )}
                </div>
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-0)' }}
                >
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="craft-pressable inline-flex items-center gap-1 text-[11.5px] font-medium"
                      style={{ color: 'var(--ink-2)' }}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-[11.5px] font-medium"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => (step === 1 ? setStep(2) : triggerAction())}
                    className="craft-pressable inline-flex items-center gap-1 px-3 text-[11.5px] font-medium"
                    style={{ ...bevelPrimary, height: `${btnH - 2}px` }}
                  >
                    {step === 1 ? (
                      <>
                        Continue
                        <ArrowRight className="h-3 w-3" />
                      </>
                    ) : confirmed ? (
                      'Created'
                    ) : (
                      'Create workspace'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Centered Architectural, Frosted Tactile, & Top-Anchored Sheet Drop */}
            {(variantId === 'centered-crisp-modal' ||
              variantId === 'frosted-tactile-dialog' ||
              variantId === 'command-top-drop') && (
              <motion.div
                initial={
                  variantId === 'command-top-drop'
                    ? { opacity: 0, y: -16, scale: 0.98 }
                    : { opacity: 0, scale: 0.96, y: 4 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  variantId === 'command-top-drop'
                    ? { opacity: 0, y: -12, scale: 0.98 }
                    : { opacity: 0, scale: 0.97, y: 3 }
                }
                transition={transition}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[240px] w-[min(350px,100%)] flex-col overflow-hidden p-4"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: `${outerR}px`,
                  boxShadow:
                    variantId === 'frosted-tactile-dialog'
                      ? 'inset 0 1px 0 rgba(255,255,255,0.22), var(--shadow-md)'
                      : variantId === 'command-top-drop'
                        ? 'var(--shadow-md)'
                        : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {title}
                  </h4>
                  <button type="button" onClick={() => setOpen(false)} style={{ color: 'var(--ink-3)' }}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-1.5 overflow-y-auto text-[12px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
                  {bodyCopy}
                </p>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="craft-pressable px-2.5 text-[12px] font-medium"
                    style={{
                      height: `${btnH}px`,
                      borderRadius: `${innerR}px`,
                      color: 'var(--ink-2)',
                      background: 'var(--surface-0)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="craft-pressable inline-flex items-center gap-1 px-3 text-[12px] font-medium"
                    style={bevelPrimary}
                  >
                    {confirmed ? <Check className="h-3.5 w-3.5" /> : null}
                    {confirmed ? 'Done' : 'Confirm'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
