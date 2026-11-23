import { useMemo, useState } from 'react';
import {
  Activity,
  AppWindow,
  BarChart3,
  Bell,
  Brain,
  Bug,
  Check,
  Code2,
  Command,
  Compass,
  Contrast,
  FileSearch,
  FlaskConical,
  FormInput,
  Gauge,
  Layers,
  LayoutGrid,
  LayoutPanelLeft,
  ListChecks,
  ListTree,
  Lock,
  MenuSquare,
  MousePointerClick,
  PanelTop,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Stethoscope,
  Table2,
  Tags,
  Type,
  Wand2,
  Workflow,
  Zap,
} from 'lucide-react';
import { SPECIMENS } from './data/specimens';
import { PROJECT_THEMES } from './data/themes';
import { useTasteStore } from './hooks/useTasteStore';
import { auditThemeTokens } from './lib/contrast';
import { DialPanel } from './components/DialPanel';
import { SpecimenStage } from './components/SpecimenStage';
import { CompileModal } from './components/CompileModal';
import { ContrastModal } from './components/ContrastModal';
import type { SpecimenId } from './types/taste';

const SPECIMEN_ICONS: Record<SpecimenId, React.ComponentType<{ className?: string }>> = {
  surfaces: Layers,
  typography: Type,
  buttons: MousePointerClick,
  inputs: FormInput,
  tabs: PanelTop,
  overlays: AppWindow,
  popovers: MenuSquare,
  'command-palette': Command,
  toasts: Bell,
  'app-shell': LayoutPanelLeft,
  'data-tables': Table2,
  'resilience-states': Activity,
  'ai-streaming': Sparkles,
  'ai-thinking-tools': Brain,
  'ai-hitl-diffs': ShieldCheck,
  'cards-metrics': LayoutGrid,
  'onboarding-wizards': ListChecks,
  'rich-pickers-uploads': Sliders,
  'lists-feeds-details': ListTree,
  'charts-analytics': BarChart3,
  'auth-security': Lock,
  'navigation-headers': Compass,
  'badges-avatars-chips': Tags,
  'heroes-landing-blocks': Wand2,
  'commerce-checkout': ShoppingBag,
  'risk-adjustment-coding': Stethoscope,
  'document-annotation-review': FileSearch,
  'micro-interactions-motion': Zap,
  'canvas-spatial-workflows': Workflow,
  'dashboards-ops-cockpits': Gauge,
};

