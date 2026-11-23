import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Check,
  FileCode2,
  FolderPlus,
  Layers,
  Loader2,
  Lock,
  Plus,
  RefreshCw,
  SearchX,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const TEMPLATES = [
  { id: 'saas', title: 'SaaS Workspace', desc: 'Sidebar + table + cmdk', icon: Layers },
  { id: 'ai', title: 'AI Agent Studio', desc: 'Streaming + tool chips', icon: Sparkles },
  { id: 'docs', title: 'Design System', desc: 'Tokens + registry specs', icon: FileCode2 },
];

const PIPELINE_STEPS = [
  { label: 'Validate semantic tokens', ms: '42ms' },
  { label: 'Audit WCAG AA contrast', ms: '118ms' },
  { label: 'Compile TASTE.md + skills', ms: '204ms' },
];

export function ResilienceStatesSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [createdEmpty, setCreatedEmpty] = useState(false);
  const [pickedTemplate, setPickedTemplate] = useState<string | null>(null);
  const [retryState, setRetryState] = useState<'error' | 'retrying' | 'ok'>('error');
  const [swrSyncing, setSwrSyncing] = useState(true);
  const [swrCount, setSwrCount] = useState(142);
  const [widgetFailed, setWidgetFailed] = useState(true);
  const [filtersCleared, setFiltersCleared] = useState(false);
  const [stageStep, setStageStep] = useState(1);
  const [accessRequested, setAccessRequested] = useState(false);
  const [offline, setOffline] = useState(true);
  const [queuedEdits, setQueuedEdits] = useState(2);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    if (variantId !== 'progressive-stage-loader') return;
    if (stageStep >= PIPELINE_STEPS.length) return;
    const t = window.setTimeout(() => setStageStep((s) => s + 1), 1100);
    return () => window.clearTimeout(t);
  }, [variantId, stageStep]);

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Geometry-Matched Structural Skeleton
  if (variantId === 'structural-skeleton-shimmer') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className="text-[10.5px] uppercase tracking-[0.06em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Zero-CLS 1:1 Mirror
          </span>
          <button
            type="button"
            onClick={() => setSkeletonLoading((v) => !v)}
            className="craft-pressable h-7 px-2.5 text-[11px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-1)',
            }}
          >
            {skeletonLoading ? 'Show Loaded' : 'Replay Skeleton'}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className="flex h-[52px] items-center justify-between gap-3 px-3"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
              }}
            >
              {skeletonLoading ? (
                <>
                  <div className="flex flex-1 items-center gap-2.5">
                    <div
                      className="h-7 w-7 shrink-0 animate-pulse rounded-md"
                      style={{ background: 'var(--surface-2)' }}
                    />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div
                        className="h-2.5 w-32 animate-pulse rounded"
                        style={{ background: 'var(--surface-2)' }}
                      />
                      <div
                        className="h-2 w-20 animate-pulse rounded"
                        style={{ background: 'var(--surface-2)', opacity: 0.7 }}
                      />
                    </div>
                  </div>
                  <div
                    className="h-5 w-12 animate-pulse rounded"
                    style={{ background: 'var(--surface-2)' }}
                  />
                </>
              ) : (
                <>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}
                    >
                      <Layers className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                        {idx === 0 ? 'Semantic Surface Tokens' : 'Motion Spring Presets'}
                      </div>
                      <div className="truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                        {idx === 0 ? '18 slots verified' : '420 / 32 tactile default'}
                      </div>
                    </div>
                  </div>
                  <span
                    className="tabular-nums-auto text-[11px] font-medium"
                    style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    100%
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 02. Focused Empty State + 1 Primary CTA
  if (variantId === 'actionable-empty-state') {
    return (
      <div
        className="flex min-h-[196px] flex-col items-center justify-center gap-2.5 p-5 text-center"
        style={cardStyle}
      >
        <span
          className="inline-flex h-9 w-9 items-center justify-center"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
            color: 'var(--ink-2)',
          }}
        >
          {createdEmpty ? <Check className="h-4 w-4" style={{ color: 'var(--success)' }} /> : <FolderPlus className="h-4 w-4" />}
        </span>
        <div className="max-w-[34ch]">
          <div className="text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {createdEmpty
              ? 'First token pack created'
              : breakUi
                ? 'No Semantic Component Registries Configured in Organization Yet'
                : 'No component registries yet'}
          </div>
          <p className="mt-1 text-[12px] leading-snug text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
            {createdEmpty
              ? 'Ready to publish calibrated Base UI components.'
              : 'Create a registry to distribute calibrated primitives across projects.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreatedEmpty((v) => !v)}
          className="craft-pressable mt-1 inline-flex h-8 items-center gap-1.5 px-3 text-[12px] font-medium"
          style={{
            background: createdEmpty ? 'var(--surface-0)' : 'var(--accent)',
            color: createdEmpty ? 'var(--ink-1)' : 'var(--accent-ink)',
            border: createdEmpty ? '1px solid var(--border-strong)' : '1px solid transparent',
            borderRadius: `${innerR}px`,
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          {createdEmpty ? 'Reset empty state' : 'Create registry'}
        </button>
      </div>
    );
  }

  // 03. Zero-to-One Starter Template Grid
  if (variantId === 'starter-template-empty') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              Start from a calibrated blueprint
            </div>
            <div className="text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
              {pickedTemplate ? `Seeded “${pickedTemplate}” in 1 click.` : 'Skip blank-canvas setup.'}
            </div>
          </div>
          {pickedTemplate && (
            <button
              type="button"
              onClick={() => setPickedTemplate(null)}
              className="text-[11px] underline-offset-2 hover:underline"
              style={{ color: 'var(--ink-3)' }}
            >
              Reset
            </button>
          )}
        </div>

        <div className={`grid gap-2 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {TEMPLATES.map((tpl) => {
            const Icon = tpl.icon;
            const active = pickedTemplate === tpl.title;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setPickedTemplate(tpl.title)}
                className="craft-pressable craft-hover-border flex flex-col items-start gap-1.5 p-2.5 text-left"
                style={{
                  background: active ? 'var(--accent-soft)' : 'var(--surface-0)',
                  border: active ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  borderRadius: `${innerR}px`,
                }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: 'var(--ink-2)' }} />
                <div className="w-full truncate text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {tpl.title}
                </div>
                <div className="w-full truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                  {tpl.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 04. Calm Inline Error + 1-Click Retry
  if (variantId === 'inline-retry-error') {
    const runRetry = () => {
      setRetryState('retrying');
      window.setTimeout(() => setRetryState('ok'), 850);
    };

    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        {retryState === 'ok' ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[12.5px] font-medium" style={{ color: 'var(--ink-1)' }}>
              <Check className="h-4 w-4" style={{ color: 'var(--success)' }} />
              <span>Telemetry stream reconnected cleanly.</span>
            </div>
            <button
              type="button"
              onClick={() => setRetryState('error')}
              className="craft-pressable h-7 px-2.5 text-[11px]"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
                color: 'var(--ink-2)',
              }}
            >
              Simulate error
            </button>
          </div>
        ) : (
          <div
            className="flex flex-wrap items-center justify-between gap-3 p-3"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--danger)',
              borderRadius: `${innerR}px`,
            }}
          >
            <div className="flex min-w-0 items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--danger)' }} />
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {breakUi
                    ? 'Could not reach edge-registry-sync-us-west-2 (HTTP 503)'
                    : 'Could not load usage metrics'}
                </div>
                <div
                  className="mt-0.5 text-[11px]"
                  style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  ERR_UPSTREAM_503 · req_8f21a
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={runRetry}
              disabled={retryState === 'retrying'}
              className="craft-pressable inline-flex h-7 shrink-0 items-center gap-1.5 px-2.5 text-[11.5px] font-semibold"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                borderRadius: `${Math.max(4, innerR - 2)}px`,
              }}
            >
              {retryState === 'retrying' ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
              {retryState === 'retrying' ? 'Retrying…' : 'Retry'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // 05. Stale-While-Revalidating Hairline
  if (variantId === 'optimistic-stale-revalidating') {
    const triggerRefresh = () => {
      setSwrSyncing(true);
      window.setTimeout(() => {
        setSwrCount((c) => c + 3);
        setSwrSyncing(false);
      }, 950);
    };

    return (
      <div className="relative overflow-hidden p-4" style={cardStyle}>
        {swrSyncing && (
          <motion.div
            initial={{ x: '-60%' }}
            animate={{ x: '160%' }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
            className="absolute top-0 left-0 h-[2px] w-1/2"
            style={{ background: 'var(--accent)' }}
          />
        )}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              {swrSyncing ? 'REVALIDATING IN BACKGROUND…' : 'FRESH · CACHED DATA STAYED LIVE'}
            </div>
            <div className="tabular-nums-auto mt-1 text-[20px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              {swrCount} calibrated specs
            </div>
          </div>
          <button
            type="button"
            onClick={triggerRefresh}
            className="craft-pressable inline-flex h-8 items-center gap-1.5 px-2.5 text-[11.5px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-1)',
            }}
          >
            <RefreshCw className={`h-3 w-3 ${swrSyncing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // 06. Isolated Card Error Boundary
  if (variantId === 'partial-section-fallback') {
    return (
      <div className={`grid gap-2.5 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div className="flex flex-col justify-between gap-2 p-3.5" style={cardStyle}>
          <span
            className="text-[10.5px] uppercase tracking-[0.06em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Contrast Score
          </span>
          <div className="tabular-nums-auto text-[20px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            100% AA
          </div>
          <span className="text-[11px]" style={{ color: 'var(--success)' }}>
            Healthy · unaffected
          </span>
        </div>

        <div
          className="flex flex-col justify-between gap-2 p-3.5"
          style={{
            ...cardStyle,
            border: widgetFailed ? '1px solid var(--danger)' : '1px solid var(--border-subtle)',
          }}
        >
          <span
            className="text-[10.5px] uppercase tracking-[0.06em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Billing Feed
          </span>
          {widgetFailed ? (
            <>
              <div className="text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
                Widget timed out
              </div>
              <button
                type="button"
                onClick={() => setWidgetFailed(false)}
                className="craft-pressable inline-flex h-7 w-fit items-center gap-1 px-2 text-[11px] font-semibold"
                style={{
                  background: 'var(--danger-soft)',
                  color: 'var(--danger)',
                  borderRadius: `${Math.max(4, innerR - 2)}px`,
                }}
              >
                <RefreshCw className="h-3 w-3" /> Retry widget
              </button>
            </>
          ) : (
            <>
              <div className="tabular-nums-auto text-[20px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                $42.10
              </div>
              <button
                type="button"
                onClick={() => setWidgetFailed(true)}
                className="w-fit text-[11px] underline-offset-2 hover:underline"
                style={{ color: 'var(--ink-3)' }}
              >
                Break widget
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // 07. Zero-Match Search + 1-Click Reset
  if (variantId === 'search-zero-results-reset') {
    return (
      <div className="flex flex-col items-center gap-2.5 p-5 text-center" style={cardStyle}>
        {filtersCleared ? (
          <>
            <Check className="h-4 w-4" style={{ color: 'var(--success)' }} />
            <div className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              Showing all 24 matching components
            </div>
            <button
              type="button"
              onClick={() => setFiltersCleared(false)}
              className="craft-pressable h-7 px-2.5 text-[11.5px]"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
                color: 'var(--ink-2)',
              }}
            >
              Re-apply conflicting filters
            </button>
          </>
        ) : (
          <>
            <SearchX className="h-5 w-5" style={{ color: 'var(--ink-3)' }} />
            <div className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              No components match “carousel-3d”
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 text-[10.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
              {['status:archived', 'batch:3'].map((chip) => (
                <span
                  key={chip}
                  className="rounded px-1.5 py-0.5"
                  style={{
                    background: 'var(--surface-0)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--ink-2)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setFiltersCleared(true)}
              className="craft-pressable mt-1 h-8 px-3 text-[12px] font-medium"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                borderRadius: `${innerR}px`,
              }}
            >
              Clear 2 active filters
            </button>
          </>
        )}
      </div>
    );
  }

  // 08. Multi-Step Progress Checklist Loader
  if (variantId === 'progressive-stage-loader') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            Compiling personal taste kit
          </span>
          <button
            type="button"
            onClick={() => setStageStep(0)}
            className="text-[11px] underline-offset-2 hover:underline"
            style={{ color: 'var(--ink-3)' }}
          >
            Replay
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {PIPELINE_STEPS.map((step, idx) => {
            const done = idx < stageStep;
            const current = idx === stageStep;
            return (
              <motion.div
                key={step.label}
                layout
                transition={transition}
                className="flex items-center justify-between gap-2 px-2.5 py-2 text-[12px]"
                style={{
                  background: current ? 'var(--surface-0)' : 'transparent',
                  border: current ? '1px solid var(--border-strong)' : '1px solid transparent',
                  borderRadius: `${innerR}px`,
                  color: done || current ? 'var(--ink-1)' : 'var(--ink-3)',
                }}
              >
                <span className="flex items-center gap-2">
                  {done ? (
                    <Check className="h-3.5 w-3.5" style={{ color: 'var(--success)' }} />
                  ) : current ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: 'var(--ink-1)' }} />
                  ) : (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: 'var(--border-strong)' }}
                    />
                  )}
                  <span className="font-medium">{step.label}</span>
                </span>
                <span
                  className="tabular-nums-auto text-[10.5px]"
                  style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  {done ? step.ms : current ? 'running…' : 'queued'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // 09. Clear Permission / Access Gate
  if (variantId === 'permission-locked-state') {
    return (
      <div className="flex flex-col items-start gap-3 p-4" style={cardStyle}>
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-2)',
            }}
          >
            <Lock className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              Requires Design Maintainer role
            </div>
            <p className="mt-0.5 text-[12px] leading-snug text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
              You can view global tokens, but publishing updates to <code style={{ fontFamily: 'var(--dial-font-mono)' }}>@taste/core</code> is restricted.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAccessRequested((v) => !v)}
          className="craft-pressable h-8 px-3 text-[12px] font-medium"
          style={{
            background: accessRequested ? 'var(--surface-0)' : 'var(--accent)',
            color: accessRequested ? 'var(--success)' : 'var(--accent-ink)',
            border: accessRequested ? '1px solid var(--border-strong)' : '1px solid transparent',
            borderRadius: `${innerR}px`,
          }}
        >
          {accessRequested ? 'Access request sent ✓' : 'Request maintainer access'}
        </button>
      </div>
    );
  }

  // 10. Offline Degraded Banner + Cached View
  return (
    <div className="overflow-hidden" style={cardStyle}>
      {offline && (
        <div
          className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11.5px]"
          style={{
            background: 'var(--surface-2)',
            borderBottom: '1px solid var(--border-strong)',
          }}
        >
          <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: 'var(--ink-1)' }}>
            <WifiOff className="h-3.5 w-3.5" />
            Offline · <span className="tabular-nums-auto">{queuedEdits} edits queued</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setOffline(false);
              setQueuedEdits(0);
            }}
            className="craft-pressable px-2 py-0.5 text-[11px] font-semibold"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              borderRadius: `${Math.max(4, innerR - 2)}px`,
            }}
          >
            Reconnect & Sync
          </button>
        </div>
      )}
      <div className="flex items-center justify-between gap-2 p-3.5">
        <div>
          <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {offline ? 'Showing cached snapshot (read/queue safe)' : 'Online · All local edits synced'}
          </div>
          <div className="mt-0.5 text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
            {offline ? 'Click Queue edit to test local durability.' : '0 pending writes.'}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (offline) setQueuedEdits((q) => q + 1);
            else {
              setOffline(true);
              setQueuedEdits(1);
            }
          }}
          className="craft-pressable h-7 shrink-0 px-2.5 text-[11px] font-medium"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
            color: 'var(--ink-1)',
          }}
        >
          {offline ? '+ Queue edit' : 'Go offline'}
        </button>
      </div>
    </div>
  );
}
