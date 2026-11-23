import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Command,
  CornerDownLeft,
  FileSearch,
  FileText,
  GripVertical,
  HelpCircle,
  Keyboard,
  Link2,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

interface CatalogCode {
  code: string;
  desc: string;
  hcc: string;
  raf: number;
  page: number;
  supersededBy?: string;
}

const ICD_CATALOG: CatalogCode[] = [
  { code: 'E11.22', desc: 'Type 2 diabetes mellitus w/ diabetic CKD', hcc: 'HCC 37', raf: 0.166, page: 4 },
  { code: 'E11.9', desc: 'Type 2 diabetes mellitus w/o complications', hcc: 'HCC 38', raf: 0.105, page: 4, supersededBy: 'E11.22' },
  { code: 'N18.31', desc: 'Chronic kidney disease, stage 3a', hcc: 'HCC 329', raf: 0.069, page: 4 },
  { code: 'I50.22', desc: 'Chronic systolic (congestive) heart failure', hcc: 'HCC 226', raf: 0.368, page: 7 },
  { code: 'J44.9', desc: 'Chronic obstructive pulmonary disease, unspec.', hcc: 'HCC 280', raf: 0.328, page: 7 },
  { code: 'I73.9', desc: 'Peripheral vascular disease, unspecified', hcc: 'HCC 267', raf: 0.288, page: 12 },
  { code: 'E66.01', desc: 'Morbid (severe) obesity due to excess calories', hcc: 'HCC 48', raf: 0.251, page: 12 },
  { code: 'F32.1', desc: 'Major depressive disorder, single ep., moderate', hcc: 'HCC 155', raf: 0.309, page: 12 },
];

function computeRaf(codes: { code: string; raf: number; supersededBy?: string }[]) {
  const present = new Set(codes.map((c) => c.code));
  const baseDemo = 0.442;
  return codes.reduce((sum, c) => {
    if (c.supersededBy && present.has(c.supersededBy)) return sum;
    return sum + c.raf;
  }, baseDemo);
}

export function RiskAdjustmentCodingSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'split-chart-code-workbench':
      return <SplitChartCodeWorkbench ctx={ctx} />;
    case 'command-palette-code-entry':
      return <CommandPaletteCodeEntry ctx={ctx} />;
    case 'inline-margin-annotation-workspace':
      return <InlineMarginAnnotationWorkspace ctx={ctx} />;
    case 'resizable-dual-pane-coder':
      return <ResizableDualPaneCoder ctx={ctx} />;
    case 'highlight-to-code-canvas':
      return <HighlightToCodeCanvas ctx={ctx} />;
    case 'ai-autopilot-diff-review':
      return <AiAutopilotDiffReview ctx={ctx} />;
    case 'timeline-encounter-chart-viewer':
      return <TimelineEncounterChartViewer ctx={ctx} />;
    case 'qa-overread-dual-viewer':
      return <QaOverreadDualViewer ctx={ctx} />;
    case 'cdi-query-evidence-workspace':
      return <CdiQueryEvidenceWorkspace ctx={ctx} />;
    case 'keyboard-speed-coder-hud':
      return <KeyboardSpeedCoderHud ctx={ctx} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// 01 · Classic 3-Pane Full Chart Viewer + Right Live Code Entry Rail
// ---------------------------------------------------------------------------

