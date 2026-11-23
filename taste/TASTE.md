# TASTE.md — Personal Color-Agnostic UI/UX Taste Specification

> **Compiled from Taste Lab.** This specification defines structural, spatial, typographic, behavioral, and motion taste. **Colors are intentionally abstracted** to project-level semantic tokens (`--surface-*`, `--ink-*`, `--border-*`, `--accent`, `--danger`) so this taste transfers cleanly across any brand or app.

Last updated: 2026-11-23T06:19:18.090Z

---

## 1. Color Abstraction Contract

- **Never hardcode brand hex/RGB values** inside reusable components or taste rules.
- Bind all UI chrome to semantic CSS variables: `--surface-0`, `--surface-1`, `--surface-2`, `--surface-recessed`, `--ink-1`, `--ink-2`, `--ink-3`, `--border-subtle`, `--border-strong`, `--accent`, `--accent-ink`, `--danger`.
- Borders must use translucent RGB opacity (`rgba(var(--border-rgb), alpha)`) so hairlines automatically adapt to light, dark, and tinted project themes.
- Enforce WCAG AA contrast (4.5:1 body, 3:1 large/UI controls) deterministically against whichever project theme is supplied.

## 2. Calibrated Craft Dials

| Dimension | Value |
| :--- | :--- |
| **Spatial Density** | Balanced (control height 36px, card padding 18px, gap 12px) |
| **Base Radius** | `10px` (Concentric nesting enforced: `inner = max(0, outer - padding)`) |
| **Border Strength** | `1.00x` translucent hairline multiplier |
| **Shadow Depth** | `45%` ambient/contact shadow intensity |
| **Typography Pairing** | Geometric Sans (`Plus Jakarta Sans` / `Inter`) + `JetBrains Mono` for code/IDs |
| **Display Tracking** | `subtle` · Tabular numerals: `enabled (always for numbers/metrics)` |
| **Press Compression** | `scale(0.975)` on active press |
| **Motion Physics** | Physics spring (`stiffness: 420`, `damping: 32`), interruptible, sub-300ms settling. |

## 3. Calibrated Component & UX Decisions

### Surfaces & Elevation
- **Primary Default:** **Hairline Architectural** — *1px translucent border · zero drop shadow*
  - *Traits:* Translucent 1px border · Concentric inner radius · Zero elevation blur
- **Approved Secondary Patterns (1):**
  - **Layered Tactile Shadow** — *Multi-stop ambient shadow + hairline ring* (Contact ring + soft ambient, Crisp top highlight feel, Clear depth hierarchy)

### Typography & Information Rhythm
- **Primary Default:** **Tight Engineered** — *Linear / Vercel precision · negative display tracking*
  - *Traits:* Tight heading tracking · Tabular numerals · Restrained muted labels

### Buttons & Tactile Controls
- **Primary Default:** **Tactile Micro-Bevel** — *Subtle top specular inset + physical depth*
  - *Traits:* Inset top highlight · Keycap press feedback · Rich tactile affordance
- **Approved Secondary Patterns (1):**
  - **Soft Pill Continuum** — *Full-pill radius · tinted secondary fill* (Full pill geometry, Soft tinted secondary, Friendly warmth)

### Inputs & Form Ergonomics
- **Primary Default:** **Floating Kinetic Label** — *Label elevates from placeholder into top frame on focus*
  - *Traits:* Zero vertical waste · Smooth label lift · Clear empty vs filled

### Tabs & Segmented Controls
- **Primary Default:** **Icon + Tabular Counter Tabs** — *14px icon · label · live tabular numeric badge*
  - *Traits:* Tabular count badges · Semantic icon anchors · Dense queue friendly
- **Approved Secondary Patterns (4):**
  - **Architectural Underline** — *Full-width hairline rule · gliding 2px indicator* (Zero extra chrome, Page-level navigation, Scales to many tabs)
  - **Borderless Floating Pill** — *No track · soft accent-tinted active pill* (Lowest visual weight, Great for toolbars/filters, Clean hover preview)
  - **Vertical Inspector Rail** — *Left stacked rail · gliding 2px left accent bar* (Settings-native layout, Gliding vertical bar, Scales to 8+ sections)
  - **Quiet Editorial Dot** — *No boxes · weight shift + gliding 4px micro-dot* (Maximum calm, Micro-dot physics, Zero container noise)

