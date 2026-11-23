import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Clock,
  Pencil,
  Sparkles,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const WIZARD_STEPS = [
  { id: 0, title: 'Workspace', desc: 'Name your organization' },
  { id: 1, title: 'Invite Team', desc: 'Add initial collaborators' },
  { id: 2, title: 'Preferences', desc: 'Pick default region & alerts' },
];

export function OnboardingWizardsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [step, setStep] = useState(1);
  const [checkedTasks, setCheckedTasks] = useState<string[]>(['t1', 't2']);
  const [focusChoice, setFocusChoice] = useState<string | null>(null);
  const [section1Done, setSection1Done] = useState(true);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [calloutOpen, setCalloutOpen] = useState(true);
  const [draftDismissed, setDraftDismissed] = useState(false);

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

  // 01. Horizontal Numbered Stepper
  if (variantId === 'horizontal-numbered-stepper') {
    return (
      <div className="flex flex-col gap-4 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          {WIZARD_STEPS.map((s, idx) => {
            const done = idx < step;
            const active = idx === step;
            return (
              <div key={s.id} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(idx)}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{
                    background: done || active ? 'var(--accent)' : 'var(--surface-0)',
                    color: done || active ? 'var(--accent-ink)' : 'var(--ink-3)',
                    border: done || active ? 'none' : '1px solid var(--border-strong)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  {done ? <Check className="h-3 w-3" /> : idx + 1}
                </button>
                <span
                  className="hidden truncate text-[11.5px] font-medium sm:inline"
                  style={{ color: active ? 'var(--ink-1)' : 'var(--ink-3)' }}
                >
                  {s.title}
                </span>
                {idx < WIZARD_STEPS.length - 1 && (
                  <span className="h-[1px] flex-1" style={{ background: done ? 'var(--accent)' : 'var(--border-subtle)' }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px` }}>
          <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            Step {step + 1}: {WIZARD_STEPS[step].title}
          </div>
          <div className="mt-0.5 text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
            {WIZARD_STEPS[step].desc}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="craft-pressable h-7 px-2.5 text-[11.5px] font-medium disabled:opacity-40"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-2)' }}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) % WIZARD_STEPS.length)}
            className="craft-pressable h-7 px-3 text-[11.5px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${innerR}px` }}
          >
            {step === WIZARD_STEPS.length - 1 ? 'Finish' : 'Continue'}
          </button>
        </div>
      </div>
    );
  }

  // 02. Left Step Rail + Form Stage
  if (variantId === 'vertical-rail-stepper') {
    return (
      <div className={`flex overflow-hidden ${mobilePreview ? 'flex-col' : 'flex-row'}`} style={cardStyle}>
        <div
          className={`flex shrink-0 gap-1 p-2.5 ${mobilePreview ? 'flex-row overflow-x-auto' : 'w-[144px] flex-col'}`}
          style={{
            background: 'var(--surface-0)',
            borderRight: mobilePreview ? 'none' : '1px solid var(--border-subtle)',
            borderBottom: mobilePreview ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          {WIZARD_STEPS.map((s, idx) => {
            const active = idx === step;
            const done = idx < step;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(idx)}
                className="flex shrink-0 items-center gap-2 px-2 py-1.5 text-left text-[11.5px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: active ? 'var(--surface-2)' : 'transparent',
                  color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                }}
              >
                <span
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9.5px]"
                  style={{
                    background: done ? 'var(--accent)' : 'var(--surface-1)',
                    color: done ? 'var(--accent-ink)' : 'var(--ink-2)',
                    border: done ? 'none' : '1px solid var(--border-strong)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  {done ? <Check className="h-2.5 w-2.5" /> : idx + 1}
                </span>
                <span className="truncate">{s.title}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-1 flex-col justify-between gap-3 p-3.5">
          <div>
            <div className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>{WIZARD_STEPS[step].title}</div>
            <p className="mt-0.5 text-[11.5px]" style={{ color: 'var(--ink-3)' }}>{WIZARD_STEPS[step].desc}</p>
          </div>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) % WIZARD_STEPS.length)}
            className="craft-pressable h-7 w-fit px-3 text-[11.5px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${innerR}px` }}
          >
            Next step →
          </button>
        </div>
      </div>
    );
  }

  // 03. Minimal 2px Progress Bar Wizard
  if (variantId === 'slim-top-progress-wizard') {
    const pct = Math.round(((step + 1) / WIZARD_STEPS.length) * 100);
    return (
      <div className="overflow-hidden" style={cardStyle}>
        <div className="h-[3px] w-full" style={{ background: 'var(--surface-2)' }}>
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={transition}
            className="h-full"
            style={{ background: 'var(--accent)' }}
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            <span>STEP {step + 1} OF {WIZARD_STEPS.length}</span>
            <span className="tabular-nums-auto">{pct}%</span>
          </div>
          <div className="text-[14px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            {WIZARD_STEPS[step].desc}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) % WIZARD_STEPS.length)}
              className="craft-pressable h-8 px-3 text-[12px] font-semibold"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${innerR}px` }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 04. Getting-Started Checklist Card
  if (variantId === 'onboarding-checklist-card') {
    const tasks = [
      { id: 't1', label: 'Create your first workspace' },
      { id: 't2', label: 'Connect custom domain' },
      { id: 't3', label: 'Invite first teammate' },
      { id: 't4', label: 'Configure notification alerts' },
    ];
    const pct = Math.round((checkedTasks.length / tasks.length) * 100);
    const toggle = (id: string) =>
      setCheckedTasks((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            Getting Started
          </span>
          <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>
            {pct}% complete
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
          <motion.div animate={{ width: `${pct}%` }} transition={transition} className="h-full" style={{ background: 'var(--accent)' }} />
        </div>
        <div className="flex flex-col gap-1">
          {tasks.map((t) => {
            const done = checkedTasks.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggle(t.id)}
                className="flex items-center gap-2 px-2 py-1 text-left text-[12px] transition-colors hover:bg-[var(--surface-2)]"
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

  // 05. Split Context Guide + Form Card
  if (variantId === 'split-guide-form-wizard') {
    return (
      <div className={`grid overflow-hidden ${mobilePreview ? 'grid-cols-1' : 'grid-cols-[0.9fr_1.1fr]'}`} style={cardStyle}>
        <div
          className="flex flex-col justify-between p-3.5"
          style={{
            background: 'var(--surface-0)',
            borderRight: mobilePreview ? 'none' : '1px solid var(--border-subtle)',
            borderBottom: mobilePreview ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          <div>
            <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Billing Address</div>
            <p className="mt-1 text-[11.5px] leading-snug text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
              Used strictly for tax-compliant PDF receipts. You can update this anytime in settings.
            </p>
          </div>
          <span className="mt-2 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            Encrypted · TLS 1.3
          </span>
        </div>
        <div className="flex flex-col gap-2.5 p-3.5">
          <input
            defaultValue="Acme Studio Inc."
            className="craft-focus px-2.5 py-1.5 text-[12px] outline-none"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
          />
          <input
            defaultValue="San Francisco, CA"
            className="craft-focus px-2.5 py-1.5 text-[12px] outline-none"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-1)' }}
          />
        </div>
      </div>
    );
  }

  // 06. Single-Question Focused Flow
  if (variantId === 'single-question-focus-flow') {
    const roles = ['Founder / Product', 'Design Engineer', 'Operations & Analytics'];
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {breakUi ? 'What best describes your primary day-to-day workflow inside this workspace?' : 'What will you use this workspace for?'}
        </div>
        <div className="flex flex-col gap-1.5">
          {roles.map((r, i) => {
            const act = focusChoice === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setFocusChoice(r)}
                className="craft-pressable flex items-center justify-between gap-2 px-3 py-2 text-left text-[12px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: act ? 'var(--accent-soft)' : 'var(--surface-0)',
                  border: act ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  color: 'var(--ink-1)',
                }}
              >
                <span className="flex items-center gap-2">
                  <kbd
                    className="inline-flex h-4 w-4 items-center justify-center rounded text-[10px]"
                    style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {i + 1}
                  </kbd>
                  <span>{r}</span>
                </span>
                {act && <Check className="h-3.5 w-3.5" style={{ color: 'var(--ink-1)' }} />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 07. Progressive Inline Section Reveal
  if (variantId === 'progressive-inline-reveal') {
    return (
      <div className="flex flex-col gap-2.5 p-4" style={cardStyle}>
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px` }}
        >
          <span className="flex items-center gap-2 text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
            <Check className="h-3.5 w-3.5" style={{ color: 'var(--success)' }} />
            1. Account email verified
          </span>
          <button
            type="button"
            onClick={() => setSection1Done((v) => !v)}
            className="text-[11px] underline-offset-2 hover:underline"
            style={{ color: 'var(--ink-3)' }}
          >
            {section1Done ? 'Collapse step 2' : 'Unlock step 2'}
          </button>
        </div>

        {section1Done && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="flex flex-col gap-2 p-3"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px` }}
          >
            <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-1)' }}>
              2. Pick your workspace URL
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>app.co/</span>
              <input
                defaultValue="northstar"
                className="craft-focus min-w-0 flex-1 px-2 py-1 text-[12px] outline-none"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: `${Math.max(4, innerR - 2)}px`, color: 'var(--ink-1)' }}
              />
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // 08. Final Review & Edit Summary Step
  if (variantId === 'review-confirm-summary') {
    return (
      <div className="flex flex-col gap-3 p-4" style={cardStyle}>
        <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          Review before confirming
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px` }}>
          {[
            { k: 'Plan', v: 'Team · $24/seat' },
            { k: 'Billing', v: 'Visa •••• 4242' },
          ].map((row) => (
            <div key={row.k} className="flex items-center justify-between px-3 py-2 text-[12px]" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <span style={{ color: 'var(--ink-3)' }}>{row.k}: </span>
                <span className="font-medium" style={{ color: 'var(--ink-1)' }}>{row.v}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: 'var(--ink-3)' }}>
                <Pencil className="h-3 w-3" /> Edit
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setReviewSubmitted((v) => !v)}
          className="craft-pressable h-8 w-full text-[12px] font-semibold"
          style={{
            background: reviewSubmitted ? 'var(--surface-0)' : 'var(--accent)',
            color: reviewSubmitted ? 'var(--success)' : 'var(--accent-ink)',
            border: reviewSubmitted ? '1px solid var(--border-strong)' : '1px solid transparent',
            borderRadius: `${innerR}px`,
          }}
        >
          {reviewSubmitted ? 'Confirmed & activated ✓' : 'Confirm & activate workspace'}
        </button>
      </div>
    );
  }

  // 09. Quiet Inline Feature Spotlight
  if (variantId === 'contextual-feature-callout') {
    return (
      <div className="flex min-h-[140px] flex-col justify-center p-4" style={cardStyle}>
        {calloutOpen ? (
          <div
            className="flex items-start justify-between gap-3 p-3.5"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px` }}
          >
            <div className="flex min-w-0 items-start gap-2.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--ink-1)' }} />
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  Scheduled exports are now live
                </div>
                <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: 'var(--ink-3)' }}>
                  Automate weekly CSV digests directly to your team inbox without interrupting your workflow.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setCalloutOpen(false)} style={{ color: 'var(--ink-3)' }}>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCalloutOpen(true)}
            className="craft-pressable mx-auto h-8 px-3 text-[11.5px] font-medium"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-2)' }}
          >
            Show inline spotlight again
          </button>
        )}
      </div>
    );
  }

  // 10. Saved Draft Resume Strip
  return (
    <div className="flex min-h-[140px] flex-col justify-center p-4" style={cardStyle}>
      {draftDismissed ? (
        <button
          type="button"
          onClick={() => setDraftDismissed(false)}
          className="craft-pressable mx-auto h-8 px-3 text-[11.5px] font-medium"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: `${innerR}px`, color: 'var(--ink-2)' }}
        >
          Restore saved draft strip
        </button>
      ) : (
        <div
          className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2.5"
          style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', borderRadius: `${innerR}px` }}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" style={{ color: 'var(--ink-2)' }} />
            <div>
              <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                Resume vendor application
              </div>
              <div className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                2 of 4 steps saved · 12m ago
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDraftDismissed(true)}
              className="craft-pressable h-7 px-2 text-[11px]"
              style={{ color: 'var(--ink-3)' }}
            >
              Discard
            </button>
            <button
              type="button"
              onClick={() => setDraftDismissed(false)}
              className="craft-pressable inline-flex h-7 items-center gap-1 px-2.5 text-[11.5px] font-semibold"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: `${Math.max(4, innerR - 2)}px` }}
            >
              Continue <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
