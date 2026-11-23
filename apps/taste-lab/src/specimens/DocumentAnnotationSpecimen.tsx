import { useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileDiff,
  Link2,
  Lock,
  RotateCw,
  Search,
  ShieldCheck,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function DocumentAnnotationSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'inline-text-highlighter-popover':
      return <InlineTextHighlighterPopover ctx={ctx} />;
    case 'split-pane-source-linker':
      return <SplitPaneSourceLinker ctx={ctx} />;
    case 'redaction-phi-mask-toggle':
      return <RedactionPhiMaskToggle ctx={ctx} />;
    case 'version-redline-inspector':
      return <VersionRedlineInspector ctx={ctx} />;
    case 'bookmark-pin-margin-rail':
      return <BookmarkPinMarginRail ctx={ctx} />;
    case 'ocr-confidence-token-viewer':
      return <OcrConfidenceTokenViewer ctx={ctx} />;
    case 'evidence-chain-drawer':
      return <EvidenceChainDrawer ctx={ctx} />;
    case 'audit-trail-hash-ledger':
      return <AuditTrailHashLedger ctx={ctx} />;
    case 'document-checklist-gate':
      return <DocumentChecklistGate ctx={ctx} />;
    case 'zoom-rotate-doc-toolbar':
      return <ZoomRotateDocToolbar ctx={ctx} />;
    default:
      return null;
  }
}

function InlineTextHighlighterPopover({ ctx }: { ctx: SpecimenContext }) {
  const [selected, setSelected] = useState<'span1' | 'span2' | null>('span1');
  const [verified, setVerified] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
        Discharge summary confirms{' '}
        <button
          type="button"
          onClick={() => setSelected('span1')}
          className="rounded px-1 py-0.5 text-left font-medium transition-colors"
          style={{
            background: selected === 'span1' ? 'var(--accent-soft)' : 'var(--surface-2)',
            color: 'var(--ink-1)',
            outline: selected === 'span1' ? '1px solid var(--accent)' : 'none',
          }}
        >
          acute on chronic systolic CHF
        </button>{' '}
        treated with{' '}
        <button
          type="button"
          onClick={() => setSelected('span2')}
          className="rounded px-1 py-0.5 text-left font-medium transition-colors"
          style={{
            background: selected === 'span2' ? 'var(--accent-soft)' : 'var(--surface-2)',
            color: 'var(--ink-1)',
            outline: selected === 'span2' ? '1px solid var(--accent)' : 'none',
          }}
        >
          IV furosemide 40mg BID
        </button>
        .
      </p>

      {selected && (
        <div
          className="flex flex-wrap items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[11px]"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)' }}
        >
          <span style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
            {selected === 'span1'
              ? ctx.breakUi
                ? 'Entity: Diagnosis · I50.23 · 0.96'
                : 'Dx: I50.23 · 96%'
              : 'RxNorm: 4603 · Treatment'}
          </span>
          <button
            type="button"
            onClick={() => setVerified((v) => !v)}
            className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10.5px] font-medium"
            style={{
              background: verified ? 'var(--accent)' : 'var(--surface-2)',
              color: verified ? 'var(--accent-ink)' : 'var(--ink-1)',
            }}
          >
            <Check className="h-3 w-3" /> {verified ? 'Verified' : 'Verify Span'}
          </button>
        </div>
      )}
    </div>
  );
}

function SplitPaneSourceLinker({ ctx }: { ctx: SpecimenContext }) {
  const [linked, setLinked] = useState<0 | 1>(0);
  const claims = [
    { claim: 'HbA1c 8.4% (08/19)', line: 'L14: Lab Panel — HbA1c 8.4% [High]' },
    { claim: ctx.breakUi ? 'Attestation signed by Attending MD' : 'MD Signed (08/20)', line: 'L41: Electronically signed by Dr. M. Lin, MD' },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex flex-col gap-1">
        {claims.map((c, i) => {
          const active = linked === i;
          return (
            <button
              key={c.claim}
              type="button"
              onClick={() => setLinked(i as 0 | 1)}
              className="flex items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-left text-[11px]"
              style={{
                background: active ? 'var(--surface-2)' : 'var(--surface-0)',
                color: active ? 'var(--ink-1)' : 'var(--ink-2)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
              }}
            >
              <span className="truncate">{c.claim}</span>
              <Link2 className="h-3 w-3 shrink-0" style={{ color: active ? 'var(--accent)' : 'var(--ink-3)' }} />
            </button>
          );
        })}
      </div>

      <div
        className="flex flex-col justify-center rounded-md p-2 text-[10.5px]"
        style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}
      >
        <div className="mb-1 text-[9.5px] uppercase" style={{ color: 'var(--ink-3)' }}>
          Linked Source Excerpt
        </div>
        <div style={{ color: 'var(--ink-1)' }}>{claims[linked].line}</div>
      </div>
    </div>
  );
}

