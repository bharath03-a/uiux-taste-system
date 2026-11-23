import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  Copy,
  Layers,
  Loader2,
  Mic,
  MicOff,
  Plus,
  Send,
  Sparkles,
  Trash2,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

function getTransition(ctx: SpecimenContext) {
  if (ctx.dials.motionMode === 'instant') return { duration: 0 };
  if (ctx.dials.motionMode === 'spring') {
    return {
      type: 'spring' as const,
      stiffness: ctx.dials.springStiffness,
      damping: ctx.dials.springDamping,
      mass: 0.7,
    };
  }
  return { duration: ctx.dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };
}

export function MicroInteractionsMotionSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'morphing-action-island':
      return <MorphingActionIsland ctx={ctx} />;
    case 'spring-segmented-pill-bar':
      return <SpringSegmentedPillBar ctx={ctx} />;
    case 'animated-number-odometer':
      return <AnimatedNumberOdometer ctx={ctx} />;
    case 'hold-to-confirm-button':
      return <HoldToConfirmButton ctx={ctx} />;
    case 'magnetic-cursor-spotlight-card':
      return <MagneticCursorSpotlightCard ctx={ctx} />;
    case 'expandable-quick-capture-bar':
      return <ExpandableQuickCaptureBar ctx={ctx} />;
    case 'swipeable-card-stack-deck':
      return <SwipeableCardStackDeck ctx={ctx} />;
    case 'copy-to-check-morph-button':
      return <CopyToCheckMorphButton ctx={ctx} />;
    case 'collapsible-kinetic-accordion':
      return <CollapsibleKineticAccordion ctx={ctx} />;
    case 'live-waveform-voice-pill':
      return <LiveWaveformVoicePill ctx={ctx} />;
    default:
      return null;
  }
}

