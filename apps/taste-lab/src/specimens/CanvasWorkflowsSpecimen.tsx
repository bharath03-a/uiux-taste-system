import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  GitCommitHorizontal,
  GripVertical,
  Hand,
  History,
  Keyboard,
  MousePointer2,
  PenTool,
  Plus,
  Square,
  Users,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function CanvasWorkflowsSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'node-pipeline-flow-strip':
      return <NodePipelineFlowStrip ctx={ctx} />;
    case 'kanban-swimlane-mini-board':
      return <KanbanSwimlaneMiniBoard ctx={ctx} />;
    case 'gantt-milestone-timeline':
      return <GanttMilestoneTimeline ctx={ctx} />;
    case 'rule-condition-builder':
      return <RuleConditionBuilder ctx={ctx} />;
    case 'inspector-property-scrubbers':
      return <InspectorPropertyScrubbers ctx={ctx} />;
    case 'keyboard-shortcut-hud':
      return <KeyboardShortcutHud ctx={ctx} />;
    case 'split-resizable-pane-handle':
      return <SplitResizablePaneHandle ctx={ctx} />;
    case 'multi-cursor-presence-bar':
      return <MultiCursorPresenceBar ctx={ctx} />;
    case 'version-snapshot-scrubber':
      return <VersionSnapshotScrubber ctx={ctx} />;
    case 'floating-canvas-zoom-minimap':
      return <FloatingCanvasZoomMinimap ctx={ctx} />;
    default:
      return null;
  }
}

function NodePipelineFlowStrip({ ctx }: { ctx: SpecimenContext }) {
  const [selected, setSelected] = useState(1);
  const nodes = [
    { name: 'Ingest PDF', meta: 'OCR · 42p' },
    { name: 'NLP Extract', meta: '6 HCCs' },
    { name: 'MEAT Gate', meta: '4/4 Pass' },
    { name: '837P Export', meta: 'Ready' },
  ];

  return (
    <div
      className="flex flex-col gap-2.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {nodes.map((n, i) => {
          const active = selected === i;
          return (
            <div key={n.name} className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelected(i)}
                className="rounded-md px-2 py-1.5 text-left transition-colors"
                style={{
                  background: active ? 'var(--accent-soft)' : 'var(--surface-0)',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                }}
              >
                <div className="text-[11px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {n.name}
                </div>
                <div className="text-[9.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  {n.meta}
                </div>
              </button>
              {i < nodes.length - 1 && <ArrowRight className="h-3 w-3 shrink-0" style={{ color: 'var(--ink-3)' }} />}
            </div>
          );
        })}
      </div>
      <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
        {ctx.breakUi ? `Node Inspector -> ${nodes[selected].name} (${nodes[selected].meta}) · latency 140ms` : `Selected: ${nodes[selected].name} · ${nodes[selected].meta}`}
      </div>
    </div>
  );
}

function KanbanSwimlaneMiniBoard({ ctx }: { ctx: SpecimenContext }) {
  const [stage, setStage] = useState<0 | 1 | 2>(1);
  const cols = ['Queue', 'Coding', 'QA Done'];

  return (
    <div
      className="grid grid-cols-3 gap-1.5 p-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {cols.map((col, idx) => (
        <div
          key={col}
          className="flex min-h-[70px] flex-col gap-1.5 rounded-md p-1.5"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="text-[10px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {col}
          </div>
          {stage === idx && (
            <motion.button
              type="button"
              layout
              onClick={() => setStage(((stage + 1) % 3) as 0 | 1 | 2)}
              className="rounded p-1.5 text-left text-[10.5px] font-medium"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-1)',
                border: '1px solid var(--accent)',
              }}
            >
              <span className="block truncate">{ctx.breakUi ? 'CHASE-94821 · +0.49' : 'Chart #94821'}</span>
              <span className="text-[9.5px]" style={{ color: 'var(--accent)', fontFamily: 'var(--dial-font-mono)' }}>
                Advance →
              </span>
            </motion.button>
          )}
        </div>
      ))}
    </div>
  );
}