function SplitChartCodeWorkbench({ ctx }: { ctx: SpecimenContext }) {
  const [page, setPage] = useState<number>(4);
  const [focusedCode, setFocusedCode] = useState<string>('E11.22');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [entered, setEntered] = useState<(CatalogCode & { meat: string[] })[]>([
    { ...ICD_CATALOG[0], meat: ['M', 'A', 'T'] },
    { ...ICD_CATALOG[2], meat: ['M', 'E'] },
  ]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const existing = new Set(entered.map((e) => e.code));
    return ICD_CATALOG.filter(
      (c) => !existing.has(c.code) && (c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.hcc.toLowerCase().includes(q)),
    ).slice(0, 4);
  }, [query, entered]);

  const addCode = (c: CatalogCode) => {
    setEntered((prev) => [...prev, { ...c, meat: ['A', 'T'] }]);
    setFocusedCode(c.code);
    setPage(c.page);
    setQuery('');
    setSubmitted(false);
  };

  const toggleMeat = (code: string, letter: string) => {
    setEntered((prev) =>
      prev.map((item) =>
        item.code === code
          ? { ...item, meat: item.meat.includes(letter) ? item.meat.filter((l) => l !== letter) : [...item.meat, letter] }
          : item,
      ),
    );
  };

  const raf = computeRaf(entered);
  const pageList = [
    { n: 1, label: 'Cover', hasEvidence: false },
    { n: 4, label: 'Endo Note', hasEvidence: true },
    { n: 7, label: 'Cardio/Pulm', hasEvidence: true },
    { n: 12, label: 'Vasc/BMI', hasEvidence: true },
  ];

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: 'var(--surface-0)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Top Workspace Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
        style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
            {ctx.breakUi ? 'CHASE-2026-0094821-MA-V28' : 'CHASE-94821'}
          </span>
          <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-3)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}>
            DOS 2026-09-14 · Dr. R. Patel, MD
          </span>
          <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
            <ShieldCheck className="h-3 w-3" /> Signed
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
            <span style={{ color: 'var(--ink-3)' }}>V28 RAF</span>
            <span className="tabular-nums-auto font-semibold" style={{ color: 'var(--ink-1)' }}>{raf.toFixed(3)}</span>
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {submitted ? <Check className="h-3 w-3" /> : <CornerDownLeft className="h-3 w-3" />}
            {submitted ? 'Submitted' : 'Submit Chart'}
          </button>
        </div>
      </div>

      {/* 3-Pane Body */}
      <div className={`grid min-h-[290px] ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[74px_1fr_320px]'}`}>
        {/* Left Page Rail */}
        <div
          className="flex flex-row gap-1 overflow-x-auto p-2 lg:flex-col"
          style={{ background: 'var(--surface-1)', borderRight: '1px solid var(--border-subtle)', borderBottom: ctx.mobilePreview ? '1px solid var(--border-subtle)' : undefined }}
        >
          {pageList.map((p) => {
            const active = page === p.n;
            return (
              <button
                key={p.n}
                type="button"
                onClick={() => setPage(p.n)}
                className="flex shrink-0 flex-col items-center justify-center rounded-md px-2 py-1.5 text-center transition-colors"
                style={{
                  background: active ? 'var(--surface-2)' : 'var(--surface-0)',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                }}
              >
                <span className="text-[10.5px] font-semibold" style={{ fontFamily: 'var(--dial-font-mono)' }}>p.{p.n}</span>
                <span className="mt-0.5 text-[9px]">{p.label}</span>
                <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: p.hasEvidence ? 'var(--accent)' : 'transparent' }} />
              </button>
            );
          })}
        </div>

        {/* Center Full Chart Viewer */}
        <div className="flex flex-col gap-2.5 p-3.5" style={{ background: 'var(--surface-0)', borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
          <div className="flex items-center justify-between text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              ENCOUNTER CHART · PAGE {page} OF 12
            </span>
            <span>Click highlighted text to sync code</span>
          </div>

          <div
            className="flex-1 rounded-lg p-3.5 text-[12px] leading-relaxed"
            style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', color: 'var(--ink-2)' }}
          >
            <div className="mb-2 flex items-center justify-between pb-2 text-[11px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>
                {page === 4 ? 'Endocrinology Follow-Up — Assessment & Plan' : page === 7 ? 'Cardiopulmonary Consult — Echo & Spirometry' : page === 12 ? 'Primary Care — Vascular & Metabolic Screen' : 'Encounter Cover Sheet'}
              </span>
              <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>MRN-••••109</span>
            </div>

            {page === 4 && (
              <div className="space-y-2">
                <p>
                  1.{' '}
                  <button
                    type="button"
                    onClick={() => setFocusedCode('E11.22')}
                    className="rounded px-1 py-0.5 text-left transition-colors"
                    style={{
                      background: focusedCode === 'E11.22' ? 'var(--accent-soft)' : 'var(--surface-0)',
                      color: 'var(--ink-1)',
                      outline: focusedCode === 'E11.22' ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    Type 2 diabetes mellitus with diabetic nephropathy (HbA1c 7.8% today). Continue empagliflozin 10mg PO daily and metformin 1000mg BID.
                  </button>
                </p>
                <p>
                  2.{' '}
                  <button
                    type="button"
                    onClick={() => setFocusedCode('N18.31')}
                    className="rounded px-1 py-0.5 text-left transition-colors"
                    style={{
                      background: focusedCode === 'N18.31' ? 'var(--accent-soft)' : 'var(--surface-0)',
                      color: 'var(--ink-1)',
                      outline: focusedCode === 'N18.31' ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    Chronic kidney disease stage 3a — eGFR 52 mL/min, uACR 142 mg/g. Repeat BMP and renal panel in 90 days; avoid NSAIDs.
                  </button>
                </p>
              </div>
            )}

            {page === 7 && (
              <div className="space-y-2">
                <p>
                  1.{' '}
                  <button
                    type="button"
                    onClick={() => setFocusedCode('I50.22')}
                    className="rounded px-1 py-0.5 text-left transition-colors"
                    style={{
                      background: focusedCode === 'I50.22' ? 'var(--accent-soft)' : 'var(--surface-0)',
                      color: 'var(--ink-1)',
                      outline: focusedCode === 'I50.22' ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    Chronic systolic heart failure (HFrEF), recent TTE EF 38%. Euvolemic on sacubitril/valsartan 49/51mg BID and carvedilol 12.5mg BID.
                  </button>
                </p>
                <p>
                  2.{' '}
                  <button
                    type="button"
                    onClick={() => setFocusedCode('J44.9')}
                    className="rounded px-1 py-0.5 text-left transition-colors"
                    style={{
                      background: focusedCode === 'J44.9' ? 'var(--accent-soft)' : 'var(--surface-0)',
                      color: 'var(--ink-1)',
                      outline: focusedCode === 'J44.9' ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    COPD stable on tiotropium 18mcg daily; FEV1/FVC 0.61. No recent exacerbations.
                  </button>
                </p>
              </div>
            )}

            {page === 12 && (
              <div className="space-y-2">
                <p>
                  1. Peripheral arterial duplex shows ABI 0.72 right; claudication at 2 blocks — start cilostazol 100mg BID (I73.9).
                </p>
                <p>
                  2. BMI 41.2 kg/m² — morbid obesity discussed, nutrition referral placed (E66.01).
                </p>
              </div>
            )}

            {page === 1 && (
              <p>
                Face-to-face ambulatory packet · 12 scanned pages · OCR confidence 99.1% · 4 AI diagnosis spans indexed on pages 4, 7, and 12.
              </p>
            )}
          </div>
        </div>

        {/* Right Code Entry + Active Codes Rail */}
        <div className="flex flex-col gap-2.5 p-3" style={{ background: 'var(--surface-1)' }}>
          {/* Live ICD-10 Code Entry Box */}
          <div className="relative">
            <div
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5"
              style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)' }}
            >
              <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && matches[0]) addCode(matches[0]);
                }}
                placeholder="Enter ICD-10 (try I50, J44, I73…)"
                className="min-w-0 flex-1 bg-transparent text-[11.5px] outline-none"
                style={{ color: 'var(--ink-1)' }}
              />
              <kbd className="rounded px-1 py-0.5 text-[9.5px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                ↵
              </kbd>
            </div>

            {matches.length > 0 && (
              <div
                className="absolute inset-x-0 top-full z-20 mt-1 flex flex-col gap-0.5 rounded-lg p-1"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-md)' }}
              >
                {matches.map((m) => (
                  <button
                    key={m.code}
                    type="button"
                    onClick={() => addCode(m)}
                    className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[11px] hover:opacity-90"
                    style={{ background: 'var(--surface-0)', color: 'var(--ink-1)' }}
                  >
                    <span className="min-w-0 truncate">
                      <strong style={{ fontFamily: 'var(--dial-font-mono)' }}>{m.code}</strong> · {m.desc}
                    </span>
                    <span className="shrink-0 text-[10px]" style={{ color: 'var(--accent)', fontFamily: 'var(--dial-font-mono)' }}>
                      +{m.raf.toFixed(3)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick-Add Suggestions */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>AI Suggest:</span>
            {ICD_CATALOG.slice(3, 6)
              .filter((c) => !entered.some((e) => e.code === c.code))
              .map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => addCode(c)}
                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  <Plus className="h-2.5 w-2.5" /> {c.code}
                </button>
              ))}
          </div>

          {/* Entered Codes List */}
          <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
            {entered.map((item) => {
              const active = focusedCode === item.code;
              const superseded = Boolean(item.supersededBy && entered.some((e) => e.code === item.supersededBy));
              return (
                <div
                  key={item.code}
                  onClick={() => {
                    setFocusedCode(item.code);
                    setPage(item.page);
                  }}
                  className="cursor-pointer rounded-md p-2 transition-colors"
                  style={{
                    background: active ? 'var(--surface-2)' : 'var(--surface-0)',
                    border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                    opacity: superseded ? 0.55 : 1,
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11.5px] font-semibold ${superseded ? 'line-through' : ''}`} style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                        {item.code}
                      </span>
                      <span className="rounded px-1 py-0.5 text-[9.5px]" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
                        {item.hcc}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="tabular-nums-auto text-[10.5px] font-medium" style={{ color: superseded ? 'var(--ink-3)' : 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
                        {superseded ? 'Trumped' : `+${item.raf.toFixed(3)}`}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEntered((prev) => prev.filter((x) => x.code !== item.code));
                        }}
                        aria-label={`Remove ${item.code}`}
                        style={{ color: 'var(--ink-3)' }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-0.5 truncate text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
                    {item.desc}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <div className="flex gap-1">
                      {['M', 'E', 'A', 'T'].map((l) => {
                        const on = item.meat.includes(l);
                        return (
                          <button
                            key={l}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMeat(item.code, l);
                            }}
                            className="h-4 w-4 rounded text-[9.5px] font-bold"
                            style={{
                              background: on ? 'var(--accent)' : 'var(--surface-1)',
                              color: on ? 'var(--accent-ink)' : 'var(--ink-3)',
                              border: on ? 'none' : '1px solid var(--border-subtle)',
                              fontFamily: 'var(--dial-font-mono)',
                            }}
                          >
                            {l}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[9.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                      p.{item.page}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 02 · Full-Bleed Chart Viewer + Floating ⌘K Command Code Dock
// ---------------------------------------------------------------------------

function CommandPaletteCodeEntry({ ctx }: { ctx: SpecimenContext }) {
  const [input, setInput] = useState('');
  const [codes, setCodes] = useState<CatalogCode[]>([ICD_CATALOG[0], ICD_CATALOG[3]]);

  const suggestions = useMemo(() => {
    const q = input.trim().toLowerCase();
    const have = new Set(codes.map((c) => c.code));
    return ICD_CATALOG.filter(
      (c) => !have.has(c.code) && (!q || c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)),
    ).slice(0, 3);
  }, [input, codes]);

  const add = (c: CatalogCode) => {
    setCodes((prev) => [...prev, c]);
    setInput('');
  };

  return (
    <div
      className="relative flex flex-col justify-between gap-4 p-4"
      style={{
        background: 'var(--surface-0)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
        minHeight: '260px',
      }}
    >
      {/* Full-width distraction-free clinical note */}
      <div className="mx-auto w-full max-w-[760px] rounded-lg p-4" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <span>FULL-WIDTH CHART CANVAS · ZERO SIDEBAR CHROME</span>
          <span>RAF {computeRaf(codes).toFixed(3)} · {codes.length} codes captured</span>
        </div>
        <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
          <strong style={{ color: 'var(--ink-1)' }}>Assessment & Plan:</strong> Patient presents with{' '}
          <span className="rounded px-1" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}>T2DM with diabetic CKD (eGFR 52)</span>,{' '}
          <span className="rounded px-1" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}>chronic systolic HFrEF (EF 38%)</span>, and{' '}
          {ctx.breakUi ? 'moderate-to-severe COPD maintained on tiotropium 18mcg inhaled daily plus PVD with claudication.' : 'COPD on tiotropium 18mcg daily.'}
        </p>
      </div>

      {/* Floating Command Entry Dock */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {codes.map((c) => (
            <span
              key={c.code}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-strong)', fontFamily: 'var(--dial-font-mono)' }}
            >
              <span>{c.code}</span>
              <span style={{ color: 'var(--accent)' }}>{c.hcc}</span>
              <button type="button" onClick={() => setCodes((prev) => prev.filter((x) => x.code !== c.code))} aria-label={`Remove ${c.code}`}>
                <X className="h-3 w-3" style={{ color: 'var(--ink-3)' }} />
              </button>
            </span>
          ))}
        </div>

        <div
          className="flex flex-col gap-1.5 rounded-xl p-2"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 px-1.5">
            <Command className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && suggestions[0]) add(suggestions[0]);
              }}
              placeholder="⌘K Type ICD-10 or diagnosis (e.g. J44, COPD, obesity, PVD) and hit Enter…"
              className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
              style={{ color: 'var(--ink-1)' }}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1 border-t pt-1.5" style={{ borderColor: 'var(--border-subtle)' }}>
              {suggestions.map((s) => (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => add(s)}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px]"
                  style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
                >
                  <Plus className="h-3 w-3" style={{ color: 'var(--accent)' }} />
                  <strong style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{s.code}</strong>
                  <span className="truncate max-w-[160px]">{s.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 03 · Notion / Google Docs Margin-Anchored Code Workspace
// ---------------------------------------------------------------------------

function InlineMarginAnnotationWorkspace({ ctx }: { ctx: SpecimenContext }) {
  const [captured, setCaptured] = useState<Record<string, boolean>>({ p1: true, p2: false });

  const paragraphs = [
    {
      id: 'p1',
      heading: 'Endocrine & Renal',
      text: 'T2DM with diabetic nephropathy, A1c 7.8%, eGFR 52 mL/min. Continue empagliflozin 10mg daily and repeat renal panel in 3 months.',
      code: 'E11.22 + N18.31',
      hcc: 'HCC 37 · 329',
      raf: '+0.235',
    },
    {
      id: 'p2',
      heading: 'Cardiopulmonary',
      text: ctx.breakUi
        ? 'Chronic systolic congestive heart failure (HFrEF, LVEF 38% on 08/2026 TTE), stable on GDMT including sacubitril/valsartan and carvedilol.'
        : 'Chronic systolic HF (EF 38% on TTE), stable on sacubitril/valsartan & carvedilol.',
      code: 'I50.22',
      hcc: 'HCC 226',
      raf: '+0.368',
    },
  ];

  return (
    <div
      className="flex flex-col gap-3 p-3.5"
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      {paragraphs.map((p) => {
        const on = captured[p.id];
        return (
          <div key={p.id} className={`grid items-start gap-3 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-[1fr_250px]'}`}>
            <div
              className="rounded-lg p-3 text-[12px] leading-relaxed"
              style={{
                background: 'var(--surface-1)',
                border: `1px solid ${on ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
                borderLeft: `3px solid ${on ? 'var(--accent)' : 'var(--border-subtle)'}`,
                color: 'var(--ink-2)',
              }}
            >
              <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-[0.05em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                {p.heading}
              </div>
              {p.text}
            </div>

            <div
              className="flex flex-col gap-1.5 rounded-lg p-2.5"
              style={{
                background: on ? 'var(--surface-1)' : 'var(--surface-0)',
                border: `1px ${on ? 'solid var(--accent)' : 'dashed var(--border-strong)'}`,
              }}
            >
              <div className="flex items-center justify-between gap-1 text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>{p.code}</span>
                <span style={{ color: 'var(--success)' }}>{p.raf}</span>
              </div>
              <div className="text-[10px]" style={{ color: 'var(--ink-3)' }}>{p.hcc} · Anchored to paragraph</div>
              <button
                type="button"
                onClick={() => setCaptured((prev) => ({ ...prev, [p.id]: !prev[p.id] }))}
                className="mt-0.5 inline-flex items-center justify-center gap-1 rounded-md py-1 text-[11px] font-medium"
                style={{
                  background: on ? 'var(--surface-2)' : 'var(--accent)',
                  color: on ? 'var(--ink-1)' : 'var(--accent-ink)',
                }}
              >
                {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                {on ? 'Coded & Linked' : 'Capture Code'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 04 · Draggable Split-Pane Chart + Inline Tabular Code Entry Sheet
// ---------------------------------------------------------------------------

function ResizableDualPaneCoder({ ctx }: { ctx: SpecimenContext }) {
  const [split, setSplit] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<CatalogCode[]>([ICD_CATALOG[0], ICD_CATALOG[3]]);
  const [quickCode, setQuickCode] = useState('');

  const startDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = containerRef.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = el.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.max(32, Math.min(68, Math.round(pct))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const addQuick = () => {
    const q = quickCode.trim().toLowerCase();
    const found = ICD_CATALOG.find(
      (c) => !rows.some((r) => r.code === c.code) && (!q || c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)),
    );
    if (found) {
      setRows((prev) => [...prev, found]);
      setQuickCode('');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex overflow-hidden ${ctx.mobilePreview ? 'flex-col' : 'flex-col lg:flex-row'}`}
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)', minHeight: '230px' }}
    >
      {/* Left Chart Pane */}
      <div
        className="flex flex-col gap-2 p-3"
        style={{ width: ctx.mobilePreview ? '100%' : undefined, flexBasis: ctx.mobilePreview ? undefined : `${split}%`, background: 'var(--surface-1)' }}
      >
        <div className="flex items-center justify-between text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <span>CHART VIEWER ({split}%)</span>
          <span>Drag divider ↔</span>
        </div>
        <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
          Encounter Note (09/14): T2DM w/ diabetic CKD stage 3a (A1c 7.8%, eGFR 52). Chronic systolic HFrEF (EF 38%) on GDMT. COPD stable on tiotropium.
        </p>
      </div>

      {/* Draggable Divider */}
      {!ctx.mobilePreview && (
        <button
          type="button"
          onPointerDown={startDrag}
          onDoubleClick={() => setSplit(48)}
          title="Drag to resize panes · Double-click to reset"
          className="hidden w-3.5 shrink-0 cursor-col-resize items-center justify-center lg:flex"
          style={{ background: 'var(--surface-0)', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)', color: 'var(--ink-3)' }}
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Right Code Entry Sheet */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3" style={{ background: 'var(--surface-1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[11px]">
            <thead>
              <tr style={{ color: 'var(--ink-3)', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}>
                <th className="pb-1.5 font-medium">ICD-10</th>
                <th className="pb-1.5 font-medium">HCC</th>
                <th className="pb-1.5 text-right font-medium">RAF</th>
                <th className="pb-1.5 text-right font-medium">Act</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="py-1.5 font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{r.code}</td>
                  <td className="py-1.5" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>{r.hcc}</td>
                  <td className="tabular-nums-auto py-1.5 text-right" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>+{r.raf.toFixed(3)}</td>
                  <td className="py-1.5 text-right">
                    <button type="button" onClick={() => setRows((prev) => prev.filter((x) => x.code !== r.code))} style={{ color: 'var(--ink-3)' }}>
                      <Trash2 className="inline h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <input
            type="text"
            value={quickCode}
            onChange={(e) => setQuickCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addQuick();
            }}
            placeholder="+ Quick-add code (J44, N18, I73)…"
            className="min-w-0 flex-1 rounded-md px-2 py-1 text-[11px] outline-none"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          />
          <button type="button" onClick={addQuick} className="rounded-md px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 05 · Highlight-Text-in-Chart → Instant Code Popover Canvas
// ---------------------------------------------------------------------------

function HighlightToCodeCanvas({ ctx }: { ctx: SpecimenContext }) {
  const [selectedSpan, setSelectedSpan] = useState<'ckd' | 'hf' | 'copd'>('hf');
  const [captured, setCaptured] = useState<string[]>(['E11.22']);

  const spanMap = {
    ckd: { phrase: 'diabetic nephropathy (eGFR 52)', code: 'E11.22', hcc: 'HCC 37', raf: '+0.166' },
    hf: { phrase: 'chronic systolic HFrEF, EF 38%', code: 'I50.22', hcc: 'HCC 226', raf: '+0.368' },
    copd: { phrase: 'COPD maintained on tiotropium', code: 'J44.9', hcc: 'HCC 280', raf: '+0.328' },
  };
  const cur = spanMap[selectedSpan];
  const isCaptured = captured.includes(cur.code);

  return (
    <div
      className="flex flex-col gap-3 p-3.5"
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
        <span className="inline-flex items-center gap-1"><FileSearch className="h-3.5 w-3.5" /> EVIDENCE-FIRST CODING · CLICK ANY PHRASE IN CHART</span>
        <span>{captured.length} Span-Linked Codes</span>
      </div>

      <div className="rounded-lg p-3.5 text-[12px] leading-relaxed" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', color: 'var(--ink-2)' }}>
        Encounter Note: Patient managed for{' '}
        {(['ckd', 'hf', 'copd'] as const).map((k, idx) => {
          const item = spanMap[k];
          const sel = selectedSpan === k;
          const cap = captured.includes(item.code);
          return (
            <span key={k}>
              <button
                type="button"
                onClick={() => setSelectedSpan(k)}
                className="rounded px-1.5 py-0.5 text-left font-medium transition-colors"
                style={{
                  background: sel ? 'var(--accent-soft)' : cap ? 'var(--surface-2)' : 'var(--surface-0)',
                  color: 'var(--ink-1)',
                  outline: sel ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
                }}
              >
                {item.phrase}
                {cap && <Check className="ml-1 inline h-3 w-3" style={{ color: 'var(--success)' }} />}
              </button>
              {idx === 0 ? ', ' : idx === 1 ? ', and ' : '.'}
            </span>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSpan}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: ctx.dials.motionMode === 'instant' ? 0 : 0.14 }}
          className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--accent)' }}
        >
          <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
            <Link2 className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
            <strong style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{cur.code}</strong>
            <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>{cur.hcc}</span>
            <span style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>{cur.raf}</span>
          </div>
          <button
            type="button"
            onClick={() => setCaptured((prev) => (prev.includes(cur.code) ? prev.filter((x) => x !== cur.code) : [...prev, cur.code]))}
            className="rounded-md px-2.5 py-1 text-[11px] font-medium"
            style={{ background: isCaptured ? 'var(--surface-2)' : 'var(--accent)', color: isCaptured ? 'var(--ink-1)' : 'var(--accent-ink)' }}
          >
            {isCaptured ? 'Captured & Linked ✓' : 'Capture & Link Span'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 06 · AI Pre-Coded Autopilot + Coder Verification Workspace
// ---------------------------------------------------------------------------

function AiAutopilotDiffReview({ ctx }: { ctx: SpecimenContext }) {
  const [statuses, setStatuses] = useState<Record<string, 'pending' | 'accepted' | 'dismissed'>>({
    'E11.22': 'accepted',
    'I50.22': 'pending',
    'J44.9': 'pending',
  });

  const suspects = [
    { code: 'E11.22', hcc: 'HCC 37', conf: '98%', quote: 'T2DM w/ diabetic nephropathy, A1c 7.8% · p.4', raf: '+0.166' },
    { code: 'I50.22', hcc: 'HCC 226', conf: '95%', quote: 'Chronic systolic HFrEF, EF 38% on GDMT · p.7', raf: '+0.368' },
    { code: 'J44.9', hcc: 'HCC 280', conf: '82%', quote: ctx.breakUi ? 'COPD stable on tiotropium 18mcg daily (verify PFT) · p.7' : 'COPD stable on tiotropium · p.7', raf: '+0.328' },
  ];

  const acceptHighConf = () => {
    setStatuses({ 'E11.22': 'accepted', 'I50.22': 'accepted', 'J44.9': statuses['J44.9'] });
  };

  return (
    <div
      className="flex flex-col gap-2.5 p-3.5"
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
          AI Pre-Coded Chart · Verify Before Submit
        </span>
        <button
          type="button"
          onClick={acceptHighConf}
          className="rounded-md px-2.5 py-1 text-[10.5px] font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Accept All ≥95% Confidence
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {suspects.map((s) => {
          const st = statuses[s.code];
          return (
            <div
              key={s.code}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2"
              style={{
                background: 'var(--surface-1)',
                border: `1px solid ${st === 'accepted' ? 'var(--accent)' : 'var(--border-subtle)'}`,
                opacity: st === 'dismissed' ? 0.5 : 1,
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                  <strong style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{s.code}</strong>
                  <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>{s.hcc}</span>
                  <span className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>AI {s.conf}</span>
                  <span className="text-[10.5px]" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>{s.raf}</span>
                </div>
                <div className="mt-0.5 truncate text-[11px]" style={{ color: 'var(--ink-2)' }}>
                  “{s.quote}”
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStatuses((p) => ({ ...p, [s.code]: 'accepted' }))}
                  className="rounded px-2 py-1 text-[10.5px] font-medium"
                  style={{
                    background: st === 'accepted' ? 'var(--accent)' : 'var(--surface-0)',
                    color: st === 'accepted' ? 'var(--accent-ink)' : 'var(--ink-1)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {st === 'accepted' ? 'Accepted ✓' : 'Accept'}
                </button>
                <button
                  type="button"
                  onClick={() => setStatuses((p) => ({ ...p, [s.code]: 'dismissed' }))}
                  className="rounded px-2 py-1 text-[10.5px]"
                  style={{ background: 'var(--surface-0)', color: 'var(--ink-3)', border: '1px solid var(--border-subtle)' }}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 07 · Longitudinal Multi-DOS Encounter Timeline + YTD HCC Rollup
// ---------------------------------------------------------------------------

function TimelineEncounterChartViewer({ ctx }: { ctx: SpecimenContext }) {
  const [dosIdx, setDosIdx] = useState(2);
  const encounters = [
    { date: '02/11', spec: 'PCP Annual', note: 'DM2 uncomplicated (E11.9) on metformin; hypertension controlled.', codes: ['E11.9 (Trumped)'] },
    { date: '05/28', spec: 'Lab Panel', note: 'HbA1c 7.8%, eGFR 52 mL/min, uACR 142 mg/g — supports diabetic CKD staging.', codes: ['Supporting Labs'] },
    { date: '09/14', spec: 'Endo / Cardio', note: ctx.breakUi ? 'T2DM w/ diabetic CKD stage 3a (E11.22, N18.31) + Chronic systolic HFrEF EF 38% (I50.22).' : 'T2DM w/ diabetic CKD (E11.22) + HFrEF (I50.22).', codes: ['E11.22', 'N18.31', 'I50.22'] },
  ];

  return (
    <div
      className="flex flex-col gap-3 p-3.5"
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="grid grid-cols-3 gap-2">
        {encounters.map((enc, i) => {
          const active = dosIdx === i;
          return (
            <button
              key={enc.date}
              type="button"
              onClick={() => setDosIdx(i)}
              className="rounded-lg p-2 text-left transition-colors"
              style={{
                background: active ? 'var(--surface-1)' : 'transparent',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
              }}
            >
              <div className="text-[11px] font-semibold" style={{ color: active ? 'var(--ink-1)' : 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
                DOS {enc.date}
              </div>
              <div className="truncate text-[10.5px]" style={{ color: 'var(--ink-3)' }}>{enc.spec}</div>
            </button>
          );
        })}
      </div>

      <div className={`grid gap-3 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-[1fr_240px]'}`}>
        <div className="rounded-lg p-3 text-[12px] leading-relaxed" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', color: 'var(--ink-2)' }}>
          <div className="mb-1 text-[10px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {encounters[dosIdx].date} · {encounters[dosIdx].spec}
          </div>
          {encounters[dosIdx].note}
        </div>
        <div className="flex flex-col justify-between rounded-lg p-3" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
          <div>
            <div className="text-[10px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>YTD Active HCCs</div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {encounters[dosIdx].codes.map((c) => (
                <span key={c} className="rounded px-1.5 py-0.5 text-[10.5px] font-medium" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between pt-2 text-[11px]" style={{ borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}>
            <span style={{ color: 'var(--ink-3)' }}>YTD V28 RAF</span>
            <span className="tabular-nums-auto font-semibold" style={{ color: 'var(--ink-1)' }}>1.045</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 08 · Blind QA Overread & Coder Adjudication Workspace
// ---------------------------------------------------------------------------

function QaOverreadDualViewer({ ctx }: { ctx: SpecimenContext }) {
  const [status, setStatus] = useState<'open' | 'adjudicated' | 'returned'>('open');

  return (
    <div
      className={`grid gap-3 p-3.5 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1fr_1fr]'}`}
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="rounded-lg p-3" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
        <div className="mb-1.5 flex items-center justify-between text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <span className="inline-flex items-center gap-1"><ClipboardCheck className="h-3.5 w-3.5" /> CHART EVIDENCE · p.4</span>
          <span>QA Blind Overread</span>
        </div>
        <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
          Assessment: “T2DM with diabetic nephropathy, eGFR 52 (CKD 3a). Continue empagliflozin 10mg daily.”
        </p>
      </div>

      <div className="flex flex-col justify-between gap-2 rounded-lg p-3" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
            <div className="text-[9.5px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>Coder A</div>
            <div className="mt-0.5 font-semibold" style={{ color: 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}>E11.9</div>
            <div className="text-[10px]" style={{ color: 'var(--ink-3)' }}>Under-coded</div>
          </div>
          <div className="rounded p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--accent)' }}>
            <div className="text-[9.5px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>QA Auditor</div>
            <div className="mt-0.5 font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>E11.22 · N18.31</div>
            <div className="text-[10px]" style={{ color: 'var(--success)' }}>+0.130 RAF delta</div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
            {status === 'open' ? 'Concordance 66.7%' : status === 'adjudicated' ? 'Finalized with QA codes' : 'Returned w/ coaching'}
          </span>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => setStatus('returned')} className="rounded px-2 py-1 text-[10.5px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}>
              Coach
            </button>
            <button type="button" onClick={() => setStatus('adjudicated')} className="rounded px-2.5 py-1 text-[10.5px] font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
              Adjudicate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 09 · Chart-Side Non-Leading Provider Query (CDI) Workspace
// ---------------------------------------------------------------------------

function CdiQueryEvidenceWorkspace({ ctx }: { ctx: SpecimenContext }) {
  const [selectedQuote, setSelectedQuote] = useState<'ckd' | 'hf'>('ckd');
  const [sent, setSent] = useState(false);

  return (
    <div
      className={`grid gap-3 p-3.5 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1fr_1fr]'}`}
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex flex-col gap-2 rounded-lg p-3" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
        <div className="text-[10px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          Click Ambiguous Chart Excerpt to Cite
        </div>
        <button
          type="button"
          onClick={() => { setSelectedQuote('ckd'); setSent(false); }}
          className="rounded-md p-2 text-left text-[11.5px]"
          style={{
            background: selectedQuote === 'ckd' ? 'var(--accent-soft)' : 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: `1px solid ${selectedQuote === 'ckd' ? 'var(--accent)' : 'var(--border-subtle)'}`,
          }}
        >
          “PMH: DM2, CKD (eGFR 48). Continue lisinopril 20mg.” — <span style={{ color: 'var(--ink-3)' }}>Missing stage & linkage</span>
        </button>
        <button
          type="button"
          onClick={() => { setSelectedQuote('hf'); setSent(false); }}
          className="rounded-md p-2 text-left text-[11.5px]"
          style={{
            background: selectedQuote === 'hf' ? 'var(--accent-soft)' : 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: `1px solid ${selectedQuote === 'hf' ? 'var(--accent)' : 'var(--border-subtle)'}`,
          }}
        >
          “CHF stable on Lasix 40mg daily.” — <span style={{ color: 'var(--ink-3)' }}>Missing systolic/diastolic acuity</span>
        </button>
      </div>

      <div className="flex flex-col justify-between gap-2 rounded-lg p-3" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            <span className="inline-flex items-center gap-1"><HelpCircle className="h-3.5 w-3.5" /> Non-Leading CDI Query</span>
            <span className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>AHIMA Compliant</span>
          </div>
          <p className="mt-1.5 rounded p-2 text-[11px] leading-snug" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}>
            {selectedQuote === 'ckd'
              ? ctx.breakUi
                ? 'Based on documented eGFR 48 and DM2, please clarify CKD stage (3a / 3b / other) and whether CKD is linked to diabetes, unrelated, or clinically undetermined.'
                : 'Based on eGFR 48 & DM2, please clarify CKD stage and diabetic linkage (linked / unrelated / undetermined).'
              : 'Based on documented CHF on Lasix 40mg, please specify type (systolic / diastolic / combined) and acuity (acute / chronic / undetermined).'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(true)}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-medium"
          style={{ background: sent ? 'var(--surface-2)' : 'var(--accent)', color: sent ? 'var(--ink-1)' : 'var(--accent-ink)' }}
        >
          {sent ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
          {sent ? 'Query Sent to Dr. Patel · Chart Held' : 'Send Query & Hold Chart'}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 10 · Ultra-Dense Keyboard-First Power-Coder Split View + Shortcut HUD
// ---------------------------------------------------------------------------

function KeyboardSpeedCoderHud({ ctx }: { ctx: SpecimenContext }) {
  const [cursor, setCursor] = useState(0);
  const [accepted, setAccepted] = useState<Record<number, boolean>>({ 0: true });
  const queue = [
    { code: 'E11.22', hcc: 'HCC 37', raf: '+0.166', page: 'p.4', text: 'T2DM w/ diabetic nephropathy · A1c 7.8% · Empagliflozin 10mg' },
    { code: 'I50.22', hcc: 'HCC 226', raf: '+0.368', page: 'p.7', text: 'Chronic systolic HFrEF · TTE EF 38% · Carvedilol 12.5mg BID' },
    { code: 'J44.9', hcc: 'HCC 280', raf: '+0.328', page: 'p.7', text: ctx.breakUi ? 'COPD stable on tiotropium 18mcg inhaled daily · FEV1/FVC 0.61' : 'COPD on tiotropium · FEV1/FVC 0.61' },
  ];

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ background: 'var(--surface-0)', borderRadius: 'var(--dial-radius)', border: '1px solid var(--border-subtle)' }}
    >
      <div className={`grid ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1fr_1fr]'}`}>
        {/* Dense Chart Excerpt */}
        <div className="p-3" style={{ background: 'var(--surface-1)', borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
          <div className="mb-1 flex items-center justify-between text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            <span>ACTIVE EVIDENCE · {queue[cursor].page.toUpperCase()}</span>
            <span>{queue[cursor].code}</span>
          </div>
          <div className="rounded-md p-2.5 text-[11.5px] font-medium" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', borderLeft: '2.5px solid var(--accent)' }}>
            “{queue[cursor].text}”
          </div>
        </div>

        {/* Dense Suspect Rows */}
        <div className="flex flex-col gap-1 p-2.5" style={{ background: 'var(--surface-1)' }}>
          {queue.map((q, i) => (
            <button
              key={q.code}
              type="button"
              onClick={() => setCursor(i)}
              className="flex items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-[11px]"
              style={{
                background: cursor === i ? 'var(--surface-2)' : 'var(--surface-0)',
                borderLeft: `2px solid ${cursor === i ? 'var(--accent)' : 'transparent'}`,
              }}
            >
              <span className="flex items-center gap-1.5" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                <strong style={{ color: 'var(--ink-1)' }}>{q.code}</strong>
                <span style={{ color: 'var(--ink-3)' }}>{q.hcc}</span>
              </span>
              <span className="flex items-center gap-2" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                <span style={{ color: 'var(--success)' }}>{q.raf}</span>
                {accepted[i] && <Check className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Power-Coder Keyboard HUD */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-[10.5px]"
        style={{ background: 'var(--surface-0)', borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}
      >
        <div className="flex flex-wrap items-center gap-2" style={{ color: 'var(--ink-3)' }}>
          <Keyboard className="h-3.5 w-3.5" />
          <button type="button" onClick={() => setCursor((c) => (c + 1) % queue.length)} className="rounded px-1.5 py-0.5" style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
            J Next
          </button>
          <button type="button" onClick={() => setAccepted((a) => ({ ...a, [cursor]: !a[cursor] }))} className="rounded px-1.5 py-0.5" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
            A {accepted[cursor] ? 'Undo' : 'Accept'}
          </button>
        </div>
        <span className="tabular-nums-auto" style={{ color: 'var(--ink-2)' }}>
          5.8 charts/hr · 98.4% QA · {Object.values(accepted).filter(Boolean).length}/3 Coded
        </span>
      </div>
    </div>
  );
}
