import type { SpecimenDefinition } from '../types/taste';

export const SPECIMENS: SpecimenDefinition[] = [
  {
    id: 'surfaces',
    batch: 1,
    title: 'Surfaces & Elevation',
    subtitle: 'How containers separate from canvas without relying on brand colors.',
    question:
      'When two layers meet (card on canvas, nested panel inside card), which physical separation feels most natural to your eye across both light and dark themes?',
    variants: [
      {
        id: 'hairline-architectural',
        name: 'Hairline Architectural',
        archetype: '1px translucent border · zero drop shadow',
        summary:
          'Crisp geometric framing inspired by Swiss grids and Linear. Hierarchy comes from surface step + hairline opacity.',
        traits: ['Translucent 1px border', 'Concentric inner radius', 'Zero elevation blur'],
      },
      {
        id: 'layered-tactile',
        name: 'Layered Tactile Shadow',
        archetype: 'Multi-stop ambient shadow + hairline ring',
        summary:
          'Subtle physical lift using a tight contact ring plus soft directional shadow. Feels touchable like physical stationery.',
        traits: ['Contact ring + soft ambient', 'Crisp top highlight feel', 'Clear depth hierarchy'],
      },
      {
        id: 'recessed-well',
        name: 'Recessed Well + Floating Surface',
        archetype: 'Sunken tray hosting elevated inner cards',
        summary:
          'Groups related controls inside a slightly recessed tray (Apple/macOS style) so inner cards read cleanly without heavy lines.',
        traits: ['Recessed outer tray', 'Elevated inner cards', 'Low visual noise'],
      },
      {
        id: 'quiet-tonal',
        name: 'Quiet Tonal Shift',
        archetype: 'Borderless surface contrast · spacing-led',
        summary:
          'Groups content through pure surface tone and generous whitespace—no boxes inside boxes, minimal chrome.',
        traits: ['Borderless separation', 'Whitespace grouping', 'Editorial calm'],
      },
    ],
  },
  {
    id: 'typography',
    batch: 1,
    title: 'Typography & Information Rhythm',
    subtitle: 'Hierarchy, tracking, numeric alignment, and whitespace-to-chrome ratio.',
    question:
      'Compare how the exact same metric card and activity summary read. Which typographic posture matches the products you want to ship?',
    variants: [
      {
        id: 'tight-engineered',
        name: 'Tight Engineered',
        archetype: 'Linear / Vercel precision · negative display tracking',
        summary:
          'Crisp weight contrast (600 vs 400), tight display tracking, tabular numerals, understated secondary metadata.',
        traits: ['Tight heading tracking', 'Tabular numerals', 'Restrained muted labels'],
      },
      {
        id: 'editorial-contrast',
        name: 'Editorial Contrast',
        archetype: 'Serif display voice + crisp sans utility body',
        summary:
          'Pairs expressive editorial display typography with clinical sans-serif UI controls—memorable without decorative clutter.',
        traits: ['Serif headline contrast', 'Generous leading', 'Calm narrative pacing'],
      },
      {
        id: 'technical-mono',
        name: 'Technical Mono-Accented',
        archetype: 'Sans body + monospace metadata & metrics',
        summary:
          'Developer-native rhythm where counts, timestamps, status codes, and keys switch to monospace for instant scannability.',
        traits: ['Mono metrics & IDs', 'High scan speed', 'Structured key-value feel'],
      },
      {
        id: 'spacious-minimal',
        name: 'Spacious Calm',
        archetype: 'Lighter weights · scale-driven hierarchy',
        summary:
          'Relies on size jumps and generous breathing room rather than heavy bold weights or dividers.',
        traits: ['Scale over weight', 'Extra vertical rhythm', 'Zero visual tension'],
      },
    ],
  },
  {
    id: 'buttons',
    batch: 1,
    title: 'Buttons & Tactile Controls',
    subtitle: 'Press physics, focus rings, loading transitions, and destructive hierarchy.',
    question:
      'Click, hold, tab-focus, and trigger loading on every variant below. Which tactile response and visual weight feel right under your cursor?',
    variants: [
      {
        id: 'precision-solid',
        name: 'Precision Solid + Ghost',
        archetype: 'High-contrast primary · hairline secondary · clean ghost',
        summary:
          'Sharp silhouette, crisp press scale, inline spinner swap without layout shift, clear single primary action.',
        traits: ['Zero width shift on load', 'Subtle press compression', 'Strict 1-primary rule'],
      },
      {
        id: 'tactile-bevel',
        name: 'Tactile Micro-Bevel',
        archetype: 'Subtle top specular inset + physical depth',
        summary:
          'Subtle top highlight and bottom contact shadow give controls a physical keycap feel without looking skeuomorphic.',
        traits: ['Inset top highlight', 'Keycap press feedback', 'Rich tactile affordance'],
      },
      {
        id: 'soft-pill',
        name: 'Soft Pill Continuum',
        archetype: 'Full-pill radius · tinted secondary fill',
        summary:
          'Approachable consumer-grade silhouette (Apple / iOS web) with soft translucent secondary fills and rounded geometry.',
        traits: ['Full pill geometry', 'Soft tinted secondary', 'Friendly warmth'],
      },
      {
        id: 'architectural-sharp',
        name: 'Architectural Sharp',
        archetype: 'Near-zero radius · uppercase micro-labels / mono',
        summary:
          'Utilitarian, instrument-panel control feel—instant feedback, crisp borders, zero softness.',
        traits: ['Tight corner radius', 'Instrument-like crispness', 'Fastest perceived click'],
      },
    ],
  },
  {
    id: 'inputs',
    batch: 1,
    title: 'Inputs & Form Ergonomics',
    subtitle: 'Label geometry, focus choreography, inline validation, and error recovery.',
    question:
      'Type, tab between fields, and trigger validation (try Break-UI mode too!). Which form layout and feedback pattern feels clearest and calmest?',
    variants: [
      {
        id: 'stacked-crisp',
        name: 'Stacked Crisp Surface',
        archetype: 'Top label · crisp 1px border · subtle focus halo',
        summary:
          'Timeless top-aligned labels with clear helper text, semantic error callout below field, and calm double-ring focus.',
        traits: ['Fastest vertical scan', 'Clear error placement', 'Zero label jump'],
      },
      {
        id: 'recessed-filled',
        name: 'Recessed Filled Field',
        archetype: 'Sunken soft surface · elevates on focus',
        summary:
          'Low-chrome filled input that blends quietly at rest and illuminates with a crisp border when focused.',
        traits: ['Quiet at rest', 'Clear active elevation', 'Low border clutter'],
      },
      {
        id: 'inset-label',
        name: 'Inset Compound Field',
        archetype: 'Label tucked inside tall field · single cohesive box',
        summary:
          'Inspired by Stripe & fintech craft—label and value live inside one generous container, keeping tall forms clean.',
        traits: ['Generous hit area', 'Compact visual rhythm', 'Unified field frame'],
      },
      {
        id: 'inline-settings',
        name: 'Horizontal Settings Row',
        archetype: 'Split label/description left · control right',
        summary:
          'Built for dense product settings & SaaS dashboards—groups label, helper, and input into scannable horizontal rows.',
        traits: ['SaaS settings native', 'High information density', 'Responsive stack on 390px'],
      },
      {
        id: 'floating-label',
        name: 'Floating Kinetic Label',
        archetype: 'Label elevates from placeholder into top frame on focus',
        summary:
          'Saves vertical height while preserving label visibility after typing, driven by your live motion physics.',
        traits: ['Zero vertical waste', 'Smooth label lift', 'Clear empty vs filled'],
      },
      {
        id: 'minimal-underline',
        name: 'Editorial Underline Rule',
        archetype: 'Zero box chrome · center-out focus underline',
        summary:
          'Strips away bounding boxes in favor of pure typography resting on a crisp hairline rule that illuminates on focus.',
        traits: ['Zero border box', 'Center-out focus rule', 'Editorial lightness'],
      },
      {
        id: 'prefix-addon-group',
        name: 'Compound Prefix + Action Group',
        archetype: 'Attached URL prefix · input · inline copy action',
        summary:
          'Unifies static context, editable value, and a quick action inside one concentric frame sharing a single focus ring.',
        traits: ['Unified focus halo', 'Attached context prefix', 'Inline action ergonomics'],
      },
      {
        id: 'inline-editable-ghost',
        name: 'Ghost Click-to-Edit',
        archetype: 'Plain typography at rest · becomes input on click',
        summary:
          'Linear/Notion-style invisible form: reads cleanly like text until clicked, with Enter/Esc commit choreography.',
        traits: ['Zero resting chrome', 'Direct manipulation', 'Enter/Esc keyboard flow'],
      },
      {
        id: 'segmented-card-group',
        name: 'Fused Hairline Fieldset',
        archetype: 'Multi-field stack · shared outer radius · 1px dividers',
        summary:
          'Stripe/iOS-style grouped fields sharing one crisp outer container so multi-input forms read as one calm object.',
        traits: ['Single outer frame', 'Active row elevation', 'Eliminates double borders'],
      },
      {
        id: 'command-token-input',
        name: 'Inline Chip / Tag Composer',
        archetype: 'Live tag pills + cursor input · Enter to add, Backspace to pop',
        summary:
          'Tests rich multi-value form ergonomics—press Enter or comma to commit tokens and feel concentric chip nesting.',
        traits: ['Concentric chip radii', 'Keyboard-native tagging', 'Graceful wrapping'],
      },
    ],
  },
  {
    id: 'tabs',
    batch: 1,
    title: 'Tabs & Segmented Controls',
    subtitle: 'Shared-layout physics, keyboard arrow navigation, and active-state clarity.',
    question:
      'Click rapidly across tabs and use Left/Right arrow keys (real Base UI + Motion). Which indicator motion and container style matches your taste?',
    variants: [
      {
        id: 'segmented-spring',
        name: 'Segmented Inset Track',
        archetype: 'Recessed pill track · gliding elevated thumb',
        summary:
          'MacOS/iOS-grade segmented control where a crisp elevated thumb glides behind the active label with interruptible physics.',
        traits: ['Interruptible glide', 'Concentric inner radius', 'High active clarity'],
      },
      {
        id: 'hairline-underline',
        name: 'Architectural Underline',
        archetype: 'Full-width hairline rule · gliding 2px indicator',
        summary:
          'Zero-box navigation bar ideal for page headers and settings panels—clean horizontal baseline with gliding active bar.',
        traits: ['Zero extra chrome', 'Page-level navigation', 'Scales to many tabs'],
      },
      {
        id: 'floating-pill',
        name: 'Borderless Floating Pill',
        archetype: 'No track · soft accent-tinted active pill',
        summary:
          'Ultra-light filter bar where only the selected option carries a quiet background tint, keeping dense toolbars airy.',
        traits: ['Lowest visual weight', 'Great for toolbars/filters', 'Clean hover preview'],
      },
      {
        id: 'bordered-folder',
        name: 'Crafted Raised Tab',
        archetype: 'Tactile raised tab merging into content surface',
        summary:
          'Classic workstation precision—active tab visually connects directly into the panel below with subtle elevation.',
        traits: ['Strong panel ownership', 'Unambiguous active tab', 'Workstation feel'],
      },
      {
        id: 'inverted-solid-pill',
        name: 'High-Contrast Solid Pill',
        archetype: 'Hairline capsule · solid inverted accent indicator',
        summary:
          'Maximum active/inactive contrast across every light and dark theme with a bold gliding inverted capsule.',
        traits: ['Instant scannability', 'Guaranteed contrast', 'Crisp capsule framing'],
      },
      {
        id: 'hover-glider-underline',
        name: 'Dual-Track Hover + Active Glider',
        archetype: 'Vercel/Linear ghost hover wash + sharp bottom rule',
        summary:
          'Separates pointer exploration (gliding soft wash) from committed selection (crisp underline) for effortless browsing.',
        traits: ['Pointer-tracking hover', 'Two-layer feedback', 'Signature dev-tool feel'],
      },
      {
        id: 'vertical-rail',
        name: 'Vertical Inspector Rail',
        archetype: 'Left stacked rail · gliding 2px left accent bar',
        summary:
          'Built for settings views and multi-pane apps—keeps navigation scannable vertically while preserving generous content width.',
        traits: ['Settings-native layout', 'Gliding vertical bar', 'Scales to 8+ sections'],
      },
      {
        id: 'icon-count-badges',
        name: 'Icon + Tabular Counter Tabs',
        archetype: '14px icon · label · live tabular numeric badge',
        summary:
          'Product-grade filter tabs (inbox, issues, queues) where icons anchor meaning and numeric pills stay rock-steady.',
        traits: ['Tabular count badges', 'Semantic icon anchors', 'Dense queue friendly'],
      },
      {
        id: 'bordered-segmented-grid',
        name: 'Joined Instrument Bar',
        archetype: '1px hairline dividers · equal-width joined segments',
        summary:
          'Precision toolbar switch (Day | Week | Month) with crisp internal dividers and tactile active fill.',
        traits: ['Zero wasted padding', 'Toolbar native', 'Instrument precision'],
      },
      {
        id: 'minimal-dot-editorial',
        name: 'Quiet Editorial Dot',
        archetype: 'No boxes · weight shift + gliding 4px micro-dot',
        summary:
          'Ultra-restrained typographic navigation where only contrast and a single gliding point mark the active view.',
        traits: ['Maximum calm', 'Micro-dot physics', 'Zero container noise'],
      },
    ],
  },
  {
    id: 'overlays',
    batch: 2,
    title: 'Dialog vs. Sheet / Drawer',
    subtitle: 'Modal interruption budget, spatial entry origin, and mobile thumb ergonomics.',
    question:
      'Open each interactive overlay below (try 390px mobile and Break-UI too). Which layering model, backdrop restraint, and dismissal ergonomics fit your products?',
    variants: [
      {
        id: 'centered-crisp-modal',
        name: 'Centered Architectural Dialog',
        archetype: 'Hairline frame · 0.96 -> 1 spring scale · crisp footer',
        summary:
          'High-focus centered modal with restrained backdrop dim, concentric padding, and unmistakable primary/cancel separation.',
        traits: ['0.96 -> 1 origin scale', 'Zero blur muddiness', 'Clear action hierarchy'],
      },
      {
        id: 'side-inspector-sheet',
        name: 'Right Slide-Over Sheet',
        archetype: 'Edge-docked drawer · preserves canvas spatial context',
        summary:
          'Slides in smoothly from the right edge so users inspect or edit details without losing sight of the workspace behind.',
        traits: ['Keeps page context', 'Great for multi-field edits', 'Full-height scroll body'],
      },
      {
        id: 'bottom-draggable-drawer',
        name: 'Bottom Sheet / Vaul Drawer',
        archetype: 'Bottom rise · drag handle · thumb-zone actions',
        summary:
          'Mobile-native drawer ergonomics with grab handle, rounded top geometry, and effortless bottom-reach confirmation.',
        traits: ['Mobile-first ergonomics', 'Tactile grab handle', 'Natural vertical exit'],
      },
      {
        id: 'inline-morph-confirm',
        name: 'Anchored Pop-Confirm (No Backdrop)',
        archetype: 'Zero full-screen dim · confirms right where you clicked',
        summary:
          'Eliminates heavy modal interruption for quick confirmations—keeps the user’s eyes locked on the trigger.',
        traits: ['Zero full-screen flash', 'Lowest friction', 'Origin-aware pop'],
      },
      {
        id: 'sticky-header-wizard',
        name: 'Structured Multi-Step Modal',
        archetype: 'Pinned header/stepper · scrollable body · pinned footer',
        summary:
          'Handles dense multi-step creation flows cleanly—header progress and footer actions never scroll out of view.',
        traits: ['Step progress clarity', 'Pinned footer actions', 'Overflow-proof body'],
      },
      {
        id: 'frosted-tactile-dialog',
        name: 'Frosted Backdrop + Tactile Bevel',
        archetype: 'Subtle backdrop blur · inset top specular highlight',
        summary:
          'Pairs calm optical depth with physical bevel framing—feels like a native macOS HUD floating above the app.',
        traits: ['Optical depth separation', 'Keycap-style specular edge', 'Calm focus isolation'],
      },
      {
        id: 'command-top-drop',
        name: 'Top-Anchored Sheet Drop',
        archetype: 'Drops from upper-third · minimal eye travel from top bars',
        summary:
          'Inspired by macOS window sheets—slides gently from the header chrome rather than dead center.',
        traits: ['Upper-third focal point', 'Header-connected drop', 'Fast vertical dismissal'],
      },
      {
        id: 'detached-floating-sheet',
        name: 'Floating Inset Side Drawer',
        archetype: 'Detached 10px margin · all-round concentric radius',
        summary:
          'Modern Arc/Linear floating panel: leaves breathing room around all 4 edges so it reads as an elevated card.',
        traits: ['4-edge floating margin', 'Concentric rounded corners', 'Airy visual framing'],
      },
      {
        id: 'split-media-dialog',
        name: 'Two-Column Split Modal',
        archetype: 'Left context summary rail · right action & form panel',
        summary:
          'Separates explanation/impact summary on the left from the decision or input controls on the right.',
        traits: ['High scannability', 'Great for upgrades & approvals', 'Clean spatial balance'],
      },
      {
        id: 'full-bleed-focus-takeover',
        name: 'Calm Full-Canvas Focus Sheet',
        archetype: 'Full workspace overlay · slim Esc bar · centered column',
        summary:
          'Replaces cramped modals for long-form creation or settings—gives complex flows full breathing room.',
        traits: ['Zero cramped scrolling', 'Distraction-free focus', 'Single Esc exit'],
      },
    ],
  },
  {
    id: 'popovers',
    batch: 2,
    title: 'Popovers & Menus',
    subtitle: 'Origin-aware motion, keyboard shortcuts, drill-down nesting, and filter ergonomics.',
    question:
      'Click triggers, toggle filters, and navigate submenus. Which menu density, shortcut alignment, and popover choreography feel sharpest?',
    variants: [
      {
        id: 'precision-command-menu',
        name: 'Precision Hairline Menu',
        archetype: 'Grouped sections · icons · right-aligned mono shortcuts',
        summary:
          'Linear/Raycast-grade dropdown menu with tight row padding, hairline dividers, and a separated destructive zone.',
        traits: ['Mono shortcut alignment', 'Clear destructive zone', 'Origin-aware pop'],
      },
      {
        id: 'rich-description-menu',
        name: 'Rich Option Picker',
        archetype: 'Icon badge · bold title · concise 1-line rationale',
        summary:
          'Designed for meaningful choices (permissions, model selection, deploy targets) where a single label isn’t enough.',
        traits: ['Self-documenting choices', 'Clear active check', 'Zero ambiguity'],
      },
      {
        id: 'filter-popover',
        name: 'Searchable Filter Popover',
        archetype: 'Inline filter input · multi-select checkboxes · live count',
        summary:
          'Data-dense SaaS filter control—type to narrow options immediately and clear selections in one click.',
        traits: ['Instant keyboard filter', 'Tabular match count', '1-click reset'],
      },
      {
        id: 'drilldown-submenu',
        name: 'Drill-Down Breadcrumb Menu',
        archetype: 'Inline horizontal slide · back header (no hover traps)',
        summary:
          'Replaces fragile hover-triggered nested flyouts with a rock-solid sliding subview that works identically on touch and trackpad.',
        traits: ['Zero diagonal hover traps', 'Smooth horizontal slide', 'Touch & keyboard safe'],
      },
      {
        id: 'floating-action-toolbar',
        name: 'Contextual Floating Action Pill',
        archetype: 'Compact horizontal icon + label bar for active selection',
        summary:
          'Appears inline above selected items—keeps frequent actions one click away without opening a full menu.',
        traits: ['Zero menu depth', 'Selection-aware count', 'Fastest repeat clicks'],
      },
      {
        id: 'quick-settings-popover',
        name: 'Compact Inspector Popover',
        archetype: 'Inline switches + segmented control in a tight card',
        summary:
          'View-options popover (density, grouping, toggles) that updates the canvas live without a modal Save button.',
        traits: ['Live-apply toggles', 'Concentric card layout', 'Zero Save ceremony'],
      },
      {
        id: 'hover-preview-card',
        name: 'Entity Preview Hover Card',
        archetype: 'GitHub/Linear peek card · status · key stats · 1 action',
        summary:
          'Shows rich entity context on hover or click without navigating away from the current table or thread.',
        traits: ['Zero navigation cost', 'High-signal summary', 'Tabular micro-stats'],
      },
      {
        id: 'grid-swatch-picker',
        name: 'Structured Icon / Mode Grid',
        archetype: '3x2 tactile tile grid inside concentric popover',
        summary:
          'Replaces long vertical lists for visual choices (view layouts, priorities, workspace icons, templates).',
        traits: ['Fast visual scanning', 'Compact vertical height', 'Tactile active ring'],
      },
      {
        id: 'split-button-menu',
        name: 'Split Primary Action + Caret Menu',
        archetype: 'Primary bevel button · hairline-divided alternate menu',
        summary:
          'Keeps the 90% action one click away while tucking secondary variants (`Deploy staging`, `Schedule`) neatly beside it.',
        traits: ['1-click default speed', 'Hairline button split', 'Clean secondary modes'],
      },
      {
        id: 'context-right-click-menu',
        name: 'Right-Click Context Menu',
        archetype: 'True pointer-anchored right-click menu anywhere in surface',
        summary:
          'Desktop-class direct manipulation: right-click anywhere inside the canvas to spawn actions right under the cursor.',
        traits: ['Desktop-native UX', 'Cursor-anchored origin', 'Zero resting clutter'],
      },
    ],
  },
  {
    id: 'command-palette',
    batch: 2,
    title: 'Command Palette (cmdk UX)',
    subtitle: 'Keyboard-first discovery, scoped navigation, preview panes, and shortcut ergonomics.',
    question:
      'Type to filter, use Up/Down arrows, and hit Enter inside each palette. Which keyboard command architecture feels fastest and cleanest?',
    variants: [
      {
        id: 'linear-grouped-palette',
        name: 'Linear Grouped Switcher',
        archetype: 'Clean search header · grouped rows · shortcut keycaps',
        summary:
          'The benchmark SaaS command palette: crisp hairline rows, quiet section labels, and subtle keyboard legend footer.',
        traits: ['Zero visual clutter', 'Instant arrow selection', 'Right-aligned shortcuts'],
      },
      {
        id: 'raycast-split-preview',
        name: 'Split Command + Live Preview',
        archetype: 'Left command list · right contextual detail inspector',
        summary:
          'Shows metadata, description, and shortcut anatomy for the highlighted item before you commit—ideal for power tools.',
        traits: ['Look-before-leap preview', 'Rich metadata context', 'Power-user native'],
      },
      {
        id: 'scoped-pill-palette',
        name: 'Scoped Breadcrumb Palette',
        archetype: 'Inline entity chip in search bar · Backspace pops scope',
        summary:
          'Drill into a workspace, project, or user directly inside the search input—Backspace cleanly steps up one level.',
        traits: ['Nested entity search', 'Inline scope pill', 'Natural Backspace pop'],
      },
      {
        id: 'minimal-spotlight',
        name: 'Quiet Floating Spotlight',
        archetype: 'Generous search bar · zero footer chrome · calm list',
        summary:
          'Strips away group headers and keyboard legends—just a crisp input and high-signal matches with maximum breathing room.',
        traits: ['Maximum restraint', 'Large quiet input', 'Zero footer noise'],
      },
      {
        id: 'inline-workspace-bar',
        name: 'Embedded Header Command Bar',
        archetype: 'Docked inline jump bar · expands results cleanly below',
        summary:
          'Always-discoverable command search built directly into the app chrome—teaches keyboard workflows without hiding them.',
        traits: ['High discoverability', 'No modal context jump', 'Slash-key friendly'],
      },
      {
        id: 'pinned-hybrid-palette',
        name: 'Pinned Quick-Actions + List',
        archetype: 'Top 3 tactile action tiles · searchable list beneath',
        summary:
          'Surfaces your highest-frequency actions as immediate 1-click tiles when empty, then collapses into pure search results on type.',
        traits: ['Zero-query utility', 'Adaptive on typing', 'Great for daily workflows'],
      },
      {
        id: 'multi-step-action-runner',
        name: 'Inline Parameter / Argument Runner',
        archetype: 'Select command -> shifts inline into argument input',
        summary:
          'Executes parameterized actions (`Rename`, `Invite`, `Tag`) without ever leaving the command bar for a separate form.',
        traits: ['Zero modal handoff', 'Inline argument step', 'Fast keyboard completion'],
      },
      {
        id: 'floating-bottom-dock-bar',
        name: 'Bottom-Anchored Command Pill',
        archetype: 'Subtle bottom floating bar · results expand upward',
        summary:
          'Modern AI-native dock posture: stays anchored near the bottom edge and reveals matches upward above the cursor.',
        traits: ['AI-native posture', 'Upward result reveal', 'Thumb & trackpad friendly'],
      },
      {
        id: 'tabbed-category-palette',
        name: 'Category-Filtered Command Bar',
        archetype: 'Search input + compact All / Actions / Navigation pills',
        summary:
          'Keeps massive workspaces noise-free by combining fuzzy search with 1-click category scoping tabs.',
        traits: ['Scales to 100+ items', 'Tabular result counts', 'Zero noisy scroll'],
      },
      {
        id: 'keyboard-chord-cheatsheet',
        name: 'Two-Column Chord Launcher',
        archetype: 'High-density 2-column action grid · sequential key chords',
        summary:
          'Power-user launcher built around memorable two-key chords (`G → T`, `C → P`) with high spatial density.',
        traits: ['Chord-first muscle memory', '2-column scannability', 'Instant keyboard rhythm'],
      },
    ],
  },
  {
    id: 'toasts',
    batch: 2,
    title: 'Toasts & Notifications (Sonner UX)',
    subtitle: 'Stacking physics, optimistic Undo ergonomics, diagnostic detail, and attention restraint.',
    question:
      'Fire multiple notifications in each card (click rapidly to test stacking & interruption). How should your apps communicate feedback without shouting?',
    variants: [
      {
        id: 'sonner-stacked-deck',
        name: 'Sonner Stacked Deck',
        archetype: 'Depth-scaled stack · expands on hover · interruptible',
        summary:
          'Keeps multiple notifications tidy in a physical 3-card deck that fans open on hover—never floods the viewport.',
        traits: ['Physical depth stack', 'Hover-to-expand deck', 'Interruptible transitions'],
      },
      {
        id: 'dynamic-top-pill',
        name: 'Top-Center Status Pill',
        archetype: 'Compact morphing capsule · spinner -> check state',
        summary:
          'Apple Dynamic Island-inspired quiet status pill that morphs smoothly from saving to saved without blocking corner content.',
        traits: ['Morphing state icon', 'Minimal screen footprint', 'Ultra-calm feedback'],
      },
      {
        id: 'optimistic-undo-bar',
        name: 'Optimistic Action + Undo Bar',
        archetype: 'Instant action · live countdown Undo button · no modal',
        summary:
          'Replaces nagging "Are you sure?" popups for reversible actions with instant execution plus a crisp Undo affordance.',
        traits: ['Zero confirm friction', 'Live Undo recovery', 'Best-in-class UX'],
      },
      {
        id: 'hairline-progress-toast',
        name: 'Hairline Toast + Timer Rule',
        archetype: 'Crisp architectural card · 2px bottom auto-dismiss bar',
        summary:
          'Makes auto-dismiss timing visually honest with a subtle hairline progress rule that pauses when you hover.',
        traits: ['Honest dismiss timing', 'Pause-on-hover safety', 'Architectural geometry'],
      },
      {
        id: 'inline-anchored-feedback',
        name: 'Local Inline Confirmation',
        archetype: 'Zero corner toast · feedback right beside the action',
        summary:
          'The most restrained pattern of all: confirms save/copy right where the user’s eyes already are, reserving toasts only for async events.',
        traits: ['Zero eye travel', 'No viewport clutter', 'Highest signal-to-noise'],
      },
      {
        id: 'diagnostic-expandable-toast',
        name: 'Expandable Diagnostic Toast',
        archetype: 'Calm summary · toggleable stack/request ID + copy',
        summary:
          'Engineered for real error recovery: stays terse by default while giving developers 1-click access to trace IDs and details.',
        traits: ['Progressive error detail', '1-click trace copy', 'Calm failure tone'],
      },
      {
        id: 'promise-lifecycle-toast',
        name: 'In-Place Promise Lifecycle Toast',
        archetype: 'Single toast morphs Pending -> Success or Failed (Retry)',
        summary:
          'Prevents toast spam during async jobs by updating one persistent card through loading, completion, or retry.',
        traits: ['Zero duplicate toasts', 'Inline retry recovery', 'Sonner promise native'],
      },
      {
        id: 'action-pair-toast',
        name: 'Two-Action Decision Toast',
        archetype: 'Non-blocking prompt with explicit Primary / Dismiss pair',
        summary:
          'Ideal for software updates, PR ready-to-merge, or incoming invites—actionable without freezing the workspace.',
        traits: ['Non-blocking decision', 'Clear primary CTA', 'Respects current task'],
      },
      {
        id: 'top-sticky-banner',
        name: 'Slim Top System Banner',
        archetype: 'Full-width hairline bar for persistent workspace states',
        summary:
          'Used strictly for ongoing global state (offline, read-only branch, unsaved draft) where ephemeral toasts fail.',
        traits: ['Persistent system truth', 'Zero auto-vanish risk', 'Slim vertical footprint'],
      },
      {
        id: 'batch-counter-digest',
        name: 'Coalesced Batch Digest Toast',
        archetype: 'Rapid events merge into one live tabular counter pill',
        summary:
          'Click repeatedly to watch 5+ rapid events coalesce cleanly into one calm notification instead of flooding the screen.',
        traits: ['Anti-spam coalescing', 'Live tabular counter', 'Calm high-frequency UX'],
      },
    ],
  },
  {
    id: 'app-shell',
    batch: 2,
    title: 'App Shell & Sidebar Navigation',
    subtitle: 'Canvas-to-chrome ratio, collapsible rail ergonomics, and multi-level hierarchy.',
    question:
      'Toggle collapse, switch pages, and test 390px mobile inside each live mini-shell. Which spatial skeleton feels like home for your apps?',
    variants: [
      {
        id: 'linear-collapsible-rail',
        name: 'Collapsible Hairline Sidebar',
        archetype: '1px vertical divider · icon-only collapse · count badges',
        summary:
          'Linear-style precision workspace shell with clean workspace header, icon + tabular count nav rows, and smooth rail collapse.',
        traits: ['Crisp 1px divider', 'Smooth rail collapse', 'High canvas efficiency'],
      },
      {
        id: 'floating-inset-canvas',
        name: 'Recessed Rail + Floating Inset Canvas',
        archetype: 'Quiet --surface-0 chrome · elevated rounded --surface-1 stage',
        summary:
          'Frames the primary workspace as a calm elevated card floating inside a quiet navigation bed (macOS / modern Linear feel).',
        traits: ['Clear stage focus', 'Concentric shell geometry', 'Low border noise'],
      },
      {
        id: 'top-bar-subnav',
        name: 'Horizontal Top Nav + Tab Strip',
        archetype: 'Zero left sidebar · project breadcrumb + icon-count subnav',
        summary:
          'Vercel dashboard architecture: dedicates 100% of horizontal width to content and tables with clean top-level tabs.',
        traits: ['100% horizontal width', 'Great for wide tables', 'Clean breadcrumb header'],
      },
      {
        id: 'dual-rail-ide',
        name: 'Slim App Rail + Contextual Sub-Panel',
        archetype: '44px icon rail · toggleable secondary tree sidebar',
        summary:
          'Scales gracefully for rich multi-module workspaces (IDE, design tool, multi-product suite) without deep dropdown nesting.',
        traits: ['Two-tier hierarchy', 'Instant module switching', 'Scales to complex apps'],
      },
      {
        id: 'command-first-minimal',
        name: 'Chromeless Breadcrumb + ⌘K Shell',
        archetype: 'Single slim header · breadcrumb trail · global command pill',
        summary:
          'Maximizes deep-work focus by eliminating persistent sidebars in favor of breadcrumb navigation and instant keyboard jump.',
        traits: ['Zero sidebar distraction', 'Deep-work focus', 'Keyboard-native UX'],
      },
      {
        id: 'hover-peek-drawer',
        name: 'Auto-Slim Rail with Pin / Peek',
        archetype: 'Icon rail by default · glides open on hover or pin',
        summary:
          'Gives you full-width reading space by default while keeping every section one smooth pointer hover away.',
        traits: ['Maximum reading width', 'Effortless hover peek', 'Optional lock-pin'],
      },
      {
        id: 'three-pane-master-detail',
        name: 'Three-Pane Master–Detail Shell',
        archetype: 'Nav rail · scrollable middle item list · detail canvas',
        summary:
          'The gold standard for inboxes, issue trackers, and triage queues—scan items and inspect details simultaneously.',
        traits: ['Zero back-and-forth nav', 'Instant list-to-detail', 'Triage native'],
      },
      {
        id: 'bottom-floating-dock',
        name: 'Minimal Canvas + Floating Bottom Dock',
        archetype: 'Full-bleed workspace · centered floating pill dock',
        summary:
          'Creative studio & modern web-app skeleton: maximizes vertical & horizontal canvas with tactile dock navigation.',
        traits: ['100% open canvas', 'Desktop & mobile unified', 'Tactile dock focus'],
      },
      {
        id: 'split-header-sidebar',
        name: 'Global Top Bar + Sub-Sidebar',
        archetype: 'Full-width org header above hairline sidebar + content',
        summary:
          'Clean separation between global context (org switcher, global search, account) and local workspace navigation.',
        traits: ['Clear global vs local', 'Multi-org ready', 'Predictable hierarchy'],
      },
      {
        id: 'collapsible-inspector-shell',
        name: 'Canvas + Toggleable Right Inspector',
        archetype: 'Focused main stage · collapsible right properties/AI panel',
        summary:
          'Engineered for editors, builders, and agentic apps where an inspector or AI copilot lives cleanly on the right.',
        traits: ['Editor & AI copilot ready', '1-click panel toggle', 'Balanced asymmetric layout'],
      },
    ],
  },
  // =========================================================================
  // BATCH 3 · DATA, RESILIENCE & AI-NATIVE UX
  // =========================================================================
  {
    id: 'data-tables',
    batch: 3,
    title: 'Tables, Filtering & Bulk Actions',
    subtitle: 'Tabular rhythm, sorting, inline editing, faceted filters, and high-density scannability.',
    question:
      'Sort columns, check rows, edit inline, and toggle 390px mobile inside each live table. Which data grid ergonomics belong in your system?',
    variants: [
      {
        id: 'hairline-sortable-table',
        name: 'Crisp Hairline Sortable Grid',
        archetype: '1px horizontal hairlines · mono sort headers · tabular nums',
        summary:
          'Clean architectural SaaS data table: zero vertical grid clutter, crisp sort arrows, and right-aligned tabular numerals.',
        traits: ['Zero vertical noise', 'Tabular-nums aligned', '1-click sort headers'],
      },
      {
        id: 'bulk-select-floating-bar',
        name: 'Multi-Select + Floating Bulk Bar',
        archetype: 'Row checkboxes · elevated action pill rises on selection',
        summary:
          'Keeps resting table chrome calm; checking 1+ rows springs a tactile bulk-action pill cleanly above the bottom edge.',
        traits: ['Zero resting toolbar clutter', 'Spring bulk action pill', 'Instant count badge'],
      },
      {
        id: 'faceted-filter-table',
        name: 'Faceted Filter Pills + Live Search',
        archetype: 'Inline search + status facet chips · live match count',
        summary:
          'Combines instant text filtering with clickable status facets and a 1-click reset when filters narrow the view.',
        traits: ['1-click facet toggle', 'Live filtered count', 'Instant clear-all'],
      },
      {
        id: 'inline-editable-cells',
        name: 'Click-to-Edit Inline Cells',
        archetype: 'Direct manipulation · click cell to edit · Enter commits',
        summary:
          'Eliminates modal forms for quick updates (titles, owners, status)—edit right inside the table with zero layout jump.',
        traits: ['Zero modal round-trip', 'In-place focus ring', 'Instant Enter commit'],
      },
      {
        id: 'expandable-row-detail',
        name: 'Accordion Row Inspection',
        archetype: 'Chevron disclosure · nested sub-panel for logs & metadata',
        summary:
          'Reveals secondary metadata, payloads, or audit history directly beneath a row without navigating away from the list.',
        traits: ['Preserves scroll context', 'Nested recessed surface', 'Fast multi-row compare'],
      },
      {
        id: 'sticky-action-hover-rows',
        name: 'Quiet Hover-Reveal Row Actions',
        archetype: 'Calm resting rows · tactile action buttons appear on hover',
        summary:
          'Eliminates repeating icon soup down every row by surfacing quick actions smoothly only for the focused/hovered row.',
        traits: ['Zero repeating icon noise', 'Pointer-aware reveal', 'Clean visual scanning'],
      },
      {
        id: 'grouped-status-table',
        name: 'Status-Grouped Collapsible Sections',
        archetype: 'Linear-style grouped bands · collapsible headers + counts',
        summary:
          'Clusters records into scannable lifecycle bands (`Active`, `Queued`) so priority jumps out immediately.',
        traits: ['Instant lifecycle grouping', 'Collapsible group bands', 'Tabular group counts'],
      },
      {
        id: 'compact-density-ledger',
        name: 'High-Density Financial / Ops Ledger',
        archetype: 'Tight row rhythm · zebra micro-tint · monospace deltas',
        summary:
          'Built for observability, billing, and metrics dashboards where scanning 10+ rows in a single glance matters most.',
        traits: ['Maximum rows per inch', 'Monospace precision', 'Right-aligned deltas'],
      },
      {
        id: 'table-card-responsive',
        name: 'Adaptive Table → Mobile Card Stack',
        archetype: 'Structured grid on desktop · clean stacked cards at 390px',
        summary:
          'Toggle `390px` above to watch the horizontal table reflow cleanly into scannable key-value cards with zero sideways scroll.',
        traits: ['Zero horizontal scroll trap', 'Clean 390px reflow', 'Preserves hierarchy'],
      },
      {
        id: 'pinned-summary-footer',
        name: 'Pinned Totals & Pagination Footer',
        archetype: 'Sticky aggregate summary row · compact page stepper',
        summary:
          'Anchors live column totals and keyboard-friendly pagination right at the table base so aggregates never scroll out of view.',
        traits: ['Live aggregate totals', 'Compact page controls', 'Clear row range info'],
      },
    ],
  },
  {
    id: 'resilience-states',
    batch: 3,
    title: 'Empty, Loading & Error States',
    subtitle: 'Structural skeletons, zero-to-one onboarding, calm failure recovery, and degraded-network honesty.',
    question:
      'Trigger loading, retry, and empty flows inside each card. How should your apps behave when data is missing, slow, or broken?',
    variants: [
      {
        id: 'structural-skeleton-shimmer',
        name: 'Geometry-Matched Structural Skeleton',
        archetype: 'Mirrors exact card/row layout · zero layout shift on load',
        summary:
          'Toggle Loaded vs Loading to verify 1:1 height and geometry fidelity—replaces jarring spinners with calm spatial anticipation.',
        traits: ['Zero CLS layout jump', 'Subtle pulse restraint', '1:1 geometry fidelity'],
      },
      {
        id: 'actionable-empty-state',
        name: 'Focused Empty State + 1 Primary CTA',
        archetype: 'Crisp hairline emblem · clear value copy · 1 decisive button',
        summary:
          'Turns a blank screen into a calm, confident starting point without cheesy stock illustrations or bloated paragraphs.',
        traits: ['Zero stock-art fluff', 'Single primary action', 'Quiet hairline frame'],
      },
      {
        id: 'starter-template-empty',
        name: 'Zero-to-One Starter Template Grid',
        archetype: '3 clickable starter blueprints inside empty workspace',
        summary:
          'Beats blank-canvas paralysis by letting users seed a real workspace in 1 click from curated presets.',
        traits: ['Instant first-run value', '1-click preset seeding', 'Concentric mini-cards'],
      },
      {
        id: 'inline-retry-error',
        name: 'Calm Inline Error + 1-Click Retry',
        archetype: 'Honest failure summary · diagnostic code · inline Retry',
        summary:
          'Recovers gracefully in-place with an explicit Retry action and mono error reference instead of a scary red dead end.',
        traits: ['Self-healing retry loop', 'Mono diagnostic code', 'Calm failure tone'],
      },
      {
        id: 'optimistic-stale-revalidating',
        name: 'Stale-While-Revalidating Hairline',
        archetype: 'Cached data stays interactive · 2px top hairline sync indicator',
        summary:
          'Never blanks out already-loaded content during refresh—streams a quiet 2px top sync rule while keeping data usable.',
        traits: ['Zero blank-screen flash', 'Always-interactive cache', 'Quiet 2px sync rule'],
      },
      {
        id: 'partial-section-fallback',
        name: 'Isolated Card Error Boundary',
        archetype: 'Healthy widgets stay live · failed slot degrades cleanly',
        summary:
          'Contains a single failing microservice to its own concentric card so the rest of the dashboard never crashes.',
        traits: ['Blast-radius containment', 'Independent widget retry', 'Resilient dashboard UX'],
      },
      {
        id: 'search-zero-results-reset',
        name: 'Zero-Match Search + 1-Click Reset',
        archetype: 'Echoes active query/filters · instant Clear Filters CTA',
        summary:
          'Tells the user *why* nothing matched (showing active filter chips) and offers a single click to restore results.',
        traits: ['Explains active filters', '1-click filter clear', 'Zero dead-end search'],
      },
      {
        id: 'progressive-stage-loader',
        name: 'Multi-Step Progress Checklist Loader',
        archetype: 'Named pipeline stages · live checkmarks + elapsed ms',
        summary:
          'For jobs >2s (builds, imports, indexing), replaces infinite spinners with honest step-by-step progress transparency.',
        traits: ['Honest multi-step status', 'Tabular elapsed time', 'Builds user trust'],
      },
      {
        id: 'permission-locked-state',
        name: 'Clear Permission / Access Gate',
        archetype: 'Minimal lock card · exact role needed · Request Access CTA',
        summary:
          'Explains *which* role is required and gives a 1-click Request Access flow rather than a cryptic 403 error.',
        traits: ['Actionable 403 UX', 'Explicit role clarity', '1-click access request'],
      },
      {
        id: 'offline-cached-recovery',
        name: 'Offline Degraded Banner + Cached View',
        archetype: 'Read-only cached snapshot · queued edits counter · Reconnect',
        summary:
          'Keeps the workspace readable offline, visibly tracks queued local changes, and syncs cleanly once back online.',
        traits: ['Honest offline state', 'Queued edit visibility', 'Zero silent data loss'],
      },
    ],
  },
  {
    id: 'ai-streaming',
    batch: 3,
    title: 'AI Streaming Text & Markdown UX',
    subtitle: 'Token cadence, code fence ergonomics, inline citations, artifacts, and scroll control.',
    question:
      'Hit Replay Stream, Stop, and interact with code/citations in each card. How should AI-generated output feel in motion?',
    variants: [
      {
        id: 'smooth-token-fade',
        name: 'Streamdown Soft Token Fade-In',
        archetype: 'Chunked opacity glide · zero harsh cursor flicker · prose rhythm',
        summary:
          'Inspired by Streamdown v2: softens raw SSE chunk arrival into a calm, editorial reading cadence that never jitters.',
        traits: ['Editorial reading flow', 'Zero jittery flicker', 'Replayable live stream'],
      },
      {
        id: 'caret-cursor-stream',
        name: 'Precision Monospace Block Caret',
        archetype: 'Crisp terminal-grade streaming cursor · exact live anchor',
        summary:
          'Gives power-user developer tools a sharp, unmistakable live generation anchor that vanishes cleanly on completion.',
        traits: ['Crisp active anchor', 'Developer-tool native', 'Clean completion settle'],
      },
      {
        id: 'stop-and-resume-pill',
        name: 'Floating Stop / Regenerate Control Pill',
        archetype: 'Centered interrupt button during stream · Regenerate on stop',
        summary:
          'Keeps interruption 1 click away with zero layout shift—morphs smoothly from `Stop generating` to `Continue / Retry`.',
        traits: ['Instant stream interrupt', 'Zero layout shift', 'Clean state morph'],
      },
      {
        id: 'streaming-code-fence',
        name: 'Live Streaming Code Block + Sticky Copy',
        archetype: 'Language header · sticky Copy & Wrap toggles · live line stream',
        summary:
          'Handles code fences gracefully mid-stream with a concentric header bar, mono line numbers, and 1-click copy confirmation.',
        traits: ['Sticky language header', '1-click inline copy', 'Clean mid-stream render'],
      },
      {
        id: 'inline-citation-chips',
        name: 'Inline Numbered Citations + Source Peek',
        archetype: 'Superscript [1] chips · clickable inline source preview card',
        summary:
          'Grounds AI claims with quiet tabular citation badges that expand an exact excerpt and URL without leaving the thread.',
        traits: ['Verifiable grounding', 'Zero clutter footnotes', 'Inline source peek'],
      },
      {
        id: 'structured-artifact-card',
        name: 'Structured Artifact / Deliverable Card',
        archetype: 'Inline clickable artifact pill · expandable preview canvas',
        summary:
          'Separates long generated code/docs from chat prose into a crisp concentric artifact card ready for side-panel editing.',
        traits: ['Clean prose vs output', 'Version badge + stats', '1-click canvas expand'],
      },
      {
        id: 'follow-up-suggestion-chips',
        name: 'Contextual Follow-Up Prompt Chips',
        archetype: 'Quiet hairline next-step pills revealed after completion',
        summary:
          'Accelerates multi-turn workflows with 2–3 high-signal next prompts that appear gently once generation settles.',
        traits: ['Zero mid-stream noise', '1-click next turn', 'Compact tactile pills'],
      },
      {
        id: 'branching-regenerations',
        name: 'Version Switcher (`1 / 3` Branches)',
        archetype: 'Prev/Next branch stepper · preserves prior generations cleanly',
        summary:
          'Lets users regenerate freely without losing earlier answers—step cleanly across response versions with tabular counters.',
        traits: ['Non-destructive retries', 'Tabular branch stepper', 'Instant version diff'],
      },
      {
        id: 'scroll-lock-jump-pill',
        name: 'Auto-Scroll Pause + "Jump to Latest" Pill',
        archetype: 'Detects manual scroll-up · floats subtle Jump-to-bottom pill',
        summary:
          'Respects the user when they scroll up to read during a live stream—never fights their scroll wheel, offering a crisp jump pill instead.',
        traits: ['Never fights user scroll', 'Floating jump-to-latest', 'Unread stream indicator'],
      },
      {
        id: 'structured-streaming-table',
        name: 'Live Streaming Structured Data Block',
        archetype: 'Progressive row-by-row table population with tabular alignment',
        summary:
          'Streams structured comparisons straight into clean hairline rows instead of broken raw markdown pipes.',
        traits: ['Zero broken MD pipes', 'Row-by-row entrance', 'Tabular comparison clarity'],
      },
    ],
  },
  {
    id: 'ai-thinking-tools',
    batch: 3,
    title: 'Thinking Traces & Tool-Call Chips',
    subtitle: 'Reasoning transparency, compact tool-call disclosure, parallel subagents, and quiet telemetry.',
    question:
      'Expand reasoning blocks, inspect tool calls, and test live steps. How much of the agent’s internal work should stay visible vs collapsed?',
    variants: [
      {
        id: 'collapsed-thinking-pill',
        name: 'Collapsed "Thought for 3.2s" Pill',
        archetype: 'Single quiet disclosure line · expands soft muted trace',
        summary:
          'Respects reading flow by folding chain-of-thought into one crisp summary pill (`Thought for 3.2s`) expandable on demand.',
        traits: ['Minimal resting footprint', 'Tabular elapsed time', 'Clean trace disclosure'],
      },
      {
        id: 'live-reasoning-timeline',
        name: 'Vertical Hairline Step Timeline',
        archetype: '1px vertical rail · discrete step nodes · live active indicator',
        summary:
          'Turns multi-step agent runs into an architectural timeline where completed, active, and queued steps read in one glance.',
        traits: ['Clear execution order', 'Crisp 1px vertical rail', 'Calm active progress'],
      },
      {
        id: 'compact-tool-chip-strip',
        name: 'Inline Collapsible Tool-Call Chips',
        archetype: 'Horizontal wrap of tight tool pills · click any chip to inspect',
        summary:
          'Compresses 4–6 sequential tool calls into a tidy chip strip instead of pushing the final answer three screens down.',
        traits: ['Prevents chat bloat', '1-click chip inspection', 'Clean status icons'],
      },
      {
        id: 'terminal-command-drawer',
        name: 'Live Shell Command + Collapsible Output',
        archetype: 'Mono command header · exit code badge · toggleable stdout',
        summary:
          'Shows the exact command and exit status (`0 · 1.4s`) cleanly at rest, expanding full terminal output only when needed.',
        traits: ['Honest exit-code badge', 'Collapsed noisy stdout', 'Mono precision'],
      },
      {
        id: 'file-read-search-cluster',
        name: 'Grouped File-Read / Search Cluster',
        archetype: 'Coalesces "Read 5 files · Searched 2 queries" into 1 row',
        summary:
          'Groups repetitive research steps into one expandable summary cluster so codebase exploration never floods the transcript.',
        traits: ['Anti-spam grouping', 'Expandable file list', 'Line-range links'],
      },
      {
        id: 'parallel-subagent-cards',
        name: 'Concurrent Subagent Status Grid',
        archetype: 'Compact 2-col worker cards · live role + step + status',
        summary:
          'Visualizes fan-out parallel agents cleanly side-by-side so you can track every worker’s live progress without scrolling.',
        traits: ['Parallel clarity', 'Compact worker cards', 'Live step telemetry'],
      },
      {
        id: 'mcp-tool-inspector',
        name: 'Expandable JSON Args / Result Inspector',
        archetype: 'Tool name + latency pill · segmented Input / Output JSON view',
        summary:
          'Built for debugging structured MCP tool calls with clean Input/Output tabs and 1-click payload copy.',
        traits: ['Input/Output tab split', 'Mono JSON formatting', 'Developer debug native'],
      },
      {
        id: 'live-web-search-cards',
        name: 'Search Query + Retrieved Source Strip',
        archetype: 'Query chip + compact horizontal source cards with domains',
        summary:
          'Shows the exact search queries executed and the retrieved pages as clean, clickable domain pills.',
        traits: ['Transparent queries', 'Scannable source strip', 'Zero visual noise'],
      },
      {
        id: 'token-latency-telemetry',
        name: 'Quiet Mono Telemetry Footer',
        archetype: 'Subtle response metadata · tok/s · TTFT · context window %',
        summary:
          'Surfaces power-user performance telemetry in quiet tabular monospace right below the message—informative, never loud.',
        traits: ['Tabular tok/s & TTFT', 'Context budget awareness', 'Ultra-quiet typography'],
      },
      {
        id: 'interleaved-plan-checklist',
        name: 'Live Updating Plan Checklist',
        archetype: 'Compact task card inside stream · live checkmarks + counter',
        summary:
          'Keeps multi-step execution grounded with a pinned-style live checklist (`3 / 4 complete`) right inside the agent turn.',
        traits: ['Clear completion ratio', 'Live step checkmarks', 'High-trust agent UX'],
      },
    ],
  },
  {
    id: 'ai-hitl-diffs',
    batch: 3,
    title: 'HITL Approvals, Diffs & Safety Gates',
    subtitle: 'Human-in-the-loop confirmation ergonomics, code diff review, scoped trust, and instant rollback.',
    question:
      'Approve, edit args, toggle hunks, and test rollback inside each card. How should agents ask your permission and show changes?',
    variants: [
      {
        id: 'inline-approval-bar',
        name: 'Crisp Inline Approve / Reject Bar',
        archetype: 'Action summary · keyboard hints (Y/N) · instant inline settle',
        summary:
          'Fastest human-in-the-loop gate: clearly states the exact tool & target with 1-click Approve / Reject right in the stream.',
        traits: ['Zero modal interruption', 'Keyboard shortcut hints', 'Crisp settled receipt'],
      },
      {
        id: 'unified-code-diff-review',
        name: 'Unified Hairline Diff + Per-Hunk Apply',
        archetype: 'File header + +/- counts · accept or reject individual hunks',
        summary:
          'Lets you surgically accept or discard individual code hunks inside a clean monospace unified diff without opening an IDE.',
        traits: ['Per-hunk granularity', 'Tabular +/- delta badge', 'Clean mono typography'],
      },
      {
        id: 'split-side-by-side-diff',
        name: 'Side-by-Side Before / After Diff',
        archetype: 'Two-column comparison · collapses cleanly on 390px mobile',
        summary:
          'Best for structural refactors and copy edits where comparing old vs. new directly across columns beats reading interleaved lines.',
        traits: ['Instant before/after scan', 'Responsive 390px stack', 'Clear column labels'],
      },
      {
        id: 'permission-scope-selector',
        name: 'Granular Permission Scope Picker',
        archetype: 'Allow Once · Allow for Session · Always Allow for Tool',
        summary:
          'Eliminates approval fatigue by letting you promote safe read/test actions to session-wide trust in one click.',
        traits: ['Cures approval fatigue', 'Explicit trust duration', 'Safe default (Once)'],
      },
      {
        id: 'destructive-command-gate',
        name: 'Elevated Destructive Command Gate',
        archetype: 'Danger border · exact command preview · explicit confirm',
        summary:
          'Visually escalates irreversible actions (db drop, force push, prod deploy) with unmistakable command inspection before execution.',
        traits: ['Unmistakable risk tier', 'Exact command preview', 'Deliberate friction'],
      },
      {
        id: 'editable-params-before-run',
        name: 'Edit Tool Arguments Before Approving',
        archetype: 'Tweak agent-proposed fields inline · then Approve & Run',
        summary:
          'Instead of rejecting and re-prompting for a minor typo, edit the proposed parameters directly in the approval card and run.',
        traits: ['Zero re-prompt loop', 'Direct parameter control', 'Collaborative HITL'],
      },
      {
        id: 'multi-file-patch-queue',
        name: 'Multi-File Patch Queue + Checkboxes',
        archetype: 'Select which proposed file edits to apply · batch Apply CTA',
        summary:
          'Summarizes a multi-file refactor into a tidy checklist with per-file +/- stats so you control exactly what lands on disk.',
        traits: ['Selective batch apply', 'Per-file diff counts', 'Clear blast radius'],
      },
      {
        id: 'revert-checkpoint-pill',
        name: 'Instant Post-Action Checkpoint Rollback',
        archetype: 'Auto-runs safe edits · exposes 1-click Revert Checkpoint bar',
        summary:
          'Optimistic agent velocity: lets trusted edits apply immediately while anchoring a crisp 1-click checkpoint rollback receipt.',
        traits: ['Maximum agent speed', 'Zero-fear undo safety', 'Git-checkpoint native'],
      },
      {
        id: 'human-clarification-card',
        name: 'Structured Multiple-Choice Question Card',
        archetype: 'Agent asks crisp choices + Recommended tag before building',
        summary:
          'Replaces vague walls of prose questions with a tight interactive decision card so you unblock the agent in 2 seconds.',
        traits: ['2-second disambiguation', 'Recommended badge', 'Zero prose friction'],
      },
      {
        id: 'policy-trust-rules-badge',
        name: 'Transparent Auto-Approved Rule Chip',
        archetype: 'Quiet audit badge · "Auto-approved by rule" · 1-click revoke',
        summary:
          'Maintains complete visibility when policy rules auto-approve a tool call, with an instant Revoke toggle if you change your mind.',
        traits: ['Zero silent magic', 'Auditable trust rule', '1-click revoke safety'],
      },
    ],
  },
  // =========================================================================
  // BATCH 4 · GENERIC APP UX, FLOWS & RICH CONTROLS
  // =========================================================================
  {
    id: 'cards-metrics',
    batch: 4,
    title: 'Cards, KPIs & Bento Layouts',
    subtitle: 'Dashboard metrics, selectable plan cards, media cards, feeds, and modular bento composition.',
    question:
      'Switch timeframes, select plans, and expand cards. Which everyday card and metric architectures belong in your normal web & SaaS apps?',
    variants: [
      {
        id: 'kpi-sparkline-card',
        name: 'KPI Stat Card + Sparkline',
        archetype: 'Tabular headline figure · delta badge · live timeframe sparkline',
        summary:
          'Classic SaaS KPI block: crisp metric hierarchy, right-aligned timeframe toggle, and subtle vector trend line.',
        traits: ['Tabular numerals', 'Live 7D/30D switch', 'Zero chart clutter'],
      },
      {
        id: 'bento-feature-grid',
        name: 'Concentric Bento Summary Grid',
        archetype: 'Asymmetric modular tiles · quiet hairlines · scannable hierarchy',
        summary:
          'Groups 3–4 related product metrics or highlights into an optically balanced bento block with concentric nesting.',
        traits: ['Asymmetric rhythm', 'Concentric sub-tiles', 'High visual density'],
      },
      {
        id: 'selectable-plan-card',
        name: 'Tactile Radio / Plan Choice Card',
        archetype: 'Full-card click target · crisp active border · check indicator',
        summary:
          'Turns tier selection, shipping methods, or workspace types into clear, unmistakable tactile choice cards.',
        traits: ['Large hit target', 'Unmistakable active ring', 'Zero radio-dot hunt'],
      },
      {
        id: 'media-content-card',
        name: 'Aspect-Locked Media + Meta Card',
        archetype: 'Clean 16:9 frame · category pill · 2-line clamp · footer meta',
        summary:
          'For marketplaces, blogs, courses, and product catalogs—locks aspect ratios so mixed media never breaks grid alignment.',
        traits: ['Locked media aspect', '2-line text clamp', 'Clean metadata footer'],
      },
      {
        id: 'activity-timeline-card',
        name: 'Chronological Activity Feed Card',
        archetype: '1px vertical feed rail · quiet timestamps · compact event rows',
        summary:
          'Surfaces recent account, order, or team events cleanly without drowning the page in noisy notification boxes.',
        traits: ['Quiet vertical rail', 'Scannable timestamps', 'Zero box-in-box bloat'],
      },
      {
        id: 'quota-usage-meter',
        name: 'Usage & Quota Progress Card',
        archetype: 'Hairline capacity track · tabular usage ratio · upgrade CTA',
        summary:
          'Communicates storage, seats, or monthly quota honestly with a crisp progress rule and clear remaining capacity.',
        traits: ['Tabular capacity ratio', 'Clear threshold bar', 'Actionable footer'],
      },
      {
        id: 'compact-horizontal-row-card',
        name: 'Compact Horizontal Entity Card',
        archetype: 'Icon/thumb left · title + subtitle · right chevron / status',
        summary:
          'Mobile-and-desktop workhorse for orders, workspaces, files, and projects when vertical height needs to stay tight.',
        traits: ['Tight vertical height', 'Clean left-to-right scan', 'Touch-friendly row'],
      },
      {
        id: 'collapsible-detail-card',
        name: 'Expandable Summary Accordion Card',
        archetype: 'Calm headline summary · 1-click inline detail drawer reveal',
        summary:
          'Keeps overview pages calm by tucking secondary line items, specs, or order breakdowns behind a smooth disclosure.',
        traits: ['Progressive disclosure', 'Preserves page rhythm', 'Zero modal jump'],
      },
      {
        id: 'pricing-comparison-card',
        name: 'Pricing Tier Card + Cadence Toggle',
        archetype: 'Monthly/Annual switch · tabular price · concise feature list',
        summary:
          'Architectural SaaS pricing block with honest billing toggle, clear primary CTA, and tight checkmark feature rows.',
        traits: ['Honest billing switch', 'Tabular price shift', 'Concise feature bullets'],
      },
      {
        id: 'profile-entity-summary',
        name: 'User / Team Profile Summary Card',
        archetype: 'Avatar emblem · role badge · 3 micro-stats · quick follow/message',
        summary:
          'Clean identity card for directories, customer CRMs, and team profiles with balanced whitespace and 1 clear action.',
        traits: ['Balanced identity header', 'Tabular micro-stats', 'Single clear CTA'],
      },
    ],
  },
  {
    id: 'onboarding-wizards',
    batch: 4,
    title: 'Steppers, Wizards & Onboarding',
    subtitle: 'Multi-step flows, progress indicators, getting-started checklists, and review steps.',
    question:
      'Step forward, check off tasks, and test mobile collapse inside each flow. How should multi-step forms and onboarding feel?',
    variants: [
      {
        id: 'horizontal-numbered-stepper',
        name: 'Horizontal Numbered Stepper',
        archetype: '3 crisp numbered nodes · hairline connector · Back / Next bar',
        summary:
          'The universal multi-step checkout & setup flow: immediately tells users where they are and how many steps remain.',
        traits: ['Clear step count', 'Completed checkmarks', 'Predictable footer'],
      },
      {
        id: 'vertical-rail-stepper',
        name: 'Left Step Rail + Form Stage',
        archetype: 'Sidebar step navigation · active step canvas (collapses at 390px)',
        summary:
          'Ideal for 4–6 step setup wizards (account, billing, team, domain) where users benefit from jumping back to completed steps.',
        traits: ['Non-linear step jump', 'Descriptive step labels', 'Responsive collapse'],
      },
      {
        id: 'slim-top-progress-wizard',
        name: 'Minimal 2px Progress Bar Wizard',
        archetype: 'Zero stepper circles · 2px top progress rule · calm step slide',
        summary:
          'Modern consumer onboarding (Linear / Stripe style): removes heavy numbered chrome in favor of a razor-thin progress line.',
        traits: ['Zero stepper clutter', 'Smooth step transition', 'Calm consumer feel'],
      },
      {
        id: 'onboarding-checklist-card',
        name: 'Getting-Started Checklist Card',
        archetype: 'Live % completion bar · clickable setup tasks · dismiss option',
        summary:
          'Guides new users through their first 3–4 activation milestones right inside the app without blocking modals.',
        traits: ['Non-blocking activation', 'Live completion meter', '1-click task launch'],
      },
      {
        id: 'split-guide-form-wizard',
        name: 'Split Context Guide + Form Card',
        archetype: 'Left helpful rationale · right clean form control',
        summary:
          'Pairs clear human explanation on the left with a focused control on the right so complex forms feel effortless.',
        traits: ['High form clarity', 'Reduces field anxiety', 'Clean 2-col balance'],
      },
      {
        id: 'single-question-focus-flow',
        name: 'Single-Question Focused Flow',
        archetype: 'One decision at a time · instant auto-advance · Enter shortcut',
        summary:
          'High-conversion survey, intake, and personalization flow—removes cognitive load by focusing on one clear choice.',
        traits: ['Highest completion rate', 'Zero visual overload', 'Instant click advance'],
      },
      {
        id: 'progressive-inline-reveal',
        name: 'Progressive Inline Section Reveal',
        archetype: 'All on one page · Step 2 unlocks cleanly once Step 1 completes',
        summary:
          'Keeps context visible on a single scrolling surface while preventing overwhelming walls of form fields upfront.',
        traits: ['Single-page context', 'Smooth section unlock', 'Completed step summary'],
      },
      {
        id: 'review-confirm-summary',
        name: 'Final Review & Edit Summary Step',
        archetype: 'Grouped key-value recap · inline Edit buttons · final Submit CTA',
        summary:
          'Essential last step for checkout, bookings, and applications—lets users verify and tweak any field before committing.',
        traits: ['Confidence before submit', 'Per-section Edit jump', 'Clean tabular summary'],
      },
      {
        id: 'contextual-feature-callout',
        name: 'Quiet Inline Feature Spotlight',
        archetype: 'Dismissible hairline callout card · 1 action · zero modal popup',
        summary:
          'Introduces new features or next steps gently inline rather than hijacking the screen with intrusive tour popups.',
        traits: ['Zero tour-popup annoyance', 'Easy 1-click dismiss', 'Contextual placement'],
      },
      {
        id: 'draft-resume-bar',
        name: 'Saved Draft Resume Strip',
        archetype: 'Compact "2 of 4 steps saved" card · Continue / Discard actions',
        summary:
          'Respects user time by preserving partial multi-step progress and letting them pick up right where they left off.',
        traits: ['Zero lost form work', 'Tabular step progress', 'Clean discard option'],
      },
    ],
  },
  {
    id: 'rich-pickers-uploads',
    batch: 4,
    title: 'Pickers, Uploads & Rich Controls',
    subtitle: 'File dropzones, date/time pickers, tag comboboxes, sliders, steppers, and share dialogs.',
    question:
      'Drag/click uploads, pick date ranges, create tags, and slide values. Which interactive input controls should power your apps?',
    variants: [
      {
        id: 'drag-drop-file-uploader',
        name: 'Tactile Dropzone + Live Progress',
        archetype: 'Dashed hairline drop area · file queue · progress bar + remove',
        summary:
          'Complete upload ergonomics: clear format/size limits upfront, live progress per file, and 1-click cancel/remove.',
        traits: ['Clear file limits', 'Live per-file progress', '1-click remove'],
      },
      {
        id: 'avatar-media-uploader',
        name: 'Avatar / Cover Image Picker',
        archetype: 'Live circular preview · instant Replace / Remove controls',
        summary:
          'Clean account & workspace media picker with immediate visual feedback and zero awkward raw `<input type="file">` chrome.',
        traits: ['Instant visual preview', 'Zero raw file input', 'Clean Replace/Remove'],
      },
      {
        id: 'date-range-calendar',
        name: 'Date Range Calendar + Presets',
        archetype: 'Quick presets (7d / 14d / Month) · crisp range highlight grid',
        summary:
          'Essential for analytics, bookings, and reports—pairs 1-click presets with a clean tabular calendar range selector.',
        traits: ['1-click range presets', 'Tabular calendar grid', 'Clear start/end highlight'],
      },
      {
        id: 'time-slot-scheduler',
        name: 'Day + Time-Slot Booking Picker',
        archetype: 'Compact day pills · tactile time-slot grid · timezone label',
        summary:
          'Cal.com-grade scheduling ergonomics: pick a day and tap an available slot with zero dropdown scrolling.',
        traits: ['Zero dropdown hunting', 'Clear timezone label', 'Tactile slot grid'],
      },
      {
        id: 'multi-tag-combobox',
        name: 'Multi-Select Tag Combobox (+ Create)',
        archetype: 'Removable tag chips · live filter · inline "Create tag" option',
        summary:
          'Handles labels, categories, and skills cleanly—type to filter existing tags or press Enter to create a new one inline.',
        traits: ['Inline tag creation', '1-click chip remove', 'Keyboard Enter support'],
      },
      {
        id: 'dual-range-slider-input',
        name: 'Synced Range Slider + Numeric Box',
        archetype: 'Smooth slider thumb paired with editable tabular numeric input',
        summary:
          'Gives users both fast visual scrubbing (budget, radius, seats) and exact keyboard number entry without fighting the thumb.',
        traits: ['Fast scrub + exact type', 'Tabular live value', 'Accessible keyboard step'],
      },
      {
        id: 'quantity-stepper-control',
        name: 'Precision Quantity Stepper (`− N +`)',
        archetype: 'Tactile minus/plus buttons · centered tabular count · min/max bounds',
        summary:
          'For cart quantities, seat counts, and guests—crisp hairline segmented bounds with clear disabled states at limits.',
        traits: ['Clear min/max bounds', 'Tabular center readout', 'Zero typing required'],
      },
      {
        id: 'rating-feedback-control',
        name: 'Compact Rating + Optional Note',
        archetype: 'Interactive 1–5 star bar · reveals subtle comment input on pick',
        summary:
          'Captures product feedback or reviews with zero friction upfront, expanding a quiet note box only after a rating is chosen.',
        traits: ['Low-friction 1st tap', 'Progressive note reveal', 'Clean thank-you state'],
      },
      {
        id: 'share-link-invite-box',
        name: 'Share Link + Permission Selector',
        archetype: 'Access level dropdown · 1-click Copy Link · email invite bar',
        summary:
          'The universal collaboration control for docs, boards, and albums—combines link sharing and direct invites cleanly.',
        traits: ['Instant Copy feedback', 'Clear access levels', 'Unified invite flow'],
      },
      {
        id: 'swatch-option-selector',
        name: 'Tactile Variant / Size Tile Picker',
        archetype: 'Structured option tiles (S/M/L/XL) · out-of-stock state · active ring',
        summary:
          'Replaces hidden dropdowns for e-commerce variants, layout modes, or print sizes with instant visual comparison.',
        traits: ['All options visible', 'Clear unavailable state', 'Tactile press response'],
      },
    ],
  },
  {
    id: 'lists-feeds-details',
    batch: 4,
    title: 'Lists, Feeds & Settings Pages',
    subtitle: 'Settings rows, preference toggles, inbox lists, comment threads, team rosters, and invoices.',
    question:
      'Toggle settings, mark messages read, post comments, and reorder items. Which list & settings patterns feel crispest?',
    variants: [
      {
        id: 'settings-section-rows',
        name: 'Structured Settings Section Rows',
        archetype: 'Hairline row list · clear title + helper · right-aligned control',
        summary:
          'The gold standard for account, workspace, and app preferences—consistent row geometry with zero visual clutter.',
        traits: ['Predictable alignment', 'Quiet helper copy', 'Hairline dividers'],
      },
      {
        id: 'toggle-preference-list',
        name: 'Live-Apply Preference Switches',
        archetype: 'Tactile switch pills · instant save indicator · zero Save button',
        summary:
          'Modern notification and privacy preferences that apply immediately on toggle with subtle local confirmation.',
        traits: ['Zero Save ceremony', 'Accessible switch track', 'Instant state clarity'],
      },
      {
        id: 'inbox-message-list',
        name: 'Scannable Notification / Inbox List',
        archetype: 'Unread accent dot · sender + snippet · 1-click Mark Read',
        summary:
          'Lets users scan and clear notifications or messages at speed with unmistakable unread hierarchy.',
        traits: ['Clear unread signal', '1-click mark read', 'Tabular timestamps'],
      },
      {
        id: 'comment-thread-composer',
        name: 'Compact Comment Thread + Composer',
        archetype: 'Clean avatar-initial rows · reaction count · inline reply box',
        summary:
          'Everyday collaboration thread for tasks, orders, or posts—keeps reading and replying tightly unified.',
        traits: ['Inline reply flow', '1-click reactions', 'Clean author hierarchy'],
      },
      {
        id: 'key-value-detail-grid',
        name: 'Structured Key–Value Spec Sheet',
        archetype: '2-column metadata grid · mono IDs · 1-click copy values',
        summary:
          'Displays order details, customer profiles, or asset specs cleanly with zero paragraph clutter.',
        traits: ['Fast attribute scan', '1-click ID copy', 'Responsive 2-col grid'],
      },
      {
        id: 'sortable-reorder-list',
        name: 'Tactile Reorderable Priority List',
        archetype: 'Grip handle · smooth Up/Down reorder buttons · rank badge',
        summary:
          'Keyboard-and-touch-safe list ordering for playlists, nav links, or priorities without fragile drag-only traps.',
        traits: ['Keyboard & touch safe', 'Smooth layout reorder', 'Tabular rank index'],
      },
      {
        id: 'avatar-team-directory',
        name: 'Team Roster + Inline Role Picker',
        archetype: 'Member rows · email subtext · inline Admin/Editor/Viewer select',
        summary:
          'Clean SaaS member management where changing roles or resending invites happens cleanly inline.',
        traits: ['Inline role control', 'Clear pending status', 'Compact member density'],
      },
      {
        id: 'billing-invoice-history',
        name: 'Billing Summary + Invoice Rows',
        archetype: 'Card-on-file header · tabular invoice amounts · download PDF',
        summary:
          'Trust-building billing history with right-aligned currency figures, clear paid status, and 1-click receipts.',
        traits: ['Tabular currency alignment', '1-click receipt action', 'Calm trust hierarchy'],
      },
      {
        id: 'search-results-list',
        name: 'App-Wide Search Results List',
        archetype: 'Highlighted match terms · entity type chip · breadcrumb path',
        summary:
          'Makes global search results immediately scannable by highlighting matched keywords and parent context.',
        traits: ['Highlighted match', 'Entity type pill', 'Clean breadcrumb context'],
      },
      {
        id: 'saved-bookmarks-grid',
        name: 'Grid / List View Switcher Collection',
        archetype: 'Segmented Grid vs List toggle · smooth layout reflow',
        summary:
          'Lets users choose between visual browsing (Grid) and high-density scanning (List) for files, products, or bookmarks.',
        traits: ['User-controlled density', 'Instant layout switch', 'Consistent item actions'],
      },
    ],
  },
  {
    id: 'charts-analytics',
    batch: 4,
    title: 'Data Viz, Progress & Status',
    subtitle: 'Clean monochrome/accent charts, hover readouts, proportion bars, gauges, and uptime strips.',
    question:
      'Hover bars, switch ranges, and inspect status blocks. How should charts and visual analytics look without rainbow clutter?',
    variants: [
      {
        id: 'bar-chart-hover-tooltip',
        name: 'Interactive Column Chart + Readout',
        archetype: 'Hover highlights active bar · crisp header readout · tabular scale',
        summary:
          'Restrained, color-agnostic bar chart that puts exact values in a fixed header readout so tooltips never obscure adjacent bars.',
        traits: ['Zero tooltip occlusion', 'Crisp active highlight', 'Tabular readout'],
      },
      {
        id: 'area-trend-chart',
        name: 'Monochrome Area Trend + Range Switch',
        archetype: 'Smooth SVG trend curve · subtle fill · 24H / 7D / 30D segmented bar',
        summary:
          'Clean revenue, traffic, or active-user trend chart that looks sharp in every project theme without neon gradients.',
        traits: ['Theme-adaptive vector', 'Instant range toggle', 'Clean headline total'],
      },
      {
        id: 'segmented-breakdown-bar',
        name: 'Proportional Stacked Breakdown Bar',
        archetype: 'Single horizontal bar · interactive category legend highlight',
        summary:
          'Replaces hard-to-read pie charts with a crisp linear proportion bar for storage, expenses, or channel mix.',
        traits: ['Beats pie charts', 'Hover legend sync', 'Tabular percentages'],
      },
      {
        id: 'radial-ring-gauge',
        name: 'Concentric Radial Progress Ring',
        archetype: 'Clean SVG ring · centered tabular % · interactive goal step',
        summary:
          'Great for goal completion, profile strength, or health scores—crisp stroke geometry with zero heavy drop shadows.',
        traits: ['Crisp SVG geometry', 'Tabular center stat', 'Compact footprint'],
      },
      {
        id: 'activity-heatmap-grid',
        name: 'Activity / Habit Heatmap Strip',
        archetype: 'Opacity-stepped day cells · live hover date + count readout',
        summary:
          'Visualizes daily streaks, check-ins, or usage frequency cleanly using 4 opacity levels of your single semantic accent.',
        traits: ['Single-accent opacity scale', 'Hover day readout', 'High temporal density'],
      },
      {
        id: 'uptime-status-bars',
        name: 'Service Uptime Health Strip',
        archetype: '24 crisp interval bars · 99.98% badge · hover incident detail',
        summary:
          'Status-page classic for dashboards and health monitors—scans 24 intervals in a split second with exact hover inspection.',
        traits: ['Split-second scan', 'Honest degraded ticks', 'Clean hover readout'],
      },
      {
        id: 'funnel-conversion-steps',
        name: 'Horizontal Conversion Funnel',
        archetype: 'Proportional stage bars · tabular totals + step conversion %',
        summary:
          'Shows signup, checkout, or onboarding drop-off cleanly across stages without bloated 3D funnel graphics.',
        traits: ['Clear drop-off math', 'Proportional tracks', 'Zero chart junk'],
      },
      {
        id: 'leaderboard-ranked-bars',
        name: 'Ranked Horizontal Bar List',
        archetype: 'Background proportional fill · label left · tabular value right',
        summary:
          'Plausible / Vercel Analytics style top-pages / top-products card—maximizes readability in tight dashboard columns.',
        traits: ['Ultra-clean analytics UI', 'Inline fill bar', 'Right-aligned totals'],
      },
      {
        id: 'comparison-metric-pair',
        name: 'Period-over-Period Comparison Card',
        archetype: 'Current vs Previous side-by-side · directional delta badge',
        summary:
          'Makes WoW / MoM performance obvious at a glance with paired figures and honest percentage change.',
        traits: ['Instant period context', 'Clear directional delta', 'Balanced 2-col layout'],
      },
      {
        id: 'live-kpi-ticker-strip',
        name: 'Compact 3-Metric Hairline Strip',
        archetype: 'Unified horizontal card · 1px vertical dividers · 3 key stats',
        summary:
          'Replaces 3 separate boxy KPI cards with one calm architectural strip—saves vertical space and lowers border noise.',
        traits: ['Low border noise', 'Compact dashboard top', 'Responsive mobile stack'],
      },
    ],
  },
  // =========================================================================
  // BATCH 5 · AUTH, NAVIGATION, CHIPS, LANDING & COMMERCE
  // =========================================================================
  {
    id: 'auth-security',
    batch: 5,
    title: 'Auth, Security & Access Control',
    subtitle: 'Sign-in cards, passkeys, 6-digit OTP, password meters, API key vaults, RBAC, and danger zones.',
    question:
      'Test sign-in, OTP entry, key reveal, RBAC toggles, and type-to-delete gates. Which auth & security patterns belong in your kit?',
    variants: [
      { id: 'minimal-signin-card', name: 'Clean OAuth + Email Sign-In Card', archetype: 'Social row · crisp divider · inline password reveal', summary: 'Balanced authentication card with zero marketing clutter.', traits: ['OAuth + password balance', 'Inline eye toggle', 'Zero bloat'] },
      { id: 'magic-link-passkey', name: 'Passkey / Magic Link Switcher', archetype: 'Segmented passwordless toggle · instant Touch ID CTA', summary: 'Passwordless-first auth flow with calm fallback.', traits: ['Passwordless native', 'Clean segmented toggle', 'Clear trust copy'] },
      { id: 'otp-six-digit', name: '6-Digit Mono OTP Verification', archetype: '6 crisp tabular boxes · active accent ring · paste-friendly', summary: 'Precision two-factor entry with unmistakable active focus.', traits: ['Tabular mono boxes', '1-click demo fill', 'Clear progress count'] },
      { id: 'password-strength-meter', name: 'Live Password Strength + Rules', archetype: '4-segment meter · live rule checklist · honest score', summary: 'Guides strong passwords without nagging red popups.', traits: ['4-step bar meter', 'Live rule checks', 'Zero password shaming'] },
      { id: 'api-key-vault', name: 'Masked API Key Vault + Copy', archetype: 'Masked mono token · reveal toggle · 1-click copy receipt', summary: 'Developer-grade secret handling with scope badge.', traits: ['Masked by default', '1-click copy confirm', 'Scope clarity'] },
      { id: 'active-sessions-list', name: 'Active Device Sessions + Revoke', archetype: 'Device icon · location/time · Current badge vs Revoke', summary: 'Clear security transparency for multi-device accounts.', traits: ['Clear current session', '1-click revoke', 'Compact row scan'] },
      { id: 'rbac-permission-matrix', name: 'Compact RBAC Permission Matrix', archetype: 'Hairline table · tactile check cells · role columns', summary: 'Scannable role-based capability grid without toggle soup.', traits: ['Fast role compare', 'Crisp check cells', 'Clean hairline table'] },
      { id: 'sso-enterprise-gate', name: 'Enterprise SSO Domain Gate', archetype: 'Work domain input · live IdP detection feedback', summary: 'Frictionless B2B SAML/OIDC routing by email domain.', traits: ['Live IdP match', 'Mono domain input', 'Zero confusion'] },
      { id: 'cookie-consent-compact', name: 'Calm Compact Cookie Consent', archetype: 'Honest Essential Only vs Accept All · zero dark patterns', summary: 'Respectful privacy consent card with equal visual clarity.', traits: ['Zero dark patterns', 'Compact footprint', 'Instant settle'] },
      { id: 'danger-zone-confirm', name: 'Type-to-Confirm Danger Zone', archetype: 'Danger hairline frame · exact slug match unlocks Delete', summary: 'Deliberate friction for irreversible workspace deletion.', traits: ['Prevents misclicks', 'Mono confirmation slug', 'Disabled until match'] },
    ],
  },
  {
    id: 'navigation-headers',
    batch: 5,
    title: 'Navigation, Headers & Pagination',
    subtitle: 'Marketing navbars, mega-menus, collapsible breadcrumbs, mobile tab bars, trees, and TOC rails.',
    question:
      'Expand breadcrumbs, flip pagination, switch orgs, and toggle 390px mobile. Which navigation ergonomics scale best across frameworks?',
    variants: [
      { id: 'crisp-marketing-navbar', name: 'Crisp Single-Row Navbar', archetype: 'Brand left · quiet nav links · single primary CTA', summary: 'Restrained top header that stays clean on narrow screens.', traits: ['Single primary CTA', 'Clean active pill', 'Zero link clutter'] },
      { id: 'mega-menu-popover', name: '2-Column Structured Mega-Menu', archetype: 'Concentric popover · title + 1-line rationale grid', summary: 'Self-documenting platform dropdown without giant hero bloat.', traits: ['2-col scannability', 'Concentric tiles', 'Concise subtitles'] },
      { id: 'breadcrumb-overflow-trail', name: 'Collapsible Overflow Breadcrumb', archetype: 'Middle segments fold into ··· · 1-click expand', summary: 'Keeps deep paths on one line without truncating the leaf.', traits: ['Preserves leaf title', '1-click expand', 'Zero wrap mess'] },
      { id: 'sticky-page-header-actions', name: 'Page Header + Action Pair', archetype: 'Title + live meta left · Secondary + Primary CTA right', summary: 'Workhorse SaaS detail header with clear visual hierarchy.', traits: ['Balanced action pair', 'Quiet live meta', 'Clean wrap on 390px'] },
      { id: 'mobile-bottom-tab-bar', name: 'Mobile Bottom Tab Bar', archetype: '4 thumb-reachable slots · icon + tight label · active tint', summary: 'Native mobile navigation bar ready for iOS/Android/PWA.', traits: ['Thumb-zone native', '4-item restraint', 'Clear active tint'] },
      { id: 'pagination-with-pagesize', name: 'Compact Pagination + Rows Select', archetype: 'Page size picker · tabular Page X / Y · Prev/Next buttons', summary: 'Predictable data pagination without 12-button number strips.', traits: ['Tabular page count', 'Rows-per-page select', 'Compact footprint'] },
      { id: 'tree-folder-sidebar', name: 'Collapsible File / Folder Tree', archetype: '1px vertical indent guide · mono leaf items · active fill', summary: 'Clean hierarchical tree for docs, repos, and nested spaces.', traits: ['1px guide line', 'Mono file labels', 'Clean toggle'] },
      { id: 'docs-toc-anchor-rail', name: 'Docs Table-of-Contents Rail', archetype: '1px left track · 2px gliding accent indicator', summary: 'Minimal right-rail anchor navigation for docs and articles.', traits: ['Crisp active border', 'Zero card clutter', 'High scan speed'] },
      { id: 'workspace-org-switcher', name: 'Compact Org / Tenant Switcher', archetype: 'Monogram badge · active org name · instant switch pills', summary: 'Multi-tenant workspace switcher without deep dropdown friction.', traits: ['Monogram identity', 'Fast org switch', 'Compact chrome'] },
      { id: 'global-search-header', name: 'Inline Search Bar + ⌘K Keycap', archetype: 'Bordered search field · right-aligned mono shortcut cap', summary: 'Always-visible jump bar teaching keyboard shortcuts quietly.', traits: ['Discoverable ⌘K', 'Clean mono keycap', 'Zero heavy chrome'] },
    ],
  },
  {
    id: 'badges-avatars-chips',
    batch: 5,
    title: 'Badges, Avatars, Chips & Keycaps',
    subtitle: 'Status semantics, avatar stacks, filter chips, keyboard keycaps, deltas, and copyable IDs.',
    question:
      'Toggle filter chips, fan out avatar stacks, and copy mono IDs. How should micro-elements communicate status without visual noise?',
    variants: [
      { id: 'semantic-status-badges', name: 'Restrained Semantic Status Pills', archetype: 'Hairline/tinted pills · calm dot · mono version tag', summary: 'High-contrast status tags without loud neon backgrounds.', traits: ['Contrast verified', 'Calm status dot', 'Mono version pill'] },
      { id: 'avatar-stack-overflow', name: 'Interactive Avatar Stack (+N)', archetype: 'Overlapping rings · click +N to fan out cleanly', summary: 'Compact collaborator indicator with crisp ring separation.', traits: ['Surface-matched rings', 'Tabular +N counter', 'Smooth fan-out'] },
      { id: 'interactive-filter-chips', name: 'Toggleable Multi-Select Chips', archetype: 'Pill chips · checkmark + accent fill when active', summary: 'Tactile filter pills for tags, categories, and scopes.', traits: ['Instant visual state', 'Checkmark clarity', 'Compact wrap'] },
      { id: 'keyboard-shortcut-keycaps', name: 'Physical Keycap Shortcut Rows', archetype: 'Subtle bottom bevel keycaps · mono symbols · clean align', summary: 'Hardware-inspired keycaps for menus and cheat sheets.', traits: ['Keycap depth edge', 'Crisp mono glyphs', 'Right-aligned pair'] },
      { id: 'progress-pill-badge', name: 'Inline Progress Meter Pill', archetype: 'Capsule badge · embedded mini progress track + tabular %', summary: 'Packs live task progress neatly inside a single compact pill.', traits: ['Compact progress', 'Tabular percentage', 'Zero layout jump'] },
      { id: 'metric-delta-chips', name: 'Directional Trend Delta Chips', archetype: 'Up/Down arrow · tabular % · semantic success/danger ink', summary: 'Scannable KPI movement chips with exact contrast math.', traits: ['Tabular mono deltas', 'Directional icons', 'Accessible contrast'] },
      { id: 'verified-role-tags', name: 'Tiered Role & Verification Tags', archetype: 'Solid Owner · bordered Maintainer · quiet Guest hierarchy', summary: 'Clear 3-level visual weight for user roles and tiers.', traits: ['3-tier visual weight', 'Zero color overload', 'Instant role scan'] },
      { id: 'copyable-mono-id-chip', name: '1-Click Copyable Mono ID Chip', archetype: 'Truncated trace/order ID · inline copy -> check morph', summary: 'Essential developer & ops chip for IDs, hashes, and URLs.', traits: ['Overflow-safe truncate', 'Inline check receipt', 'Mono precision'] },
      { id: 'live-sync-status-pill', name: 'Multi-State Live Sync Pill', archetype: 'Cycles Synced · Syncing · Offline cleanly in one capsule', summary: 'Honest connection telemetry without noisy toast banners.', traits: ['Single-slot status', 'Honest offline alert', 'Subtle spinner'] },
      { id: 'removable-tag-strip', name: 'Dismissible Mono Tag Strip', archetype: 'Hairline chips · crisp X button · 1-click reset', summary: 'Clean removable tag list for filters, skills, and labels.', traits: ['Crisp remove target', 'Mono tag rhythm', 'Easy reset'] },
    ],
  },
  {
    id: 'heroes-landing-blocks',
    batch: 5,
    title: 'Heroes, Landing & Marketing Blocks',
    subtitle: 'Editorial heroes, split showcases, bento value props, comparison tables, FAQs, and changelogs.',
    question:
      'Compare hero posture, FAQ disclosures, and CLI install blocks. Which landing & docs blocks feel authentic instead of generic AI templates?',
    variants: [
      { id: 'editorial-centered-hero', name: 'Editorial Centered Hero', archetype: 'Tight display headline · calm subtitle · 1 primary CTA', summary: 'Restrained flagship hero with zero fake eyebrow badges.', traits: ['Zero slop badges', 'Balanced text wrap', 'Clear CTA hierarchy'] },
      { id: 'split-product-hero', name: 'Asymmetric Split Product Hero', archetype: 'Value prop left · live product telemetry preview right', summary: 'Shows real product signal above the fold instead of stock art.', traits: ['Real product proof', 'Responsive 2-col', 'Focused copy'] },
      { id: 'bento-value-props', name: 'Asymmetric Bento Value Grid', archetype: '2/3 narrative tile + 1/3 punchy tabular proof stat', summary: 'Pairs concise narrative with a hard quantitative metric.', traits: ['Optical asymmetry', 'Tabular proof stat', 'Zero filler tiles'] },
      { id: 'social-proof-logo-bar', name: 'Quiet Monochrome Logo Strip', archetype: 'Subtle mono caption · balanced 4-column typographic strip', summary: 'Builds credibility quietly without clashing brand rainbows.', traits: ['Monochrome restraint', 'Balanced 4-col grid', 'Zero visual fight'] },
      { id: 'testimonial-quote-card', name: 'Editorial Customer Quote Card', archetype: 'Crisp quote copy · monogram avatar · concise role line', summary: 'Authentic social proof without star-rating spam.', traits: ['Readable measure', 'Clean attribution', 'Hairline frame'] },
      { id: 'feature-compare-matrix', name: 'Minimal Feature Comparison Matrix', archetype: 'Clean hairline rows · clear Check vs Dash contrast', summary: 'Honest side-by-side capability comparison table.', traits: ['Zero bloated icons', 'Instant scan', 'Crisp hairlines'] },
      { id: 'faq-accordion-block', name: 'Hairline FAQ Disclosure Block', archetype: 'Single-card divided accordion · smooth chevron rotation', summary: 'Compact, accessible Q&A block with zero nested boxes.', traits: ['Single-container frame', 'Smooth chevron flip', 'Clean prose width'] },
      { id: 'cli-install-hero-snippet', name: '1-Click CLI Install Command Bar', archetype: 'Terminal icon · mono command · instant Copy receipt', summary: 'Developer-native hero CTA that turns visitors into users in 2s.', traits: ['Zero friction install', 'Truncate-safe mono', 'Instant copy state'] },
      { id: 'cta-banner-card', name: 'Restrained End-of-Page CTA Card', archetype: 'Strong hairline border · crisp value line · 1 decisive button', summary: 'Closes a page cleanly without loud full-bleed rainbow gradients.', traits: ['No neon gradients', 'Single clear CTA', 'Balanced horizontal'] },
      { id: 'changelog-release-feed', name: 'Compact Version Changelog Feed', archetype: 'Mono version pill · concise release summary · date right', summary: 'Signals active shipping velocity in 3 crisp rows.', traits: ['Mono version pills', 'Tabular dates', 'High signal density'] },
    ],
  },
  {
    id: 'commerce-checkout',
    batch: 5,
    title: 'Commerce, Cart & Checkout UX',
    subtitle: 'Product cards, cart steppers, promo summaries, shipping & payment pickers, reviews, and receipts.',
    question:
      'Add items, apply promos, switch shipping/payment methods, and step order tracking. Which commerce ergonomics feel trustworthy and frictionless?',
    variants: [
      { id: 'product-card-quick-add', name: 'Clean Product Card + Quick Add', archetype: 'Locked media slot · title + tabular price · 1-tap Quick Add', summary: 'High-craft catalog card with instant bag confirmation.', traits: ['Tabular price align', '1-tap bag feedback', 'Zero badge clutter'] },
      { id: 'cart-line-items', name: 'Compact Cart Row + Qty Stepper', archetype: 'Item + live subtotal left · bounded − N + stepper right', summary: 'Updates line-item totals live with zero layout shift.', traits: ['Live tabular subtotal', 'Compact stepper', 'Clean touch targets'] },
      { id: 'promo-order-summary', name: 'Order Summary + Live Promo Code', archetype: 'Inline promo apply/remove · hairline subtotal/discount/total', summary: 'Transparent checkout math with instant promo toggle.', traits: ['Honest discount row', 'Mono currency align', '1-click apply/remove'] },
      { id: 'shipping-speed-selector', name: 'Tactile Shipping Speed Cards', archetype: 'Full-card click target · active accent border · aligned cost', summary: 'Makes delivery speed vs cost obvious at a glance.', traits: ['Clear active ring', 'Right-aligned cost', 'Large click target'] },
      { id: 'payment-method-tabs', name: 'Segmented Payment Method Switcher', archetype: 'Card / Wallet / Invoice tabs · contextual summary below', summary: 'Keeps checkout forms calm by showing one payment rail at a time.', traits: ['Zero form overload', 'B2B Invoice ready', 'Crisp segmented rail'] },
      { id: 'order-tracking-stepper', name: '4-Stage Order Fulfillment Bar', archetype: '4 crisp progress segments · active milestone labels', summary: 'Answers "Where is my order?" in half a second.', traits: ['Split-second status', 'Clean 4-bar track', 'Responsive labels'] },
      { id: 'inventory-stock-indicator', name: 'Honest Stock / Availability Strip', archetype: 'Semantic dot · clear remaining count · zero fake urgency', summary: 'Communicates real stock availability calmly and honestly.', traits: ['Honest inventory copy', 'Clear out-of-stock', 'Zero fake countdown'] },
      { id: 'review-histogram-summary', name: 'Rating Summary + 5-Star Histogram', archetype: 'Tabular headline rating · proportional 5→1 bar breakdown', summary: 'Builds buyer trust with scannable rating distribution.', traits: ['Tabular average', 'Proportional bars', 'Compact 2-col'] },
      { id: 'variant-swatch-selector', name: 'Finish / Option Tile Selector', archetype: 'Selected label echo · crisp option pills + active check', summary: 'Lets buyers compare finishes or editions with zero dropdowns.', traits: ['All finishes visible', 'Live selection echo', 'Active check mark'] },
      { id: 'order-confirmed-receipt', name: 'Calm Order Confirmation Receipt', archetype: 'Success check header · mono order ID · tabular paid total', summary: 'Reassuring post-purchase receipt card with key details upfront.', traits: ['Clear confirmation', 'Mono order reference', 'Tabular total paid'] },
    ],
  },
];