### Dialog vs. Sheet / Drawer
- **Primary Default:** **Anchored Pop-Confirm (No Backdrop)** — *Zero full-screen dim · confirms right where you clicked*
  - *Traits:* Zero full-screen flash · Lowest friction · Origin-aware pop
- **Approved Secondary Patterns (1):**
  - **Centered Architectural Dialog** — *Hairline frame · 0.96 -> 1 spring scale · crisp footer* (0.96 -> 1 origin scale, Zero blur muddiness, Clear action hierarchy)

### Popovers & Menus
- **Primary Default:** **Searchable Filter Popover** — *Inline filter input · multi-select checkboxes · live count*
  - *Traits:* Instant keyboard filter · Tabular match count · 1-click reset
- **Approved Secondary Patterns (3):**
  - **Drill-Down Breadcrumb Menu** — *Inline horizontal slide · back header (no hover traps)* (Zero diagonal hover traps, Smooth horizontal slide, Touch & keyboard safe)
  - **Compact Inspector Popover** — *Inline switches + segmented control in a tight card* (Live-apply toggles, Concentric card layout, Zero Save ceremony)
  - **Structured Icon / Mode Grid** — *3x2 tactile tile grid inside concentric popover* (Fast visual scanning, Compact vertical height, Tactile active ring)

### Command Palette (cmdk UX)
- **Primary Default:** **Pinned Quick-Actions + List** — *Top 3 tactile action tiles · searchable list beneath*
  - *Traits:* Zero-query utility · Adaptive on typing · Great for daily workflows
- **Approved Secondary Patterns (2):**
  - **Linear Grouped Switcher** — *Clean search header · grouped rows · shortcut keycaps* (Zero visual clutter, Instant arrow selection, Right-aligned shortcuts)
  - **Category-Filtered Command Bar** — *Search input + compact All / Actions / Navigation pills* (Scales to 100+ items, Tabular result counts, Zero noisy scroll)

### Toasts & Notifications (Sonner UX)
- **Primary Default:** **Sonner Stacked Deck** — *Depth-scaled stack · expands on hover · interruptible*
  - *Traits:* Physical depth stack · Hover-to-expand deck · Interruptible transitions
- **Approved Secondary Patterns (8):**
  - **Top-Center Status Pill** — *Compact morphing capsule · spinner -> check state* (Morphing state icon, Minimal screen footprint, Ultra-calm feedback)
  - **Optimistic Action + Undo Bar** — *Instant action · live countdown Undo button · no modal* (Zero confirm friction, Live Undo recovery, Best-in-class UX)
  - **Hairline Toast + Timer Rule** — *Crisp architectural card · 2px bottom auto-dismiss bar* (Honest dismiss timing, Pause-on-hover safety, Architectural geometry)
  - **Expandable Diagnostic Toast** — *Calm summary · toggleable stack/request ID + copy* (Progressive error detail, 1-click trace copy, Calm failure tone)
  - **In-Place Promise Lifecycle Toast** — *Single toast morphs Pending -> Success or Failed (Retry)* (Zero duplicate toasts, Inline retry recovery, Sonner promise native)
  - **Two-Action Decision Toast** — *Non-blocking prompt with explicit Primary / Dismiss pair* (Non-blocking decision, Clear primary CTA, Respects current task)
  - **Slim Top System Banner** — *Full-width hairline bar for persistent workspace states* (Persistent system truth, Zero auto-vanish risk, Slim vertical footprint)
  - **Coalesced Batch Digest Toast** — *Rapid events merge into one live tabular counter pill* (Anti-spam coalescing, Live tabular counter, Calm high-frequency UX)

### App Shell & Sidebar Navigation
- **Primary Default:** **Recessed Rail + Floating Inset Canvas** — *Quiet --surface-0 chrome · elevated rounded --surface-1 stage*
  - *Traits:* Clear stage focus · Concentric shell geometry · Low border noise
