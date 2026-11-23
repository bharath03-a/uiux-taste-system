import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Sparkles, Terminal } from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function HeroesLandingSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'editorial-centered-hero':
      return <EditorialCenteredHero ctx={ctx} />;
    case 'split-product-hero':
      return <SplitProductHero ctx={ctx} />;
    case 'bento-value-props':
      return <BentoValueProps ctx={ctx} />;
    case 'social-proof-logo-bar':
      return <SocialProofLogoBar ctx={ctx} />;
    case 'testimonial-quote-card':
      return <TestimonialQuoteCard ctx={ctx} />;
    case 'feature-compare-matrix':
      return <FeatureCompareMatrix ctx={ctx} />;
    case 'faq-accordion-block':
      return <FaqAccordionBlock ctx={ctx} />;
    case 'cli-install-hero-snippet':
      return <CliInstallHeroSnippet ctx={ctx} />;
    case 'cta-banner-card':
      return <CtaBannerCard ctx={ctx} />;
    case 'changelog-release-feed':
      return <ChangelogReleaseFeed ctx={ctx} />;
    default:
      return null;
  }
}

function EditorialCenteredHero({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div
      className="flex flex-col items-center gap-3 px-4 py-5 text-center"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <h3
        className="max-w-[26ch] text-[20px] font-semibold leading-tight"
        style={{
          color: 'var(--ink-1)',
          fontFamily: 'var(--dial-font-display)',
          letterSpacing: 'var(--dial-tracking-display)',
        }}
      >
        {ctx.breakUi
          ? 'Ship color-agnostic, WCAG/APCA-verified interfaces across every framework in minutes'
          : 'Design systems that travel with your taste.'}
      </h3>
      <p className="max-w-[44ch] text-[12px]" style={{ color: 'var(--ink-2)' }}>
        Calibrate geometry, typography, and interaction craft once—drop into any brand palette cleanly.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <button
          type="button"
          className="craft-pressable inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[12px] font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Get Started <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="craft-pressable rounded-md px-3 py-1.5 text-[12px] font-medium"
          style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-strong)' }}
        >
          Live Demo
        </button>
      </div>
    </div>
  );
}

function SplitProductHero({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div
      className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-2"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex flex-col gap-2">
        <div
          className="text-[16px] font-semibold leading-snug"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-display)' }}
        >
          {ctx.breakUi ? 'Deterministic Contrast & Multi-Framework Tokens' : 'Zero-guesswork UI craft.'}
        </div>
        <p className="text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
          Works natively with React, Vue, Svelte, Flutter, and SwiftUI.
        </p>
        <button
          type="button"
          className="craft-pressable w-fit rounded-md px-3 py-1.5 text-[11.5px] font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Explore Kit
        </button>
      </div>
      <div
        className="flex flex-col gap-1.5 rounded-lg p-3"
        style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
          <span style={{ color: 'var(--ink-2)' }}>WCAG AA</span>
          <span style={{ color: 'var(--success)' }}>100% PASS</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'var(--accent)' }} />
        <div className="h-2 w-3/4 rounded-full" style={{ background: 'var(--surface-2)' }} />
      </div>
    </div>
  );
}

