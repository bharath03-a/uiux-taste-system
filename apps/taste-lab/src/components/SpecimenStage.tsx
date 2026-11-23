import { Check, Ban, MessageSquareText, Star } from 'lucide-react';
import { SurfaceElevationSpecimen } from '../specimens/SurfaceElevationSpecimen';
import { TypographyRhythmSpecimen } from '../specimens/TypographyRhythmSpecimen';
import { ButtonsControlsSpecimen } from '../specimens/ButtonsControlsSpecimen';
import { InputsFormsSpecimen } from '../specimens/InputsFormsSpecimen';
import { TabsSegmentedSpecimen } from '../specimens/TabsSegmentedSpecimen';
import { OverlaysDrawerSpecimen } from '../specimens/OverlaysDrawerSpecimen';
import { PopoversMenusSpecimen } from '../specimens/PopoversMenusSpecimen';
import { CommandPaletteSpecimen } from '../specimens/CommandPaletteSpecimen';
import { ToastsNotificationsSpecimen } from '../specimens/ToastsNotificationsSpecimen';
import { AppShellSpecimen } from '../specimens/AppShellSpecimen';
import { DataTablesSpecimen } from '../specimens/DataTablesSpecimen';
import { ResilienceStatesSpecimen } from '../specimens/ResilienceStatesSpecimen';
import { AiStreamingSpecimen } from '../specimens/AiStreamingSpecimen';
import { AiThinkingToolsSpecimen } from '../specimens/AiThinkingToolsSpecimen';
import { AiHitlDiffsSpecimen } from '../specimens/AiHitlDiffsSpecimen';
import { CardsMetricsSpecimen } from '../specimens/CardsMetricsSpecimen';
import { OnboardingWizardsSpecimen } from '../specimens/OnboardingWizardsSpecimen';
import { RichPickersUploadsSpecimen } from '../specimens/RichPickersUploadsSpecimen';
import { ListsFeedsDetailsSpecimen } from '../specimens/ListsFeedsDetailsSpecimen';
import { ChartsAnalyticsSpecimen } from '../specimens/ChartsAnalyticsSpecimen';
import type { SpecimenContext, SpecimenDecision, SpecimenDefinition } from '../types/taste';

interface SpecimenStageProps {
  specimen: SpecimenDefinition;
  decision?: SpecimenDecision;
  ctx: SpecimenContext;
  onToggleSelect: (variantId: string) => void;
  onSetPrimary: (variantId: string) => void;
  onToggleReject: (variantId: string) => void;
  onUpdateNotes: (patch: { whyNote?: string; neverNote?: string }) => void;
}