- **Approved Secondary Patterns (4):**
  - **Slim App Rail + Contextual Sub-Panel** — *44px icon rail · toggleable secondary tree sidebar* (Two-tier hierarchy, Instant module switching, Scales to complex apps)
  - **Auto-Slim Rail with Pin / Peek** — *Icon rail by default · glides open on hover or pin* (Maximum reading width, Effortless hover peek, Optional lock-pin)
  - **Minimal Canvas + Floating Bottom Dock** — *Full-bleed workspace · centered floating pill dock* (100% open canvas, Desktop & mobile unified, Tactile dock focus)
  - **Canvas + Toggleable Right Inspector** — *Focused main stage · collapsible right properties/AI panel* (Editor & AI copilot ready, 1-click panel toggle, Balanced asymmetric layout)

### Tables, Filtering & Bulk Actions
- **Primary Default:** **Multi-Select + Floating Bulk Bar** — *Row checkboxes · elevated action pill rises on selection*
  - *Traits:* Zero resting toolbar clutter · Spring bulk action pill · Instant count badge
- **Approved Secondary Patterns (5):**
  - **Crisp Hairline Sortable Grid** — *1px horizontal hairlines · mono sort headers · tabular nums* (Zero vertical noise, Tabular-nums aligned, 1-click sort headers)
  - **Faceted Filter Pills + Live Search** — *Inline search + status facet chips · live match count* (1-click facet toggle, Live filtered count, Instant clear-all)
  - **High-Density Financial / Ops Ledger** — *Tight row rhythm · zebra micro-tint · monospace deltas* (Maximum rows per inch, Monospace precision, Right-aligned deltas)
  - **Adaptive Table → Mobile Card Stack** — *Structured grid on desktop · clean stacked cards at 390px* (Zero horizontal scroll trap, Clean 390px reflow, Preserves hierarchy)
  - **Pinned Totals & Pagination Footer** — *Sticky aggregate summary row · compact page stepper* (Live aggregate totals, Compact page controls, Clear row range info)

### Empty, Loading & Error States
- **Primary Default:** **Geometry-Matched Structural Skeleton** — *Mirrors exact card/row layout · zero layout shift on load*
  - *Traits:* Zero CLS layout jump · Subtle pulse restraint · 1:1 geometry fidelity
- **Approved Secondary Patterns (7):**
  - **Focused Empty State + 1 Primary CTA** — *Crisp hairline emblem · clear value copy · 1 decisive button* (Zero stock-art fluff, Single primary action, Quiet hairline frame)
  - **Stale-While-Revalidating Hairline** — *Cached data stays interactive · 2px top hairline sync indicator* (Zero blank-screen flash, Always-interactive cache, Quiet 2px sync rule)
  - **Isolated Card Error Boundary** — *Healthy widgets stay live · failed slot degrades cleanly* (Blast-radius containment, Independent widget retry, Resilient dashboard UX)
  - **Zero-Match Search + 1-Click Reset** — *Echoes active query/filters · instant Clear Filters CTA* (Explains active filters, 1-click filter clear, Zero dead-end search)
  - **Multi-Step Progress Checklist Loader** — *Named pipeline stages · live checkmarks + elapsed ms* (Honest multi-step status, Tabular elapsed time, Builds user trust)
  - **Clear Permission / Access Gate** — *Minimal lock card · exact role needed · Request Access CTA* (Actionable 403 UX, Explicit role clarity, 1-click access request)
  - **Offline Degraded Banner + Cached View** — *Read-only cached snapshot · queued edits counter · Reconnect* (Honest offline state, Queued edit visibility, Zero silent data loss)

### AI Streaming Text & Markdown UX
- **Primary Default:** **Streamdown Soft Token Fade-In** — *Chunked opacity glide · zero harsh cursor flicker · prose rhythm*
  - *Traits:* Editorial reading flow · Zero jittery flicker · Replayable live stream
