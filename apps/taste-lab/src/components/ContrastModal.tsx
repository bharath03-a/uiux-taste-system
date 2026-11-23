import { useMemo, useState } from 'react';
import { Check, CheckCircle2, Copy, ShieldAlert, Sparkles, Wand2, X } from 'lucide-react';
import type { ProjectTheme } from '../data/themes';
import {
  auditThemeTokens,
  bestInkForSurface,
  evaluateContrast,
  suggestPassingForeground,
} from '../lib/contrast';

interface ContrastModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTheme: ProjectTheme;
}

export function ContrastModal({ open, onOpenChange, activeTheme }: ContrastModalProps) {
  const [tab, setTab] = useState<'audit' | 'sandbox'>('audit');
  const [customSurface, setCustomSurface] = useState('#ffffff');
  const [customInk, setCustomInk] = useState('#52525b');
  const [customAccent, setCustomAccent] = useState('#2563eb');
  const [customAccentInk, setCustomAccentInk] = useState('#ffffff');
  const [copiedCss, setCopiedCss] = useState(false);

  const audits = useMemo(() => auditThemeTokens(activeTheme.tokens), [activeTheme]);
  const passingCount = audits.filter((a) => a.pass).length;

  const sandboxInkEval = useMemo(
    () => evaluateContrast(customInk, customSurface),
    [customInk, customSurface],
  );
  const sandboxAccentEval = useMemo(
    () => evaluateContrast(customAccentInk, customAccent),
    [customAccentInk, customAccent],
  );
  const sandboxAccentOnSurface = useMemo(
    () => evaluateContrast(customAccent, customSurface),
    [customAccent, customSurface],
  );

  if (!open) return null;

  const handleAutoFixSandbox = () => {
    const fixedInk = suggestPassingForeground(customInk, customSurface, 4.5, 60);
    if (fixedInk) setCustomInk(fixedInk);
    const idealAccentInk = bestInkForSurface(customAccent);
    const testAccentInk = evaluateContrast(idealAccentInk, customAccent);
    if (testAccentInk && testAccentInk.wcag >= 4.5 && testAccentInk.apcaAbs >= 60) {
      setCustomAccentInk(idealAccentInk);
    } else {
      const fixedAccent = suggestPassingForeground(customAccent, customSurface, 4.5, 60);
      if (fixedAccent) {
        setCustomAccent(fixedAccent);
        setCustomAccentInk(bestInkForSurface(fixedAccent));
      }
    }
  };

  const generatedCssSnippet = `:root {\n  --surface-1: ${customSurface};\n  --ink-1: ${customInk};\n  --accent: ${customAccent};\n  --accent-ink: ${customAccentInk};\n}`;

  const handleCopySnippet = async () => {
    await navigator.clipboard.writeText(generatedCssSnippet);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="flex max-h-[86vh] w-full max-w-[780px] flex-col overflow-hidden"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-strong)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                Color Contrast Inspector (WCAG 2.1 + APCA Lc)
              </h2>
              <span
                className="tabular-nums-auto rounded px-1.5 py-0.5 text-[11px] font-semibold"
                style={{
                  background:
                    passingCount === audits.length ? 'var(--accent-soft)' : 'var(--danger-soft)',
                  color: passingCount === audits.length ? 'var(--ink-1)' : 'var(--danger)',
                  fontFamily: 'var(--dial-font-mono)',
                }}
              >
                {passingCount}/{audits.length} pass
              </span>
            </div>
            <p className="mt-0.5 text-[12px]" style={{ color: 'var(--ink-3)' }}>
              Theme-agnostic math: verifies every foreground/background semantic slot deterministically.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="craft-pressable craft-focus inline-flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-2)',
              border: '1px solid var(--border-subtle)',
            }}
            aria-label="Close contrast inspector"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sub-nav Tabs */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-2.5"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div
            className="inline-flex rounded-lg p-0.5"
            style={{
              background: 'var(--surface-recessed)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {(
              [
                { id: 'audit', label: `Active Theme: ${activeTheme.name}` },
                { id: 'sandbox', label: 'Test Your Work Brand Colors' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className="craft-pressable rounded-md px-3 py-1 text-[12px] font-medium"
                style={{
                  background: tab === item.id ? 'var(--surface-1)' : 'transparent',
                  color: tab === item.id ? 'var(--ink-1)' : 'var(--ink-3)',
                  boxShadow: tab === item.id ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span
            className="hidden sm:inline text-[11px]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            CLI: npm run lint:taste
          </span>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {tab === 'audit' ? (
            <div className="flex flex-col gap-2.5">
              {audits.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-3.5 py-2.5"
                  style={{
                    background: 'var(--surface-0)',
                    border: row.pass
                      ? '1px solid var(--border-subtle)'
                      : '1px solid var(--danger)',
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Live Sample Chip */}
                    <div
                      className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold"
                      style={{
                        background: row.bgHex,
                        color: row.fgHex,
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      Aa
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                          {row.label}
                        </span>
                        <span
                          className="text-[10.5px]"
                          style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                        >
                          {row.fgToken} / {row.bgToken}
                        </span>
                      </div>
                      <p className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
                        {row.usage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-right" style={{ fontFamily: 'var(--dial-font-mono)' }}>
                      <div className="tabular-nums-auto text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                        {row.metrics.wcag.toFixed(2)}:1
                      </div>
                      <div className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
                        Lc {Math.round(row.metrics.apcaAbs)}
                      </div>
                    </div>

                    {row.pass ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
                        style={{
                          background: 'var(--surface-1)',
                          color: 'var(--success)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {row.metrics.passesAAA ? 'AAA' : row.metrics.passesAA ? 'AA' : 'UI OK'}
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
                        style={{
                          background: 'var(--danger-soft)',
                          color: 'var(--danger)',
                        }}
                      >
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Fix → {row.suggestedFgHex}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Inputs */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: 'Card Surface (--surface-1)', value: customSurface, set: setCustomSurface },
                  { label: 'Primary Text (--ink-1)', value: customInk, set: setCustomInk },
                  { label: 'Brand Accent (--accent)', value: customAccent, set: setCustomAccent },
                  { label: 'Accent Label (--accent-ink)', value: customAccentInk, set: setCustomAccentInk },
                ].map((field) => (
                  <label
                    key={field.label}
                    className="flex items-center justify-between gap-2 rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-0)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
                      {field.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={/^#[0-9a-fA-F]{6}$/.test(field.value) ? field.value : '#000000'}
                        onChange={(e) => field.set(e.target.value)}
                        className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                        className="craft-focus w-[84px] rounded px-2 py-1 text-[11.5px] outline-none"
                        style={{
                          background: 'var(--surface-1)',
                          color: 'var(--ink-1)',
                          border: '1px solid var(--border-subtle)',
                          fontFamily: 'var(--dial-font-mono)',
                        }}
                      />
                    </div>
                  </label>
                ))}
              </div>

              {/* Live Preview Card using the custom brand tokens */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: customSurface,
                  color: customInk,
                  border: '1px solid var(--border-strong)',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-semibold">Live Work Brand Preview</div>
                    <p className="mt-0.5 text-[12.5px] opacity-85">
                      Verify body readability, accent button legibility, and APCA perceptual contrast.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg px-3.5 py-2 text-[12.5px] font-semibold"
                    style={{
                      background: customAccent,
                      color: customAccentInk,
                    }}
                  >
                    Deploy Release
                  </button>
                </div>

                <div
                  className="mt-4 grid grid-cols-1 gap-2 pt-3 text-[11.5px] sm:grid-cols-3"
                  style={{
                    borderTop: '1px solid rgba(128,128,128,0.22)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  <div>
                    Text / Surface:{' '}
                    <strong>
                      {sandboxInkEval
                        ? `${sandboxInkEval.wcag.toFixed(2)}:1 · Lc ${Math.round(sandboxInkEval.apcaAbs)}`
                        : 'Invalid hex'}
                    </strong>{' '}
                    {sandboxInkEval?.passesAA ? '✓ AA' : '✗ Fail'}
                  </div>
                  <div>
                    CTA / Accent:{' '}
                    <strong>
                      {sandboxAccentEval
                        ? `${sandboxAccentEval.wcag.toFixed(2)}:1 · Lc ${Math.round(sandboxAccentEval.apcaAbs)}`
                        : 'Invalid hex'}
                    </strong>{' '}
                    {sandboxAccentEval?.passesAA ? '✓ AA' : '✗ Fail'}
                  </div>
                  <div>
                    Accent / Surface:{' '}
                    <strong>
                      {sandboxAccentOnSurface
                        ? `${sandboxAccentOnSurface.wcag.toFixed(2)}:1 · Lc ${Math.round(sandboxAccentOnSurface.apcaAbs)}`
                        : 'Invalid hex'}
                    </strong>{' '}
                    {sandboxAccentOnSurface?.passesLarge ? '✓ UI' : '✗ Low'}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleAutoFixSandbox}
                  className="craft-pressable craft-focus inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                  }}
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  Auto-Fix Failing Contrast
                </button>

                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="craft-pressable craft-focus inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium"
                  style={{
                    background: 'var(--surface-0)',
                    color: 'var(--ink-1)',
                    border: '1px solid var(--border-strong)',
                  }}
                >
                  {copiedCss ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedCss ? 'Copied CSS Tokens' : 'Copy Semantic CSS Vars'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer guidance */}
        <div
          className="flex items-center gap-2 px-5 py-3 text-[11.5px]"
          style={{
            background: 'var(--surface-0)',
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--ink-2)',
          }}
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>
            Rule of thumb: Body text needs <strong>4.5:1 / Lc 60+</strong>, UI controls & icons need{' '}
            <strong>3.0:1 / Lc 45+</strong>. Never rely on eyeball judgment on dark themes.
          </span>
        </div>
      </div>
    </div>
  );
}
