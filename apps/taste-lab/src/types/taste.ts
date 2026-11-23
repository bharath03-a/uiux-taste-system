export type DensityMode = 'compact' | 'balanced' | 'airy';
export type MotionMode = 'spring' | 'ease-out' | 'instant';
export type FontPairing =
  | 'geometric'
  | 'editorial'
  | 'system'
  | 'mono-accent'
  | 'swiss-grotesk'
  | 'humanist-warm'
  | 'dense-ops'
  | 'neo-studio'
  | 'newsprint-docs'
  | 'terminal-craft';
export type TrackingTightness = 'none' | 'subtle' | 'tight';

export interface CraftDials {
  density: DensityMode;
  baseRadius: number; // px (0 - 20)
  concentricRadii: boolean;
  borderStrength: number; // multiplier 0.4 - 2.0
  shadowDepth: number; // 0 - 1
  pressScale: number; // 0.94 - 1.0
  durationMs: number; // 80 - 320
  motionMode: MotionMode;
  springStiffness: number; // 200 - 700
  springDamping: number; // 18 - 48
  fontPairing: FontPairing;
  tabularNums: boolean;
  trackingTightness: TrackingTightness;
}

export interface SpecimenDecision {
  winnerId?: string;
  selectedIds: string[];
  rejectedIds: string[];
  whyNote: string;
  neverNote: string;
  updatedAt: string;
}

export interface TasteProfile {
  version: string;
  updatedAt: string | null;
  philosophy: {
    colorAbstracted: boolean;
    summary: string;
  };
  dials: CraftDials;
  specimens: Record<string, SpecimenDecision>;
  globalRules: {
    always: string[];
    never: string[];
  };
}

export type SpecimenId =
  | 'surfaces'
  | 'typography'
  | 'buttons'
  | 'inputs'
  | 'tabs'
  | 'overlays'
  | 'popovers'
  | 'command-palette'
  | 'toasts'
  | 'app-shell'
  | 'data-tables'
  | 'resilience-states'
  | 'ai-streaming'
  | 'ai-thinking-tools'
  | 'ai-hitl-diffs'
  | 'cards-metrics'
  | 'onboarding-wizards'
  | 'rich-pickers-uploads'
  | 'lists-feeds-details'
  | 'charts-analytics'
  | 'auth-security'
  | 'navigation-headers'
  | 'badges-avatars-chips'
  | 'heroes-landing-blocks'
  | 'commerce-checkout'
  | 'risk-adjustment-coding'
  | 'document-annotation-review'
  | 'micro-interactions-motion'
  | 'canvas-spatial-workflows'
  | 'dashboards-ops-cockpits';

export interface VariantMeta {
  id: string;
  name: string;
  archetype: string;
  summary: string;
  traits: string[];
}

export interface SpecimenDefinition {
  id: SpecimenId;
  batch: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  subtitle: string;
  question: string;
  variants: VariantMeta[];
}

export interface SpecimenContext {
  dials: CraftDials;
  breakUi: boolean;
  mobilePreview: boolean;
}