export function App() {
  const {
    profile,
    themeId,
    setThemeId,
    saveState,
    updateDials,
    resetDials,
    updateSpecimenDecision,
    compiledMarkdown,
    writeTasteMarkdown,
  } = useTasteStore();

  const [activeId, setActiveId] = useState<SpecimenId>('risk-adjustment-coding');
  const [breakUi, setBreakUi] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [showDials, setShowDials] = useState(true);
  const [compileOpen, setCompileOpen] = useState(false);
  const [contrastOpen, setContrastOpen] = useState(false);

  const activeTheme = PROJECT_THEMES.find((t) => t.id === themeId) ?? PROJECT_THEMES[0];
  const themeAudit = useMemo(() => auditThemeTokens(activeTheme.tokens), [activeTheme]);
  const contrastPassCount = themeAudit.filter((a) => a.pass).length;
  const contrastAllPass = contrastPassCount === themeAudit.length;

  const activeSpecimen = SPECIMENS.find((s) => s.id === activeId) ?? SPECIMENS[0];
  const activeDecision = profile.specimens[activeSpecimen.id];
  const batch1Specimens = SPECIMENS.filter((s) => s.batch === 1);
  const batch2Specimens = SPECIMENS.filter((s) => s.batch === 2);
  const batch3Specimens = SPECIMENS.filter((s) => s.batch === 3);
  const batch4Specimens = SPECIMENS.filter((s) => s.batch === 4);
  const batch5Specimens = SPECIMENS.filter((s) => s.batch === 5);
  const batch6Specimens = SPECIMENS.filter((s) => s.batch === 6);
  const batch1Done = batch1Specimens.filter((s) => Boolean(profile.specimens[s.id]?.winnerId)).length;
  const batch2Done = batch2Specimens.filter((s) => Boolean(profile.specimens[s.id]?.winnerId)).length;
  const batch3Done = batch3Specimens.filter((s) => Boolean(profile.specimens[s.id]?.winnerId)).length;
  const batch4Done = batch4Specimens.filter((s) => Boolean(profile.specimens[s.id]?.winnerId)).length;
  const batch5Done = batch5Specimens.filter((s) => Boolean(profile.specimens[s.id]?.winnerId)).length;
  const batch6Done = batch6Specimens.filter((s) => Boolean(profile.specimens[s.id]?.winnerId)).length;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden" style={{ background: 'var(--surface-0)' }}>
      {/* Top Workbench Bar */}
      <header
        className="flex h-13 shrink-0 items-center justify-between gap-3 px-4"
        style={{
          background: 'var(--surface-1)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Brand + Sync status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              <FlaskConical className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13.5px] font-semibold tracking-tight" style={{ color: 'var(--ink-1)' }}>
              Taste Lab
            </span>
          </div>
          <span
            className="hidden sm:inline-block rounded-md px-2 py-0.5 text-[11px]"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-3)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            {saveState === 'saving'
              ? 'Saving taste.json…'
              : saveState === 'saved'
                ? 'Synced · taste/taste.json'
                : 'Local session'}
          </span>
        </div>

        {/* Center: Color-Abstracted Project Theme Swapper */}
        <div
          className="hidden lg:flex items-center gap-1 rounded-lg p-1"
          style={{
            background: 'var(--surface-recessed)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span
            className="px-2 text-[10.5px] font-medium uppercase tracking-[0.05em]"
            style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
          >
            Theme Slot
          </span>
          {PROJECT_THEMES.map((theme) => {
            const active = theme.id === themeId;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setThemeId(theme.id)}
                title={theme.description}
                className="craft-pressable craft-focus inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] font-medium"
                style={{
                  background: active ? 'var(--surface-1)' : 'transparent',
                  color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                  boxShadow: active ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <span className="inline-flex -space-x-1">
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-black/15"
                    style={{ background: theme.swatch[0] }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-black/15"
                    style={{ background: theme.swatch[2] }}
                  />
                </span>
                {theme.name}
              </button>
            );
          })}
        </div>

        {/* Right: Stress toggles + Contrast + Dials + Compile */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setContrastOpen(true)}
            title="Inspect WCAG 2.1 + APCA Lc color contrast for active theme or test your work brand colors"
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium"
            style={{
              background: contrastAllPass ? 'var(--surface-0)' : 'var(--danger-soft)',
              color: contrastAllPass ? 'var(--ink-1)' : 'var(--danger)',
              border: `1px solid ${contrastAllPass ? 'var(--border-subtle)' : 'var(--danger)'}`,
            }}
          >
            <Contrast className="h-3.5 w-3.5" />
            <span className="tabular-nums-auto hidden xl:inline" style={{ fontFamily: 'var(--dial-font-mono)' }}>
              {contrastPassCount}/{themeAudit.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setBreakUi((v) => !v)}
            title="Adversarial Break-UI mode: long text, unbreakable slugs, huge metrics, error states"
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium"
            style={{
              background: breakUi ? 'var(--danger-soft)' : 'var(--surface-0)',
              color: breakUi ? 'var(--danger)' : 'var(--ink-2)',
              border: `1px solid ${breakUi ? 'var(--danger)' : 'var(--border-subtle)'}`,
            }}
          >
            <Bug className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Break UI</span>
          </button>

          <button
            type="button"
            onClick={() => setMobilePreview((v) => !v)}
            title="Constrain specimens to 390px mobile viewport"
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium"
            style={{
              background: mobilePreview ? 'var(--accent-soft)' : 'var(--surface-0)',
              color: mobilePreview ? 'var(--ink-1)' : 'var(--ink-2)',
              border: `1px solid ${mobilePreview ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
            }}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden md:inline">390px</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDials((v) => !v)}
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium"
            style={{
              background: showDials ? 'var(--surface-2)' : 'var(--surface-0)',
              color: 'var(--ink-1)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Dials</span>
          </button>

          <button
            type="button"
            onClick={() => setCompileOpen(true)}
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
            }}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Compile TASTE.md</span>
          </button>
        </div>
      </header>

      {/* Main 3-pane workspace */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Left Specimen Navigation */}
        <nav
          className="hidden w-[236px] shrink-0 flex-col justify-between overflow-y-auto p-3 md:flex"
          style={{
            background: 'var(--surface-1)',
            borderRight: '1px solid var(--border-subtle)',
          }}
        >
          <div className="flex flex-col gap-5">
            {[
              { label: 'Batch 1 · Foundations', items: batch1Specimens, doneCount: batch1Done },
              { label: 'Batch 2 · UX & Overlays', items: batch2Specimens, doneCount: batch2Done },
              { label: 'Batch 3 · Data & AI-Native', items: batch3Specimens, doneCount: batch3Done },
              { label: 'Batch 4 · Generic App UX', items: batch4Specimens, doneCount: batch4Done },
              { label: 'Batch 5 · Auth, Flows & UI', items: batch5Specimens, doneCount: batch5Done },
              { label: 'Batch 6 · Risk Adj & Craft', items: batch6Specimens, doneCount: batch6Done },
            ].map((group) => (
              <div key={group.label}>
                <div className="mb-2 flex items-center justify-between px-2">
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {group.label}
                  </span>
                  <span
                    className="tabular-nums-auto text-[10.5px]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {group.doneCount}/{group.items.length}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {group.items.map((spec) => {
                    const Icon = SPECIMEN_ICONS[spec.id];
                    const active = spec.id === activeId;
                    const dec = profile.specimens[spec.id];
                    const count = dec?.selectedIds?.length
                      ? dec.selectedIds.length
                      : dec?.winnerId
                        ? 1
                        : 0;

                    return (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setActiveId(spec.id)}
                        className="craft-pressable craft-focus flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] font-medium"
                        style={{
                          background: active ? 'var(--surface-2)' : 'transparent',
                          color: active ? 'var(--ink-1)' : 'var(--ink-2)',
                        }}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Icon className="h-3.5 w-3.5 shrink-0 opacity-75" />
                          <span className="truncate">{spec.title}</span>
                        </span>
                        {count > 0 && (
                          <span
                            className="tabular-nums-auto inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold"
                            style={{
                              background: 'var(--accent)',
                              color: 'var(--accent-ink)',
                              fontFamily: 'var(--dial-font-mono)',
                            }}
                          >
                            {count === 1 ? <Check className="h-2.5 w-2.5" /> : count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 rounded-lg p-3 text-[11px] leading-relaxed"
            style={{
              background: 'var(--surface-0)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--ink-3)',
            }}
          >
            <strong style={{ color: 'var(--ink-2)' }}>Color-Agnostic Rule:</strong> Swap the top
            theme slot before locking picks—your taste should hold up in every palette.
          </div>
        </nav>

        {/* Center Interactive Stage */}
        <main className="min-w-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {/* Mobile specimen + theme quick bar */}
          <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
            <select
              value={activeId}
              onChange={(e) => setActiveId(e.target.value as SpecimenId)}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium md:hidden"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {SPECIMENS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {PROJECT_THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  Theme: {t.name}
                </option>
              ))}
            </select>
          </div>

          <SpecimenStage
            specimen={activeSpecimen}
            decision={activeDecision}
            ctx={{ dials: profile.dials, breakUi, mobilePreview }}
            onToggleSelect={(variantId) =>
              updateSpecimenDecision(activeSpecimen.id, (prev) => {
                const exists = prev.selectedIds.includes(variantId);
                const nextSelected = exists
                  ? prev.selectedIds.filter((id) => id !== variantId)
                  : [...prev.selectedIds, variantId];
                const nextPrimary =
                  prev.winnerId && nextSelected.includes(prev.winnerId)
                    ? prev.winnerId
                    : nextSelected[0];
                return {
                  ...prev,
                  selectedIds: nextSelected,
                  winnerId: nextPrimary,
                  rejectedIds: prev.rejectedIds.filter((id) => id !== variantId),
                };
              })
            }
            onSetPrimary={(variantId) =>
              updateSpecimenDecision(activeSpecimen.id, (prev) => {
                const nextSelected = prev.selectedIds.includes(variantId)
                  ? prev.selectedIds
                  : [variantId, ...prev.selectedIds];
                return {
                  ...prev,
                  selectedIds: nextSelected,
                  winnerId: variantId,
                  rejectedIds: prev.rejectedIds.filter((id) => id !== variantId),
                };
              })
            }
            onToggleReject={(variantId) =>
              updateSpecimenDecision(activeSpecimen.id, (prev) => {
                const exists = prev.rejectedIds.includes(variantId);
                const nextSelected = prev.selectedIds.filter((id) => id !== variantId);
                return {
                  ...prev,
                  selectedIds: nextSelected,
                  winnerId:
                    prev.winnerId === variantId ? nextSelected[0] : prev.winnerId,
                  rejectedIds: exists
                    ? prev.rejectedIds.filter((id) => id !== variantId)
                    : [...prev.rejectedIds, variantId],
                };
              })
            }
            onUpdateNotes={(patch) =>
              updateSpecimenDecision(activeSpecimen.id, (prev) => ({
                ...prev,
                ...patch,
              }))
            }
          />
        </main>

        {/* Right Live Craft Dials */}
        {showDials && (
          <div className="hidden w-[280px] shrink-0 lg:block">
            <DialPanel
              dials={profile.dials}
              onChange={updateDials}
              onReset={resetDials}
            />
          </div>
        )}
      </div>

      <CompileModal
        open={compileOpen}
        onOpenChange={setCompileOpen}
        markdown={compiledMarkdown}
        profile={profile}
        onWriteMarkdown={writeTasteMarkdown}
      />

      <ContrastModal
        open={contrastOpen}
        onOpenChange={setContrastOpen}
        activeTheme={activeTheme}
      />
    </div>
  );
}
export default App;