export function SpecimenStage({
  specimen,
  decision,
  ctx,
  onToggleSelect,
  onSetPrimary,
  onToggleReject,
  onUpdateNotes,
}: SpecimenStageProps) {
  const selectedIds = decision?.selectedIds?.length
    ? decision.selectedIds
    : decision?.winnerId
      ? [decision.winnerId]
      : [];
  const primaryId =
    decision?.winnerId && selectedIds.includes(decision.winnerId)
      ? decision.winnerId
      : selectedIds[0];

  const renderVariant = (variantId: string) => {
    switch (specimen.id) {
      case 'surfaces':
        return <SurfaceElevationSpecimen variantId={variantId} ctx={ctx} />;
      case 'typography':
        return <TypographyRhythmSpecimen variantId={variantId} ctx={ctx} />;
      case 'buttons':
        return <ButtonsControlsSpecimen variantId={variantId} ctx={ctx} />;
      case 'inputs':
        return <InputsFormsSpecimen variantId={variantId} ctx={ctx} />;
      case 'tabs':
        return <TabsSegmentedSpecimen variantId={variantId} ctx={ctx} />;
      case 'overlays':
        return <OverlaysDrawerSpecimen variantId={variantId} ctx={ctx} />;
      case 'popovers':
        return <PopoversMenusSpecimen variantId={variantId} ctx={ctx} />;
      case 'command-palette':
        return <CommandPaletteSpecimen variantId={variantId} ctx={ctx} />;
      case 'toasts':
        return <ToastsNotificationsSpecimen variantId={variantId} ctx={ctx} />;
      case 'app-shell':
        return <AppShellSpecimen variantId={variantId} ctx={ctx} />;
      case 'data-tables':
        return <DataTablesSpecimen variantId={variantId} ctx={ctx} />;
      case 'resilience-states':
        return <ResilienceStatesSpecimen variantId={variantId} ctx={ctx} />;
      case 'ai-streaming':
        return <AiStreamingSpecimen variantId={variantId} ctx={ctx} />;
      case 'ai-thinking-tools':
        return <AiThinkingToolsSpecimen variantId={variantId} ctx={ctx} />;
      case 'ai-hitl-diffs':
        return <AiHitlDiffsSpecimen variantId={variantId} ctx={ctx} />;
      case 'cards-metrics':
        return <CardsMetricsSpecimen variantId={variantId} ctx={ctx} />;
      case 'onboarding-wizards':
        return <OnboardingWizardsSpecimen variantId={variantId} ctx={ctx} />;
      case 'rich-pickers-uploads':
        return <RichPickersUploadsSpecimen variantId={variantId} ctx={ctx} />;
      case 'lists-feeds-details':
        return <ListsFeedsDetailsSpecimen variantId={variantId} ctx={ctx} />;
      case 'charts-analytics':
        return <ChartsAnalyticsSpecimen variantId={variantId} ctx={ctx} />;
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.06em]"
            style={{
              background: 'var(--surface-2)',
              color: 'var(--ink-2)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            Batch {specimen.batch} · {specimen.variants.length} options
          </span>
          {selectedIds.length > 0 && (
            <span
              className="tabular-nums-auto inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10.5px] font-medium"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
              }}
            >
              <Check className="h-3 w-3" />
              {selectedIds.length} selected
            </span>
          )}
          <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
            Multi-select enabled — pick all patterns that belong in your kit, star 1 as Primary Default.
          </span>
        </div>
        <h1
          className="text-[22px] font-semibold"
          style={{
            color: 'var(--ink-1)',
            fontFamily: 'var(--dial-font-display)',
            letterSpacing: 'var(--dial-tracking-display)',
          }}
        >
          {specimen.title}
        </h1>
        <p className="max-w-[68ch] text-[13.5px] text-pretty-craft" style={{ color: 'var(--ink-2)' }}>
          {specimen.question}
        </p>
      </div>

      {/* Interactive prototype grid (or 390px mobile column preview) */}
      <div
        className={`grid gap-5 ${
          ctx.mobilePreview ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 xl:grid-cols-2'
        }`}
      >
        {specimen.variants.map((variant, index) => {
          const isSelected = selectedIds.includes(variant.id);
          const isPrimary = primaryId === variant.id;
          const isRejected = decision?.rejectedIds?.includes(variant.id) ?? false;

          return (
            <section
              key={variant.id}
              className="flex flex-col overflow-hidden transition-opacity"
              style={{
                width: ctx.mobilePreview ? '390px' : '100%',
                maxWidth: '100%',
                background: 'var(--surface-1)',
                borderRadius: '14px',
                border: isPrimary
                  ? '1.5px solid var(--accent)'
                  : isSelected
                    ? '1.5px solid var(--border-strong)'
                    : '1px solid var(--border-subtle)',
                opacity: isRejected ? 0.56 : 1,
              }}
            >
              {/* Variant card header */}
              <div
                className="flex items-center justify-between gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px]"
                      style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="truncate text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                      {variant.name}
                    </h2>
                  </div>
                  <p className="mt-0.5 truncate text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
                    {variant.archetype}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {isSelected && (
                    <button
                      type="button"
                      onClick={() => onSetPrimary(variant.id)}
                      title={isPrimary ? 'Primary Default pattern' : 'Promote to Primary Default'}
                      className="craft-pressable craft-focus inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium"
                      style={{
                        background: isPrimary ? 'var(--accent-soft)' : 'var(--surface-0)',
                        color: isPrimary ? 'var(--ink-1)' : 'var(--ink-3)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <Star
                        className="h-3 w-3"
                        fill={isPrimary ? 'currentColor' : 'none'}
                      />
                      <span>{isPrimary ? 'Primary' : 'Default'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onToggleReject(variant.id)}
                    title="Mark as explicitly rejected / anti-pattern"
                    className="craft-pressable craft-focus inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium"
                    style={{
                      background: isRejected ? 'var(--danger-soft)' : 'var(--surface-0)',
                      color: isRejected ? 'var(--danger)' : 'var(--ink-3)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Ban className="h-3 w-3" />
                    {isRejected ? 'Rejected' : 'Pass'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleSelect(variant.id)}
                    className="craft-pressable craft-focus inline-flex h-7 items-center gap-1 rounded-md px-2.5 text-[11.5px] font-medium"
                    style={{
                      background: isSelected ? 'var(--accent)' : 'var(--surface-0)',
                      color: isSelected ? 'var(--accent-ink)' : 'var(--ink-1)',
                      border: isSelected ? '1px solid transparent' : '1px solid var(--border-strong)',
                    }}
                  >
                    <Check className="h-3 w-3" />
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>

              {/* Live Interactive Stage */}
              <div
                className="flex flex-1 flex-col justify-center p-5"
                style={{
                  background: 'var(--surface-0)',
                }}
              >
                {renderVariant(variant.id)}
              </div>

              {/* Craft traits footer */}
              <div
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {variant.traits.map((t) => (
                    <span
                      key={t}
                      className="rounded px-1.5 py-0.5 text-[10.5px]"
                      style={{
                        background: 'var(--surface-0)',
                        color: 'var(--ink-2)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Rationale Recorder — turns gut feeling into agent-readable rules */}
      <div
        className="rounded-[14px] p-4"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <MessageSquareText className="h-4 w-4" style={{ color: 'var(--ink-2)' }} />
          <h3 className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            Capture Your Taste Rationale (compiles directly into TASTE.md)
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
              When should agents use each selected pattern (and why)?
            </span>
            <textarea
              rows={2}
              value={decision?.whyNote ?? ''}
              onChange={(e) => onUpdateNotes({ whyNote: e.target.value })}
              placeholder="e.g., Use Centered Dialog for confirmations, Right Sheet for multi-field editing, and Bottom Drawer on mobile."
              className="craft-focus w-full resize-none rounded-lg px-3 py-2 text-[12.5px] outline-none"
              style={{
                background: 'var(--surface-0)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-subtle)',
              }}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
              Never do this (explicit anti-pattern rule):
            </span>
            <textarea
              rows={2}
              value={decision?.neverNote ?? ''}
              onChange={(e) => onUpdateNotes({ neverNote: e.target.value })}
              placeholder="e.g., Never open nested modals on top of modals or fire corner toasts for simple inline form saves."
              className="craft-focus w-full resize-none rounded-lg px-3 py-2 text-[12.5px] outline-none"
              style={{
                background: 'var(--surface-0)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-subtle)',
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
