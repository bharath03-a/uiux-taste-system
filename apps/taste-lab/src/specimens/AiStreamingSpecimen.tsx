import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileCode2,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  WrapText,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const STREAM_CHUNKS = [
  'Concentric ',
  'radii ',
  'ensure ',
  'every ',
  'nested ',
  'control ',
  'shares ',
  'the ',
  'exact ',
  'optical ',
  'arc ',
  'of ',
  'its ',
  'parent ',
  'surface: ',
  'inner = max(0, outer − padding).',
];

const CODE_LINES = [
  'export function concentricRadius(outer: number, pad: number) {',
  '  return Math.max(0, outer - pad);',
  '}',
  '// Semantic tokens keep taste 100% color-agnostic',
  'const surface = "var(--surface-1)";',
];

const CITATIONS = [
  {
    id: 1,
    domain: 'emilkowal.ski',
    title: 'Making Interfaces Feel Tactile',
    excerpt: 'Avoid animating from scale(0); start near 0.95 with opacity for physical weight.',
  },
  {
    id: 2,
    domain: 'base-ui.com',
    title: 'Accessible Unstyled Primitives',
    excerpt: 'Focus traps, escape dismissal, and origin-aware popovers without fighting styles.',
  },
];

const BRANCH_VERSIONS = [
  'Concise: Keep motion under 200ms with crisp spring physics (420 / 32) and guard hover states behind pointer-fine media queries.',
  'Architectural: Separate structure from project color tokens so every primitive drops cleanly into light, dark, or brand themes.',
  'Checklist: 1) Concentric corners · 2) Tabular numerals · 3) Origin-aware scale · 4) Zero arbitrary pixel drift.',
];

const STREAM_TABLE_ROWS = [
  { metric: 'First token (TTFT)', value: '180ms', status: 'Optimal' },
  { metric: 'Spring settle', value: '165ms', status: 'Snappy' },
  { metric: 'Contrast audit', value: '7.4:1', status: 'AAA' },
];

