import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  Bell,
  Check,
  ChevronDown,
  Copy,
  Layers,
  Loader2,
  RefreshCw,
  RotateCcw,
  Trash2,
  WifiOff,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

interface ToastItem {
  id: number;
  title: string;
  desc: string;
}

export function ToastsNotificationsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [deck, setDeck] = useState<ToastItem[]>([
    { id: 1, title: 'Compiled TASTE.md', desc: 'Synced 5 calibrated rules.' },
    { id: 2, title: 'Contrast audit passed', desc: 'All 18 semantic slots ≥ 4.5:1.' },
  ]);
  const [deckExpanded, setDeckExpanded] = useState(false);

  // Dynamic pill state
  const [pillState, setPillState] = useState<'idle' | 'saving' | 'saved'>('saved');

  // Optimistic undo state
  const [archived, setArchived] = useState(true);
  const [undoSeconds, setUndoSeconds] = useState(6);

  // Hairline progress state
  const [progressOpen, setProgressOpen] = useState(true);
  const [progressPaused, setProgressPaused] = useState(false);
  const [progressPct, setProgressPct] = useState(72);

  // Inline local feedback state
  const [inlineSaved, setInlineSaved] = useState(false);

  // Diagnostic error state
  const [diagOpen, setDiagOpen] = useState(true);
  const [diagExpanded, setDiagExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Promise lifecycle state
  const [promisePhase, setPromisePhase] = useState<'pending' | 'success' | 'error'>('success');

  // Two-action decision toast state
  const [decisionStatus, setDecisionStatus] = useState<'open' | 'reloaded' | 'dismissed'>('open');

  // Top sticky banner state
  const [offline, setOffline] = useState(true);
  const [reconnecting, setReconnecting] = useState(false);

  // Coalesced batch digest state
  const [batchCount, setBatchCount] = useState(3);
  const [batchLastFile, setBatchLastFile] = useState('Button.tsx');

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  // Countdown tick for Undo Bar
  useEffect(() => {
    if (variantId !== 'optimistic-undo-bar' || !archived) return;
    if (undoSeconds <= 0) return;
    const t = window.setTimeout(() => setUndoSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearTimeout(t);
  }, [variantId, archived, undoSeconds]);

  // Timer tick for Hairline Progress Toast
  useEffect(() => {
    if (variantId !== 'hairline-progress-toast' || !progressOpen || progressPaused) return;
    const t = window.setInterval(() => {
      setProgressPct((p) => (p <= 2 ? 100 : p - 4));
    }, 180);
    return () => window.clearInterval(t);
  }, [variantId, progressOpen, progressPaused]);

  const pushDeckToast = () => {
    const id = Date.now();
    const samples = [
      { title: 'Registry validated', desc: '0 broken dependencies found.' },
      { title: 'Tokens synced', desc: 'Updated taste/taste.json.' },
      { title: 'Preview deployed', desc: 'Edge build live in 1.4s.' },
    ];
    const pick = samples[deck.length % samples.length];
    setDeck((prev) => [{ id, ...pick }, ...prev].slice(0, 3));
  };

  const triggerPill = () => {
    setPillState('saving');
    window.setTimeout(() => setPillState('saved'), 900);
  };

  const containerStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Sonner Stacked Deck
  if (variantId === 'sonner-stacked-deck') {
    return (
      <div className="relative flex h-[238px] flex-col justify-between p-4" style={containerStyle}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={pushDeckToast}
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 px-3 text-[12px] font-medium"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              borderRadius: `${innerR}px`,
            }}
          >
            <Bell className="h-3.5 w-3.5" />
            Push toast ({deck.length}/3)
          </button>
          <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            Hover stack to expand
          </span>
        </div>

        <div
          onMouseEnter={() => setDeckExpanded(true)}
          onMouseLeave={() => setDeckExpanded(false)}
          className="relative ml-auto h-[136px] w-[min(290px,100%)]"
        >
          <AnimatePresence>
            {deck.map((item, idx) => {
              const yOffset = deckExpanded ? idx * -56 : idx * -11;
              const scale = deckExpanded ? 1 : 1 - idx * 0.05;
              const opacity = deckExpanded ? 1 : 1 - idx * 0.22;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity, y: yOffset, scale }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={transition}
                  className="absolute right-0 bottom-0 left-0 flex items-start justify-between gap-2 px-3 py-2.5"
                  style={{
                    zIndex: 10 - idx,
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: `${innerR}px`,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div className="min-w-0">
                    <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                      {breakUi ? `${item.title} · enterprise-prod-cluster-us-west` : item.title}
                    </div>
                    <div className="truncate text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
                      {item.desc}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeck((prev) => prev.filter((x) => x.id !== item.id))}
                    style={{ color: 'var(--ink-3)' }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // 02. Top-Center Dynamic Status Pill
  if (variantId === 'dynamic-top-pill') {
    return (
      <div className="relative flex h-[216px] flex-col items-center justify-between p-4" style={containerStyle}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pillState}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={transition}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {pillState === 'saving' ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Syncing taste profile…</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{breakUi ? 'All 42 tokens synced to edge' : 'Changes saved'}</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={triggerPill}
          className="craft-pressable craft-focus h-8 px-3 text-[12px] font-medium"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
          }}
        >
          Trigger saving → saved morph
        </button>
      </div>
    );
  }

  // 03. Optimistic Action + Undo Bar
  if (variantId === 'optimistic-undo-bar') {
    return (
      <div className="flex h-[216px] flex-col justify-between p-4" style={containerStyle}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px]" style={{ color: 'var(--ink-2)' }}>
            {archived ? 'Item archived immediately (0 modals)' : 'Item active in workspace'}
          </span>
          <button
            type="button"
            onClick={() => {
              setArchived(true);
              setUndoSeconds(6);
            }}
            className="craft-pressable inline-flex h-8 items-center gap-1.5 px-2.5 text-[12px] font-medium"
            style={{
              background: 'var(--danger-soft)',
              color: 'var(--danger)',
              borderRadius: `${innerR}px`,
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Archive item
          </button>
        </div>

        <AnimatePresence>
          {archived && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={transition}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
              }}
            >
              <span className="truncate text-[12.5px] font-medium" style={{ color: 'var(--ink-1)' }}>
                {breakUi
                  ? 'Archived “Enterprise Design System Spec v4”'
                  : 'Workspace item archived'}
              </span>
              <button
                type="button"
                onClick={() => setArchived(false)}
                className="craft-pressable inline-flex shrink-0 items-center gap-1 px-2.5 py-1 text-[11.5px] font-semibold"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-ink)',
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                }}
              >
                <RotateCcw className="h-3 w-3" />
                <span className="tabular-nums-auto">Undo ({undoSeconds}s)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 04. Hairline Toast + Timer Rule
  if (variantId === 'hairline-progress-toast') {
    return (
      <div className="flex h-[216px] flex-col justify-between p-4" style={containerStyle}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              setProgressOpen(true);
              setProgressPct(100);
            }}
            className="craft-pressable h-8 px-3 text-[12px] font-medium"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-1)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
            }}
          >
            Replay timer toast
          </button>
          <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            {progressPaused ? 'Paused on hover' : 'Hover toast to pause'}
          </span>
        </div>

        <AnimatePresence>
          {progressOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={transition}
              onMouseEnter={() => setProgressPaused(true)}
              onMouseLeave={() => setProgressPaused(false)}
              className="relative overflow-hidden px-3.5 pt-2.5 pb-3"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {breakUi
                      ? 'Deployed v24.8.1 across 14 global edge regions'
                      : 'Tokens exported cleanly'}
                  </div>
                  <div className="mt-0.5 text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
                    Ready for Claude Code & Antigravity skills.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setProgressOpen(false)}
                  style={{ color: 'var(--ink-3)' }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div
                className="absolute right-0 bottom-0 left-0 h-[2px]"
                style={{ background: 'var(--surface-2)' }}
              >
                <div
                  className="h-full transition-all duration-150"
                  style={{ width: `${progressPct}%`, background: 'var(--accent)' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 05. Local Inline Confirmation (no toast)
  if (variantId === 'inline-anchored-feedback') {
    return (
      <div className="flex h-[216px] flex-col items-start justify-center gap-3 p-4" style={containerStyle}>
        <p className="text-[12.5px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
          Click Save below—notice how confirmation appears right beside your cursor with zero
          viewport-corner distraction.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setInlineSaved(true);
              window.setTimeout(() => setInlineSaved(false), 1800);
            }}
            className="craft-pressable craft-focus h-8 px-3.5 text-[12px] font-medium"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              borderRadius: `${innerR}px`,
            }}
          >
            Save preferences
          </button>

          <AnimatePresence>
            {inlineSaved && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={transition}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium"
                style={{ color: 'var(--success)' }}
              >
                <Check className="h-3.5 w-3.5" />
                Saved locally · 14ms
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // 07. In-Place Promise Lifecycle Toast
  if (variantId === 'promise-lifecycle-toast') {
    const runPromise = (outcome: 'success' | 'error') => {
      setPromisePhase('pending');
      window.setTimeout(() => setPromisePhase(outcome), 950);
    };

    return (
      <div className="flex h-[216px] flex-col justify-between p-4" style={containerStyle}>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => runPromise('success')}
            className="craft-pressable h-8 px-3 text-[12px] font-medium"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              borderRadius: `${innerR}px`,
            }}
          >
            Run → Success
          </button>
          <button
            type="button"
            onClick={() => runPromise('error')}
            className="craft-pressable h-8 px-3 text-[12px] font-medium"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-1)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
            }}
          >
            Run → Failure
          </button>
        </div>

        <motion.div
          layout
          transition={transition}
          className="flex items-center justify-between gap-3 px-3.5 py-2.5"
          style={{
            background: 'var(--surface-0)',
            border:
              promisePhase === 'error'
                ? '1px solid var(--danger)'
                : '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            {promisePhase === 'pending' && (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" style={{ color: 'var(--ink-2)' }} />
            )}
            {promisePhase === 'success' && (
              <Check className="h-4 w-4 shrink-0" style={{ color: 'var(--success)' }} />
            )}
            {promisePhase === 'error' && (
              <AlertCircle className="h-4 w-4 shrink-0" style={{ color: 'var(--danger)' }} />
            )}
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                {promisePhase === 'pending'
                  ? 'Deploying registry bundle…'
                  : promisePhase === 'success'
                    ? breakUi
                      ? 'Registry bundle v2.14.0 published across 14 edge regions'
                      : 'Registry bundle published'
                    : 'Edge publish timed out (504)'}
              </div>
              <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                {promisePhase === 'pending'
                  ? 'Same card updates in-place (zero spam)'
                  : promisePhase === 'success'
                    ? '0 duplicate toasts emitted · 1.2s'
                    : 'Click Retry to recover inline.'}
              </div>
            </div>
          </div>

          {promisePhase === 'error' && (
            <button
              type="button"
              onClick={() => runPromise('success')}
              className="craft-pressable inline-flex shrink-0 items-center gap-1 px-2.5 py-1 text-[11.5px] font-semibold"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                borderRadius: `${Math.max(4, innerR - 2)}px`,
              }}
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  // 08. Two-Action Decision Toast
  if (variantId === 'action-pair-toast') {
    return (
      <div className="flex h-[216px] flex-col justify-between p-4" style={containerStyle}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px]" style={{ color: 'var(--ink-2)' }}>
            {decisionStatus === 'open'
              ? 'Non-blocking prompt stays out of your cursor path'
              : decisionStatus === 'reloaded'
                ? 'Applied v2.4 cleanly without losing state.'
                : 'Snoozed until next session.'}
          </span>
          {decisionStatus !== 'open' && (
            <button
              type="button"
              onClick={() => setDecisionStatus('open')}
              className="craft-pressable h-7 shrink-0 px-2.5 text-[11.5px] font-medium"
              style={{
                background: 'var(--surface-0)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
              }}
            >
              Replay
            </button>
          )}
        </div>

        <AnimatePresence>
          {decisionStatus === 'open' && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={transition}
              className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? 'Taste Lab v2.4.18-canary ready to apply' : 'Update v2.4 ready'}
                </div>
                <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                  Includes 20 new Batch 2 interaction patterns.
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setDecisionStatus('dismissed')}
                  className="craft-pressable h-7 px-2.5 text-[11.5px] font-medium"
                  style={{
                    background: 'var(--surface-1)',
                    color: 'var(--ink-2)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                  }}
                >
                  Later
                </button>
                <button
                  type="button"
                  onClick={() => setDecisionStatus('reloaded')}
                  className="craft-pressable h-7 px-2.5 text-[11.5px] font-semibold"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                  }}
                >
                  Reload
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 09. Slim Top System Banner
  if (variantId === 'top-sticky-banner') {
    const handleReconnect = () => {
      setReconnecting(true);
      window.setTimeout(() => {
        setReconnecting(false);
        setOffline(false);
      }, 750);
    };

    return (
      <div
        className="flex h-[216px] flex-col overflow-hidden"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${outerR}px`,
        }}
      >
        <AnimatePresence>
          {offline && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition}
              className="flex items-center justify-between gap-2 px-3 py-2"
              style={{
                background: 'var(--surface-2)',
                borderBottom: '1px solid var(--border-strong)',
              }}
            >
              <div className="flex min-w-0 items-center gap-2 text-[11.5px]">
                <WifiOff className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-1)' }} />
                <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                  {breakUi
                    ? 'Offline mode · 4 local edits queued in IndexedDB cache'
                    : 'Offline · Edits saved locally'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleReconnect}
                className="craft-pressable inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-[11px] font-semibold"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--accent-ink)',
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                }}
              >
                {reconnecting && <Loader2 className="h-3 w-3 animate-spin" />}
                {reconnecting ? 'Syncing…' : 'Reconnect'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col items-start justify-center gap-2.5 p-4">
          <div className="text-[12.5px] font-medium" style={{ color: 'var(--ink-1)' }}>
            {offline ? 'Persistent workspace state stays visible' : 'Connection restored · Synced'}
          </div>
          <p className="text-[11.5px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
            Global truths (offline, read-only branch, maintenance) belong in a slim hairline top bar
            rather than auto-vanishing corner toasts.
          </p>
          {!offline && (
            <button
              type="button"
              onClick={() => setOffline(true)}
              className="craft-pressable h-7 px-2.5 text-[11.5px] font-medium"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
              }}
            >
              Simulate offline banner
            </button>
          )}
        </div>
      </div>
    );
  }

  // 10. Coalesced Batch Digest Toast
  if (variantId === 'batch-counter-digest') {
    const sampleFiles = ['Button.tsx', 'Dialog.tsx', 'Tokens.css', 'CommandBar.tsx', 'Tabs.tsx'];
    const fireBatchEvent = () => {
      setBatchCount((c) => {
        const next = c + 1;
        setBatchLastFile(sampleFiles[next % sampleFiles.length]);
        return next;
      });
    };

    return (
      <div className="flex h-[216px] flex-col justify-between p-4" style={containerStyle}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={fireBatchEvent}
            className="craft-pressable inline-flex h-8 items-center gap-1.5 px-3 text-[12px] font-medium"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              borderRadius: `${innerR}px`,
            }}
          >
            <Layers className="h-3.5 w-3.5" />
            Sync file (click rapidly)
          </button>
          {batchCount > 0 && (
            <button
              type="button"
              onClick={() => setBatchCount(0)}
              className="text-[11px] underline-offset-2 hover:underline"
              style={{ color: 'var(--ink-3)' }}
            >
              Clear
            </button>
          )}
        </div>

        <AnimatePresence>
          {batchCount > 0 ? (
            <motion.div
              key="batch-pill"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={transition}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <motion.span
                  key={batchCount}
                  initial={{ scale: 1.18 }}
                  animate={{ scale: 1 }}
                  transition={transition}
                  className="tabular-nums-auto inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  {batchCount}
                </motion.span>
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                    {breakUi
                      ? `${batchCount} registry primitives coalesced into 1 digest`
                      : `${batchCount} ${batchCount === 1 ? 'file' : 'files'} synced`}
                  </div>
                  <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                    Latest: {batchLastFile}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBatchCount(0)}
                style={{ color: 'var(--ink-3)' }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ) : (
            <div className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
              Click “Sync file” rapidly to watch multiple events coalesce cleanly.
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 06. Expandable Diagnostic Toast
  return (
    <div className="flex min-h-[216px] flex-col justify-between gap-3 p-4" style={containerStyle}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setDiagOpen(true)}
          className="craft-pressable h-8 px-3 text-[12px] font-medium"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
          }}
        >
          Simulate lint failure
        </button>
      </div>

      {diagOpen && (
        <div
          className="overflow-hidden p-3"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--danger)',
            borderRadius: `${innerR}px`,
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--danger)' }} />
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  WCAG contrast check failed (3.4:1)
                </div>
                <div className="mt-0.5 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
                  Muted label falls below 4.5:1 on surface-2.
                </div>
              </div>
            </div>
            <button type="button" onClick={() => setDiagOpen(false)} style={{ color: 'var(--ink-3)' }}>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDiagExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-[11px] font-medium"
              style={{ color: 'var(--ink-2)' }}
            >
              <ChevronDown
                className="h-3 w-3 transition-transform"
                style={{ transform: diagExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
              {diagExpanded ? 'Hide trace' : 'Inspect details'}
            </button>
            <button
              type="button"
              onClick={() => {
                setCopiedId(true);
                window.setTimeout(() => setCopiedId(false), 1200);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-medium"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              <Copy className="h-3 w-3" />
              {copiedId ? 'Copied' : 'ERR_CONTRAST_402'}
            </button>
          </div>

          {diagExpanded && (
            <pre
              className="mt-2 overflow-x-auto rounded p-2 text-[10.5px]"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-2)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {`slot: --ink-3 on --surface-2\nmeasured: 3.41:1 (req >= 4.50:1)\nfile: src/components/Card.tsx:48`}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