- **Approved Secondary Patterns (6):**
  - **Precision Monospace Block Caret** — *Crisp terminal-grade streaming cursor · exact live anchor* (Crisp active anchor, Developer-tool native, Clean completion settle)
  - **Floating Stop / Regenerate Control Pill** — *Centered interrupt button during stream · Regenerate on stop* (Instant stream interrupt, Zero layout shift, Clean state morph)
  - **Structured Artifact / Deliverable Card** — *Inline clickable artifact pill · expandable preview canvas* (Clean prose vs output, Version badge + stats, 1-click canvas expand)
  - **Version Switcher (`1 / 3` Branches)** — *Prev/Next branch stepper · preserves prior generations cleanly* (Non-destructive retries, Tabular branch stepper, Instant version diff)
  - **Auto-Scroll Pause + "Jump to Latest" Pill** — *Detects manual scroll-up · floats subtle Jump-to-bottom pill* (Never fights user scroll, Floating jump-to-latest, Unread stream indicator)
  - **Live Streaming Structured Data Block** — *Progressive row-by-row table population with tabular alignment* (Zero broken MD pipes, Row-by-row entrance, Tabular comparison clarity)

### Thinking Traces & Tool-Call Chips
- **Primary Default:** **Collapsed "Thought for 3.2s" Pill** — *Single quiet disclosure line · expands soft muted trace*
  - *Traits:* Minimal resting footprint · Tabular elapsed time · Clean trace disclosure
- **Approved Secondary Patterns (8):**
  - **Vertical Hairline Step Timeline** — *1px vertical rail · discrete step nodes · live active indicator* (Clear execution order, Crisp 1px vertical rail, Calm active progress)
  - **Live Shell Command + Collapsible Output** — *Mono command header · exit code badge · toggleable stdout* (Honest exit-code badge, Collapsed noisy stdout, Mono precision)
  - **Grouped File-Read / Search Cluster** — *Coalesces "Read 5 files · Searched 2 queries" into 1 row* (Anti-spam grouping, Expandable file list, Line-range links)
  - **Concurrent Subagent Status Grid** — *Compact 2-col worker cards · live role + step + status* (Parallel clarity, Compact worker cards, Live step telemetry)
  - **Expandable JSON Args / Result Inspector** — *Tool name + latency pill · segmented Input / Output JSON view* (Input/Output tab split, Mono JSON formatting, Developer debug native)
  - **Search Query + Retrieved Source Strip** — *Query chip + compact horizontal source cards with domains* (Transparent queries, Scannable source strip, Zero visual noise)
  - **Quiet Mono Telemetry Footer** — *Subtle response metadata · tok/s · TTFT · context window %* (Tabular tok/s & TTFT, Context budget awareness, Ultra-quiet typography)
  - **Live Updating Plan Checklist** — *Compact task card inside stream · live checkmarks + counter* (Clear completion ratio, Live step checkmarks, High-trust agent UX)

### HITL Approvals, Diffs & Safety Gates
- **Primary Default:** **Crisp Inline Approve / Reject Bar** — *Action summary · keyboard hints (Y/N) · instant inline settle*
  - *Traits:* Zero modal interruption · Keyboard shortcut hints · Crisp settled receipt
- **Approved Secondary Patterns (9):**
  - **Unified Hairline Diff + Per-Hunk Apply** — *File header + +/- counts · accept or reject individual hunks* (Per-hunk granularity, Tabular +/- delta badge, Clean mono typography)
  - **Side-by-Side Before / After Diff** — *Two-column comparison · collapses cleanly on 390px mobile* (Instant before/after scan, Responsive 390px stack, Clear column labels)
  - **Granular Permission Scope Picker** — *Allow Once · Allow for Session · Always Allow for Tool* (Cures approval fatigue, Explicit trust duration, Safe default (Once))
  - **Elevated Destructive Command Gate** — *Danger border · exact command preview · explicit confirm* (Unmistakable risk tier, Exact command preview, Deliberate friction)
  - **Edit Tool Arguments Before Approving** — *Tweak agent-proposed fields inline · then Approve & Run* (Zero re-prompt loop, Direct parameter control, Collaborative HITL)
  - **Multi-File Patch Queue + Checkboxes** — *Select which proposed file edits to apply · batch Apply CTA* (Selective batch apply, Per-file diff counts, Clear blast radius)
  - **Instant Post-Action Checkpoint Rollback** — *Auto-runs safe edits · exposes 1-click Revert Checkpoint bar* (Maximum agent speed, Zero-fear undo safety, Git-checkpoint native)
  - **Structured Multiple-Choice Question Card** — *Agent asks crisp choices + Recommended tag before building* (2-second disambiguation, Recommended badge, Zero prose friction)
  - **Transparent Auto-Approved Rule Chip** — *Quiet audit badge · "Auto-approved by rule" · 1-click revoke* (Zero silent magic, Auditable trust rule, 1-click revoke safety)

