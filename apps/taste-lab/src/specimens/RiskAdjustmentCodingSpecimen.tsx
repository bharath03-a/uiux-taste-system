import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileSearch,
  FileText,
  GitBranch,
  HelpCircle,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function RiskAdjustmentCodingSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'chart-evidence-split-viewer':
      return <ChartEvidenceSplitViewer ctx={ctx} />;
    case 'meat-criteria-checklist':
      return <MeatCriteriaChecklist ctx={ctx} />;
    case 'raf-score-impact-simulator':
      return <RafScoreImpactSimulator ctx={ctx} />;
    case 'suspect-code-triage-card':
      return <SuspectCodeTriageCard ctx={ctx} />;
    case 'icd10-hcc-hierarchy-tree':
      return <Icd10HccHierarchyTree ctx={ctx} />;
    case 'coder-qa-audit-workbench':
      return <CoderQaAuditWorkbench ctx={ctx} />;
    case 'provider-query-composer':
      return <ProviderQueryComposer ctx={ctx} />;
    case 'encounter-chart-queue-row':
      return <EncounterChartQueueRow ctx={ctx} />;
    case 'evidence-pdf-page-scrubber':
      return <EvidencePdfPageScrubber ctx={ctx} />;
    case 'coding-accuracy-telemetry':
      return <CodingAccuracyTelemetry ctx={ctx} />;
    default:
      return null;
  }
}

function ChartEvidenceSplitViewer({ ctx }: { ctx: SpecimenContext }) {
  const [activeCode, setActiveCode] = useState<'E11.22' | 'N18.31' | 'I50.22'>('E11.22');
  const codes: { id: 'E11.22' | 'N18.31' | 'I50.22'; hcc: string; page: string; label: string }[] = [
    { id: 'E11.22', hcc: 'HCC 37', page: 'p.4', label: 'T2DM w/ diabetic CKD' },
    { id: 'N18.31', hcc: 'HCC 329', page: 'p.4', label: 'CKD Stage 3a' },
    { id: 'I50.22', hcc: 'HCC 226', page: 'p.7', label: 'Chronic systolic HF' },
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
        {codes.map((c) => {
          const active = activeCode === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCode(c.id)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors"
              style={{
                background: active ? 'var(--accent)' : 'var(--surface-0)',
                color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              <span>{c.id}</span>
              <span className="opacity-80">{c.hcc}</span>
            </button>
          );
        })}
      </div>

      <div
        className="rounded-md p-2.5 text-[11.5px] leading-relaxed"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--ink-2)',
        }}
      >
        <div className="mb-1 flex items-center justify-between text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <span className="inline-flex items-center gap-1">
            <FileSearch className="h-3 w-3" />
            {ctx.breakUi ? 'Progress Note · Endocrinology Consult · DOS 2026-09-14' : 'Progress Note · p.4'}
          </span>
          <span>Anchor #{activeCode}</span>
        </div>
        <p>
          Assessment:{' '}
          <mark
            className="rounded px-1 py-0.5 transition-colors"
            style={{
              background: activeCode === 'E11.22' ? 'var(--accent-soft)' : 'transparent',
              color: activeCode === 'E11.22' ? 'var(--ink-1)' : 'inherit',
              outline: activeCode === 'E11.22' ? '1px solid var(--accent)' : 'none',
            }}
          >
            Type 2 diabetes mellitus with diabetic nephropathy (A1c 7.8%), continue empagliflozin 10mg
          </mark>
          . Labs confirm{' '}
          <mark
            className="rounded px-1 py-0.5 transition-colors"
            style={{
              background: activeCode === 'N18.31' ? 'var(--accent-soft)' : 'transparent',
              color: activeCode === 'N18.31' ? 'var(--ink-1)' : 'inherit',
              outline: activeCode === 'N18.31' ? '1px solid var(--accent)' : 'none',
            }}
          >
            eGFR 52 mL/min consistent with CKD stage 3a, repeat BMP in 3 months
          </mark>
          . Echo shows{' '}
          <mark
            className="rounded px-1 py-0.5 transition-colors"
            style={{
              background: activeCode === 'I50.22' ? 'var(--accent-soft)' : 'transparent',
              color: activeCode === 'I50.22' ? 'var(--ink-1)' : 'inherit',
              outline: activeCode === 'I50.22' ? '1px solid var(--accent)' : 'none',
            }}
          >
            EF 38%, chronic HFrEF stable on carvedilol and sacubitril/valsartan
          </mark>
          .
        </p>
      </div>
    </div>
  );
}

