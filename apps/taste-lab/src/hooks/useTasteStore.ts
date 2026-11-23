import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROJECT_THEMES } from '../data/themes';
import { compileTasteMarkdown } from '../lib/compileTaste';
import type { CraftDials, SpecimenDecision, SpecimenId, TasteProfile } from '../types/taste';

const LOCAL_STORAGE_KEY = 'taste-lab-profile-v1';

export const DEFAULT_PROFILE: TasteProfile = {
  version: '1.0.0',
  updatedAt: null,
  philosophy: {
    colorAbstracted: true,
    summary:
      'Colors are project-level semantic tokens. Taste governs geometry, surfaces, typography, spacing rhythm, motion physics, and interaction ergonomics.',
  },
  dials: {
    density: 'balanced',
    baseRadius: 10,
    concentricRadii: true,
    borderStrength: 1,
    shadowDepth: 0.45,
    pressScale: 0.975,
    durationMs: 180,
    motionMode: 'spring',
    springStiffness: 420,
    springDamping: 32,
    fontPairing: 'geometric',
    tabularNums: true,
    trackingTightness: 'subtle',
  },
  specimens: {},
  globalRules: {
    always: [
      'Abstract all colors behind semantic tokens (--surface-*, --ink-*, --border-*, --accent); never hardcode project hex colors in taste components.',
      'Compute nested border radii concentrically (inner = max(0, outer - padding)).',
      'Guard hover effects behind @media (hover: hover) and (pointer: fine).',
    ],
    never: [
      'Never scale elements in from scale(0); use subtle origin-aware scale (0.95 -> 1) with opacity.',
      'Never ship generic eyebrow badge pills, pulsing status dots without live telemetry, or arbitrary Tailwind pixel values.',
    ],
  },
};

function normalizeSpecimens(
  raw?: Record<string, Partial<SpecimenDecision>>
): Record<string, SpecimenDecision> {
  if (!raw) return {};
  const out: Record<string, SpecimenDecision> = {};
  for (const [key, val] of Object.entries(raw)) {
    if (!val) continue;
    const selected = Array.isArray(val.selectedIds)
      ? Array.from(new Set(val.selectedIds))
      : val.winnerId
        ? [val.winnerId]
        : [];
    const primary = val.winnerId && selected.includes(val.winnerId)
      ? val.winnerId
      : selected[0];
    out[key] = {
      winnerId: primary,
      selectedIds: selected,
      rejectedIds: Array.isArray(val.rejectedIds) ? val.rejectedIds : [],
      whyNote: val.whyNote ?? '',
      neverNote: val.neverNote ?? '',
      updatedAt: val.updatedAt ?? new Date().toISOString(),
    };
  }
  return out;
}