### Cards, KPIs & Bento Layouts
- **Primary Default:** **KPI Stat Card + Sparkline** — *Tabular headline figure · delta badge · live timeframe sparkline*
  - *Traits:* Tabular numerals · Live 7D/30D switch · Zero chart clutter
- **Approved Secondary Patterns (8):**
  - **Tactile Radio / Plan Choice Card** — *Full-card click target · crisp active border · check indicator* (Large hit target, Unmistakable active ring, Zero radio-dot hunt)
  - **Aspect-Locked Media + Meta Card** — *Clean 16:9 frame · category pill · 2-line clamp · footer meta* (Locked media aspect, 2-line text clamp, Clean metadata footer)
  - **Chronological Activity Feed Card** — *1px vertical feed rail · quiet timestamps · compact event rows* (Quiet vertical rail, Scannable timestamps, Zero box-in-box bloat)
  - **Usage & Quota Progress Card** — *Hairline capacity track · tabular usage ratio · upgrade CTA* (Tabular capacity ratio, Clear threshold bar, Actionable footer)
  - **Compact Horizontal Entity Card** — *Icon/thumb left · title + subtitle · right chevron / status* (Tight vertical height, Clean left-to-right scan, Touch-friendly row)
  - **Expandable Summary Accordion Card** — *Calm headline summary · 1-click inline detail drawer reveal* (Progressive disclosure, Preserves page rhythm, Zero modal jump)
  - **Pricing Tier Card + Cadence Toggle** — *Monthly/Annual switch · tabular price · concise feature list* (Honest billing switch, Tabular price shift, Concise feature bullets)
  - **User / Team Profile Summary Card** — *Avatar emblem · role badge · 3 micro-stats · quick follow/message* (Balanced identity header, Tabular micro-stats, Single clear CTA)

### Steppers, Wizards & Onboarding
- **Primary Default:** **Horizontal Numbered Stepper** — *3 crisp numbered nodes · hairline connector · Back / Next bar*
  - *Traits:* Clear step count · Completed checkmarks · Predictable footer
- **Approved Secondary Patterns (7):**
  - **Left Step Rail + Form Stage** — *Sidebar step navigation · active step canvas (collapses at 390px)* (Non-linear step jump, Descriptive step labels, Responsive collapse)
  - **Minimal 2px Progress Bar Wizard** — *Zero stepper circles · 2px top progress rule · calm step slide* (Zero stepper clutter, Smooth step transition, Calm consumer feel)
  - **Getting-Started Checklist Card** — *Live % completion bar · clickable setup tasks · dismiss option* (Non-blocking activation, Live completion meter, 1-click task launch)
  - **Single-Question Focused Flow** — *One decision at a time · instant auto-advance · Enter shortcut* (Highest completion rate, Zero visual overload, Instant click advance)
  - **Progressive Inline Section Reveal** — *All on one page · Step 2 unlocks cleanly once Step 1 completes* (Single-page context, Smooth section unlock, Completed step summary)
  - **Final Review & Edit Summary Step** — *Grouped key-value recap · inline Edit buttons · final Submit CTA* (Confidence before submit, Per-section Edit jump, Clean tabular summary)
  - **Saved Draft Resume Strip** — *Compact "2 of 4 steps saved" card · Continue / Discard actions* (Zero lost form work, Tabular step progress, Clean discard option)

### Pickers, Uploads & Rich Controls
- **Primary Default:** **Tactile Dropzone + Live Progress** — *Dashed hairline drop area · file queue · progress bar + remove*
  - *Traits:* Clear file limits · Live per-file progress · 1-click remove
