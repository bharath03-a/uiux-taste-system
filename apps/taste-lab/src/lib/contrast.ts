export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface ContrastMetrics {
  wcag: number;
  apca: number; // signed APCA W3 Lc (-108..+106)
  apcaAbs: number;
  passesAA: boolean; // >= 4.5
  passesAAA: boolean; // >= 7.0
  passesLarge: boolean; // >= 3.0
  passesApcaBody: boolean; // |Lc| >= 60
  passesApcaLarge: boolean; // |Lc| >= 45
}

export interface TokenPairAudit {
  id: string;
  label: string;
  usage: string;
  fgToken: string;
  bgToken: string;
  fgHex: string;
  bgHex: string;
  minWcag: number;
  minApca: number;
  metrics: ContrastMetrics;
  pass: boolean;
  suggestedFgHex: string | null;
}

export function parseHex(hex: string): RgbColor | null {
  const cleaned = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return {
      r: parseInt(cleaned[0] + cleaned[0], 16),
      g: parseInt(cleaned[1] + cleaned[1], 16),
      b: parseInt(cleaned[2] + cleaned[2], 16),
    };
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return {
      r: parseInt(cleaned.slice(0, 2), 16),
      g: parseInt(cleaned.slice(2, 4), 16),
      b: parseInt(cleaned.slice(4, 6), 16),
    };
  }
  return null;
}

export function toHex({ r, g, b }: RgbColor): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('')
  );
}

/** WCAG 2.1 relative luminance (sRGB) */
export function relativeLuminance({ r, g, b }: RgbColor): number {
  const linearize = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG 2.1 contrast ratio (1..21) */
export function wcagContrast(fg: RgbColor, bg: RgbColor): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * APCA W3 0.0.98G-4g perceptual lightness contrast (Lc).
 * Positive Lc = dark text on light background.
 * Negative Lc = light text on dark background.
 */
export function apcaContrast(text: RgbColor, bg: RgbColor): number {
  const sRGBtoY = ({ r, g, b }: RgbColor) =>
    0.2126729 * Math.pow(r / 255, 2.4) +
    0.7151522 * Math.pow(g / 255, 2.4) +
    0.072175 * Math.pow(b / 255, 2.4);

  const blkThrs = 0.022;
  const blkClmp = 1.414;
  const softClamp = (y: number) =>
    y > blkThrs ? y : y + Math.pow(blkThrs - y, blkClmp);

  const Ytxt = softClamp(sRGBtoY(text));
  const Ybg = softClamp(sRGBtoY(bg));

  if (Math.abs(Ybg - Ytxt) < 0.0005) return 0;

  let sapc = 0;
  if (Ybg > Ytxt) {
    // Normal polarity: dark text on light bg
    sapc = (Math.pow(Ybg, 0.56) - Math.pow(Ytxt, 0.57)) * 1.14;
    if (sapc < 0.1) return 0;
    return (sapc - 0.027) * 100;
  } else {
    // Reverse polarity: light text on dark bg
    sapc = (Math.pow(Ybg, 0.65) - Math.pow(Ytxt, 0.62)) * 1.14;
    if (sapc > -0.1) return 0;
    return (sapc + 0.027) * 100;
  }
}

export function evaluateContrast(fgHex: string, bgHex: string): ContrastMetrics | null {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) return null;
  const wcag = wcagContrast(fg, bg);
  const apca = apcaContrast(fg, bg);
  const apcaAbs = Math.abs(apca);
  return {
    wcag,
    apca,
    apcaAbs,
    passesAA: wcag >= 4.5,
    passesAAA: wcag >= 7.0,
    passesLarge: wcag >= 3.0,
    passesApcaBody: apcaAbs >= 60,
    passesApcaLarge: apcaAbs >= 45,
  };
}

function rgbToHsl({ r, g, b }: RgbColor): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return { h, s, l };
}

function hslToRgb({ h, s, l }: { h: number; s: number; l: number }): RgbColor {
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

/**
 * Finds the nearest lightness-adjusted foreground hex along the same hue/saturation
 * that satisfies both WCAG ratio and APCA |Lc| targets against bgHex.
 */
export function suggestPassingForeground(
  fgHex: string,
  bgHex: string,
  minWcag = 4.5,
  minApca = 60,
): string | null {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) return null;

  const hsl = rgbToHsl(fg);
  const bgLum = relativeLuminance(bg);
  // Try moving away from background luminance first, then opposite direction as fallback
  const directions = bgLum > 0.35 ? [-1, 1] : [1, -1];

  for (const dir of directions) {
    for (let step = 1; step <= 100; step++) {
      const nextL = Math.max(0, Math.min(1, hsl.l + dir * (step / 100)));
      const candidate = hslToRgb({ h: hsl.h, s: hsl.s, l: nextL });
      const w = wcagContrast(candidate, bg);
      const a = Math.abs(apcaContrast(candidate, bg));
      if (w >= minWcag && a >= minApca) {
        return toHex(candidate);
      }
      if ((dir < 0 && nextL === 0) || (dir > 0 && nextL === 1)) break;
    }
  }
  const darkW = wcagContrast({ r: 17, g: 17, b: 19 }, bg);
  const lightW = wcagContrast({ r: 255, g: 255, b: 255 }, bg);
  return darkW >= lightW ? '#111113' : '#ffffff';
}

