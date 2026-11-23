import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import type {
  CraftDials,
  DensityMode,
  FontPairing,
  MotionMode,
  TrackingTightness,
} from '../types/taste';

interface DialPanelProps {
  dials: CraftDials;
  onChange: (patch: Partial<CraftDials>) => void;
  onReset: () => void;
}

const STYLE_PRESETS: { id: string; label: string; dials: Partial<CraftDials> }[] = [
  {
    id: 'linear',
    label: 'Linear',
    dials: {
      density: 'balanced',
      baseRadius: 10,
      concentricRadii: true,
      borderStrength: 1,
      shadowDepth: 0.4,
      pressScale: 0.975,
      motionMode: 'spring',
      springStiffness: 420,
      springDamping: 32,
      fontPairing: 'mono-accent',
      trackingTightness: 'subtle',
    },
  },
  {
    id: 'calm-os',
    label: 'Calm OS',
    dials: {
      density: 'airy',
      baseRadius: 14,
      concentricRadii: true,
      borderStrength: 0.75,
      shadowDepth: 0.65,
      pressScale: 0.97,
      motionMode: 'spring',
      springStiffness: 340,
      springDamping: 30,
      fontPairing: 'system',
      trackingTightness: 'subtle',
    },
  },
  {
    id: 'swiss',
    label: 'Swiss Sharp',
    dials: {
      density: 'balanced',
      baseRadius: 4,
      concentricRadii: true,
      borderStrength: 1.35,
      shadowDepth: 0.1,
      pressScale: 0.985,
      motionMode: 'ease-out',
      durationMs: 140,
      fontPairing: 'swiss-grotesk',
      trackingTightness: 'tight',
    },
  },
  {
    id: 'editorial',
    label: 'Editorial',
    dials: {
      density: 'airy',
      baseRadius: 8,
      concentricRadii: true,
      borderStrength: 0.9,
      shadowDepth: 0.25,
      pressScale: 0.98,
      motionMode: 'ease-out',
      durationMs: 200,
      fontPairing: 'editorial',
      trackingTightness: 'none',
    },
  },
  {
    id: 'dense-ops',
    label: 'Dense Ops',
    dials: {
      density: 'compact',
      baseRadius: 6,
      concentricRadii: true,
      borderStrength: 1.2,
      shadowDepth: 0.2,
      pressScale: 0.99,
      motionMode: 'instant',
      durationMs: 110,
      fontPairing: 'dense-ops',
      trackingTightness: 'subtle',
    },
  },
  {
    id: 'warm',
    label: 'Warm Craft',
    dials: {
      density: 'airy',
      baseRadius: 16,
      concentricRadii: true,
      borderStrength: 0.85,
      shadowDepth: 0.75,
      pressScale: 0.965,
      motionMode: 'spring',
      springStiffness: 380,
      springDamping: 28,
      fontPairing: 'humanist-warm',
      trackingTightness: 'subtle',
    },
  },
];

const FONT_OPTIONS: [FontPairing, string][] = [
  ['geometric', 'Geometric'],
  ['editorial', 'Editorial'],
  ['system', 'System OS'],
  ['mono-accent', 'Mono Accent'],
  ['swiss-grotesk', 'Swiss Grotesk'],
  ['humanist-warm', 'Warm Serif'],
  ['dense-ops', 'IBM Plex Ops'],
  ['neo-studio', 'Studio Outfit'],
  ['newsprint-docs', 'Newsreader'],
  ['terminal-craft', 'Terminal Mono'],
];