function GanttMilestoneTimeline({ ctx }: { ctx: SpecimenContext }) {
  const [focus, setFocus] = useState(1);
  const phases = [
    { label: 'Retrieval', left: '0%', width: '34%', days: 'Days 1–5' },
    { label: 'HCC Coding', left: '26%', width: '48%', days: 'Days 4–11' },
    { label: ctx.breakUi ? 'RADV QA & CMS RAPS' : 'QA & Submit', left: '66%', width: '34%', days: 'Days 10–15' },
  ];

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[10.5px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        <span style={{ color: 'var(--ink-1)' }}>{phases[focus].label}</span>
        <span style={{ color: 'var(--ink-3)' }}>{phases[focus].days}</span>
      </div>
      <div className="relative flex flex-col gap-1.5">
        <span className="pointer-events-none absolute inset-y-0 left-[58%] w-px" style={{ background: 'var(--danger)' }} />
        {phases.map((p, i) => (
          <div key={p.label} className="relative h-5 rounded" style={{ background: 'var(--surface-0)' }}>
            <button
              type="button"
              onClick={() => setFocus(i)}
              className="absolute inset-y-0.5 truncate rounded px-1.5 text-left text-[10px] font-medium"
              style={{
                left: p.left,
                width: p.width,
                background: focus === i ? 'var(--accent)' : 'var(--surface-2)',
                color: focus === i ? 'var(--accent-ink)' : 'var(--ink-2)',
              }}
            >
              {p.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RuleConditionBuilder({ ctx }: { ctx: SpecimenContext }) {
  const [op, setOp] = useState<'AND' | 'OR'>('AND');
  const [extra, setExtra] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        <span className="rounded px-1.5 py-0.5 font-semibold" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}>IF</span>
        <span className="rounded px-2 py-0.5" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
          raf_delta &gt; 0.25
        </span>
        <button
          type="button"
          onClick={() => setOp((o) => (o === 'AND' ? 'OR' : 'AND'))}
          className="rounded px-1.5 py-0.5 font-semibold"
          style={{ background: 'var(--surface-2)', color: 'var(--ink-1)' }}
        >
          {op}
        </button>
        <span className="rounded px-2 py-0.5" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
          {ctx.breakUi ? 'meat_pillars_count == 0' : 'meat == 0'}
        </span>
        {extra && (
          <span className="rounded px-2 py-0.5" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
            route: qa_queue
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => setExtra((e) => !e)}
        className="inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-[10.5px] font-medium"
        style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
      >
        <Plus className="h-3 w-3" /> {extra ? 'Remove Action' : 'Add THEN Action'}
      </button>
    </div>
  );
}

function InspectorPropertyScrubbers({ ctx }: { ctx: SpecimenContext }) {
  const [radius, setRadius] = useState(10);
  const [opacity, setOpacity] = useState(92);

  return (
    <div
      className="grid grid-cols-2 gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {[
        { label: ctx.breakUi ? 'Corner Radius' : 'Radius', val: radius, unit: 'px', step: (d: number) => setRadius((v) => Math.max(0, Math.min(24, v + d))) },
        { label: 'Opacity', val: opacity, unit: '%', step: (d: number) => setOpacity((v) => Math.max(10, Math.min(100, v + d))) },
      ].map((p) => (
        <div key={p.label} className="flex items-center justify-between rounded-md px-2 py-1.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
          <span className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{p.label}</span>
          <div className="flex items-center gap-1" style={{ fontFamily: 'var(--dial-font-mono)' }}>
            <button type="button" onClick={() => p.step(-2)} className="rounded px-1 text-[11px]" style={{ color: 'var(--ink-3)' }}>−</button>
            <span className="tabular-nums-auto text-[11px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              {p.val}{p.unit}
            </span>
            <button type="button" onClick={() => p.step(2)} className="rounded px-1 text-[11px]" style={{ color: 'var(--ink-3)' }}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function KeyboardShortcutHud({ ctx }: { ctx: SpecimenContext }) {
  const [chord, setChord] = useState('A');
  const keys = [
    { k: 'A', label: 'Accept Code' },
    { k: 'Q', label: 'Query MD' },
    { k: 'D', label: ctx.breakUi ? 'Dismiss Suspect' : 'Dismiss' },
    { k: 'J', label: 'Next Chart' },
  ];

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
      }}
    >
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'var(--ink-2)' }}>
        <Keyboard className="h-3.5 w-3.5" />
        {keys.find((x) => x.k === chord)?.label}
      </span>
      <div className="flex items-center gap-1">
        {keys.map((x) => (
          <button
            key={x.k}
            type="button"
            onClick={() => setChord(x.k)}
            className="rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
            style={{
              background: chord === x.k ? 'var(--accent)' : 'var(--surface-0)',
              color: chord === x.k ? 'var(--accent-ink)' : 'var(--ink-2)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {x.k}
          </button>
        ))}
      </div>
    </div>
  );
}

function SplitResizablePaneHandle({ ctx }: { ctx: SpecimenContext }) {
  const [split, setSplit] = useState(52);
  const trackRef = useRef<HTMLDivElement>(null);

  const onDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = trackRef.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = el.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.max(25, Math.min(75, Math.round(pct))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      ref={trackRef}
      className="flex h-[74px] items-stretch overflow-hidden p-1.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="flex flex-col justify-center overflow-hidden rounded-md px-2.5 text-[11px]"
        style={{ width: `${split}%`, background: 'var(--surface-0)', color: 'var(--ink-1)' }}
      >
        <span className="truncate font-semibold">{ctx.breakUi ? 'Encounter Chart PDF' : 'Chart'}</span>
        <span className="tabular-nums-auto text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{split}%</span>
      </div>
      <button
        type="button"
        onPointerDown={onDrag}
        onDoubleClick={() => setSplit(50)}
        title="Drag to resize · double-click to reset 50/50"
        className="flex w-4 shrink-0 cursor-col-resize items-center justify-center"
        style={{ color: 'var(--ink-3)' }}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <div
        className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden rounded-md px-2.5 text-[11px]"
        style={{ background: 'var(--surface-0)', color: 'var(--ink-1)' }}
      >
        <span className="truncate font-semibold">HCC Codes</span>
        <span className="tabular-nums-auto text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{100 - split}%</span>
      </div>
    </div>
  );
}

function MultiCursorPresenceBar({ ctx }: { ctx: SpecimenContext }) {
  const [following, setFollowing] = useState<string | null>('SC');
  const peers = [
    { id: 'SC', name: 'S. Chen (QA)' },
    { id: 'RP', name: 'R. Patel (MD)' },
    { id: 'AK', name: 'A. Kim (CPC)' },
  ];

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--ink-2)' }}>
        <Users className="h-3.5 w-3.5" />
        {following
          ? `Following ${peers.find((p) => p.id === following)?.name}`
          : ctx.breakUi
            ? '3 Reviewers Active on Chart #94821'
            : '3 Live Reviewers'}
      </span>
      <div className="flex items-center gap-1">
        {peers.map((p) => {
          const active = following === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setFollowing(active ? null : p.id)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold"
              style={{
                background: active ? 'var(--accent)' : 'var(--surface-2)',
                color: active ? 'var(--accent-ink)' : 'var(--ink-1)',
                outline: active ? '2px solid var(--accent-soft)' : 'none',
              }}
            >
              {p.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VersionSnapshotScrubber({ ctx }: { ctx: SpecimenContext }) {
  const [rev, setRev] = useState(2);
  const snaps = [
    { id: 'v1', note: 'Initial AI Extraction (4 codes)' },
    { id: 'v2', note: 'Coder Review (+E11.22, -E11.9)' },
    { id: 'v3', note: ctx.breakUi ? 'QA Adjudicated & RADV Attested' : 'QA Finalized (Ready)' },
  ];

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <History className="h-3.5 w-3.5" /> Snapshot {snaps[rev].id}
        </span>
        <div className="flex gap-1">
          {snaps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setRev(i)}
              className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px]"
              style={{
                background: rev === i ? 'var(--accent)' : 'var(--surface-0)',
                color: rev === i ? 'var(--accent-ink)' : 'var(--ink-3)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              <GitCommitHorizontal className="h-3 w-3" /> {s.id}
            </button>
          ))}
        </div>
      </div>
      <div className="text-[11px]" style={{ color: 'var(--ink-2)' }}>{snaps[rev].note}</div>
    </div>
  );
}

function FloatingCanvasZoomMinimap({ ctx }: { ctx: SpecimenContext }) {
  const [tool, setTool] = useState<'select' | 'pan' | 'annotate' | 'frame'>('annotate');
  const [zoom, setZoom] = useState(100);
  const tools = [
    { id: 'select' as const, icon: MousePointer2 },
    { id: 'pan' as const, icon: Hand },
    { id: 'annotate' as const, icon: PenTool },
    { id: 'frame' as const, icon: Square },
  ];

  return (
    <div className="flex items-center justify-center py-1">
      <div
        className="inline-flex items-center gap-1 rounded-full px-2 py-1"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {tools.map((t) => {
          const Icon = t.icon;
          const active = tool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTool(t.id)}
              className="rounded-full p-1.5 transition-colors"
              style={{
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
              }}
              aria-label={t.id}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
        <span className="mx-1 h-4 w-px" style={{ background: 'var(--border-subtle)' }} />
        <button
          type="button"
          onClick={() => setZoom((z) => (z >= 150 ? 75 : z + 25))}
          className="tabular-nums-auto rounded-full px-2 py-0.5 text-[10.5px] font-medium"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          {ctx.breakUi ? `${zoom}% Fit` : `${zoom}%`}
        </button>
      </div>
    </div>
  );
}