export function AiStreamingSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi } = ctx;
  const [chunkIdx, setChunkIdx] = useState(STREAM_CHUNKS.length);
  const [streaming, setStreaming] = useState(false);

  // Stop / Resume state
  const [stopIdx, setStopIdx] = useState(9);
  const [isGenerating, setIsGenerating] = useState(true);

  // Code block state
  const [codeLinesShown, setCodeLinesShown] = useState(CODE_LINES.length);
  const [copiedCode, setCopiedCode] = useState(false);
  const [wrapCode, setWrapCode] = useState(false);

  // Citations state
  const [activeCite, setActiveCite] = useState<number | null>(1);

  // Artifact state
  const [artifactOpen, setArtifactOpen] = useState(true);

  // Follow-up state
  const [pickedPrompt, setPickedPrompt] = useState<string | null>(null);

  // Branch switcher state
  const [branchIdx, setBranchIdx] = useState(0);

  // Scroll-lock jump state
  const [scrolledUp, setScrolledUp] = useState(true);

  // Streaming table rows state
  const [tableRowsShown, setTableRowsShown] = useState(STREAM_TABLE_ROWS.length);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  // Token stream timer for smooth-token-fade & caret-cursor-stream
  useEffect(() => {
    if (!streaming) return;
    if (chunkIdx >= STREAM_CHUNKS.length) {
      setStreaming(false);
      return;
    }
    const t = window.setTimeout(() => setChunkIdx((c) => c + 1), 95);
    return () => window.clearTimeout(t);
  }, [streaming, chunkIdx]);

  // Stop-and-resume continuous stream timer
  useEffect(() => {
    if (variantId !== 'stop-and-resume-pill' || !isGenerating) return;
    const t = window.setTimeout(() => {
      setStopIdx((i) => (i >= STREAM_CHUNKS.length ? 3 : i + 1));
    }, 240);
    return () => window.clearTimeout(t);
  }, [variantId, isGenerating, stopIdx]);

  // Code stream timer
  useEffect(() => {
    if (variantId !== 'streaming-code-fence' || codeLinesShown >= CODE_LINES.length) return;
    const t = window.setTimeout(() => setCodeLinesShown((n) => n + 1), 320);
    return () => window.clearTimeout(t);
  }, [variantId, codeLinesShown]);

  // Table stream timer
  useEffect(() => {
    if (variantId !== 'structured-streaming-table' || tableRowsShown >= STREAM_TABLE_ROWS.length) return;
    const t = window.setTimeout(() => setTableRowsShown((n) => n + 1), 360);
    return () => window.clearTimeout(t);
  }, [variantId, tableRowsShown]);

  const replayStream = () => {
    setChunkIdx(1);
    setStreaming(true);
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Streamdown Soft Token Fade-In & 02. Precision Monospace Block Caret
  if (variantId === 'smooth-token-fade' || variantId === 'caret-cursor-stream') {
    const isCaret = variantId === 'caret-cursor-stream';
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className="text-[10.5px] uppercase tracking-[0.06em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {streaming ? 'Streaming tokens…' : 'Complete'}
          </span>
          <button
            type="button"
            onClick={replayStream}
            className="craft-pressable inline-flex h-7 items-center gap-1 px-2.5 text-[11px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-1)',
            }}
          >
            <Play className="h-3 w-3" /> Replay stream
          </button>
        </div>

        <p
          className="min-h-[62px] text-[13px] leading-relaxed text-pretty-craft"
          style={{
            color: 'var(--ink-1)',
            fontFamily: isCaret ? 'var(--dial-font-mono)' : 'var(--dial-font-body)',
          }}
        >
          {STREAM_CHUNKS.slice(0, chunkIdx).map((tok, i) =>
            isCaret ? (
              <span key={i}>{tok}</span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
              >
                {tok}
              </motion.span>
            )
          )}
          {isCaret && (
            <span
              className="ml-0.5 inline-block h-[13px] w-[7px] animate-pulse align-middle"
              style={{ background: 'var(--accent)' }}
            />
          )}
        </p>
      </div>
    );
  }

  // 03. Floating Stop / Regenerate Control Pill
  if (variantId === 'stop-and-resume-pill') {
    return (
      <div className="flex flex-col justify-between gap-3 p-4" style={cardStyle}>
        <p className="min-h-[56px] text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-1)' }}>
          {STREAM_CHUNKS.slice(0, stopIdx).join('')}
          {isGenerating && (
            <span
              className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full align-middle"
              style={{ background: 'var(--accent)' }}
            />
          )}
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsGenerating((g) => !g)}
            className="craft-pressable inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[11.5px] font-medium"
            style={{
              background: isGenerating ? 'var(--surface-0)' : 'var(--accent)',
              color: isGenerating ? 'var(--ink-1)' : 'var(--accent-ink)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {isGenerating ? (
              <>
                <Square className="h-3 w-3 fill-current" />
                Stop generating
              </>
            ) : (
              <>
                <RotateCcw className="h-3 w-3" />
                Continue generating
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // 04. Live Streaming Code Block + Sticky Copy
  if (variantId === 'streaming-code-fence') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div
          className="flex items-center justify-between gap-2 px-3 py-1.5"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
          >
            radius.ts
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCodeLinesShown(1)}
              className="craft-pressable px-1.5 py-0.5 text-[10.5px]"
              style={{ color: 'var(--ink-3)' }}
            >
              Replay
            </button>
            <button
              type="button"
              onClick={() => setWrapCode((w) => !w)}
              title="Toggle wrap"
              className="craft-pressable inline-flex h-6 w-6 items-center justify-center rounded"
              style={{
                background: wrapCode ? 'var(--surface-2)' : 'transparent',
                color: 'var(--ink-2)',
              }}
            >
              <WrapText className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => {
                setCopiedCode(true);
                window.setTimeout(() => setCopiedCode(false), 1200);
              }}
              className="craft-pressable inline-flex h-6 items-center gap-1 rounded px-2 text-[10.5px] font-medium"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-subtle)',
                color: copiedCode ? 'var(--success)' : 'var(--ink-1)',
              }}
            >
              {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedCode ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <pre
          className={`p-3 text-[11px] leading-relaxed ${wrapCode ? 'whitespace-pre-wrap' : 'overflow-x-auto'}`}
          style={{
            background: 'var(--surface-recessed)',
            color: 'var(--ink-1)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {CODE_LINES.slice(0, codeLinesShown).map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="tabular-nums-auto select-none opacity-40">{i + 1}</span>
              <span>{breakUi && i === 3 ? `${line} — extended-enterprise-audit-comment` : line}</span>
            </div>
          ))}
        </pre>
      </div>
    );
  }

  // 05. Inline Numbered Citations + Source Peek
  if (variantId === 'inline-citation-chips') {
    const selected = CITATIONS.find((c) => c.id === activeCite);
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <p className="text-[12.5px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-1)' }}>
          Prefer subtle origin-aware scale transitions (0.95 → 1) for physical weight
          <button
            type="button"
            onClick={() => setActiveCite(activeCite === 1 ? null : 1)}
            className="mx-1 inline-flex h-4 min-w-4 items-center justify-center rounded px-1 align-super text-[9.5px] font-semibold"
            style={{
              background: activeCite === 1 ? 'var(--accent)' : 'var(--surface-2)',
              color: activeCite === 1 ? 'var(--accent-ink)' : 'var(--ink-1)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            1
          </button>
          and pair them with unstyled accessible overlay primitives
          <button
            type="button"
            onClick={() => setActiveCite(activeCite === 2 ? null : 2)}
            className="mx-1 inline-flex h-4 min-w-4 items-center justify-center rounded px-1 align-super text-[9.5px] font-semibold"
            style={{
              background: activeCite === 2 ? 'var(--accent)' : 'var(--surface-2)',
              color: activeCite === 2 ? 'var(--accent-ink)' : 'var(--ink-1)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            2
          </button>
          so keyboard traps never regress.
        </p>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={transition}
              className="p-2.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
              }}
            >
              <div className="flex items-center justify-between text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                <span>[{selected.id}] {selected.domain}</span>
                <span style={{ color: 'var(--ink-2)' }}>{selected.title}</span>
              </div>
              <p className="mt-1 text-[11.5px] leading-snug" style={{ color: 'var(--ink-2)' }}>
                “{selected.excerpt}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 06. Structured Artifact / Deliverable Card
  if (variantId === 'structured-artifact-card') {
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <p className="text-[12px]" style={{ color: 'var(--ink-2)' }}>
          I generated a calibrated color-agnostic token sheet ready for your repo:
        </p>
        <div
          className="overflow-hidden"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${innerR}px`,
          }}
        >
          <button
            type="button"
            onClick={() => setArtifactOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
              >
                <FileCode2 className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? 'EnterpriseSemanticTokens_v2_Production.css' : 'semantic-tokens.css'}
                </div>
                <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  Artifact · v3 · 18 variables
                </div>
              </div>
            </div>
            <span
              className="shrink-0 rounded px-2 py-0.5 text-[11px] font-medium"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--ink-1)',
              }}
            >
              {artifactOpen ? 'Collapse' : 'Open'}
            </span>
          </button>

          {artifactOpen && (
            <div
              className="px-3 py-2 text-[11px]"
              style={{
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--surface-recessed)',
                color: 'var(--ink-2)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              --radius-outer: {outerR}px; --radius-inner: {innerR}px;
            </div>
          )}
        </div>
      </div>
    );
  }

  // 07. Contextual Follow-Up Prompt Chips
  if (variantId === 'follow-up-suggestion-chips') {
    const prompts = [
      'Generate Tailwind v4 CSS vars',
      'Audit contrast on dark theme',
      'Export shadcn registry JSON',
    ];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-1)' }}>
          {pickedPrompt
            ? `Queued follow-up: “${pickedPrompt}”`
            : 'Batch 2 tokens compiled cleanly into TASTE.md with zero contrast regressions.'}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {prompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPickedPrompt(p)}
              className="craft-pressable craft-hover-border inline-flex items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-medium"
              style={{
                background: pickedPrompt === p ? 'var(--accent)' : 'var(--surface-0)',
                color: pickedPrompt === p ? 'var(--accent-ink)' : 'var(--ink-2)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
              }}
            >
              <Sparkles className="h-3 w-3 opacity-70" />
              {p}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 08. Version Switcher (1 / 3 Branches)
  if (variantId === 'branching-regenerations') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <p className="min-h-[54px] text-[12.5px] leading-relaxed text-pretty-craft" style={{ color: 'var(--ink-1)' }}>
          {BRANCH_VERSIONS[branchIdx]}
        </p>
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setBranchIdx((i) => (i - 1 + BRANCH_VERSIONS.length) % BRANCH_VERSIONS.length)}
              className="craft-pressable inline-flex h-6 w-6 items-center justify-center rounded"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', color: 'var(--ink-1)' }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span
              className="tabular-nums-auto px-1.5 text-[11px]"
              style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {branchIdx + 1} / {BRANCH_VERSIONS.length}
            </span>
            <button
              type="button"
              onClick={() => setBranchIdx((i) => (i + 1) % BRANCH_VERSIONS.length)}
              className="craft-pressable inline-flex h-6 w-6 items-center justify-center rounded"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', color: 'var(--ink-1)' }}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            Prior versions preserved
          </span>
        </div>
      </div>
    );
  }

  // 09. Auto-Scroll Pause + "Jump to Latest" Pill
  if (variantId === 'scroll-lock-jump-pill') {
    return (
      <div className="relative flex h-[196px] flex-col justify-between overflow-hidden p-4" style={cardStyle}>
        <div className="flex flex-col gap-1.5 text-[12px]" style={{ color: 'var(--ink-2)' }}>
          <div className="text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {scrolledUp ? 'Auto-scroll paused (reading earlier section)' : 'Following live stream at bottom'}
          </div>
          <p className="leading-relaxed">
            1. Keep surface depth quiet with crisp 1px hairlines and subtle shadows.
          </p>
          <p className="leading-relaxed">
            2. Respect manual scroll-up during streaming—never yank the user’s viewport away.
          </p>
        </div>

        <div className="flex justify-center">
          {scrolledUp ? (
            <button
              type="button"
              onClick={() => setScrolledUp(false)}
              className="craft-pressable inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <ArrowDown className="h-3 w-3" />
              Jump to latest (streaming…)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setScrolledUp(true)}
              className="craft-pressable rounded-full px-3 py-1 text-[11px]"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--ink-2)',
              }}
            >
              Simulate user scroll up
            </button>
          )}
        </div>
      </div>
    );
  }

  // 10. Live Streaming Structured Data Block
  return (
    <div className="overflow-hidden" style={cardStyle}>
      <div
        className="flex items-center justify-between px-3 py-2 text-[10.5px]"
        style={{
          background: 'var(--surface-0)',
          borderBottom: '1px solid var(--border-subtle)',
          color: 'var(--ink-3)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        <span>STREAMING BENCHMARK</span>
        <button
          type="button"
          onClick={() => setTableRowsShown(1)}
          className="underline-offset-2 hover:underline"
          style={{ color: 'var(--ink-2)' }}
        >
          Replay rows
        </button>
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {STREAM_TABLE_ROWS.slice(0, tableRowsShown).map((row) => (
          <motion.div
            key={row.metric}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="grid grid-cols-[1.3fr_0.7fr_0.7fr] items-center px-3 py-2 text-[12px]"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
              {row.metric}
            </span>
            <span
              className="tabular-nums-auto text-right text-[11.5px]"
              style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {row.value}
            </span>
            <span
              className="text-right text-[11px] font-medium"
              style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {row.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