- **Approved Secondary Patterns (9):**
  - **Avatar / Cover Image Picker** — *Live circular preview · instant Replace / Remove controls* (Instant visual preview, Zero raw file input, Clean Replace/Remove)
  - **Date Range Calendar + Presets** — *Quick presets (7d / 14d / Month) · crisp range highlight grid* (1-click range presets, Tabular calendar grid, Clear start/end highlight)
  - **Day + Time-Slot Booking Picker** — *Compact day pills · tactile time-slot grid · timezone label* (Zero dropdown hunting, Clear timezone label, Tactile slot grid)
  - **Multi-Select Tag Combobox (+ Create)** — *Removable tag chips · live filter · inline "Create tag" option* (Inline tag creation, 1-click chip remove, Keyboard Enter support)
  - **Synced Range Slider + Numeric Box** — *Smooth slider thumb paired with editable tabular numeric input* (Fast scrub + exact type, Tabular live value, Accessible keyboard step)
  - **Precision Quantity Stepper (`− N +`)** — *Tactile minus/plus buttons · centered tabular count · min/max bounds* (Clear min/max bounds, Tabular center readout, Zero typing required)
  - **Compact Rating + Optional Note** — *Interactive 1–5 star bar · reveals subtle comment input on pick* (Low-friction 1st tap, Progressive note reveal, Clean thank-you state)
  - **Share Link + Permission Selector** — *Access level dropdown · 1-click Copy Link · email invite bar* (Instant Copy feedback, Clear access levels, Unified invite flow)
  - **Tactile Variant / Size Tile Picker** — *Structured option tiles (S/M/L/XL) · out-of-stock state · active ring* (All options visible, Clear unavailable state, Tactile press response)

### Lists, Feeds & Settings Pages
- **Primary Default:** **Structured Settings Section Rows** — *Hairline row list · clear title + helper · right-aligned control*
  - *Traits:* Predictable alignment · Quiet helper copy · Hairline dividers
- **Approved Secondary Patterns (9):**
  - **Live-Apply Preference Switches** — *Tactile switch pills · instant save indicator · zero Save button* (Zero Save ceremony, Accessible switch track, Instant state clarity)
  - **Scannable Notification / Inbox List** — *Unread accent dot · sender + snippet · 1-click Mark Read* (Clear unread signal, 1-click mark read, Tabular timestamps)
  - **Compact Comment Thread + Composer** — *Clean avatar-initial rows · reaction count · inline reply box* (Inline reply flow, 1-click reactions, Clean author hierarchy)
  - **Structured Key–Value Spec Sheet** — *2-column metadata grid · mono IDs · 1-click copy values* (Fast attribute scan, 1-click ID copy, Responsive 2-col grid)
  - **Tactile Reorderable Priority List** — *Grip handle · smooth Up/Down reorder buttons · rank badge* (Keyboard & touch safe, Smooth layout reorder, Tabular rank index)
  - **Team Roster + Inline Role Picker** — *Member rows · email subtext · inline Admin/Editor/Viewer select* (Inline role control, Clear pending status, Compact member density)
  - **Billing Summary + Invoice Rows** — *Card-on-file header · tabular invoice amounts · download PDF* (Tabular currency alignment, 1-click receipt action, Calm trust hierarchy)
  - **App-Wide Search Results List** — *Highlighted match terms · entity type chip · breadcrumb path* (Highlighted match, Entity type pill, Clean breadcrumb context)
  - **Grid / List View Switcher Collection** — *Segmented Grid vs List toggle · smooth layout reflow* (User-controlled density, Instant layout switch, Consistent item actions)

### Data Viz, Progress & Status
- **Primary Default:** **Interactive Column Chart + Readout** — *Hover highlights active bar · crisp header readout · tabular scale*
  - *Traits:* Zero tooltip occlusion · Crisp active highlight · Tabular readout