export function bestInkForSurface(surfaceHex: string): '#ffffff' | '#111113' {
  const s = parseHex(surfaceHex);
  if (!s) return '#ffffff';
  const whiteRatio = wcagContrast({ r: 255, g: 255, b: 255 }, s);
  const darkRatio = wcagContrast({ r: 17, g: 17, b: 19 }, s);
  return whiteRatio >= darkRatio ? '#ffffff' : '#111113';
}

interface PairSpec {
  id: string;
  label: string;
  usage: string;
  fgToken: string;
  bgToken: string;
  minWcag: number;
  minApca: number;
}

const SEMANTIC_PAIR_SPECS: PairSpec[] = [
  {
    id: 'ink1-s0',
    label: 'Primary text on Canvas',
    usage: 'Headings & primary content on page background',
    fgToken: '--ink-1',
    bgToken: '--surface-0',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'ink1-s1',
    label: 'Primary text on Card',
    usage: 'Card titles, form values, table cells',
    fgToken: '--ink-1',
    bgToken: '--surface-1',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'ink1-s2',
    label: 'Primary text on Elevated',
    usage: 'Active tabs, pills, hovered rows',
    fgToken: '--ink-1',
    bgToken: '--surface-2',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'ink2-s1',
    label: 'Secondary text on Card',
    usage: 'Body copy, descriptions, table secondary columns',
    fgToken: '--ink-2',
    bgToken: '--surface-1',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'ink2-s0',
    label: 'Secondary text on Canvas',
    usage: 'Subtitles and helper copy on page canvas',
    fgToken: '--ink-2',
    bgToken: '--surface-0',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'ink3-s1',
    label: 'Muted label on Card',
    usage: 'Timestamps, placeholders, mono badges (UI / >=3:1)',
    fgToken: '--ink-3',
    bgToken: '--surface-1',
    minWcag: 3.0,
    minApca: 45,
  },
  {
    id: 'accent-ink',
    label: 'Primary CTA text on Accent',
    usage: 'Primary button labels, selected badges',
    fgToken: '--accent-ink',
    bgToken: '--accent',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'accent-s1',
    label: 'Accent control on Card',
    usage: 'Active indicators, links, focus & status accents',
    fgToken: '--accent',
    bgToken: '--surface-1',
    minWcag: 3.0,
    minApca: 45,
  },
  {
    id: 'danger-ink',
    label: 'Destructive CTA text',
    usage: 'Delete / confirmation primary buttons',
    fgToken: '--danger-ink',
    bgToken: '--danger',
    minWcag: 4.5,
    minApca: 60,
  },
  {
    id: 'danger-s1',
    label: 'Error text on Card',
    usage: 'Inline validation messages and destructive text',
    fgToken: '--danger',
    bgToken: '--surface-1',
    minWcag: 4.5,
    minApca: 55,
  },
  {
    id: 'success-s1',
    label: 'Success indicator on Card',
    usage: 'Saved badges, positive deltas, check icons',
    fgToken: '--success',
    bgToken: '--surface-1',
    minWcag: 3.0,
    minApca: 45,
  },
];

export function auditThemeTokens(tokens: Record<string, string>): TokenPairAudit[] {
  const results: TokenPairAudit[] = [];
  for (const spec of SEMANTIC_PAIR_SPECS) {
    const fgHex = tokens[spec.fgToken];
    const bgHex = tokens[spec.bgToken];
    if (!fgHex || !bgHex) continue;
    const metrics = evaluateContrast(fgHex, bgHex);
    if (!metrics) continue;
    const pass = metrics.wcag >= spec.minWcag && metrics.apcaAbs >= spec.minApca;
    results.push({
      ...spec,
      fgHex,
      bgHex,
      metrics,
      pass,
      suggestedFgHex: pass
        ? null
        : suggestPassingForeground(fgHex, bgHex, spec.minWcag, spec.minApca),
    });
  }
  return results;
}