export function useTasteStore() {
  const [profile, setProfile] = useState<TasteProfile>(DEFAULT_PROFILE);
  const [themeId, setThemeId] = useState<string>('mono-light');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'local-only'>('idle');
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<number | null>(null);

  // Initial load from repo taste/taste.json via Vite middleware (fallback to localStorage)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/taste');
        if (res.ok) {
          const data = (await res.json()) as TasteProfile;
          if (!cancelled && data?.dials) {
            setProfile({
              ...DEFAULT_PROFILE,
              ...data,
              dials: { ...DEFAULT_PROFILE.dials, ...data.dials },
              specimens: normalizeSpecimens(data.specimens),
              globalRules: data.globalRules ?? DEFAULT_PROFILE.globalRules,
            });
            setSaveState('saved');
            setLoaded(true);
            return;
          }
        }
      } catch {
        // Ignore and fall back to localStorage
      }
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached && !cancelled) {
          const parsed = JSON.parse(cached) as TasteProfile;
          setProfile({
            ...DEFAULT_PROFILE,
            ...parsed,
            specimens: normalizeSpecimens(parsed.specimens),
          });
          setSaveState('local-only');
        }
      } catch {
        // Ignore storage errors
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist changes to taste/taste.json (debounced) + localStorage
  const persist = useCallback((next: TasteProfile) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = window.setTimeout(async () => {
      try {
        const res = await fetch('/api/taste', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        });
        setSaveState(res.ok ? 'saved' : 'local-only');
      } catch {
        setSaveState('local-only');
      }
    }, 320);
  }, []);

  // Apply semantic project theme tokens to :root
  useEffect(() => {
    const theme = PROJECT_THEMES.find((t) => t.id === themeId) ?? PROJECT_THEMES[0];
    const root = document.documentElement;
    for (const [key, val] of Object.entries(theme.tokens)) {
      if (key === 'colorScheme') {
        root.style.colorScheme = val;
      } else {
        root.style.setProperty(key, val);
      }
    }
  }, [themeId]);

  // Apply live Craft Dials to :root CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    const { dials } = profile;

    const padCard = dials.density === 'compact' ? 14 : dials.density === 'airy' ? 24 : 18;
    const gap = dials.density === 'compact' ? 8 : dials.density === 'airy' ? 16 : 12;
    const controlH = dials.density === 'compact' ? 32 : dials.density === 'airy' ? 42 : 36;
    const innerRadius = dials.concentricRadii
      ? Math.max(0, dials.baseRadius - 4)
      : dials.baseRadius;

    const sansMap: Record<CraftDials['fontPairing'], string> = {
      geometric: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
      editorial: "'Inter', -apple-system, sans-serif",
      system: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif",
      'mono-accent': "'Inter', -apple-system, sans-serif",
    };

    const displayMap: Record<CraftDials['fontPairing'], string> = {
      geometric: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
      editorial: "'Instrument Serif', Georgia, serif",
      system: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      'mono-accent': "'Inter', -apple-system, sans-serif",
    };

    const trackingMap: Record<CraftDials['trackingTightness'], string> = {
      none: '0em',
      subtle: '-0.02em',
      tight: '-0.038em',
    };

    root.style.setProperty('--dial-radius', `${dials.baseRadius}px`);
    root.style.setProperty('--dial-radius-inner', `${innerRadius}px`);
    root.style.setProperty('--dial-border-strength', String(dials.borderStrength));
    root.style.setProperty('--dial-shadow-depth', String(dials.shadowDepth));
    root.style.setProperty('--dial-press-scale', String(dials.pressScale));
    root.style.setProperty(
      '--dial-duration',
      dials.motionMode === 'instant' ? '0ms' : `${dials.durationMs}ms`
    );
    root.style.setProperty('--dial-font-sans', sansMap[dials.fontPairing]);
    root.style.setProperty('--dial-font-display', displayMap[dials.fontPairing]);
    root.style.setProperty('--dial-tracking-display', trackingMap[dials.trackingTightness]);
    root.style.setProperty('--dial-pad-card', `${padCard}px`);
    root.style.setProperty('--dial-gap', `${gap}px`);
    root.style.setProperty('--dial-control-h', `${controlH}px`);
  }, [profile]);

  const updateDials = useCallback(
    (patch: Partial<CraftDials>) => {
      setProfile((prev) => {
        const next: TasteProfile = {
          ...prev,
          updatedAt: new Date().toISOString(),
          dials: { ...prev.dials, ...patch },
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetDials = useCallback(() => {
    updateDials(DEFAULT_PROFILE.dials);
  }, [updateDials]);

  const updateSpecimenDecision = useCallback(
    (specimenId: SpecimenId, updater: (prev: SpecimenDecision) => SpecimenDecision) => {
      setProfile((prev) => {
        const raw = prev.specimens[specimenId];
        const existing: SpecimenDecision = raw
          ? {
              ...raw,
              selectedIds: Array.isArray(raw.selectedIds)
                ? raw.selectedIds
                : raw.winnerId
                  ? [raw.winnerId]
                  : [],
            }
          : {
              selectedIds: [],
              rejectedIds: [],
              whyNote: '',
              neverNote: '',
              updatedAt: new Date().toISOString(),
            };
        const updated = {
          ...updater(existing),
          updatedAt: new Date().toISOString(),
        };
        const next: TasteProfile = {
          ...prev,
          updatedAt: new Date().toISOString(),
          specimens: {
            ...prev.specimens,
            [specimenId]: updated,
          },
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const compiledMarkdown = useMemo(() => compileTasteMarkdown(profile), [profile]);

  const writeTasteMarkdown = useCallback(async () => {
    const res = await fetch('/api/compile-md', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown: compiledMarkdown }),
    });
    return res.ok;
  }, [compiledMarkdown]);

  return {
    profile,
    loaded,
    themeId,
    setThemeId,
    saveState,
    updateDials,
    resetDials,
    updateSpecimenDecision,
    compiledMarkdown,
    writeTasteMarkdown,
  };
}