- **Approved Secondary Patterns (8):**
  - **Monochrome Area Trend + Range Switch** — *Smooth SVG trend curve · subtle fill · 24H / 7D / 30D segmented bar* (Theme-adaptive vector, Instant range toggle, Clean headline total)
  - **Proportional Stacked Breakdown Bar** — *Single horizontal bar · interactive category legend highlight* (Beats pie charts, Hover legend sync, Tabular percentages)
  - **Concentric Radial Progress Ring** — *Clean SVG ring · centered tabular % · interactive goal step* (Crisp SVG geometry, Tabular center stat, Compact footprint)
  - **Activity / Habit Heatmap Strip** — *Opacity-stepped day cells · live hover date + count readout* (Single-accent opacity scale, Hover day readout, High temporal density)
  - **Service Uptime Health Strip** — *24 crisp interval bars · 99.98% badge · hover incident detail* (Split-second scan, Honest degraded ticks, Clean hover readout)
  - **Horizontal Conversion Funnel** — *Proportional stage bars · tabular totals + step conversion %* (Clear drop-off math, Proportional tracks, Zero chart junk)
  - **Ranked Horizontal Bar List** — *Background proportional fill · label left · tabular value right* (Ultra-clean analytics UI, Inline fill bar, Right-aligned totals)
  - **Period-over-Period Comparison Card** — *Current vs Previous side-by-side · directional delta badge* (Instant period context, Clear directional delta, Balanced 2-col layout)

## 4. Non-Negotiable Global Rules

### Always
- Abstract all colors behind semantic tokens (--surface-*, --ink-*, --border-*, --accent); never hardcode project hex colors in taste components.
- Compute nested border radii concentrically (inner = max(0, outer - padding)).
- Guard hover effects behind @media (hover: hover) and (pointer: fine).

### Never
- Never scale elements in from scale(0); use subtle origin-aware scale (0.95 -> 1) with opacity.
- Never ship generic eyebrow badge pills, pulsing status dots without live telemetry, or arbitrary Tailwind pixel values.

## 5. Color Contrast & Accessibility Rules (WCAG 2.1 + APCA Lc)

- **Never guess contrast by eye**, especially on dark surfaces, tinted badges, or custom brand accents.
- **Body & Interactive Labels (`--ink-1`, `--ink-2`, `--accent-ink` on `--accent`, `--danger-ink` on `--danger`):** Minimum **WCAG 4.5:1** AND **APCA `|Lc| >= 60`** (target AAA `7.0:1` / `Lc 75` for long-form prose).
- **Large Headings, Icons, Borders, Focus Rings & Muted Metadata (`--ink-3`, `--accent` on `--surface-1`, `--success`):** Minimum **WCAG 3.0:1** AND **APCA `|Lc| >= 45`**. Never use `--ink-3` for critical body text or error messages.
- **Tinted Soft Surfaces (`--accent-soft`, `--danger-soft`):** Always pair soft tinted backgrounds with full-contrast foreground text (`--ink-1`, `--accent`, or `--danger`), never white-on-pastel or muted-on-tinted.
- **Dark Mode Polarity:** Light text on dark surfaces requires slightly higher APCA perceptual headroom and translucent white borders (`rgba(255, 255, 255, 0.08–0.16)`) instead of dark shadows.
- **Deterministic Gate:** Run `npm run lint:taste` (or `npx taste-lint`) after every UI or theme change to verify zero failing contrast pairs and zero raw hex leaks.

## 6. Registry-First & MCP Tooling Protocol

- **Never hand-roll complex primitives from scratch** when an accessible, source-owned registry component exists.
- **Query installed registries & MCP servers first:**
  1. **Foundations:** `shadcn MCP` + `@coss` (Base UI + Tailwind v4) for dialogs, drawers, popovers, forms, tabs.
  2. **Complex SaaS & Specialists:** `@diceui` (faceted filters, action bar, stepper, combobox), `@kibo-ui` (kanban, dropzone, calendars), `Sonner` (toasts), `cmdk` (command palette), `NumberFlow` (tabular metrics).
  3. **Motion & Expressive Blocks (sparingly):** `@motion-primitives`, `@cult-ui`, `@react-bits`, `21st MCP` (search & preview before installing).
  4. **Verification MCPs:** `Axe MCP` (WCAG / ARIA audit), `Playwright MCP` / `Chrome DevTools MCP` (390px + 1440px live layout & computed contrast verification), `Storybook MCP` & `Figma MCP` (when working in an existing design system).
- **Restyle every installed component immediately** onto the semantic token contract (`--surface-*`, `--ink-*`, `--border-*`, `--accent`) and calibrated Craft Dials above.