function MeatCriteriaChecklist({ ctx }: { ctx: SpecimenContext }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    M: true,
    E: false,
    A: true,
    T: true,
  });

  const pillars = [
    { key: 'M', title: 'Monitor', evidence: 'A1c 7.8% trended quarterly' },
    { key: 'E', title: 'Evaluate', evidence: 'Microalbumin/Cr ratio pending' },
    { key: 'A', title: 'Assess', evidence: 'Stable w/o neuropathy' },
    { key: 'T', title: 'Treat', evidence: ctx.breakUi ? 'Empagliflozin 10mg PO daily + Metformin 1000mg BID' : 'Empagliflozin 10mg PO daily' },
  ];

  const activeCount = Object.values(checked).filter(Boolean).length;
  const isValid = activeCount >= 1;

  return (
    <div
      className="flex flex-col gap-2.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          M.E.A.T. Audit Gate · E11.22
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium"
          style={{
            background: isValid ? 'var(--accent-soft)' : 'var(--danger-soft)',
            color: isValid ? 'var(--ink-1)' : 'var(--danger)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          {isValid ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          {isValid ? `${activeCount}/4 Supported` : 'Insufficient'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {pillars.map((p) => {
          const on = checked[p.key];
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setChecked((prev) => ({ ...prev, [p.key]: !prev[p.key] }))}
              className="flex items-start gap-2 rounded-md p-2 text-left transition-colors"
              style={{
                background: on ? 'var(--surface-2)' : 'var(--surface-0)',
                border: `1px solid ${on ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
              }}
            >
              <span
                className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px] font-bold"
                style={{
                  background: on ? 'var(--accent)' : 'var(--surface-1)',
                  color: on ? 'var(--accent-ink)' : 'var(--ink-3)',
                  border: on ? 'none' : '1px solid var(--border-subtle)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {p.key}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {p.title}
                </span>
                <span className="block truncate text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
                  {p.evidence}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RafScoreImpactSimulator({ ctx }: { ctx: SpecimenContext }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    hcc37: true,
    hcc38: true,
    hcc226: true,
    hcc329: false,
  });

  const baseDemo = 0.442;
  const items = [
    { id: 'hcc37', label: 'HCC 37 · Diabetes w/ Chronic Comp.', coeff: 0.166, supersededBy: null },
    { id: 'hcc38', label: 'HCC 38 · Diabetes w/o Comp.', coeff: 0.105, supersededBy: 'hcc37' },
    { id: 'hcc226', label: 'HCC 226 · Heart Failure', coeff: 0.368, supersededBy: null },
    { id: 'hcc329', label: 'HCC 329 · CKD Stage 3b (Suspect)', coeff: 0.069, supersededBy: null },
  ];

  const activeTotal = items.reduce((sum, item) => {
    if (!selected[item.id]) return sum;
    if (item.supersededBy && selected[item.supersededBy]) return sum;
    return sum + item.coeff;
  }, baseDemo);

  const pmpm = Math.round(activeTotal * 985);

  return (
    <div
      className="flex flex-col gap-2.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            CMS-HCC V28 RAF
          </div>
          <div className="tabular-nums-auto text-[20px] font-semibold tracking-tight" style={{ color: 'var(--ink-1)' }}>
            {activeTotal.toFixed(3)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            Est. PMPM
          </div>
          <div className="tabular-nums-auto inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: 'var(--success)' }}>
            <TrendingUp className="h-3.5 w-3.5" />
            ${pmpm.toLocaleString()}/mo
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const on = selected[item.id];
          const suppressed = Boolean(on && item.supersededBy && selected[item.supersededBy]);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected((s) => ({ ...s, [item.id]: !s[item.id] }))}
              className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[11px]"
              style={{
                background: on ? 'var(--surface-0)' : 'transparent',
                border: `1px solid ${on ? 'var(--border-subtle)' : 'transparent'}`,
                opacity: suppressed ? 0.55 : 1,
              }}
            >
              <span className={`truncate ${suppressed ? 'line-through' : ''}`} style={{ color: on ? 'var(--ink-1)' : 'var(--ink-3)' }}>
                {ctx.breakUi ? `${item.label} [V28]` : item.label}
              </span>
              <span
                className="tabular-nums-auto shrink-0 text-[10.5px] font-medium"
                style={{ color: suppressed ? 'var(--ink-3)' : on ? 'var(--accent)' : 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {suppressed ? 'Superseded' : `+${item.coeff.toFixed(3)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuspectCodeTriageCard({ ctx }: { ctx: SpecimenContext }) {
  const [decision, setDecision] = useState<'pending' | 'accepted' | 'queried' | 'dismissed'>('pending');
  const [reason, setReason] = useState('No MEAT');

  return (
    <div
      className="flex flex-col gap-2.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
              style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
            >
              I73.9 · HCC 267
            </span>
            <span className="inline-flex items-center gap-1 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              <Sparkles className="h-3 w-3" /> 94% AI
            </span>
          </div>
          <div className="mt-1 truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {ctx.breakUi ? 'Peripheral vascular disease, unspecified — Bilateral ABI 0.72' : 'Peripheral vascular disease, unspecified'}
          </div>
        </div>
        <span className="tabular-nums-auto shrink-0 text-[11px] font-semibold" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
          +0.288
        </span>
      </div>

      <div
        className="rounded-md px-2.5 py-1.5 text-[11px]"
        style={{ background: 'var(--surface-0)', borderLeft: '2px solid var(--accent)', color: 'var(--ink-2)' }}
      >
        “ABI 0.72 right, 0.76 left; claudication at 2 blocks — start cilostazol 100mg BID.”
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setDecision('accepted')}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{
            background: decision === 'accepted' ? 'var(--accent)' : 'var(--surface-0)',
            color: decision === 'accepted' ? 'var(--accent-ink)' : 'var(--ink-1)',
            border: `1px solid ${decision === 'accepted' ? 'var(--accent)' : 'var(--border-subtle)'}`,
          }}
        >
          <Check className="h-3 w-3" /> Accept
        </button>
        <button
          type="button"
          onClick={() => setDecision('queried')}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{
            background: decision === 'queried' ? 'var(--surface-2)' : 'var(--surface-0)',
            color: 'var(--ink-1)',
            border: `1px solid ${decision === 'queried' ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
          }}
        >
          <HelpCircle className="h-3 w-3" /> Query MD
        </button>
        <button
          type="button"
          onClick={() => setDecision('dismissed')}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{
            background: decision === 'dismissed' ? 'var(--danger-soft)' : 'var(--surface-0)',
            color: decision === 'dismissed' ? 'var(--danger)' : 'var(--ink-2)',
            border: `1px solid ${decision === 'dismissed' ? 'var(--danger)' : 'var(--border-subtle)'}`,
          }}
        >
          <X className="h-3 w-3" /> Dismiss
        </button>
        {decision === 'dismissed' && (
          <div className="ml-auto flex gap-1">
            {['No MEAT', 'Ruled Out', 'Past Hx'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                className="rounded px-1.5 py-0.5 text-[10px]"
                style={{
                  background: reason === r ? 'var(--surface-2)' : 'transparent',
                  color: reason === r ? 'var(--ink-1)' : 'var(--ink-3)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Icd10HccHierarchyTree({ ctx }: { ctx: SpecimenContext }) {
  const [model, setModel] = useState<'V28' | 'V24'>('V28');
  const rows =
    model === 'V28'
      ? [
          { code: 'HCC 35', label: 'Pancreas Transplant Status', status: 'inactive' },
          { code: 'HCC 37', label: 'Diabetes w/ Chronic Complications', status: 'active' },
          { code: 'HCC 38', label: 'Diabetes w/ Glycemic/Unspec.', status: 'superseded' },
        ]
      : [
          { code: 'HCC 17', label: 'Diabetes w/ Acute Complications', status: 'inactive' },
          { code: 'HCC 18', label: 'Diabetes w/ Chronic Complications', status: 'active' },
          { code: 'HCC 19', label: 'Diabetes w/o Complication', status: 'superseded' },
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
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <GitBranch className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'CMS-HCC Diabetes Hierarchy Suppression Tree' : 'HCC Hierarchy Tree'}
        </span>
        <div className="inline-flex rounded-md p-0.5 text-[10px]" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
          {(['V28', 'V24'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModel(m)}
              className="rounded px-1.5 py-0.5 font-medium"
              style={{
                background: model === m ? 'var(--surface-2)' : 'transparent',
                color: model === m ? 'var(--ink-1)' : 'var(--ink-3)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="ml-2 flex flex-col gap-1.5 pl-3" style={{ borderLeft: '1px solid var(--border-subtle)' }}>
        {rows.map((r) => (
          <div key={r.code} className="flex items-center justify-between gap-2 text-[11px]">
            <span
              className={`truncate ${r.status === 'superseded' ? 'line-through' : ''}`}
              style={{ color: r.status === 'active' ? 'var(--ink-1)' : 'var(--ink-3)', fontWeight: r.status === 'active' ? 600 : 400 }}
            >
              <span style={{ fontFamily: 'var(--dial-font-mono)' }}>{r.code}</span> · {r.label}
            </span>
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[9.5px] uppercase"
              style={{
                background: r.status === 'active' ? 'var(--accent-soft)' : 'var(--surface-0)',
                color: r.status === 'active' ? 'var(--ink-1)' : 'var(--ink-3)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoderQaAuditWorkbench({ ctx }: { ctx: SpecimenContext }) {
  const [resolved, setResolved] = useState<'open' | 'adjudicated' | 'returned'>('open');

  return (
    <div
      className="flex flex-col gap-2.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <ClipboardCheck className="h-3.5 w-3.5" /> QA Overread Diff
        </span>
        <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
          Concordance 83.3%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-md p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
          <div className="mb-1 text-[10px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            Coder A
          </div>
          <div style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>E11.9 · I10</div>
          <div className="mt-0.5 text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
            Missed CKD linkage
          </div>
        </div>
        <div className="rounded-md p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)' }}>
          <div className="mb-1 text-[10px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            QA Auditor
          </div>
          <div style={{ color: 'var(--accent)', fontFamily: 'var(--dial-font-mono)' }}>E11.22 · N18.31</div>
          <div className="mt-0.5 text-[10.5px]" style={{ color: 'var(--ink-2)' }}>
            {ctx.breakUi ? 'Combination code + stage specificity required' : 'Combo code required'}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
          {resolved === 'open' ? '1 discrepancy pending' : resolved === 'adjudicated' ? 'QA code finalized' : 'Returned with coaching note'}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setResolved('returned')}
            className="rounded-md px-2 py-1 text-[11px] font-medium"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
          >
            Return
          </button>
          <button
            type="button"
            onClick={() => setResolved('adjudicated')}
            className="rounded-md px-2 py-1 text-[11px] font-medium"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Adjudicate
          </button>
        </div>
      </div>
    </div>
  );
}

function ProviderQueryComposer({ ctx }: { ctx: SpecimenContext }) {
  const [template, setTemplate] = useState<'specificity' | 'linkage'>('linkage');
  const [sent, setSent] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          CDI Non-Leading Query
        </span>
        <div className="flex gap-1">
          {(['linkage', 'specificity'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTemplate(t);
                setSent(false);
              }}
              className="rounded px-2 py-0.5 text-[10px] capitalize"
              style={{
                background: template === t ? 'var(--surface-2)' : 'transparent',
                color: template === t ? 'var(--ink-1)' : 'var(--ink-3)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-md p-2 text-[11px] leading-snug" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}>
        {template === 'linkage'
          ? ctx.breakUi
            ? 'Clinical indicators (eGFR 49, A1c 8.1%, Lisinopril 20mg) appear in DOS 09/14. Based on your clinical judgment, is CKD related to Diabetes Mellitus, unrelated, or clinically undetermined?'
            : 'Based on eGFR 49 & A1c 8.1%, please clarify if CKD is linked to T2DM, unrelated, or undetermined.'
          : 'Heart failure is documented without acuity/type. Please specify systolic vs diastolic and acute vs chronic.'}
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          Dr. R. Patel · AHIMA compliant
        </span>
        <button
          type="button"
          onClick={() => setSent(true)}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{ background: sent ? 'var(--surface-2)' : 'var(--accent)', color: sent ? 'var(--ink-1)' : 'var(--accent-ink)' }}
        >
          {sent ? <Check className="h-3 w-3" /> : <Send className="h-3 w-3" />}
          {sent ? 'Query Sent' : 'Send Query'}
        </button>
      </div>
    </div>
  );
}

function EncounterChartQueueRow({ ctx }: { ctx: SpecimenContext }) {
  const [claimed, setClaimed] = useState(false);

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
            {ctx.breakUi ? 'CHASE-2026-0094821-MA-V28' : 'CHASE-94821'}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
            style={{ background: 'var(--danger-soft)', color: 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}
          >
            <Clock className="h-2.5 w-2.5" /> SLA 3h 12m
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]" style={{ color: 'var(--ink-3)' }}>
          <span>42 pages</span>
          <span>·</span>
          <span>6 AI suspects</span>
          <span>·</span>
          <span className="tabular-nums-auto" style={{ color: 'var(--ink-2)' }}>Est. +0.49 RAF</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setClaimed((c) => !c)}
        className="rounded-md px-2.5 py-1.5 text-[11px] font-medium"
        style={{
          background: claimed ? 'var(--surface-2)' : 'var(--accent)',
          color: claimed ? 'var(--ink-1)' : 'var(--accent-ink)',
          border: claimed ? '1px solid var(--border-strong)' : 'none',
        }}
      >
        {claimed ? 'In Progress' : 'Claim Chart'}
      </button>
    </div>
  );
}

function EvidencePdfPageScrubber({ ctx }: { ctx: SpecimenContext }) {
  const [page, setPage] = useState(4);
  const pages = [
    { n: 1, tag: null },
    { n: 4, tag: 'E11.22' },
    { n: 7, tag: 'I50.22' },
    { n: 12, tag: null },
    { n: 19, tag: 'N18.31' },
    { n: 28, tag: 'J44.9' },
    { n: 42, tag: null },
  ];
  const current = pages.find((p) => p.n === page) ?? pages[1];

  return (
    <div
      className="flex flex-col gap-2.5 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: 'var(--ink-1)' }}>
          <FileText className="h-3.5 w-3.5" />
          {ctx.breakUi ? `Encounter Packet · Page ${page} of 42` : `Page ${page} / 42`}
        </span>
        <span className="text-[10.5px]" style={{ color: current.tag ? 'var(--accent)' : 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          {current.tag ? `Evidence: ${current.tag}` : 'No flagged dx'}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {pages.map((p) => {
          const active = p.n === page;
          return (
            <button
              key={p.n}
              type="button"
              onClick={() => setPage(p.n)}
              className="relative flex flex-col items-center justify-center rounded-md py-1.5 text-[10.5px] font-medium transition-colors"
              style={{
                background: active ? 'var(--surface-2)' : 'var(--surface-0)',
                color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              <span>p.{p.n}</span>
              <span
                className="mt-1 h-1.5 w-1.5 rounded-full"
                style={{ background: p.tag ? 'var(--accent)' : 'transparent' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CodingAccuracyTelemetry({ ctx }: { ctx: SpecimenContext }) {
  const [period, setPeriod] = useState<'Today' | 'Week'>('Today');
  const stats =
    period === 'Today'
      ? [
          { label: 'Charts / hr', value: '5.4' },
          { label: 'QA Accuracy', value: '97.8%' },
          { label: 'Open Queries', value: '3' },
        ]
      : [
          { label: 'Charts / hr', value: '5.1' },
          { label: 'QA Accuracy', value: '98.2%' },
          { label: 'Open Queries', value: '11' },
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
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <ShieldAlert className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'RADV Audit Readiness & Throughput' : 'Coder QA Telemetry'}
        </span>
        <div className="flex gap-1">
          {(['Today', 'Week'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className="rounded px-1.5 py-0.5 text-[10px]"
              style={{
                background: period === p ? 'var(--surface-2)' : 'transparent',
                color: period === p ? 'var(--ink-1)' : 'var(--ink-3)',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
            <div className="text-[10px]" style={{ color: 'var(--ink-3)' }}>{s.label}</div>
            <div className="tabular-nums-auto mt-0.5 text-[14px] font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