function RedactionPhiMaskToggle({ ctx }: { ctx: SpecimenContext }) {
  const [revealed, setRevealed] = useState(false);

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
          <Lock className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'HIPAA Safe Harbor PHI Masking' : 'PHI Safe Mask'}
        </span>
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] font-medium"
          style={{
            background: revealed ? 'var(--danger-soft)' : 'var(--surface-0)',
            color: revealed ? 'var(--danger)' : 'var(--ink-2)',
            border: `1px solid ${revealed ? 'var(--danger)' : 'var(--border-subtle)'}`,
          }}
        >
          {revealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {revealed ? 'Mask PHI' : 'Reveal (Logged)'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        <div className="rounded px-2 py-1.5" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)' }}>
          <span className="block text-[9.5px]" style={{ color: 'var(--ink-3)' }}>MRN</span>
          {revealed ? 'MRN-8824109' : 'MRN-••••109'}
        </div>
        <div className="rounded px-2 py-1.5" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)' }}>
          <span className="block text-[9.5px]" style={{ color: 'var(--ink-3)' }}>DOB</span>
          {revealed ? '1954-06-18' : '••••-••-18'}
        </div>
      </div>
    </div>
  );
}

function VersionRedlineInspector({ ctx }: { ctx: SpecimenContext }) {
  const [clean, setClean] = useState(false);

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
          <FileDiff className="h-3.5 w-3.5" /> Addendum Redline
        </span>
        <button
          type="button"
          onClick={() => setClean((c) => !c)}
          className="rounded px-2 py-0.5 text-[10.5px] font-medium"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
        >
          {clean ? 'Show Redline' : 'Clean View'}
        </button>
      </div>

      <div className="rounded-md p-2 text-[11.5px] leading-relaxed" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}>
        Diagnosis updated from{' '}
        {!clean && (
          <del className="mr-1 rounded px-1" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>
            CKD unspecified (N18.9)
          </del>
        )}
        <ins className="rounded px-1 no-underline" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}>
          {ctx.breakUi ? 'CKD stage 3b with microalbuminuria (N18.32)' : 'CKD stage 3b (N18.32)'}
        </ins>
        .
      </div>
    </div>
  );
}

function BookmarkPinMarginRail({ ctx }: { ctx: SpecimenContext }) {
  const [openPin, setOpenPin] = useState<number>(1);
  const pins = [
    { id: 1, label: 'p.4 · Lab Match', note: 'eGFR confirmed 48 on two draws >90d apart.' },
    { id: 2, label: ctx.breakUi ? 'p.11 · Signature Check' : 'p.11 · Sign', note: 'Provider credentials verified (MD).' },
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
      <div className="flex gap-1.5">
        {pins.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpenPin(p.id)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
            style={{
              background: openPin === p.id ? 'var(--accent-soft)' : 'var(--surface-0)',
              color: openPin === p.id ? 'var(--ink-1)' : 'var(--ink-3)',
              border: `1px solid ${openPin === p.id ? 'var(--accent)' : 'var(--border-subtle)'}`,
            }}
          >
            <Bookmark className="h-3 w-3" /> {p.label}
          </button>
        ))}
      </div>
      <div className="rounded-md p-2 text-[11px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}>
        {pins.find((p) => p.id === openPin)?.note}
      </div>
    </div>
  );
}

