import { useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  CornerDownLeft,
  Pencil,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function InputsFormsSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [slug, setSlug] = useState(breakUi ? 'acme-global-design-system-prod-2026!' : 'studio-core');
  const [showError, setShowError] = useState(false);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ghost click-to-edit state
  const [editingGhost, setEditingGhost] = useState(false);
  const [ghostDraft, setGhostDraft] = useState(slug);

  // Fused fieldset state
  const [fsName, setFsName] = useState(breakUi ? 'Acme Global Design Systems Engineering' : 'Studio Core');
  const [fsRegion, setFsRegion] = useState('us-west-2 (Oregon)');
  const [activeRow, setActiveRow] = useState<'name' | 'slug' | 'region' | null>(null);

  // Tag / token composer state
  const [tags, setTags] = useState<string[]>(
    breakUi
      ? ['design-systems.internal.acme.io', 'staging-preview-edge.vercel.app', 'prod-eu-central']
      : ['app.studio.dev', 'docs.studio.dev']
  );
  const [tagDraft, setTagDraft] = useState('');

  const hasInvalidChars = /[^a-z0-9-]/.test(slug) || showError || breakUi;
  const radius = Math.max(4, dials.baseRadius - 2);
  const innerChipR = dials.concentricRadii ? Math.max(2, radius - 3) : Math.max(3, radius - 2);
  const h = dials.density === 'compact' ? 34 : dials.density === 'airy' ? 44 : 38;
  const cardPad = dials.density === 'compact' ? 14 : dials.density === 'airy' ? 20 : 18;

  const errorMessage = breakUi
    ? 'Workspace slug can only contain lowercase letters, numbers, and hyphens—spaces, uppercase letters, and punctuation like "!" are rejected by edge DNS routing.'
    : 'Use lowercase letters, numbers, and hyphens only.';

  const helperText = breakUi
    ? 'Used in https://acme-global-design-system-prod-2026.app.internal/v2/workspaces'
    : 'Used in your workspace URL.';

  const ringShadow = focused
    ? hasInvalidChars
      ? '0 0 0 3px var(--danger-soft)'
      : '0 0 0 3px var(--focus-ring)'
    : 'none';

  const borderColor = hasInvalidChars
    ? 'var(--danger)'
    : focused
      ? 'var(--ink-1)'
      : 'var(--border-subtle)';

  const motionTransition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  const cardShellStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${dials.baseRadius}px`,
    padding: `${cardPad}px`,
  };

  // 05. Floating Kinetic Label
  if (variantId === 'floating-label') {
    const floated = focused || slug.length > 0;
    return (
      <div style={cardShellStyle}>
        <div
          className="relative transition-all"
          style={{
            height: `${h + 12}px`,
            background: 'var(--surface-1)',
            border: `1px solid ${borderColor}`,
            borderRadius: `${radius}px`,
            boxShadow: ringShadow,
          }}
        >
          <motion.label
            htmlFor={`float-${variantId}`}
            animate={{
              top: floated ? '6px' : '50%',
              y: floated ? '0%' : '-50%',
              fontSize: floated ? '10.5px' : '13px',
            }}
            transition={motionTransition}
            className="pointer-events-none absolute left-3 font-medium"
            style={{
              color: hasInvalidChars
                ? 'var(--danger)'
                : focused
                  ? 'var(--ink-1)'
                  : 'var(--ink-3)',
            }}
          >
            Workspace slug
          </motion.label>
          <input
            id={`float-${variantId}`}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-full w-full bg-transparent px-3 pt-4 pb-1 text-[13.5px] font-medium outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
          {slug.length > 0 && (
            <button
              type="button"
              onClick={() => setSlug('')}
              aria-label="Clear value to see resting label"
              className="craft-pressable absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1"
              style={{ color: 'var(--ink-3)' }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <FeedbackRow
          hasError={hasInvalidChars}
          error={errorMessage}
          helper="Clear the text to feel the label drop back into the field."
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 06. Editorial Underline Rule
  if (variantId === 'minimal-underline') {
    return (
      <div style={cardShellStyle}>
        <label
          htmlFor={`under-${variantId}`}
          className="block text-[11px] font-medium uppercase tracking-[0.06em]"
          style={{
            color: hasInvalidChars ? 'var(--danger)' : 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          Workspace slug
        </label>
        <div
          className="relative mt-1"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <input
            id={`under-${variantId}`}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent py-2 text-[15px] font-medium outline-none"
            style={{
              color: 'var(--ink-1)',
              letterSpacing: 'var(--dial-tracking-display)',
            }}
          />
          <motion.span
            aria-hidden
            initial={false}
            animate={{ scaleX: focused || hasInvalidChars ? 1 : 0 }}
            transition={motionTransition}
            className="pointer-events-none absolute right-0 bottom-[-1px] left-0 h-[1.5px] origin-center"
            style={{
              background: hasInvalidChars ? 'var(--danger)' : 'var(--accent)',
            }}
          />
        </div>
        <FeedbackRow
          hasError={hasInvalidChars}
          error={errorMessage}
          helper={helperText}
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 07. Compound Prefix + Action Group
  if (variantId === 'prefix-addon-group') {
    const handleCopy = () => {
      navigator.clipboard?.writeText(`https://app.studio/${slug}`).catch(() => {});
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    };

    return (
      <div style={cardShellStyle}>
        <label
          htmlFor={`prefix-${variantId}`}
          className="block text-[12.5px] font-medium"
          style={{ color: 'var(--ink-1)' }}
        >
          Workspace endpoint
        </label>
        <div
          className="mt-1.5 flex w-full items-stretch overflow-hidden transition-all"
          style={{
            height: `${h}px`,
            borderRadius: `${radius}px`,
            border: `1px solid ${borderColor}`,
            boxShadow: ringShadow,
            background: 'var(--surface-1)',
          }}
        >
          <span
            className="inline-flex shrink-0 items-center px-2.5 text-[12px] select-none"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-3)',
              borderRight: '1px solid var(--border-subtle)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {mobilePreview ? 'app/' : 'https://app.studio/'}
          </span>
          <input
            id={`prefix-${variantId}`}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] outline-none"
            style={{
              color: 'var(--ink-1)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          />
          <button
            type="button"
            onClick={handleCopy}
            title="Copy full endpoint"
            className="craft-pressable craft-hover-surface inline-flex shrink-0 items-center gap-1 px-2.5 text-[11.5px] font-medium"
            style={{
              color: copied ? 'var(--success)' : 'var(--ink-2)',
              borderLeft: '1px solid var(--border-subtle)',
            }}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {!mobilePreview && <span>{copied ? 'Copied' : 'Copy'}</span>}
          </button>
        </div>
        <FeedbackRow
          hasError={hasInvalidChars}
          error={errorMessage}
          helper={helperText}
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 08. Ghost Click-to-Edit (Linear / Notion)
  if (variantId === 'inline-editable-ghost') {
    const commitGhost = () => {
      setSlug(ghostDraft.trim() || slug);
      setEditingGhost(false);
    };
    const cancelGhost = () => {
      setGhostDraft(slug);
      setEditingGhost(false);
    };

    return (
      <div style={cardShellStyle}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-3)' }}>
            Workspace slug
          </span>
          <span
            className="text-[10.5px]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {editingGhost ? 'Enter save · Esc cancel' : 'Click value to edit'}
          </span>
        </div>

        <div className="mt-1.5">
          {editingGhost ? (
            <div className="flex items-center gap-1.5">
              <input
                autoFocus
                value={ghostDraft}
                onChange={(e) => setGhostDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitGhost();
                  if (e.key === 'Escape') cancelGhost();
                }}
                onBlur={commitGhost}
                className="min-w-0 flex-1 px-2.5 text-[14px] font-medium outline-none"
                style={{
                  height: `${h}px`,
                  background: 'var(--surface-0)',
                  color: 'var(--ink-1)',
                  borderRadius: `${radius}px`,
                  border: `1px solid ${hasInvalidChars ? 'var(--danger)' : 'var(--ink-1)'}`,
                  boxShadow: hasInvalidChars
                    ? '0 0 0 3px var(--danger-soft)'
                    : '0 0 0 3px var(--focus-ring)',
                }}
              />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={commitGhost}
                className="craft-pressable inline-flex shrink-0 items-center justify-center px-2.5 text-[12px] font-medium"
                style={{
                  height: `${h}px`,
                  background: 'var(--accent)',
                  color: 'var(--accent-ink)',
                  borderRadius: `${radius}px`,
                }}
              >
                <CornerDownLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setGhostDraft(slug);
                setEditingGhost(true);
              }}
              className="craft-focus craft-hover-surface group flex w-full items-center justify-between gap-2 px-2.5 text-left transition-colors"
              style={{
                height: `${h}px`,
                borderRadius: `${radius}px`,
                border: '1px solid transparent',
              }}
            >
              <span
                className="truncate text-[14.5px] font-semibold"
                style={{
                  color: hasInvalidChars ? 'var(--danger)' : 'var(--ink-1)',
                  letterSpacing: 'var(--dial-tracking-display)',
                }}
              >
                {slug}
              </span>
              <Pencil
                className="h-3.5 w-3.5 shrink-0 opacity-45 transition-opacity group-hover:opacity-100"
                style={{ color: 'var(--ink-2)' }}
              />
            </button>
          )}
        </div>

        <FeedbackRow
          hasError={hasInvalidChars}
          error={errorMessage}
          helper={helperText}
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 09. Fused Hairline Fieldset (Stripe / iOS grouped fields)
  if (variantId === 'segmented-card-group') {
    const rowHighlight = (key: 'name' | 'slug' | 'region', errored = false): React.CSSProperties => ({
      position: 'relative',
      zIndex: activeRow === key ? 10 : 1,
      background: activeRow === key ? 'var(--surface-1)' : 'var(--surface-0)',
      boxShadow:
        activeRow === key
          ? errored
            ? 'inset 0 0 0 1.5px var(--danger), 0 0 0 3px var(--danger-soft)'
            : 'inset 0 0 0 1.5px var(--ink-1)'
          : 'none',
    });

    return (
      <div style={cardShellStyle}>
        <div
          className="overflow-hidden"
          style={{
            borderRadius: `${radius}px`,
            border: '1px solid var(--border-subtle)',
          }}
        >
          {/* Row 1 */}
          <label
            className="block px-3 py-2 transition-all"
            style={{
              ...rowHighlight('name'),
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span className="block text-[10.5px] font-medium" style={{ color: 'var(--ink-3)' }}>
              Workspace name
            </span>
            <input
              value={fsName}
              onChange={(e) => setFsName(e.target.value)}
              onFocus={() => setActiveRow('name')}
              onBlur={() => setActiveRow(null)}
              className="mt-0.5 w-full bg-transparent text-[13px] font-medium outline-none"
              style={{ color: 'var(--ink-1)' }}
            />
          </label>

          {/* Row 2 & 3 split */}
          <div className={`grid ${mobilePreview ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
            <label
              className="block px-3 py-2 transition-all"
              style={{
                ...rowHighlight('slug', hasInvalidChars),
                borderRight: mobilePreview ? 'none' : '1px solid var(--border-subtle)',
                borderBottom: mobilePreview ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span
                className="block text-[10.5px] font-medium"
                style={{ color: hasInvalidChars ? 'var(--danger)' : 'var(--ink-3)' }}
              >
                Slug
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                onFocus={() => setActiveRow('slug')}
                onBlur={() => setActiveRow(null)}
                className="mt-0.5 w-full bg-transparent text-[13px] outline-none"
                style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
              />
            </label>

            <label className="block px-3 py-2 transition-all" style={rowHighlight('region')}>
              <span className="block text-[10.5px] font-medium" style={{ color: 'var(--ink-3)' }}>
                Primary region
              </span>
              <input
                value={fsRegion}
                onChange={(e) => setFsRegion(e.target.value)}
                onFocus={() => setActiveRow('region')}
                onBlur={() => setActiveRow(null)}
                className="mt-0.5 w-full bg-transparent text-[13px] outline-none"
                style={{ color: 'var(--ink-1)' }}
              />
            </label>
          </div>
        </div>

        <FeedbackRow
          hasError={hasInvalidChars}
          error={errorMessage}
          helper="Tab across rows to feel unified container focus."
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 10. Inline Chip / Tag Composer
  if (variantId === 'command-token-input') {
    const addTag = (raw: string) => {
      const cleaned = raw.trim().replace(/,$/, '');
      if (!cleaned || tags.includes(cleaned)) {
        setTagDraft('');
        return;
      }
      setTags((prev) => [...prev, cleaned]);
      setTagDraft('');
    };

    return (
      <div style={cardShellStyle}>
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={`tags-${variantId}`}
            className="text-[12.5px] font-medium"
            style={{ color: 'var(--ink-1)' }}
          >
            Allowed domains
          </label>
          <span
            className={`text-[11px] ${dials.tabularNums ? 'tabular-nums-auto' : ''}`}
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            {tags.length} active
          </span>
        </div>

        <div
          className="mt-1.5 flex min-h-[40px] flex-wrap items-center gap-1.5 px-2 py-1.5 transition-all"
          style={{
            background: 'var(--surface-0)',
            borderRadius: `${radius}px`,
            border: `1px solid ${showError ? 'var(--danger)' : focused ? 'var(--ink-1)' : 'var(--border-subtle)'}`,
            boxShadow: focused
              ? showError
                ? '0 0 0 3px var(--danger-soft)'
                : '0 0 0 3px var(--focus-ring)'
              : 'none',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex max-w-full items-center gap-1 px-2 py-0.5 text-[12px] font-medium"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${innerChipR}px`,
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              <span className="truncate">{tag}</span>
              <button
                type="button"
                onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                aria-label={`Remove ${tag}`}
                className="inline-flex shrink-0 opacity-60 hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            id={`tags-${variantId}`}
            value={tagDraft}
            onChange={(e) => {
              const val = e.target.value;
              if (val.endsWith(',')) {
                addTag(val);
              } else {
                setTagDraft(val);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && tagDraft.trim()) {
                e.preventDefault();
                addTag(tagDraft);
              } else if (e.key === 'Backspace' && !tagDraft && tags.length > 0) {
                setTags((prev) => prev.slice(0, -1));
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Add domain + Enter…"
            className="min-w-[120px] flex-1 bg-transparent px-1 py-0.5 text-[12.5px] outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
        </div>

        <FeedbackRow
          hasError={showError}
          error="Wildcard domains (*.example.com) require DNS TXT verification first."
          helper="Type a domain and press Enter or comma. Backspace pops the last chip."
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 03. Inset Compound Field
  if (variantId === 'inset-label') {
    return (
      <div style={cardShellStyle}>
        <div
          className="transition-all"
          style={{
            background: 'var(--surface-0)',
            border: `1px solid ${borderColor}`,
            borderRadius: `${radius}px`,
            boxShadow: ringShadow,
            padding: '8px 12px 9px',
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor={`inset-${variantId}`}
              className="text-[11px] font-medium"
              style={{ color: hasInvalidChars ? 'var(--danger)' : 'var(--ink-3)' }}
            >
              Workspace slug
            </label>
            <span
              className="text-[10.5px]"
              style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
            >
              Required
            </span>
          </div>
          <input
            id={`inset-${variantId}`}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="mt-0.5 w-full bg-transparent text-[13.5px] font-medium outline-none"
            style={{ color: 'var(--ink-1)' }}
          />
        </div>
        <FeedbackRow
          hasError={hasInvalidChars}
          error={errorMessage}
          helper={helperText}
          showError={showError}
          onToggleError={() => setShowError((v) => !v)}
        />
      </div>
    );
  }

  // 04. Horizontal Settings Row
  if (variantId === 'inline-settings') {
    return (
      <div style={cardShellStyle}>
        <div
          className={`grid gap-3 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-[1fr_1.2fr] sm:items-start'}`}
        >
          <div className="min-w-0">
            <label
              htmlFor={`inline-${variantId}`}
              className="block text-[13px] font-medium"
              style={{ color: 'var(--ink-1)' }}
            >
              Workspace slug
            </label>
            <p className="mt-0.5 text-[11.5px] text-pretty-craft" style={{ color: 'var(--ink-3)' }}>
              {helperText}
            </p>
          </div>
          <div className="min-w-0">
            <input
              id={`inline-${variantId}`}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full px-3 text-[13px] outline-none transition-all"
              style={{
                height: `${h}px`,
                background: 'var(--surface-0)',
                color: 'var(--ink-1)',
                borderRadius: `${radius}px`,
                border: `1px solid ${borderColor}`,
                boxShadow: ringShadow,
                fontFamily: 'var(--dial-font-mono)',
              }}
            />
            <FeedbackRow
              hasError={hasInvalidChars}
              error={errorMessage}
              helper=""
              showError={showError}
              onToggleError={() => setShowError((v) => !v)}
            />
          </div>
        </div>
      </div>
    );
  }

  // 01 & 02. Stacked Crisp Surface & Recessed Filled Field
  const isRecessed = variantId === 'recessed-filled';

  return (
    <div style={cardShellStyle}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={`std-${variantId}`}
          className="text-[12.5px] font-medium"
          style={{ color: 'var(--ink-1)' }}
        >
          Workspace slug
        </label>
        <span
          className={`text-[11px] ${dials.tabularNums ? 'tabular-nums-auto' : ''}`}
          style={{ color: 'var(--ink-3)' }}
        >
          {slug.length}/48
        </span>
      </div>

      <input
        id={`std-${variantId}`}
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="mt-1.5 w-full px-3 text-[13.5px] outline-none transition-all"
        style={{
          height: `${h}px`,
          background: isRecessed
            ? focused
              ? 'var(--surface-1)'
              : 'var(--surface-recessed)'
            : 'var(--surface-1)',
          color: 'var(--ink-1)',
          borderRadius: `${radius}px`,
          border: `1px solid ${isRecessed && !focused && !hasInvalidChars ? 'transparent' : borderColor}`,
          boxShadow: ringShadow,
        }}
      />

      <FeedbackRow
        hasError={hasInvalidChars}
        error={errorMessage}
        helper={helperText}
        showError={showError}
        onToggleError={() => setShowError((v) => !v)}
      />
    </div>
  );
}

function FeedbackRow({
  hasError,
  error,
  helper,
  showError,
  onToggleError,
}: {
  hasError: boolean;
  error: string;
  helper: string;
  showError: boolean;
  onToggleError: () => void;
}) {
  return (
    <div className="mt-2 flex items-start justify-between gap-2">
      <div className="flex min-w-0 items-start gap-1.5 text-[11.5px] text-pretty-craft">
        {hasError ? (
          <>
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--danger)' }} />
            <span style={{ color: 'var(--danger)' }}>{error}</span>
          </>
        ) : helper ? (
          <>
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--success)' }} />
            <span style={{ color: 'var(--ink-3)' }}>{helper}</span>
          </>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onToggleError}
        className="shrink-0 text-[11px] font-medium underline decoration-dotted underline-offset-2"
        style={{ color: 'var(--ink-3)' }}
      >
        {showError ? 'Clear err' : 'Test err'}
      </button>
    </div>
  );
}
