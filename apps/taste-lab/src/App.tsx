import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  AppWindow,
  BarChart3,
  Bell,
  Brain,
  Bug,
  Check,
  ChevronDown,
  ChevronRight,
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
  Search,
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
  X,
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
import { QuickJumpModal } from './components/QuickJumpModal';
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

const BATCH_META: { batch: 1 | 2 | 3 | 4 | 5 | 6; label: string; short: string }[] = [
  { batch: 1, label: 'Batch 1 · Foundations', short: 'B1' },
  { batch: 2, label: 'Batch 2 · UX & Overlays', short: 'B2' },
  { batch: 3, label: 'Batch 3 · Data & AI-Native', short: 'B3' },
  { batch: 4, label: 'Batch 4 · Generic App UX', short: 'B4' },
  { batch: 5, label: 'Batch 5 · Auth, Flows & UI', short: 'B5' },
  { batch: 6, label: 'Batch 6 · Risk Adj & Craft', short: 'B6' },
];

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
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [sidebarQuery, setSidebarQuery] = useState('');
  const [batchFilter, setBatchFilter] = useState<'all' | 'todo' | 1 | 2 | 3 | 4 | 5 | 6>('all');
  const [collapsedBatches, setCollapsedBatches] = useState<Record<number, boolean>>({});
  const [highlightedVariantId, setHighlightedVariantId] = useState<string | null>(null);
  const mainStageRef = useRef<HTMLElement>(null);
  const highlightTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickJumpOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleJump = useCallback((specimenId: SpecimenId, variantId?: string) => {
    setActiveId(specimenId);
    setBatchFilter((prev) => {
      if (prev === 'all' || prev === 'todo') return prev;
      const target = SPECIMENS.find((s) => s.id === specimenId);
      return target && target.batch !== prev ? 'all' : prev;
    });
    const targetSpec = SPECIMENS.find((s) => s.id === specimenId);
    if (targetSpec) {
      setCollapsedBatches((prev) => ({ ...prev, [targetSpec.batch]: false }));
    }

    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }

    if (variantId) {
      setHighlightedVariantId(variantId);
      window.setTimeout(() => {
        const el = document.getElementById(`variant-${variantId}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      highlightTimerRef.current = window.setTimeout(() => {
        setHighlightedVariantId(null);
      }, 1800);
    } else {
      setHighlightedVariantId(null);
      window.setTimeout(() => {
        mainStageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 20);
    }
  }, []);

  const activeTheme = PROJECT_THEMES.find((t) => t.id === themeId) ?? PROJECT_THEMES[0];
  const themeAudit = useMemo(() => auditThemeTokens(activeTheme.tokens), [activeTheme]);
  const contrastPassCount = themeAudit.filter((a) => a.pass).length;
  const contrastAllPass = contrastPassCount === themeAudit.length;

  const activeIndex = Math.max(0, SPECIMENS.findIndex((s) => s.id === activeId));
  const activeSpecimen = SPECIMENS[activeIndex] ?? SPECIMENS[0];
  const prevSpecimen = activeIndex > 0 ? SPECIMENS[activeIndex - 1] : undefined;
  const nextSpecimen = activeIndex < SPECIMENS.length - 1 ? SPECIMENS[activeIndex + 1] : undefined;
  const activeDecision = profile.specimens[activeSpecimen.id];

  const totalVariants = useMemo(
    () => SPECIMENS.reduce((sum, spec) => sum + spec.variants.length, 0),
    [],
  );

  const totalDone = useMemo(
    () =>
      SPECIMENS.filter((s) => {
        const dec = profile.specimens[s.id];
        return Boolean(dec?.winnerId || dec?.selectedIds?.length);
      }).length,
    [profile.specimens],
  );

  const normalizedQuery = sidebarQuery.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    return BATCH_META.map((meta) => {
      const batchItems = SPECIMENS.filter((s) => s.batch === meta.batch);
      const doneCount = batchItems.filter((s) => {
        const dec = profile.specimens[s.id];
        return Boolean(dec?.winnerId || dec?.selectedIds?.length);
      }).length;

      if (typeof batchFilter === 'number' && batchFilter !== meta.batch) {
        return { ...meta, doneCount, totalCount: batchItems.length, entries: [] };
      }

      const entries = batchItems
        .map((spec) => {
          const dec = profile.specimens[spec.id];
          const isDone = Boolean(dec?.winnerId || dec?.selectedIds?.length);
          if (batchFilter === 'todo' && isDone) return null;

          if (!normalizedQuery) {
            return { spec, matchingVariants: [] as typeof spec.variants };
          }

          const specMatches =
            spec.title.toLowerCase().includes(normalizedQuery) ||
            spec.subtitle.toLowerCase().includes(normalizedQuery) ||
            spec.id.toLowerCase().includes(normalizedQuery) ||
            `b${spec.batch}`.includes(normalizedQuery) ||
            `batch ${spec.batch}`.includes(normalizedQuery);

          const matchingVariants = spec.variants.filter(
            (v) =>
              v.name.toLowerCase().includes(normalizedQuery) ||
              v.archetype.toLowerCase().includes(normalizedQuery) ||
              v.traits.some((t) => t.toLowerCase().includes(normalizedQuery)),
          );

          if (!specMatches && matchingVariants.length === 0) return null;
          return { spec, matchingVariants };
        })
        .filter((x): x is { spec: (typeof SPECIMENS)[number]; matchingVariants: (typeof SPECIMENS)[number]['variants'] } => Boolean(x));

      return { ...meta, doneCount, totalCount: batchItems.length, entries };
    }).filter((g) => g.entries.length > 0);
  }, [batchFilter, normalizedQuery, profile.specimens]);

  const progressPct = Math.round((totalDone / SPECIMENS.length) * 100);

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
        {/* Brand + Sync status + Quick Jump Trigger */}
        <div className="flex min-w-0 items-center gap-2.5">
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

          <button
            type="button"
            onClick={() => setQuickJumpOpen(true)}
            title="Jump to any of 30 categories or 270+ prototypes (⌘K / Ctrl+K)"
            className="craft-pressable craft-focus inline-flex h-8 items-center gap-2 rounded-lg px-2.5 text-[12px]"
            style={{
              background: 'var(--surface-0)',
              color: 'var(--ink-2)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
            <span className="hidden sm:inline">Jump to {totalVariants}+ components…</span>
            <kbd
              className="rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--ink-2)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              ⌘K
            </kbd>
          </button>

          <span
            className="hidden 2xl:inline-block rounded-md px-2 py-0.5 text-[11px]"
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
          className="hidden xl:flex items-center gap-1 rounded-lg p-1"
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
          className="hidden w-[262px] shrink-0 flex-col overflow-hidden md:flex"
          style={{
            background: 'var(--surface-1)',
            borderRight: '1px solid var(--border-subtle)',
          }}
        >
          {/* Sticky Discoverability Header: Progress + Search + Batch Filter Pills */}
          <div
            className="flex shrink-0 flex-col gap-2.5 p-3"
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            {/* Calibration Progress */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>
                  Calibrated
                </span>
                <span
                  className="tabular-nums-auto"
                  style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  {totalDone}/{SPECIMENS.length} · {totalVariants} demos
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ background: 'var(--surface-2)' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progressPct}%`,
                    background: 'var(--accent)',
                  }}
                />
              </div>
            </div>

            {/* Live Sidebar Search Input */}
            <div
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
              <input
                type="text"
                value={sidebarQuery}
                onChange={(e) => setSidebarQuery(e.target.value)}
                placeholder="Filter categories & demos…"
                className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
                style={{ color: 'var(--ink-1)' }}
              />
              {sidebarQuery && (
                <button
                  type="button"
                  onClick={() => setSidebarQuery('')}
                  aria-label="Clear filter"
                  className="rounded p-0.5"
                  style={{ color: 'var(--ink-3)' }}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* 1-Click Batch Filter Pills + Todo */}
            <div className="flex flex-wrap gap-1">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 1, label: 'B1' },
                  { id: 2, label: 'B2' },
                  { id: 3, label: 'B3' },
                  { id: 4, label: 'B4' },
                  { id: 5, label: 'B5' },
                  { id: 6, label: 'B6' },
                  { id: 'todo', label: 'Todo' },
                ] as const
              ).map((pill) => {
                const active = batchFilter === pill.id;
                return (
                  <button
                    key={String(pill.id)}
                    type="button"
                    onClick={() => setBatchFilter(pill.id)}
                    className="rounded-md px-1.5 py-0.5 text-[10.5px] font-medium transition-colors"
                    style={{
                      background: active ? 'var(--accent)' : 'var(--surface-0)',
                      color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                      border: active ? '1px solid transparent' : '1px solid var(--border-subtle)',
                      fontFamily: 'var(--dial-font-mono)',
                    }}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Collapsible Batch Groups */}
          <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto p-3">
            {filteredGroups.length === 0 ? (
              <div
                className="rounded-lg p-3 text-center text-[11.5px]"
                style={{
                  background: 'var(--surface-0)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--ink-3)',
                }}
              >
                No categories match this filter.
                <button
                  type="button"
                  onClick={() => {
                    setSidebarQuery('');
                    setBatchFilter('all');
                  }}
                  className="mt-2 block w-full rounded-md py-1 text-[11px] font-medium"
                  style={{ background: 'var(--surface-2)', color: 'var(--ink-1)' }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {filteredGroups.map((group) => {
                  const containsActive = group.entries.some((e) => e.spec.id === activeId);
                  const isExpanded =
                    Boolean(normalizedQuery) ||
                    batchFilter !== 'all' ||
                    containsActive ||
                    !collapsedBatches[group.batch];

                  return (
                    <div key={group.batch}>
                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedBatches((prev) => ({
                            ...prev,
                            [group.batch]: isExpanded,
                          }))
                        }
                        className="mb-1.5 flex w-full items-center justify-between rounded-md px-1.5 py-1 text-left transition-colors"
                        style={{ color: 'var(--ink-3)' }}
                      >
                        <span className="flex min-w-0 items-center gap-1">
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3 shrink-0" />
                          ) : (
                            <ChevronRight className="h-3 w-3 shrink-0" />
                          )}
                          <span
                            className="truncate text-[10.5px] font-semibold uppercase tracking-[0.06em]"
                            style={{ fontFamily: 'var(--dial-font-mono)' }}
                          >
                            {group.label}
                          </span>
                        </span>
                        <span
                          className="tabular-nums-auto shrink-0 text-[10px]"
                          style={{ fontFamily: 'var(--dial-font-mono)' }}
                        >
                          {group.doneCount}/{group.totalCount}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="flex flex-col gap-1">
                          {group.entries.map(({ spec, matchingVariants }) => {
                            const Icon = SPECIMEN_ICONS[spec.id];
                            const active = spec.id === activeId;
                            const dec = profile.specimens[spec.id];
                            const count = dec?.selectedIds?.length
                              ? dec.selectedIds.length
                              : dec?.winnerId
                                ? 1
                                : 0;

                            return (
                              <div key={spec.id} className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleJump(spec.id)}
                                  className="craft-pressable craft-focus flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12.5px] font-medium"
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

                                {matchingVariants.length > 0 && (
                                  <div className="mb-1 ml-6 flex flex-wrap gap-1">
                                    {matchingVariants.slice(0, 4).map((v) => (
                                      <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => handleJump(spec.id, v.id)}
                                        className="max-w-full truncate rounded px-1.5 py-0.5 text-[10.5px] transition-colors"
                                        style={{
                                          background: 'var(--accent-soft)',
                                          color: 'var(--ink-1)',
                                          border: '1px solid var(--border-subtle)',
                                        }}
                                      >
                                        ↳ {v.name}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

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
          </div>
        </nav>

        {/* Center Interactive Stage */}
        <main ref={mainStageRef} className="min-w-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {/* Mobile specimen + theme quick bar */}
          <div className="mb-4 flex flex-wrap gap-2 xl:hidden">
            <select
              value={activeId}
              onChange={(e) => handleJump(e.target.value as SpecimenId)}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium md:hidden"
              style={{
                background: 'var(--surface-1)',
                color: 'var(--ink-1)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {SPECIMENS.map((s) => (
                <option key={s.id} value={s.id}>
                  B{s.batch} · {s.title}
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
            highlightedVariantId={highlightedVariantId}
            prevSpecimen={prevSpecimen}
            nextSpecimen={nextSpecimen}
            onNavigateSpecimen={(id) => handleJump(id)}
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

      <QuickJumpModal
        open={quickJumpOpen}
        onClose={() => setQuickJumpOpen(false)}
        onJump={handleJump}
      />

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
