import { SPECIMENS } from '../data/specimens';
import type { TasteProfile } from '../types/taste';

export function compileTasteMarkdown(profile: TasteProfile): string {
  const { dials, specimens, globalRules } = profile;
  const densityMap = {
    compact: 'Compact (control height 32px, card padding 14px, gap 8px)',
    balanced: 'Balanced (control height 36px, card padding 18px, gap 12px)',
    airy: 'Airy (control height 42px, card padding 24px, gap 16px)',
  };

  const fontMap = {
    geometric: 'Geometric Sans (`Plus Jakarta Sans` / `Inter`) + `JetBrains Mono` for code/IDs',
    editorial: 'Editorial Contrast (`Instrument Serif` display + `Inter` UI body + `JetBrains Mono`)',
    system: 'Native System Stack (`-apple-system`, `SF Pro`, `Segoe UI`) for zero-latency OS craft',
    'mono-accent': 'Precision Sans (`Inter`) + `JetBrains Mono` for metrics, timestamps, and metadata',
  };

  const motionDesc =
    dials.motionMode === 'instant'
      ? 'Instant / zero-delay state changes for high-frequency controls; animate only spatial orientation.'
      : dials.motionMode === 'spring'
        ? `Physics spring (\`stiffness: ${dials.springStiffness}\`, \`damping: ${dials.springDamping}\`), interruptible, sub-300ms settling.`
        : `Crisp ease-out (\`cubic-bezier(0.22, 1, 0.36, 1)\`, \`${dials.durationMs}ms\`), never ease-in for entrances.`;

  const lines: string[] = [
    '# TASTE.md — Personal Color-Agnostic UI/UX Taste Specification',
    '',
    '> **Compiled from Taste Lab.** This specification defines structural, spatial, typographic, behavioral, and motion taste. **Colors are intentionally abstracted** to project-level semantic tokens (`--surface-*`, `--ink-*`, `--border-*`, `--accent`, `--danger`) so this taste transfers cleanly across any brand or app.',
    '',
    `Last updated: ${profile.updatedAt ?? 'Not yet calibrated'}`,
    '',
    '---',
    '',
    '## 1. Color Abstraction Contract',
    '',
    '- **Never hardcode brand hex/RGB values** inside reusable components or taste rules.',
    '- Bind all UI chrome to semantic CSS variables: `--surface-0`, `--surface-1`, `--surface-2`, `--surface-recessed`, `--ink-1`, `--ink-2`, `--ink-3`, `--border-subtle`, `--border-strong`, `--accent`, `--accent-ink`, `--danger`.',
    '- Borders must use translucent RGB opacity (`rgba(var(--border-rgb), alpha)`) so hairlines automatically adapt to light, dark, and tinted project themes.',
    '- Enforce WCAG AA contrast (4.5:1 body, 3:1 large/UI controls) deterministically against whichever project theme is supplied.',
    '',
    '## 2. Calibrated Craft Dials',
    '',
    `| Dimension | Value |`,
    `| :--- | :--- |`,
    `| **Spatial Density** | ${densityMap[dials.density]} |`,
    `| **Base Radius** | \`${dials.baseRadius}px\` (${dials.concentricRadii ? 'Concentric nesting enforced: `inner = max(0, outer - padding)`' : 'Uniform radius tokens'}) |`,
    `| **Border Strength** | \`${dials.borderStrength.toFixed(2)}x\` translucent hairline multiplier |`,
    `| **Shadow Depth** | \`${Math.round(dials.shadowDepth * 100)}%\` ambient/contact shadow intensity |`,
    `| **Typography Pairing** | ${fontMap[dials.fontPairing]} |`,
    `| **Display Tracking** | \`${dials.trackingTightness}\` · Tabular numerals: \`${dials.tabularNums ? 'enabled (always for numbers/metrics)' : 'default'}\` |`,
    `| **Press Compression** | \`scale(${dials.pressScale})\` on active press |`,
    `| **Motion Physics** | ${motionDesc} |`,
    '',
    '## 3. Calibrated Component & UX Decisions',
    '',
  ];

  const pickedCount = SPECIMENS.filter((s) => {
    const dec = specimens[s.id];
    return Boolean(dec?.winnerId || (dec?.selectedIds && dec.selectedIds.length > 0));
  }).length;

  if (pickedCount === 0) {
    lines.push('_No specimen patterns selected yet. Open Taste Lab, interact with each batch, and click **Select** on one or more patterns to populate this section._');
    lines.push('');
  } else {
    for (const spec of SPECIMENS) {
      const dec = specimens[spec.id];
      const selectedIds = dec?.selectedIds?.length
        ? dec.selectedIds
        : dec?.winnerId
          ? [dec.winnerId]
          : [];
      if (!dec || (selectedIds.length === 0 && !dec.whyNote && !dec.neverNote && dec.rejectedIds.length === 0)) {
        continue;
      }
      const primaryId = dec.winnerId && selectedIds.includes(dec.winnerId) ? dec.winnerId : selectedIds[0];
      const primary = spec.variants.find((v) => v.id === primaryId);
      const secondary = spec.variants.filter((v) => selectedIds.includes(v.id) && v.id !== primaryId);
      const rejected = spec.variants.filter((v) => dec.rejectedIds.includes(v.id));

      lines.push(`### ${spec.title}`);
      if (primary) {
        lines.push(`- **Primary Default:** **${primary.name}** — *${primary.archetype}*`);
        lines.push(`  - *Traits:* ${primary.traits.join(' · ')}`);
      }
      if (secondary.length > 0) {
        lines.push(`- **Approved Secondary Patterns (${secondary.length}):**`);
        for (const sec of secondary) {
          lines.push(`  - **${sec.name}** — *${sec.archetype}* (${sec.traits.join(', ')})`);
        }
      }
      if (rejected.length > 0) {
        lines.push(`- **Explicitly Rejected:** ${rejected.map((r) => r.name).join(', ')}`);
      }
      if (dec.whyNote.trim()) {
        lines.push(`- **Why This Fits My Taste:** ${dec.whyNote.trim()}`);
      }
      if (dec.neverNote.trim()) {
        lines.push(`- **Never Do This:** ${dec.neverNote.trim()}`);
      }
      lines.push('');
    }
  }

  lines.push('## 4. Non-Negotiable Global Rules');
  lines.push('');
  lines.push('### Always');
  for (const rule of globalRules.always) {
    lines.push(`- ${rule}`);
  }
  lines.push('');
  lines.push('### Never');
  for (const rule of globalRules.never) {
    lines.push(`- ${rule}`);
  }
  lines.push('');
  lines.push('## 5. Color Contrast & Accessibility Rules (WCAG 2.1 + APCA Lc)');
  lines.push('');
  lines.push('- **Never guess contrast by eye**, especially on dark surfaces, tinted badges, or custom brand accents.');
  lines.push('- **Body & Interactive Labels (`--ink-1`, `--ink-2`, `--accent-ink` on `--accent`, `--danger-ink` on `--danger`):** Minimum **WCAG 4.5:1** AND **APCA `|Lc| >= 60`** (target AAA `7.0:1` / `Lc 75` for long-form prose).');
  lines.push('- **Large Headings, Icons, Borders, Focus Rings & Muted Metadata (`--ink-3`, `--accent` on `--surface-1`, `--success`):** Minimum **WCAG 3.0:1** AND **APCA `|Lc| >= 45`**. Never use `--ink-3` for critical body text or error messages.');
  lines.push('- **Tinted Soft Surfaces (`--accent-soft`, `--danger-soft`):** Always pair soft tinted backgrounds with full-contrast foreground text (`--ink-1`, `--accent`, or `--danger`), never white-on-pastel or muted-on-tinted.');
  lines.push('- **Dark Mode Polarity:** Light text on dark surfaces requires slightly higher APCA perceptual headroom and translucent white borders (`rgba(255, 255, 255, 0.08–0.16)`) instead of dark shadows.');
  lines.push('- **Deterministic Gate:** Run `npm run lint:taste` (or `npx taste-lint`) after every UI or theme change to verify zero failing contrast pairs and zero raw hex leaks.');
  lines.push('');
  lines.push('## 6. Registry-First & MCP Tooling Protocol');
  lines.push('');
  lines.push('- **Never hand-roll complex primitives from scratch** when an accessible, source-owned registry component exists.');
  lines.push('- **Query installed registries & MCP servers first:**');
  lines.push('  1. **Foundations:** `shadcn MCP` + `@coss` (Base UI + Tailwind v4) for dialogs, drawers, popovers, forms, tabs.');
  lines.push('  2. **Complex SaaS & Specialists:** `@diceui` (faceted filters, action bar, stepper, combobox), `@kibo-ui` (kanban, dropzone, calendars), `Sonner` (toasts), `cmdk` (command palette), `NumberFlow` (tabular metrics).');
  lines.push('  3. **Motion & Expressive Blocks (sparingly):** `@motion-primitives`, `@cult-ui`, `@react-bits`, `21st MCP` (search & preview before installing).');
  lines.push('  4. **Verification MCPs:** `Axe MCP` (WCAG / ARIA audit), `Playwright MCP` / `Chrome DevTools MCP` (390px + 1440px live layout & computed contrast verification), `Storybook MCP` & `Figma MCP` (when working in an existing design system).');
  lines.push('- **Restyle every installed component immediately** onto the semantic token contract (`--surface-*`, `--ink-*`, `--border-*`, `--accent`) and calibrated Craft Dials above.');
  lines.push('');

  return lines.join('\n');
}
