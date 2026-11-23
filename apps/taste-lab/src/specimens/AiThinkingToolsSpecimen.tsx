import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  Cpu,
  FileText,
  Globe,
  Loader2,
  Search,
  Terminal,
  Wrench,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const TOOL_CHIPS = [
  { id: 'grep', label: 'grep_search', arg: 'surface-recessed', ms: '22ms', out: '14 matches across 6 files' },
  { id: 'read', label: 'view_file', arg: 'taste.json', ms: '8ms', out: 'Read 148 lines (10/10 calibrated)' },
  { id: 'lint', label: 'taste_lint', arg: '--strict', ms: '34ms', out: '0 hex leaks · 0 contrast failures' },
];

const SUBAGENTS = [
  { id: 'a1', role: 'Token Auditor', step: 'Checking 18 slots', done: true, ms: '1.1s' },
  { id: 'a2', role: 'Registry Builder', step: 'Bundling Base UI', done: false, ms: '2.4s' },
  { id: 'a3', role: 'A11y Verifier', step: 'Keyboard traps', done: true, ms: '0.9s' },
  { id: 'a4', role: 'Skill Syncer', step: 'Writing SKILL.md', done: false, ms: '1.6s' },
];

export function AiThinkingToolsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [activeChipId, setActiveChipId] = useState<string | null>('lint');
  const [termOpen, setTermOpen] = useState(false);
  const [clusterOpen, setClusterOpen] = useState(false);
  const [mcpTab, setMcpTab] = useState<'input' | 'output'>('input');
  const [planDone, setPlanDone] = useState<string[]>(['p1', 'p2']);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Collapsed "Thought for 3.2s" Pill
  if (variantId === 'collapsed-thinking-pill') {
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <button
          type="button"
          onClick={() => setThinkingOpen((v) => !v)}
          className="craft-pressable inline-flex w-fit items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-medium"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-subtle)',
            borderRadius: `${innerR}px`,
            color: 'var(--ink-2)',
          }}
        >
          <Brain className="h-3.5 w-3.5 opacity-75" />
          <span className="tabular-nums-auto">Thought for 3.2s</span>
          <ChevronDown
            className="h-3 w-3 transition-transform"
            style={{ transform: thinkingOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        <AnimatePresence initial={false}>
          {thinkingOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition}
              className="overflow-hidden"
            >
              <div
                className="pl-3 text-[11.5px] leading-relaxed"
                style={{
                  borderLeft: '2px solid var(--border-strong)',
                  color: 'var(--ink-3)',
                }}
              >
                Verified saved taste dials (baseRadius 10px, concentric true, spring 420/32).
                Ensuring all components avoid raw hex and guard hover styles cleanly.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-1)' }}>
          Updated the drawer geometry to match your calibrated 10px concentric scale.
        </p>
      </div>
    );
  }

  // 02. Vertical Hairline Step Timeline
  if (variantId === 'live-reasoning-timeline') {
    const steps = [
      'Inspect taste/taste.json schema',
      'Map semantic CSS variables',
      'Run typecheck & contrast check',
    ];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className="text-[10.5px] uppercase tracking-[0.06em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Execution Trace
          </span>
          <button
            type="button"
            onClick={() => setActiveStep((s) => (s + 1) % (steps.length + 1))}
            className="text-[11px] underline-offset-2 hover:underline"
            style={{ color: 'var(--ink-2)' }}
          >
            Advance step
          </button>
        </div>

        <div className="relative ml-2 flex flex-col gap-2.5 pl-4" style={{ borderLeft: '1px solid var(--border-strong)' }}>
          {steps.map((label, idx) => {
            const done = idx < activeStep;
            const running = idx === activeStep;
            return (
              <div key={label} className="relative flex items-center justify-between gap-2 text-[12px]">
                <span
                  className="absolute -left-[21px] inline-flex h-3 w-3 items-center justify-center rounded-full"
                  style={{
                    background: done ? 'var(--accent)' : running ? 'var(--surface-1)' : 'var(--surface-0)',
                    border: done ? 'none' : '1.5px solid var(--border-strong)',
                  }}
                >
                  {done && <Check className="h-2 w-2" style={{ color: 'var(--accent-ink)' }} />}
                </span>
                <span
                  className="truncate font-medium"
                  style={{ color: done || running ? 'var(--ink-1)' : 'var(--ink-3)' }}
                >
                  {breakUi ? `${label} (enterprise-monorepo-workspace)` : label}
                </span>
                <span
                  className="shrink-0 text-[10.5px]"
                  style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  {done ? 'done' : running ? 'active' : 'next'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 03. Inline Collapsible Tool-Call Chips
  if (variantId === 'compact-tool-chip-strip') {
    const activeChip = TOOL_CHIPS.find((c) => c.id === activeChipId);
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex flex-wrap gap-1.5">
          {TOOL_CHIPS.map((chip) => {
            const act = chip.id === activeChipId;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveChipId(act ? null : chip.id)}
                className="craft-pressable inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: act ? 'var(--accent)' : 'var(--surface-0)',
                  color: act ? 'var(--accent-ink)' : 'var(--ink-2)',
                  border: act ? '1px solid transparent' : '1px solid var(--border-subtle)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                <Wrench className="h-3 w-3 opacity-80" />
                <span>{chip.label}</span>
                <span className="tabular-nums-auto opacity-75">{chip.ms}</span>
              </button>
            );
          })}
        </div>

        {activeChip && (
          <div
            className="px-3 py-2 text-[11.5px]"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            <div style={{ color: 'var(--ink-3)' }}>
              {activeChip.label}({activeChip.arg})
            </div>
            <div className="mt-0.5" style={{ color: 'var(--ink-1)' }}>
              → {activeChip.out}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 04. Live Shell Command + Collapsible Output
  if (variantId === 'terminal-command-drawer') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <button
          type="button"
          onClick={() => setTermOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
          style={{ background: 'var(--surface-0)' }}
        >
          <span className="flex min-w-0 items-center gap-2 text-[11.5px]" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-1)' }}>
            <Terminal className="h-3.5 w-3.5 shrink-0 opacity-75" />
            <span className="truncate">
              {breakUi ? 'npm run typecheck && npm run build --workspace=apps/taste-lab' : 'npm run typecheck && npm run build'}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span
              className="tabular-nums-auto rounded px-1.5 py-0.5 text-[10px] font-semibold"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--success)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              exit 0 · 1.6s
            </span>
            <ChevronRight
              className="h-3.5 w-3.5 transition-transform"
              style={{
                color: 'var(--ink-3)',
                transform: termOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
          </span>
        </button>

        {termOpen && (
          <pre
            className="overflow-x-auto px-3 py-2.5 text-[10.5px] leading-relaxed"
            style={{
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--surface-recessed)',
              color: 'var(--ink-2)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {`> tsc --noEmit\n> vite build\n✓ 2238 modules transformed.\n✓ built in 1.60s`}
          </pre>
        )}
      </div>
    );
  }

  // 05. Grouped File-Read / Search Cluster
  if (variantId === 'file-read-search-cluster') {
    const files = ['types/taste.ts', 'data/specimens.ts', 'lib/compileTaste.ts', 'App.tsx'];
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <button
          type="button"
          onClick={() => setClusterOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[12px]"
          style={{ color: 'var(--ink-1)' }}
        >
          <span className="flex min-w-0 items-center gap-2 font-medium">
            <Search className="h-3.5 w-3.5 shrink-0 opacity-75" />
            <span className="truncate">Explored 4 files · 2 grep queries</span>
          </span>
          <ChevronDown
            className="h-3.5 w-3.5 shrink-0 transition-transform"
            style={{
              color: 'var(--ink-3)',
              transform: clusterOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
        {clusterOpen && (
          <div
            className="flex flex-col gap-1 px-3 py-2"
            style={{
              background: 'var(--surface-0)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {files.map((f) => (
              <div
                key={f}
                className="flex items-center justify-between text-[11px]"
                style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3 w-3 opacity-60" />
                  {f}
                </span>
                <span style={{ color: 'var(--ink-3)' }}>read</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 06. Concurrent Subagent Status Grid
  if (variantId === 'parallel-subagent-cards') {
    return (
      <div className={`grid gap-2 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {SUBAGENTS.map((ag) => (
          <div
            key={ag.id}
            className="flex items-start justify-between gap-2 p-2.5"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
            }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                <Cpu className="h-3 w-3 shrink-0 opacity-75" />
                <span className="truncate">{ag.role}</span>
              </div>
              <div className="mt-0.5 truncate text-[11px]" style={{ color: 'var(--ink-3)' }}>
                {ag.step}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5">
              {ag.done ? (
                <Check className="h-3.5 w-3.5" style={{ color: 'var(--success)' }} />
              ) : (
                <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: 'var(--ink-2)' }} />
              )}
              <span
                className="tabular-nums-auto text-[10px]"
                style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {ag.ms}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 07. Expandable JSON Args / Result Inspector
  if (variantId === 'mcp-tool-inspector') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div
          className="flex items-center justify-between gap-2 px-3 py-2"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span
            className="truncate text-[11.5px] font-semibold"
            style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
          >
            mcp:compile_taste_md
          </span>
          <div
            className="inline-flex p-0.5"
            style={{
              background: 'var(--surface-recessed)',
              borderRadius: `${Math.max(4, innerR - 2)}px`,
            }}
          >
            {(['input', 'output'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMcpTab(tab)}
                className="px-2 py-0.5 text-[10.5px] font-medium capitalize"
                style={{
                  borderRadius: `${Math.max(3, innerR - 3)}px`,
                  background: mcpTab === tab ? 'var(--surface-1)' : 'transparent',
                  color: mcpTab === tab ? 'var(--ink-1)' : 'var(--ink-3)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <pre
          className="overflow-x-auto p-3 text-[10.5px] leading-relaxed"
          style={{
            background: 'var(--surface-recessed)',
            color: 'var(--ink-2)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {mcpTab === 'input'
            ? `{ "profile": "taste/taste.json", "colorAbstracted": true }`
            : `{ "ok": true, "written": "taste/TASTE.md", "rules": 15 }`}
        </pre>
      </div>
    );
  }

  // 08. Search Query + Retrieved Source Strip
  if (variantId === 'live-web-search-cards') {
    const sources = [
      { domain: 'base-ui.com', title: 'Dialog & Popover primitives' },
      { domain: 'emilkowal.ski', title: 'Spring animation curves' },
      { domain: 'ui.shadcn.com', title: 'v4 registry schema' },
    ];
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="inline-flex w-fit items-center gap-1.5 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
          <Globe className="h-3.5 w-3.5 opacity-75" />
          <span>Searched:</span>
          <span
            className="rounded px-1.5 py-0.5 text-[11px]"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--dial-font-mono)',
              color: 'var(--ink-1)',
            }}
          >
            “concentric border radius UI craft”
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sources.map((s) => (
            <div
              key={s.domain}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px]"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
              }}
            >
              <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>
                {s.domain}
              </span>
              <span style={{ color: 'var(--ink-3)' }}>· {s.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 09. Quiet Mono Telemetry Footer
  if (variantId === 'token-latency-telemetry') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-1)' }}>
          All 5 Batch 3 specimens compiled with zero hex leaks and 100% WCAG AA contrast across every
          project theme slot.
        </p>
        <div
          className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10.5px]"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span className="tabular-nums-auto">94 tok/s · TTFT 180ms · 1,420 tokens</span>
          <span className="tabular-nums-auto">Context 18%</span>
        </div>
      </div>
    );
  }

  // 10. Live Updating Plan Checklist
  const tasks = [
    { id: 'p1', label: 'Extend SpecimenId & metadata' },
    { id: 'p2', label: 'Build 5 interactive Batch 3 modules' },
    { id: 'p3', label: 'Run typecheck & production build' },
  ];
  const toggleTask = (id: string) =>
    setPlanDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="flex flex-col gap-2 p-4" style={cardStyle}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Agent Execution Plan
        </span>
        <span
          className="tabular-nums-auto rounded-full px-2 py-0.5 text-[10.5px] font-medium"
          style={{
            background: 'var(--surface-0)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--ink-2)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {planDone.length} / {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {tasks.map((t) => {
          const done = planDone.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => toggleTask(t.id)}
              className="flex items-center gap-2 px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-[var(--surface-2)]"
              style={{ borderRadius: `${innerR}px`, color: done ? 'var(--ink-3)' : 'var(--ink-1)' }}
            >
              <span
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded"
                style={{
                  background: done ? 'var(--accent)' : 'var(--surface-0)',
                  border: done ? 'none' : '1px solid var(--border-strong)',
                  color: 'var(--accent-ink)',
                }}
              >
                {done && <Check className="h-2.5 w-2.5" />}
              </span>
              <span className={done ? 'line-through' : 'font-medium'}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