function OcrConfidenceTokenViewer({ ctx }: { ctx: SpecimenContext }) {
  const [term, setTerm] = useState<'Metformin' | 'Metf0rmin'>('Metf0rmin');

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Sparkles className="h-3.5 w-3.5" /> OCR Token Check
        </span>
        <span style={{ color: term === 'Metformin' ? 'var(--success)' : 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}>
          {term === 'Metformin' ? '100% Verified' : '61% Low OCR'}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md p-2 text-[11.5px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}>
        <span>
          Continue{' '}
          <span
            className="font-semibold"
            style={{
              color: 'var(--ink-1)',
              borderBottom: term === 'Metformin' ? '2px solid var(--success)' : '2px dotted var(--danger)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {term}
          </span>{' '}
          {ctx.breakUi ? '1000mg extended-release PO daily' : '1000mg daily'}
        </span>
        <button
          type="button"
          onClick={() => setTerm((t) => (t === 'Metf0rmin' ? 'Metformin' : 'Metf0rmin'))}
          className="rounded px-2 py-0.5 text-[10.5px] font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {term === 'Metf0rmin' ? 'Fix -> Metformin' : 'Reset'}
        </button>
      </div>
    </div>
  );
}

function EvidenceChainDrawer({ ctx }: { ctx: SpecimenContext }) {
  const [step, setStep] = useState(2);
  const hops = [
    { label: 'Claim', detail: 'HCC 37 submitted on 837P' },
    { label: 'Lab', detail: 'eGFR 52 + uACR 140 mg/g' },
    { label: 'Note', detail: ctx.breakUi ? 'PCP encounter DOS 09/14 · MEAT verified' : 'DOS 09/14 · MEAT verified' },
    { label: 'Sign', detail: 'Dr. R. Patel, MD · Signed 09/14 16:42' },
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
      <div className="flex flex-wrap items-center gap-1">
        {hops.map((h, i) => (
          <div key={h.label} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setStep(i)}
              className="rounded px-2 py-0.5 text-[10.5px] font-medium"
              style={{
                background: step === i ? 'var(--accent)' : 'var(--surface-0)',
                color: step === i ? 'var(--accent-ink)' : 'var(--ink-2)',
                border: `1px solid ${step === i ? 'var(--accent)' : 'var(--border-subtle)'}`,
              }}
            >
              {h.label}
            </button>
            {i < hops.length - 1 && <ChevronRight className="h-3 w-3" style={{ color: 'var(--ink-3)' }} />}
          </div>
        ))}
      </div>
      <div className="rounded-md px-2.5 py-1.5 text-[11px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
        {hops[step].detail}
      </div>
    </div>
  );
}

function AuditTrailHashLedger({ ctx }: { ctx: SpecimenContext }) {
  const [filter, setFilter] = useState<'all' | 'human'>('all');
  const rows = [
    { actor: 'AI-NLP', action: 'Extracted E11.22', hash: '9f4a..2c', human: false },
    { actor: 'S. Chen (CPC)', action: ctx.breakUi ? 'Verified MEAT + Approved HCC 37' : 'Approved HCC 37', hash: 'c81d..7e', human: true },
  ].filter((r) => filter === 'all' || r.human);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <ShieldCheck className="h-3.5 w-3.5" /> Immutable Audit Log
        </span>
        <button
          type="button"
          onClick={() => setFilter((f) => (f === 'all' ? 'human' : 'all'))}
          className="rounded px-1.5 py-0.5 text-[10px]"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
        >
          {filter === 'all' ? 'All Actors' : 'Human Only'}
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {rows.map((r) => (
          <div key={r.hash} className="flex items-center justify-between gap-2 rounded px-2 py-1 text-[10.5px]" style={{ background: 'var(--surface-0)' }}>
            <span className="truncate" style={{ color: 'var(--ink-1)' }}>
              <strong>{r.actor}</strong> · {r.action}
            </span>
            <span className="shrink-0" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              #{r.hash}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentChecklistGate({ ctx }: { ctx: SpecimenContext }) {
  const [attested, setAttested] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 p-3"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--ink-2)' }}>
        <span>2/2 Required Checks Passed</span>
        <span style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>DOS · MD Sign</span>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-[11px]" style={{ color: 'var(--ink-1)' }}>
        <input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)} />
        <span>{ctx.breakUi ? 'I attest all submitted ICD-10-CM codes meet CMS RADV guidelines.' : 'I attest codes meet RADV rules.'}</span>
      </label>
      <button
        type="button"
        disabled={!attested}
        className="w-full rounded-md py-1.5 text-[11px] font-medium transition-opacity"
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-ink)',
          opacity: attested ? 1 : 0.45,
        }}
      >
        Finalize & Submit Encounter
      </button>
    </div>
  );
}

function ZoomRotateDocToolbar({ ctx }: { ctx: SpecimenContext }) {
  const [zoom, setZoom] = useState(110);
  const [rot, setRot] = useState(0);
  const [pg, setPg] = useState(4);

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(75, z - 10))}
          className="rounded p-1"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <span className="tabular-nums-auto min-w-[40px] text-center text-[11px] font-medium" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
          {zoom}%
        </span>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(200, z + 10))}
          className="rounded p-1"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setRot((r) => (r + 90) % 360)}
          className="ml-1 inline-flex items-center gap-1 rounded px-1.5 py-1 text-[10.5px]"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
        >
          <RotateCw className="h-3 w-3" /> {rot}°
        </button>
      </div>

      <div className="flex items-center gap-1 text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
        <button type="button" onClick={() => setPg((p) => Math.max(1, p - 1))} className="rounded p-1" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="tabular-nums-auto px-1" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? `Pg ${pg}/128` : `${pg}/18`}
        </span>
        <button type="button" onClick={() => setPg((p) => Math.min(18, p + 1))} className="rounded p-1" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <span className="ml-1 rounded p-1" style={{ background: 'var(--surface-0)', color: 'var(--ink-3)' }}>
          <Search className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
