import { useId, useState } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { Layers, ShieldCheck, Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

const TAB_ITEMS = [
  {
    value: 'overview',
    label: 'Overview',
    breakLabel: 'Workspace Overview & Telemetry',
    count: 12,
    breakCount: 14820,
    icon: Layers,
    content: 'Surface tokens, type rhythm, and motion curves stay locked across every screen.',
  },
  {
    value: 'tokens',
    label: 'Tokens',
    breakLabel: 'Semantic Design Tokens (W3C)',
    count: 24,
    breakCount: 904,
    icon: Sliders,
    content: 'Project colors bind only at the root CSS layer—zero hex values inside components.',
  },
  {
    value: 'rules',
    label: 'Guardrails',
    breakLabel: 'Deterministic Lint & CI Gates',
    count: 4,
    breakCount: 62,
    icon: ShieldCheck,
    content: 'PostToolUse hooks catch drift, arbitrary pixels, and contrast regressions in <40ms.',
  },
];

export function TabsSegmentedSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [value, setValue] = useState('overview');
  const [hovered, setHovered] = useState<string | null>(null);
  const layoutScope = useId();

  const outerR = Math.max(4, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(2, outerR - 3) : Math.max(3, outerR - 2);
  const tabH = dials.density === 'compact' ? 30 : dials.density === 'airy' ? 38 : 34;

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? {
            type: 'spring' as const,
            stiffness: dials.springStiffness,
            damping: dials.springDamping,
            mass: 0.85,
          }
        : {
            duration: dials.durationMs / 1000,
            ease: [0.22, 1, 0.36, 1] as const,
          };

  const cardShellStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${dials.baseRadius}px`,
    padding: `${dials.density === 'compact' ? 14 : dials.density === 'airy' ? 20 : 18}px`,
  };

  // 07. Vertical Inspector Rail
  if (variantId === 'vertical-rail') {
    return (
      <div style={cardShellStyle}>
        <Tabs.Root
          value={value}
          orientation={mobilePreview ? 'horizontal' : 'vertical'}
          onValueChange={(next) => setValue(String(next))}
          className={`grid gap-4 ${mobilePreview ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-[150px_1fr]'}`}
        >
          <Tabs.List
            className={`relative flex ${mobilePreview ? 'flex-row overflow-x-auto pb-1' : 'flex-col'}`}
            style={{
              gap: '2px',
              borderLeft: mobilePreview ? 'none' : '1px solid var(--border-subtle)',
              borderBottom: mobilePreview ? '1px solid var(--border-subtle)' : 'none',
              paddingLeft: mobilePreview ? '0px' : '8px',
            }}
          >
            {TAB_ITEMS.map((item) => {
              const active = value === item.value;
              return (
                <Tabs.Tab
                  key={item.value}
                  value={item.value}
                  className="craft-focus relative z-10 flex shrink-0 cursor-pointer items-center justify-between gap-2 px-2.5 text-left text-[12.5px] font-medium transition-colors"
                  style={{
                    height: `${tabH}px`,
                    color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                    borderRadius: `${innerR}px`,
                  }}
                >
                  {active && (
                    <>
                      <motion.span
                        layoutId={`v-bg-${layoutScope}`}
                        transition={transition}
                        className="absolute inset-0 -z-10"
                        style={{
                          background: 'var(--surface-0)',
                          borderRadius: `${innerR}px`,
                        }}
                      />
                      {!mobilePreview && (
                        <motion.span
                          layoutId={`v-bar-${layoutScope}`}
                          transition={transition}
                          className="absolute top-1.5 bottom-1.5 left-[-9px] w-[2px] rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                    </>
                  )}
                  <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          <div className="min-w-0">
            {TAB_ITEMS.map((item) => (
              <Tabs.Panel
                key={item.value}
                value={item.value}
                className="text-pretty-craft rounded-lg p-3 text-[12.5px] leading-relaxed"
                style={{
                  background: 'var(--surface-0)',
                  color: 'var(--ink-2)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: `${innerR}px`,
                }}
              >
                {item.content}
              </Tabs.Panel>
            ))}
          </div>
        </Tabs.Root>
      </div>
    );
  }

  // 06. Dual-Track Hover + Active Glider (Vercel / Linear)
  if (variantId === 'hover-glider-underline') {
    return (
      <div style={cardShellStyle}>
        <Tabs.Root value={value} onValueChange={(next) => setValue(String(next))}>
          <Tabs.List
            onMouseLeave={() => setHovered(null)}
            className="relative flex overflow-x-auto pb-1.5"
            style={{
              borderBottom: '1px solid var(--border-subtle)',
              gap: '4px',
            }}
          >
            {TAB_ITEMS.map((item) => {
              const active = value === item.value;
              const isHover = hovered === item.value;
              return (
                <Tabs.Tab
                  key={item.value}
                  value={item.value}
                  onMouseEnter={() => setHovered(item.value)}
                  className="craft-focus relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-[12.5px] font-medium transition-colors"
                  style={{
                    height: `${tabH}px`,
                    color: active ? 'var(--ink-1)' : isHover ? 'var(--ink-2)' : 'var(--ink-3)',
                    borderRadius: `${innerR}px`,
                  }}
                >
                  {isHover && (
                    <motion.span
                      layoutId={`hover-wash-${layoutScope}`}
                      transition={transition}
                      className="absolute inset-0 -z-10"
                      style={{
                        background: 'var(--surface-2)',
                        borderRadius: `${innerR}px`,
                      }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId={`active-bar-${layoutScope}`}
                      transition={transition}
                      className="absolute right-2 bottom-[-7px] left-2 h-[2px] rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                  <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          {TAB_ITEMS.map((item) => (
            <Tabs.Panel
              key={item.value}
              value={item.value}
              className="mt-3 text-pretty-craft text-[12.5px] leading-relaxed"
              style={{ color: 'var(--ink-2)' }}
            >
              {item.content}
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    );
  }

  // 09. Joined Instrument Bar
  if (variantId === 'bordered-segmented-grid') {
    return (
      <div style={cardShellStyle}>
        <Tabs.Root value={value} onValueChange={(next) => setValue(String(next))}>
          <Tabs.List
            className="flex overflow-x-auto"
            style={{
              borderRadius: `${outerR}px`,
              border: '1px solid var(--border-subtle)',
              background: 'var(--surface-0)',
              overflow: 'hidden',
            }}
          >
            {TAB_ITEMS.map((item, idx) => {
              const active = value === item.value;
              return (
                <Tabs.Tab
                  key={item.value}
                  value={item.value}
                  className="craft-focus relative z-10 inline-flex flex-1 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap px-3 text-[12px] font-medium transition-colors"
                  style={{
                    height: `${tabH}px`,
                    color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                    borderLeft: idx > 0 ? '1px solid var(--border-subtle)' : 'none',
                    background: active ? 'var(--surface-1)' : 'transparent',
                    boxShadow: active
                      ? 'inset 0 -2px 0 var(--accent)'
                      : 'none',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          {TAB_ITEMS.map((item) => (
            <Tabs.Panel
              key={item.value}
              value={item.value}
              className="mt-3 text-pretty-craft text-[12.5px] leading-relaxed"
              style={{ color: 'var(--ink-2)' }}
            >
              {item.content}
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    );
  }

  // 05. High-Contrast Solid Pill, 08. Icon + Counter, 10. Quiet Editorial Dot, and original 01-04
  const isSolidPill = variantId === 'inverted-solid-pill';
  const isIconBadge = variantId === 'icon-count-badges';
  const isEditorialDot = variantId === 'minimal-dot-editorial';

  return (
    <div style={cardShellStyle}>
      <Tabs.Root value={value} onValueChange={(next) => setValue(String(next))}>
        <Tabs.List
          className="relative flex overflow-x-auto"
          style={
            variantId === 'segmented-spring'
              ? {
                  background: 'var(--surface-recessed)',
                  padding: '3px',
                  borderRadius: `${outerR}px`,
                  border: '1px solid var(--border-subtle)',
                  gap: '2px',
                }
              : isSolidPill
                ? {
                    background: 'var(--surface-0)',
                    padding: '3px',
                    borderRadius: '999px',
                    border: '1px solid var(--border-subtle)',
                    gap: '2px',
                  }
                : variantId === 'hairline-underline' || isIconBadge
                  ? {
                      borderBottom: '1px solid var(--border-subtle)',
                      gap: isIconBadge ? '14px' : '16px',
                    }
                  : variantId === 'bordered-folder'
                    ? {
                        gap: '4px',
                        borderBottom: '1px solid var(--border-subtle)',
                        paddingInline: '2px',
                      }
                    : isEditorialDot
                      ? {
                          gap: '18px',
                          paddingBottom: '8px',
                        }
                      : {
                          gap: '4px',
                        }
          }
        >
          {TAB_ITEMS.map((item) => {
            const active = value === item.value;
            const Icon = item.icon;
            return (
              <Tabs.Tab
                key={item.value}
                value={item.value}
                className="craft-focus relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-[12.5px] font-medium transition-colors"
                style={{
                  height: `${tabH}px`,
                  flex:
                    variantId === 'segmented-spring' || isSolidPill ? '1 1 0%' : '0 0 auto',
                  color: isSolidPill
                    ? active
                      ? 'var(--accent-ink)'
                      : 'var(--ink-2)'
                    : active
                      ? 'var(--ink-1)'
                      : 'var(--ink-3)',
                  fontWeight: isEditorialDot ? (active ? 600 : 400) : 500,
                  borderRadius: isSolidPill
                    ? '999px'
                    : variantId === 'hairline-underline' || isIconBadge || isEditorialDot
                      ? '4px'
                      : variantId === 'bordered-folder'
                        ? `${innerR}px ${innerR}px 0 0`
                        : `${innerR}px`,
                  paddingInline:
                    variantId === 'hairline-underline' || isIconBadge || isEditorialDot
                      ? '2px'
                      : '12px',
                  marginBottom: variantId === 'bordered-folder' ? '-1px' : '0px',
                }}
              >
                {active && variantId === 'segmented-spring' && (
                  <motion.span
                    layoutId={`indicator-${layoutScope}`}
                    transition={transition}
                    className="absolute inset-0 -z-10"
                    style={{
                      background: 'var(--surface-1)',
                      borderRadius: `${innerR}px`,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  />
                )}
                {active && isSolidPill && (
                  <motion.span
                    layoutId={`indicator-${layoutScope}`}
                    transition={transition}
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background: 'var(--accent)',
                    }}
                  />
                )}
                {active && (variantId === 'hairline-underline' || isIconBadge) && (
                  <motion.span
                    layoutId={`indicator-${layoutScope}`}
                    transition={transition}
                    className="absolute right-0 bottom-[-1px] left-0 h-[2px]"
                    style={{
                      background: 'var(--accent)',
                      borderRadius: '999px',
                    }}
                  />
                )}
                {active && variantId === 'floating-pill' && (
                  <motion.span
                    layoutId={`indicator-${layoutScope}`}
                    transition={transition}
                    className="absolute inset-0 -z-10"
                    style={{
                      background: 'var(--accent-soft)',
                      borderRadius: `${innerR}px`,
                    }}
                  />
                )}
                {active && variantId === 'bordered-folder' && (
                  <motion.span
                    layoutId={`indicator-${layoutScope}`}
                    transition={transition}
                    className="absolute inset-0 -z-10"
                    style={{
                      background: 'var(--surface-0)',
                      borderTop: '1px solid var(--border-strong)',
                      borderLeft: '1px solid var(--border-strong)',
                      borderRight: '1px solid var(--border-strong)',
                      borderBottom: '1px solid var(--surface-0)',
                      borderRadius: `${innerR}px ${innerR}px 0 0`,
                    }}
                  />
                )}
                {active && isEditorialDot && (
                  <motion.span
                    layoutId={`indicator-${layoutScope}`}
                    transition={transition}
                    className="absolute bottom-[-5px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                )}

                {isIconBadge && <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />}
                <span className="truncate">{breakUi ? item.breakLabel : item.label}</span>
                {isIconBadge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10.5px] leading-none font-medium ${dials.tabularNums ? 'tabular-nums-auto' : ''}`}
                    style={{
                      background: active ? 'var(--accent)' : 'var(--surface-2)',
                      color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
                      fontFamily: 'var(--dial-font-mono)',
                    }}
                  >
                    {breakUi ? item.breakCount.toLocaleString() : item.count}
                  </span>
                )}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {TAB_ITEMS.map((item) => (
          <Tabs.Panel
            key={item.value}
            value={item.value}
            className="text-pretty-craft text-[12.5px] leading-relaxed"
            style={{
              color: 'var(--ink-2)',
              marginTop: variantId === 'bordered-folder' ? '0px' : '12px',
              padding: variantId === 'bordered-folder' ? '12px' : '2px 0 0',
              background: variantId === 'bordered-folder' ? 'var(--surface-0)' : 'transparent',
              border:
                variantId === 'bordered-folder'
                  ? '1px solid var(--border-subtle)'
                  : 'none',
              borderTop: variantId === 'bordered-folder' ? 'none' : undefined,
              borderRadius:
                variantId === 'bordered-folder' ? `0 0 ${innerR}px ${innerR}px` : undefined,
            }}
          >
            {item.content}
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  );
}