function BentoValueProps({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <div
        className="flex flex-col justify-between p-3 sm:col-span-2"
        style={{
          background: 'var(--surface-1)',
          borderRadius: 'var(--dial-radius)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          {ctx.breakUi ? 'Color-Abstracted Semantic Architecture' : 'Color-Agnostic DNA'}
        </span>
        <span className="mt-1 text-[11px]" style={{ color: 'var(--ink-2)' }}>
          Swap brand palettes instantly without touching component geometry.
        </span>
      </div>
      <div
        className="flex flex-col justify-between p-3"
        style={{
          background: 'var(--surface-1)',
          borderRadius: 'var(--dial-radius)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <span
          className="tabular-nums-auto text-[18px] font-bold"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          &lt;20ms
        </span>
        <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
          Contrast CLI check
        </span>
      </div>
    </div>
  );
}

function SocialProofLogoBar({ ctx }: { ctx: SpecimenContext }) {
  const brands = ctx.breakUi
    ? ['NORTHSTAR', 'VERIDIAN LABS', 'KINETIC OPS', 'MONOLITH']
    : ['Linear', 'Vercel', 'Raycast', 'Stripe'];
  return (
    <div
      className="flex flex-col gap-2.5 p-3.5 text-center"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span className="text-[10.5px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
        Craft benchmark references
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {brands.map((b) => (
          <div
            key={b}
            className="truncate rounded-md px-2 py-1.5 text-[12px] font-semibold tracking-tight"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-2)' }}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialQuoteCard({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div
      className="flex flex-col gap-3 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--ink-1)' }}>
        &ldquo;
        {ctx.breakUi
          ? 'Our coding agents went from shipping mismatched gray modals to consistent, WCAG-verified components across React and Flutter in a single afternoon.'
          : 'Our coding agents finally build interfaces with consistent spacing, crisp contrast, and zero AI slop.'}
        &rdquo;
      </p>
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
          style={{ background: 'var(--surface-2)', color: 'var(--ink-1)' }}
        >
          MK
        </span>
        <div>
          <div className="text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            Maya Kulkarni
          </div>
          <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
            Staff Design Engineer
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCompareMatrix({ ctx }: { ctx: SpecimenContext }) {
  const rows = [
    { feature: ctx.breakUi ? 'WCAG 2.1 + APCA Lc Enforcement' : 'Contrast Math', prompt: false, taste: true },
    { feature: 'Multi-Framework Tokens', prompt: false, taste: true },
    { feature: 'Live MCP Discovery', prompt: false, taste: true },
  ];
  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <table className="w-full text-left text-[11.5px]">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)' }}>
            <th className="px-3 py-2 font-medium">Capability</th>
            <th className="px-3 py-2 text-center font-medium">Prompt-Only</th>
            <th className="px-3 py-2 text-center font-semibold" style={{ color: 'var(--ink-1)' }}>
              Taste System
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.feature} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td className="px-3 py-2 font-medium" style={{ color: 'var(--ink-1)' }}>
                {r.feature}
              </td>
              <td className="px-3 py-2 text-center" style={{ color: 'var(--ink-3)' }}>
                {r.prompt ? '✓' : '—'}
              </td>
              <td className="px-3 py-2 text-center" style={{ color: 'var(--success)' }}>
                <Check className="mx-auto h-3.5 w-3.5" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqAccordionBlock({ ctx }: { ctx: SpecimenContext }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    {
      q: 'Does this lock me into React or Tailwind?',
      a: ctx.breakUi
        ? 'No — taste-tokens and taste-mcp export semantic palettes and library recommendations for React, Vue, Svelte, Angular, Solid, Vanilla CSS, React Native, Flutter, and SwiftUI.'
        : 'No. Tokens and skills adapt cleanly to React, Vue, Svelte, Flutter, SwiftUI, and plain CSS.',
    },
    {
      q: 'How does color contrast get enforced?',
      a: 'Both WCAG 2.1 AA/AAA and APCA W3 Lc run deterministically in taste-lint and taste-mcp.',
    },
  ];
  return (
    <div
      className="divide-y overflow-hidden"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {items.map((it, idx) => (
        <div key={it.q} style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left text-[12px] font-medium"
            style={{ color: 'var(--ink-1)' }}
          >
            <span>{it.q}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}
              style={{ color: 'var(--ink-3)' }}
            />
          </button>
          {openIdx === idx && (
            <div className="px-3.5 pb-3 text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CliInstallHeroSnippet({ ctx }: { ctx: SpecimenContext }) {
  const [copied, setCopied] = useState(false);
  const cmd = ctx.breakUi
    ? 'npx skills add bharath03-a/uiux-taste-system --global'
    : 'npx skills add bharath03-a/uiux-taste-system';
  return (
    <div
      className="flex items-center justify-between gap-2 px-3 py-2.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
      }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Terminal className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
        <code className="truncate text-[11.5px]" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
          {cmd}
        </code>
      </div>
      <button
        type="button"
        onClick={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className="craft-pressable shrink-0 rounded px-2 py-1 text-[11px] font-medium"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
    </div>
  );
}

function CtaBannerCard({ ctx }: { ctx: SpecimenContext }) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 p-4"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-strong)',
      }}
    >
      <div className="min-w-0">
        <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Sparkles className="h-3.5 w-3.5" />
          {ctx.breakUi ? 'Ready to standardize UI craft across every repo?' : 'Ready to calibrate your taste?'}
        </div>
        <div className="text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
          Open source (MIT) · Zero runtime lock-in.
        </div>
      </div>
      <button
        type="button"
        className="craft-pressable shrink-0 rounded-md px-3.5 py-2 text-[12px] font-semibold"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        Launch Workbench
      </button>
    </div>
  );
}

function ChangelogReleaseFeed({ ctx }: { ctx: SpecimenContext }) {
  const entries = [
    { ver: 'v0.2.0', date: 'Today', note: ctx.breakUi ? 'Added taste-mcp server, 10 font pairings & Batch 5 prototypes' : 'Added taste-mcp server & 10 font pairings' },
    { ver: 'v0.1.0', date: 'Nov 22', note: 'Initial Taste Lab + WCAG/APCA contrast linter' },
  ];
  return (
    <div
      className="flex flex-col gap-2.5 p-3.5"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--dial-radius)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {entries.map((e) => (
        <div key={e.ver} className="flex items-baseline gap-2.5 text-[11.5px]">
          <span
            className="shrink-0 rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
            style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {e.ver}
          </span>
          <span className="min-w-0 flex-1 truncate" style={{ color: 'var(--ink-1)' }}>
            {e.note}
          </span>
          <span className="shrink-0 text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            {e.date}
          </span>
        </div>
      ))}
    </div>
  );
}
