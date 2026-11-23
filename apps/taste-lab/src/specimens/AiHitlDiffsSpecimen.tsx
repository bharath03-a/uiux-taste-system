import { useState } from 'react';
import {
  AlertOctagon,
  Check,
  FileDiff,
  GitBranch,
  History,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const PATCH_FILES = [
  { id: 'f1', path: 'src/components/Button.tsx', add: 14, del: 4 },
  { id: 'f2', path: 'src/tokens/semantic.css', add: 22, del: 0 },
  { id: 'f3', path: 'taste/TASTE.md', add: 38, del: 6 },
];

export function AiHitlDiffsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [inlineDecision, setInlineDecision] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [hunkState, setHunkState] = useState<'pending' | 'accepted' | 'discarded'>('pending');
  const [scopeChoice, setScopeChoice] = useState<'once' | 'session' | 'always'>('session');
  const [scopeSaved, setScopeSaved] = useState(false);
  const [dangerConfirmed, setDangerConfirmed] = useState(false);
  const [paramBranch, setParamBranch] = useState('feat/taste-batch-3');
  const [paramDryRun, setParamDryRun] = useState(true);
  const [paramRan, setParamRan] = useState(false);
  const [checkedFiles, setCheckedFiles] = useState<string[]>(['f1', 'f2', 'f3']);
  const [patchApplied, setPatchApplied] = useState(false);
  const [reverted, setReverted] = useState(false);
  const [clarifyPick, setClarifyPick] = useState<string>('base-ui');
  const [ruleActive, setRuleActive] = useState(true);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
  };

  // 01. Crisp Inline Approve / Reject Bar
  if (variantId === 'inline-approval-bar') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              {breakUi
                ? 'Run npm run lint:taste across 142 workspace components?'
                : 'Run taste linter on workspace?'}
            </div>
            <div
              className="mt-0.5 truncate text-[11px]"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              tool: run_command · cwd: /UiUx
            </div>
          </div>
          {inlineDecision !== 'pending' && (
            <button
              type="button"
              onClick={() => setInlineDecision('pending')}
              className="shrink-0 text-[11px] underline-offset-2 hover:underline"
              style={{ color: 'var(--ink-3)' }}
            >
              Reset
            </button>
          )}
        </div>

        {inlineDecision === 'pending' ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setInlineDecision('approved')}
              className="craft-pressable inline-flex h-8 items-center gap-1.5 px-3 text-[12px] font-semibold"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                borderRadius: `${innerR}px`,
              }}
            >
              <Check className="h-3.5 w-3.5" />
              Approve
              <kbd className="ml-0.5 text-[10px] opacity-75" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                Y
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setInlineDecision('rejected')}
              className="craft-pressable inline-flex h-8 items-center gap-1.5 px-3 text-[12px] font-medium"
              style={{
                background: 'var(--surface-0)',
                color: 'var(--ink-2)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
              }}
            >
              <X className="h-3.5 w-3.5" />
              Reject
              <kbd className="ml-0.5 text-[10px] opacity-70" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                N
              </kbd>
            </button>
          </div>
        ) : (
          <div
            className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
              color: inlineDecision === 'approved' ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {inlineDecision === 'approved' ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            {inlineDecision === 'approved' ? 'Approved · Command executed cleanly' : 'Rejected by user'}
          </div>
        )}
      </div>
    );
  }

  // 02. Unified Hairline Diff + Per-Hunk Apply
  if (variantId === 'unified-code-diff-review') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div
          className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold"
            style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
          >
            <FileDiff className="h-3.5 w-3.5 opacity-75" />
            Button.tsx
            <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--success)' }}>
              +1
            </span>
            <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--danger)' }}>
              -1
            </span>
          </span>
          <div className="flex items-center gap-1">
            {hunkState === 'pending' ? (
              <>
                <button
                  type="button"
                  onClick={() => setHunkState('discarded')}
                  className="craft-pressable h-6 px-2 text-[10.5px] font-medium"
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                    color: 'var(--ink-2)',
                  }}
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => setHunkState('accepted')}
                  className="craft-pressable h-6 px-2 text-[10.5px] font-semibold"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                  }}
                >
                  Accept hunk
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setHunkState('pending')}
                className="text-[10.5px] font-medium"
                style={{
                  color: hunkState === 'accepted' ? 'var(--success)' : 'var(--ink-3)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {hunkState === 'accepted' ? 'Applied ✓ (undo)' : 'Discarded (undo)'}
              </button>
            )}
          </div>
        </div>

        <div
          className="flex flex-col text-[11px] leading-relaxed"
          style={{ fontFamily: 'var(--dial-font-mono)' }}
        >
          <div className="px-3 py-1" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>
            - borderRadius: &quot;8px&quot;, // hardcoded
          </div>
          <div className="px-3 py-1" style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)' }}>
            + borderRadius: &quot;var(--radius-inner)&quot;,
          </div>
        </div>
      </div>
    );
  }

  // 03. Side-by-Side Before / After Diff
  if (variantId === 'split-side-by-side-diff') {
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div
          className={`grid ${mobilePreview ? 'grid-cols-1 divide-y' : 'grid-cols-2 divide-x'}`}
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="p-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div
              className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}
            >
              Before
            </div>
            <pre
              className="overflow-x-auto text-[11px] leading-relaxed"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {`bg-[#18181b]\nrounded-[12px]\nscale-0 -> scale-100`}
            </pre>
          </div>
          <div className="p-3" style={{ background: 'var(--surface-0)', borderColor: 'var(--border-subtle)' }}>
            <div
              className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}
            >
              After (Calibrated)
            </div>
            <pre
              className="overflow-x-auto text-[11px] leading-relaxed"
              style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {`bg-[var(--surface-1)]\nrounded-[var(--radius)]\nscale-95 -> scale-100`}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // 04. Granular Permission Scope Picker
  if (variantId === 'permission-scope-selector') {
    const scopes = [
      { id: 'once' as const, label: 'Allow once' },
      { id: 'session' as const, label: 'This session' },
      { id: 'always' as const, label: 'Always allow' },
    ];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Permission for <code style={{ fontFamily: 'var(--dial-font-mono)' }}>git diff</code> &amp; read-only checks
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {scopes.map((s) => {
            const act = scopeChoice === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setScopeChoice(s.id);
                  setScopeSaved(false);
                }}
                className="craft-pressable px-2 py-1.5 text-[11px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: act ? 'var(--accent-soft)' : 'var(--surface-0)',
                  border: act ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  color: 'var(--ink-1)',
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setScopeSaved(true)}
          className="craft-pressable h-8 w-fit px-3 text-[12px] font-semibold"
          style={{
            background: scopeSaved ? 'var(--surface-0)' : 'var(--accent)',
            color: scopeSaved ? 'var(--success)' : 'var(--accent-ink)',
            border: scopeSaved ? '1px solid var(--border-strong)' : '1px solid transparent',
            borderRadius: `${innerR}px`,
          }}
        >
          {scopeSaved ? `Saved: ${scopeChoice} ✓` : 'Confirm trust scope'}
        </button>
      </div>
    );
  }

  // 05. Elevated Destructive Command Gate
  if (variantId === 'destructive-command-gate') {
    return (
      <div
        className="flex flex-col gap-3 p-4"
        style={{
          ...cardStyle,
          border: '1.5px solid var(--danger)',
        }}
      >
        <div className="flex items-start gap-2.5">
          <AlertOctagon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--danger)' }} />
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              Destructive action requires explicit sign-off
            </div>
            <div
              className="mt-1.5 flex items-center gap-2 overflow-x-auto px-2.5 py-1.5 text-[11px]"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerR}px`,
                color: 'var(--danger)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              <Terminal className="h-3 w-3 shrink-0" />
              <span>git push --force origin release/v2</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setDangerConfirmed(false)}
            className="craft-pressable h-7 px-2.5 text-[11.5px] font-medium"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-2)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setDangerConfirmed((v) => !v)}
            className="craft-pressable h-7 px-3 text-[11.5px] font-semibold"
            style={{
              background: dangerConfirmed ? 'var(--surface-0)' : 'var(--danger)',
              color: dangerConfirmed ? 'var(--danger)' : 'var(--danger-ink)',
              border: dangerConfirmed ? '1px solid var(--danger)' : '1px solid transparent',
              borderRadius: `${innerR}px`,
            }}
          >
            {dangerConfirmed ? 'Executed (reset)' : 'Force push anyway'}
          </button>
        </div>
      </div>
    );
  }

  // 06. Edit Tool Arguments Before Approving
  if (variantId === 'editable-params-before-run') {
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex items-center justify-between text-[12px]">
          <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--ink-1)' }}>
            <GitBranch className="h-3.5 w-3.5 opacity-75" />
            create_pull_request
          </span>
          <span className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
            Editable before run
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
          <input
            value={paramBranch}
            onChange={(e) => {
              setParamBranch(e.target.value);
              setParamRan(false);
            }}
            className="craft-focus px-2.5 py-1.5 text-[11.5px] outline-none"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-1)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          />
          <label
            className="inline-flex cursor-pointer items-center gap-1.5 px-2.5 py-1.5 text-[11.5px]"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
              color: 'var(--ink-2)',
            }}
          >
            <input
              type="checkbox"
              checked={paramDryRun}
              onChange={(e) => setParamDryRun(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            Draft PR
          </label>
        </div>
        <button
          type="button"
          onClick={() => setParamRan(true)}
          className="craft-pressable h-8 w-fit px-3 text-[12px] font-semibold"
          style={{
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            borderRadius: `${innerR}px`,
          }}
        >
          {paramRan ? `Approved (${paramBranch}) ✓` : 'Approve & Run with edits'}
        </button>
      </div>
    );
  }

  // 07. Multi-File Patch Queue + Checkboxes
  if (variantId === 'multi-file-patch-queue') {
    const toggleFile = (id: string) => {
      setPatchApplied(false);
      setCheckedFiles((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {PATCH_FILES.map((f) => {
            const on = checkedFiles.includes(f.id);
            return (
              <label
                key={f.id}
                className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-[11.5px]"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggleFile(f.id)}
                    className="accent-[var(--accent)]"
                  />
                  <span
                    className="truncate font-medium"
                    style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {f.path}
                  </span>
                </span>
                <span
                  className="tabular-nums-auto shrink-0 text-[10.5px]"
                  style={{ fontFamily: 'var(--dial-font-mono)' }}
                >
                  <span style={{ color: 'var(--success)' }}>+{f.add}</span>{' '}
                  <span style={{ color: 'var(--danger)' }}>-{f.del}</span>
                </span>
              </label>
            );
          })}
        </div>
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ background: 'var(--surface-0)', borderTop: '1px solid var(--border-subtle)' }}
        >
          <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {checkedFiles.length} of {PATCH_FILES.length} selected
          </span>
          <button
            type="button"
            disabled={checkedFiles.length === 0}
            onClick={() => setPatchApplied(true)}
            className="craft-pressable h-7 px-2.5 text-[11.5px] font-semibold disabled:opacity-40"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              borderRadius: `${Math.max(4, innerR - 2)}px`,
            }}
          >
            {patchApplied ? 'Applied ✓' : `Apply ${checkedFiles.length} files`}
          </button>
        </div>
      </div>
    );
  }

  // 08. Instant Post-Action Checkpoint Rollback
  if (variantId === 'revert-checkpoint-pill') {
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4" style={{ color: reverted ? 'var(--ink-3)' : 'var(--success)' }} />
            <div>
              <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                {reverted ? 'Restored checkpoint #418' : 'Auto-applied 3 safe UI token edits'}
              </div>
              <div className="text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                checkpoint: chk_418a · 0 destructive changes
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setReverted((v) => !v)}
            className="craft-pressable h-7 px-2.5 text-[11.5px] font-semibold"
            style={{
              background: reverted ? 'var(--accent)' : 'var(--surface-0)',
              color: reverted ? 'var(--accent-ink)' : 'var(--ink-1)',
              border: reverted ? '1px solid transparent' : '1px solid var(--border-strong)',
              borderRadius: `${innerR}px`,
            }}
          >
            {reverted ? 'Re-apply edit' : 'Revert checkpoint'}
          </button>
        </div>
      </div>
    );
  }

  // 09. Structured Multiple-Choice Question Card
  if (variantId === 'human-clarification-card') {
    const opts = [
      { id: 'base-ui', title: 'Base UI primitives', tag: 'Recommended' },
      { id: 'radix', title: 'Radix UI primitives', tag: null },
      { id: 'headless', title: 'Zero-dependency custom', tag: null },
    ];
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Which primitive layer should `@taste/registry` target?
        </div>
        <div className="flex flex-col gap-1.5">
          {opts.map((o) => {
            const act = clarifyPick === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setClarifyPick(o.id)}
                className="craft-pressable flex items-center justify-between gap-2 px-2.5 py-1.5 text-left text-[12px]"
                style={{
                  borderRadius: `${innerR}px`,
                  background: act ? 'var(--accent-soft)' : 'var(--surface-0)',
                  border: act ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  color: 'var(--ink-1)',
                }}
              >
                <span className="font-medium">{o.title}</span>
                {o.tag && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--accent-ink)',
                      fontFamily: 'var(--dial-font-mono)',
                    }}
                  >
                    {o.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 10. Transparent Auto-Approved Rule Chip
  return (
    <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
        style={{
          background: 'var(--surface-0)',
          border: '1px solid var(--border-subtle)',
          borderRadius: `${innerR}px`,
        }}
      >
        <div className="flex min-w-0 items-center gap-2 text-[11.5px]">
          <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: ruleActive ? 'var(--success)' : 'var(--ink-3)' }} />
          <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
            {ruleActive
              ? 'Auto-approved by rule: allow(npm run typecheck)'
              : 'Rule revoked — will prompt next time'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setRuleActive((v) => !v)}
          className="craft-pressable shrink-0 px-2 py-0.5 text-[11px] font-medium"
          style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: `${Math.max(4, innerR - 2)}px`,
            color: ruleActive ? 'var(--danger)' : 'var(--ink-1)',
          }}
        >
          {ruleActive ? 'Revoke rule' : 'Restore rule'}
        </button>
      </div>
    </div>
  );
}