function MorphingActionIsland({ ctx }: { ctx: SpecimenContext }) {
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const transition = getTransition(ctx);

  const cycle = () => {
    setPhase((p) => (p === 'idle' ? 'running' : p === 'running' ? 'done' : 'idle'));
  };

  return (
    <div className="flex items-center justify-center py-2">
      <motion.button
        type="button"
        layout
        transition={transition}
        onClick={cycle}
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-medium"
        style={{
          background: phase === 'done' ? 'var(--accent)' : 'var(--surface-1)',
          color: phase === 'done' ? 'var(--accent-ink)' : 'var(--ink-1)',
          border: `1px solid ${phase === 'done' ? 'var(--accent)' : 'var(--border-strong)'}`,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {phase === 'idle' && (
            <motion.span key="idle" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }} className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{ctx.breakUi ? 'Run Multi-Model HCC Validation' : 'Run Audit'}</span>
            </motion.span>
          )}
          {phase === 'running' && (
            <motion.span key="running" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }} className="inline-flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Scanning 42 pages…</span>
            </motion.span>
          )}
          {phase === 'done' && (
            <motion.span key="done" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }} className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" />
              <span>3 HCCs Verified</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function SpringSegmentedPillBar({ ctx }: { ctx: SpecimenContext }) {
  const [tab, setTab] = useState('suspects');
  const layoutId = `pill-${useId()}`;
  const transition = getTransition(ctx);
  const tabs = [
    { id: 'suspects', label: 'Suspects', count: 6 },
    { id: 'verified', label: 'Verified', count: 14 },
    { id: 'queries', label: ctx.breakUi ? 'Provider Queries' : 'Queries', count: 2 },
  ];

  return (
    <div
      className="inline-flex w-full items-center gap-1 p-1"
      style={{
        background: 'var(--surface-0)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {tabs.map((t) => {
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className="relative flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11.5px] font-medium"
            style={{ color: active ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={transition}
                className="absolute inset-0 rounded-md"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              />
            )}
            <span className="relative z-10 truncate">{t.label}</span>
            <span className="tabular-nums-auto relative z-10 text-[10px] opacity-75" style={{ fontFamily: 'var(--dial-font-mono)' }}>
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AnimatedNumberOdometer({ ctx }: { ctx: SpecimenContext }) {
  const [val, setVal] = useState(1428);
  const digits = String(val).padStart(4, '0').split('');
  const transition = getTransition(ctx);

  return (
    <div
      className="flex items-center justify-between gap-3 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          {ctx.breakUi ? 'Captured Risk Points (YTD)' : 'Charts Coded'}
        </div>
        <div className="mt-0.5 flex items-center text-[22px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
          {digits.map((d, i) => (
            <span key={i} className="relative inline-block h-7 w-[14px] overflow-hidden text-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${i}-${d}`}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={transition}
                  className="absolute inset-0"
                >
                  {d}
                </motion.span>
              </AnimatePresence>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(0, v - 17))}
          className="rounded-md px-2 py-1 text-[11px] font-medium"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
        >
          -17
        </button>
        <button
          type="button"
          onClick={() => setVal((v) => v + 24)}
          className="rounded-md px-2 py-1 text-[11px] font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          +24
        </button>
      </div>
    </div>
  );
}

function HoldToConfirmButton({ ctx }: { ctx: SpecimenContext }) {
  const [holding, setHolding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startHold = () => {
    if (confirmed) {
      setConfirmed(false);
      return;
    }
    setHolding(true);
    timerRef.current = window.setTimeout(() => {
      setHolding(false);
      setConfirmed(true);
    }, 850);
  };

  const cancelHold = () => {
    setHolding(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => cancelHold(), []);

  return (
    <div className="flex flex-col items-center gap-1.5 py-1">
      <button
        type="button"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        className="relative w-full overflow-hidden rounded-lg px-3.5 py-2 text-[12px] font-medium select-none"
        style={{
          background: confirmed ? 'var(--danger)' : 'var(--surface-1)',
          color: confirmed ? 'var(--danger-ink)' : 'var(--danger)',
          border: '1px solid var(--danger)',
        }}
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{
            width: holding ? '100%' : '0%',
            background: 'var(--danger-soft)',
            transition: holding ? 'width 850ms linear' : 'width 180ms ease-out',
          }}
        />
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {confirmed ? <Check className="h-3.5 w-3.5" /> : <Trash2 className="h-3.5 w-3.5" />}
          {confirmed
            ? 'Chart Voided (Click to Reset)'
            : holding
              ? 'Keep holding to confirm…'
              : ctx.breakUi
                ? 'Press & Hold 1s to Void Encounter Submission'
                : 'Hold to Void Chart'}
        </span>
      </button>
    </div>
  );
}

function MagneticCursorSpotlightCard({ ctx }: { ctx: SpecimenContext }) {
  const [pos, setPos] = useState({ x: 80, y: 40, active: false });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      className="relative overflow-hidden p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(150px circle at ${pos.x}px ${pos.y}px, var(--accent-soft), transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        <div className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? 'Pointer-Tracked Surface Sheen (Zero Neon Slop)' : 'Pointer Spotlight Surface'}
        </div>
        <p className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Move pointer across this surface — tracks smoothly using semantic <code style={{ fontFamily: 'var(--dial-font-mono)' }}>--accent-soft</code>.
        </p>
      </div>
    </div>
  );
}

function ExpandableQuickCaptureBar({ ctx }: { ctx: SpecimenContext }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const transition = getTransition(ctx);

  return (
    <motion.div
      layout
      transition={transition}
      className="overflow-hidden p-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: `1px solid ${open ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
      }}
    >
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between text-[12px]"
          style={{ color: 'var(--ink-2)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            {ctx.breakUi ? 'Add clinical query, coder note, or RADV follow-up…' : 'Quick note or coding flag…'}
          </span>
          <kbd className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            C
          </kbd>
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe documentation gap…"
            className="w-full bg-transparent text-[12px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
          <div className="flex justify-end gap-1.5">
            <button type="button" onClick={() => setOpen(false)} className="rounded px-2 py-1 text-[11px]" style={{ color: 'var(--ink-3)' }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setNote('');
                setOpen(false);
              }}
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              <Send className="h-3 w-3" /> Save
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function SwipeableCardStackDeck({ ctx }: { ctx: SpecimenContext }) {
  const [idx, setIdx] = useState(0);
  const cards = [
    { id: 'E11.22', title: 'T2DM w/ CKD', sub: 'HCC 37 · +0.166 RAF' },
    { id: 'I50.22', title: 'Chronic Systolic HF', sub: 'HCC 226 · +0.368 RAF' },
    { id: 'J44.9', title: 'COPD Unspecified', sub: 'HCC 280 · +0.328 RAF' },
  ];
  const transition = getTransition(ctx);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-[78px]">
        {[2, 1, 0].map((offset) => {
          const item = cards[(idx + offset) % cards.length];
          return (
            <motion.div
              key={item.id}
              layout
              transition={transition}
              className="absolute inset-x-0 flex items-center justify-between p-3"
              style={{
                top: offset * 6,
                scale: 1 - offset * 0.04,
                opacity: 1 - offset * 0.22,
                zIndex: 3 - offset,
                background: 'var(--surface-1)',
                borderRadius: 'var(--dial-radius)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <div className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  <span style={{ fontFamily: 'var(--dial-font-mono)' }}>{item.id}</span> · {item.title}
                </div>
                <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  {ctx.breakUi ? `${item.sub} · Queue Item ${idx + 1}/3` : item.sub}
                </div>
              </div>
              {offset === 0 && (
                <button
                  type="button"
                  onClick={() => setIdx((i) => (i + 1) % cards.length)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
                  style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                >
                  <Layers className="h-3 w-3" /> Next
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CopyToCheckMorphButton({ ctx }: { ctx: SpecimenContext }) {
  const [copied, setCopied] = useState(false);

  const trigger = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
      <code className="truncate text-[11px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
        {ctx.breakUi ? 'bun run tokens:generate -- --brand "#2563eb" --format tailwind-v4' : 'ICD-10: E11.22 · HCC 37'}
      </code>
      <button
        type="button"
        onClick={trigger}
        className="inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-medium"
        style={{ background: copied ? 'var(--accent)' : 'var(--surface-0)', color: copied ? 'var(--accent-ink)' : 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }} className="inline-flex items-center gap-1">
              <Check className="h-3 w-3" /> Copied
            </motion.span>
          ) : (
            <motion.span key="cp" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }} className="inline-flex items-center gap-1">
              <Copy className="h-3 w-3" /> Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

function CollapsibleKineticAccordion({ ctx }: { ctx: SpecimenContext }) {
  const [open, setOpen] = useState(true);
  const transition = getTransition(ctx);

  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[12px] font-semibold"
        style={{ color: 'var(--ink-1)' }}
      >
        <span>{ctx.breakUi ? 'Why did HCC 38 get suppressed by HCC 37?' : 'Hierarchy Suppression Rule'}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={transition} className="inline-flex">
          <Plus className="h-3.5 w-3.5" style={{ color: 'var(--ink-3)' }} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              CMS-HCC V28 applies severity hierarchies so only the highest-acuity category (HCC 37) contributes to RAF.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LiveWaveformVoicePill({ ctx }: { ctx: SpecimenContext }) {
  const [recording, setRecording] = useState(true);
  const bars = [10, 18, 14, 22, 12, 20, 16, 11];

  return (
    <div
      className="flex items-center justify-between gap-3 px-3 py-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <button
        type="button"
        onClick={() => setRecording((r) => !r)}
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
        style={{
          background: recording ? 'var(--accent)' : 'var(--surface-0)',
          color: recording ? 'var(--accent-ink)' : 'var(--ink-2)',
          border: `1px solid ${recording ? 'var(--accent)' : 'var(--border-subtle)'}`,
        }}
      >
        {recording ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
        {recording ? (ctx.breakUi ? 'Dictating Clinical Note…' : 'Live') : 'Paused'}
      </button>

      <div className="flex h-6 items-center gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            animate={
              recording && ctx.dials.motionMode !== 'instant'
                ? { height: [6, h, 8, Math.max(6, h - 5), 6] }
                : { height: 5 }
            }
            transition={{
              repeat: recording ? Infinity : 0,
              duration: 0.9 + (i % 3) * 0.18,
              ease: 'easeInOut',
            }}
            className="w-1 rounded-full"
            style={{ background: recording ? 'var(--accent)' : 'var(--border-strong)' }}
          />
        ))}
      </div>
    </div>
  );
}