export function DialPanel({ dials, onChange, onReset }: DialPanelProps) {
  return (
    <aside
      className="flex h-full w-full flex-col overflow-y-auto"
      style={{
        background: 'var(--surface-1)',
        borderLeft: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5" style={{ color: 'var(--ink-2)' }} />
          <span className="text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
            Live Craft Dials
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="craft-pressable craft-focus inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
          style={{
            background: 'var(--surface-0)',
            color: 'var(--ink-2)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-5 p-4 text-[12px]">
        {/* 1-Click Style Archetypes */}
        <Section title="Style Archetypes">
          <div className="grid grid-cols-2 gap-1.5">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChange(preset.dials)}
                className="craft-pressable craft-focus rounded-md px-2.5 py-1.5 text-left text-[11px] font-medium"
                style={{
                  background: 'var(--surface-0)',
                  color: 'var(--ink-1)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Spatial & Geometry */}
        <Section title="Geometry & Rhythm">
          <SegmentedChoice<DensityMode>
            label="Spatial Density"
            value={dials.density}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'balanced', label: 'Balanced' },
              { value: 'airy', label: 'Airy' },
            ]}
            onChange={(density) => onChange({ density })}
          />

          <RangeControl
            label="Base Radius"
            value={dials.baseRadius}
            min={0}
            max={20}
            step={1}
            unit="px"
            onChange={(baseRadius) => onChange({ baseRadius })}
          />

          <ToggleRow
            label="Concentric nested radii"
            hint="inner = max(0, outer - pad)"
            checked={dials.concentricRadii}
            onChange={(concentricRadii) => onChange({ concentricRadii })}
          />

          <RangeControl
            label="Hairline Border Strength"
            value={dials.borderStrength}
            min={0.4}
            max={2}
            step={0.1}
            unit="x"
            onChange={(borderStrength) => onChange({ borderStrength })}
          />

          <RangeControl
            label="Shadow Depth"
            value={Math.round(dials.shadowDepth * 100)}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(pct) => onChange({ shadowDepth: pct / 100 })}
          />
        </Section>

        {/* Typography */}
        <Section title="Typography Posture (10 Pairings)">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
              Font Pairing
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {FONT_OPTIONS.map(([val, label]) => {
                const active = dials.fontPairing === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange({ fontPairing: val })}
                    className="craft-pressable craft-focus truncate rounded-md px-2 py-1.5 text-left text-[11px] font-medium"
                    style={{
                      background: active ? 'var(--accent)' : 'var(--surface-0)',
                      color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                      border: `1px solid ${active ? 'transparent' : 'var(--border-subtle)'}`,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <SegmentedChoice<TrackingTightness>
            label="Display Tracking"
            value={dials.trackingTightness}
            options={[
              { value: 'none', label: '0' },
              { value: 'subtle', label: '-0.02em' },
              { value: 'tight', label: '-0.038em' },
            ]}
            onChange={(trackingTightness) => onChange({ trackingTightness })}
          />

          <ToggleRow
            label="Tabular numerals"
            hint="Stops live numbers from jittering"
            checked={dials.tabularNums}
            onChange={(tabularNums) => onChange({ tabularNums })}
          />
        </Section>

        {/* Motion & Tactile */}
        <Section title="Motion & Tactile Physics">
          <SegmentedChoice<MotionMode>
            label="Transition Model"
            value={dials.motionMode}
            options={[
              { value: 'spring', label: 'Spring' },
              { value: 'ease-out', label: 'Ease-Out' },
              { value: 'instant', label: 'Instant' },
            ]}
            onChange={(motionMode) => onChange({ motionMode })}
          />

          <RangeControl
            label="Press Compression"
            value={dials.pressScale}
            min={0.94}
            max={1}
            step={0.005}
            unit=""
            format={(v) => v.toFixed(3)}
            onChange={(pressScale) => onChange({ pressScale })}
          />

          {dials.motionMode === 'spring' && (
            <>
              <RangeControl
                label="Spring Stiffness"
                value={dials.springStiffness}
                min={200}
                max={700}
                step={20}
                unit=""
                onChange={(springStiffness) => onChange({ springStiffness })}
              />
              <RangeControl
                label="Spring Damping"
                value={dials.springDamping}
                min={18}
                max={48}
                step={1}
                unit=""
                onChange={(springDamping) => onChange({ springDamping })}
              />
            </>
          )}

          {dials.motionMode === 'ease-out' && (
            <RangeControl
              label="Duration"
              value={dials.durationMs}
              min={80}
              max={320}
              step={10}
              unit="ms"
              onChange={(durationMs) => onChange({ durationMs })}
            />
          )}
        </Section>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="text-[10.5px] font-semibold uppercase tracking-[0.06em]"
        style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  format?: (v: number) => string;
  onChange: (val: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
          {label}
        </span>
        <span
          className="tabular-nums-auto text-[11px]"
          style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          {format ? format(value) : value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer accent-[var(--accent)]"
      />
    </label>
  );
}

function SegmentedChoice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
        {label}
      </span>
      <div
        className="grid gap-1 rounded-md p-0.5"
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
          background: 'var(--surface-recessed)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className="craft-pressable craft-focus rounded-[5px] py-1 text-[11px] font-medium"
              style={{
                background: active ? 'var(--surface-1)' : 'transparent',
                color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                boxShadow: active ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="craft-focus flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left"
      style={{
        background: 'var(--surface-0)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="min-w-0">
        <div className="text-[11.5px] font-medium" style={{ color: 'var(--ink-1)' }}>
          {label}
        </div>
        <div className="text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
          {hint}
        </div>
      </div>
      <span
        className="relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors"
        style={{
          background: checked ? 'var(--accent)' : 'var(--surface-2)',
        }}
      >
        <span
          className="inline-block h-3 w-3 rounded-full transition-transform"
          style={{
            background: checked ? 'var(--accent-ink)' : 'var(--ink-3)',
            transform: checked ? 'translateX(14px)' : 'translateX(2px)',
          }}
        />
      </span>
    </button>
  );
}
