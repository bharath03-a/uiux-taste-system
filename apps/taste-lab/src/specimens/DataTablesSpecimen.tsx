import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUp,
  Archive,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Pencil,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

interface RowRecord {
  id: string;
  name: string;
  breakName: string;
  owner: string;
  status: 'Active' | 'Queued' | 'Paused';
  latencyMs: number;
  requests: number;
  delta: string;
  detail: string;
}

const INITIAL_ROWS: RowRecord[] = [
  {
    id: 'r1',
    name: 'edge-token-sync',
    breakName: 'enterprise-global-semantic-token-synchronizer-us-west-2',
    owner: 'maya',
    status: 'Active',
    latencyMs: 14,
    requests: 48210,
    delta: '+12.4%',
    detail: 'region: iad1 · runtime: edge-v22 · 0 schema drift violations in 24h',
  },
  {
    id: 'r2',
    name: 'contrast-auditor',
    breakName: 'deterministic-wcag-aa-contrast-verification-pipeline-v4',
    owner: 'devon',
    status: 'Active',
    latencyMs: 38,
    requests: 19405,
    delta: '+4.1%',
    detail: 'region: sfo1 · checks: 18 semantic slots · p99 under 45ms',
  },
  {
    id: 'r3',
    name: 'registry-bundler',
    breakName: 'shadcn-v4-source-owned-component-registry-compiler',
    owner: 'sara',
    status: 'Queued',
    latencyMs: 112,
    requests: 6320,
    delta: '-2.3%',
    detail: 'region: fra1 · waiting on artifact checksum signature · 3 files queued',
  },
  {
    id: 'r4',
    name: 'skill-sync-hook',
    breakName: 'cross-harness-portable-agent-skill-synchronizer-daemon',
    owner: 'alex',
    status: 'Paused',
    latencyMs: 24,
    requests: 12980,
    delta: '0.0%',
    detail: 'region: nrt1 · paused by policy rule · last sync 14m ago',
  },
];

export function DataTablesSpecimen({ variantId, ctx }: Props) {
  const { dials, breakUi, mobilePreview } = ctx;
  const [rows, setRows] = useState<RowRecord[]>(INITIAL_ROWS);
  const [sortBy, setSortBy] = useState<'name' | 'latencyMs' | 'requests'>('requests');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>(['r1', 'r2']);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Queued' | 'Paused'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('r1');
  const [hoveredId, setHoveredId] = useState<string | null>('r2');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [flashMsg, setFlashMsg] = useState<string | null>(null);

  const outerR = Math.max(6, dials.baseRadius);
  const innerR = dials.concentricRadii ? Math.max(4, outerR - 4) : outerR;
  const padY = dials.density === 'compact' ? 'py-1.5' : dials.density === 'airy' ? 'py-3' : 'py-2';

  const transition =
    dials.motionMode === 'instant'
      ? { duration: 0 }
      : dials.motionMode === 'spring'
        ? { type: 'spring' as const, stiffness: dials.springStiffness, damping: dials.springDamping }
        : { duration: dials.durationMs / 1000, ease: [0.22, 1, 0.36, 1] as const };

  const flash = (msg: string) => {
    setFlashMsg(msg);
    window.setTimeout(() => setFlashMsg(null), 1400);
  };

  const toggleSort = (col: 'name' | 'latencyMs' | 'requests') => {
    if (sortBy === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortDir('desc');
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'name') return a.name.localeCompare(b.name) * dir;
    return (a[sortBy] - b[sortBy]) * dir;
  });

  const filteredRows = rows.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q);
  });

  const toggleRowSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const frameStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: `${outerR}px`,
    overflow: 'hidden',
  };

  // 01. Crisp Hairline Sortable Grid
  if (variantId === 'hairline-sortable-table') {
    const SortArrow = sortDir === 'asc' ? ArrowUp : ArrowDown;
    return (
      <div style={frameStyle}>
        <div
          className="grid grid-cols-[1.4fr_0.7fr_0.8fr] items-center px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em]"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <button
            type="button"
            onClick={() => toggleSort('name')}
            className="inline-flex items-center gap-1 text-left"
            style={{ color: sortBy === 'name' ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            Service {sortBy === 'name' && <SortArrow className="h-3 w-3" />}
          </button>
          <button
            type="button"
            onClick={() => toggleSort('latencyMs')}
            className="inline-flex items-center justify-end gap-1"
            style={{ color: sortBy === 'latencyMs' ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            p95 {sortBy === 'latencyMs' && <SortArrow className="h-3 w-3" />}
          </button>
          <button
            type="button"
            onClick={() => toggleSort('requests')}
            className="inline-flex items-center justify-end gap-1"
            style={{ color: sortBy === 'requests' ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            Reqs/h {sortBy === 'requests' && <SortArrow className="h-3 w-3" />}
          </button>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {sortedRows.map((row) => (
            <div
              key={row.id}
              className={`grid grid-cols-[1.4fr_0.7fr_0.8fr] items-center px-3 ${padY} text-[12px] transition-colors hover:bg-[var(--surface-2)]`}
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                {breakUi ? row.breakName : row.name}
              </span>
              <span
                className="tabular-nums-auto text-right text-[11.5px]"
                style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {row.latencyMs}ms
              </span>
              <span
                className="tabular-nums-auto text-right text-[11.5px]"
                style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {row.requests.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 02. Multi-Select + Floating Bulk Bar
  if (variantId === 'bulk-select-floating-bar') {
    const allChecked = selectedIds.length === rows.length;
    return (
      <div className="relative flex flex-col pb-12" style={frameStyle}>
        <div
          className="flex items-center justify-between px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em]"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <label className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={() => setSelectedIds(allChecked ? [] : rows.map((r) => r.id))}
              className="accent-[var(--accent)]"
            />
            <span>Worker</span>
          </label>
          <span>{flashMsg ?? 'Status'}</span>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {rows.map((row) => {
            const checked = selectedIds.includes(row.id);
            return (
              <label
                key={row.id}
                className={`flex cursor-pointer items-center justify-between gap-2 px-3 ${padY} text-[12px] transition-colors`}
                style={{
                  background: checked ? 'var(--accent-soft)' : 'transparent',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRowSelect(row.id)}
                    className="accent-[var(--accent)]"
                  />
                  <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                    {breakUi ? row.breakName : row.name}
                  </span>
                </span>
                <span className="shrink-0 text-[11px]" style={{ color: 'var(--ink-3)' }}>
                  {row.status}
                </span>
              </label>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={transition}
              className="absolute right-3 bottom-2.5 left-3 flex items-center justify-between gap-2 px-2.5 py-1.5"
              style={{
                background: 'var(--surface-0)',
                border: '1px solid var(--border-strong)',
                borderRadius: `${innerR}px`,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span
                className="tabular-nums-auto text-[11.5px] font-semibold"
                style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {selectedIds.length} selected
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => flash(`Exported ${selectedIds.length}`)}
                  className="craft-pressable inline-flex h-6 items-center gap-1 px-2 text-[11px] font-medium"
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                    color: 'var(--ink-1)',
                  }}
                >
                  <Download className="h-3 w-3" /> Export
                </button>
                <button
                  type="button"
                  onClick={() => {
                    flash(`Archived ${selectedIds.length}`);
                    setSelectedIds([]);
                  }}
                  className="craft-pressable inline-flex h-6 items-center gap-1 px-2 text-[11px] font-medium"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    borderRadius: `${Math.max(4, innerR - 2)}px`,
                  }}
                >
                  <Archive className="h-3 w-3" /> Archive
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 03. Faceted Filter Pills + Live Search
  if (variantId === 'faceted-filter-table') {
    const hasFilters = search.trim() !== '' || statusFilter !== 'All';
    return (
      <div style={frameStyle}>
        <div
          className="flex flex-wrap items-center gap-1.5 px-2.5 py-2"
          style={{ background: 'var(--surface-0)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div
            className="flex min-w-[120px] flex-1 items-center gap-1.5 px-2 py-1"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-subtle)',
              borderRadius: `${innerR}px`,
            }}
          >
            <Search className="h-3 w-3 shrink-0" style={{ color: 'var(--ink-3)' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter services…"
              className="min-w-0 flex-1 bg-transparent text-[11.5px] outline-none"
              style={{ color: 'var(--ink-1)' }}
            />
          </div>
          {(['All', 'Active', 'Queued', 'Paused'] as const).map((st) => {
            const act = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className="craft-pressable px-2 py-1 text-[10.5px] font-medium"
                style={{
                  borderRadius: `${innerR}px`,
                  background: act ? 'var(--accent)' : 'var(--surface-1)',
                  color: act ? 'var(--accent-ink)' : 'var(--ink-2)',
                  border: act ? '1px solid transparent' : '1px solid var(--border-subtle)',
                }}
              >
                {st}
              </button>
            );
          })}
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
              }}
              className="inline-flex items-center gap-0.5 px-1.5 text-[10.5px]"
              style={{ color: 'var(--ink-3)' }}
            >
              <X className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {filteredRows.length === 0 ? (
            <div className="px-3 py-5 text-center text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
              No rows match current filters.
            </div>
          ) : (
            filteredRows.map((row) => (
              <div
                key={row.id}
                className={`flex items-center justify-between gap-2 px-3 ${padY} text-[12px]`}
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? row.breakName : row.name}
                </span>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[10.5px]"
                  style={{
                    background: 'var(--surface-0)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--ink-2)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  {row.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // 04. Click-to-Edit Inline Cells
  if (variantId === 'inline-editable-cells') {
    const commitEdit = (id: string) => {
      const trimmed = editDraft.trim();
      if (trimmed) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, name: trimmed } : r)));
      }
      setEditingId(null);
    };

    return (
      <div style={frameStyle}>
        <div
          className="flex items-center justify-between px-3 py-2 text-[10.5px]"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span>CLICK ANY NAME TO EDIT INLINE</span>
          <span>ENTER SAVES</span>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {rows.slice(0, 3).map((row) => {
            const isEditing = editingId === row.id;
            return (
              <div
                key={row.id}
                className={`flex items-center justify-between gap-2 px-3 ${padY} text-[12px]`}
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {isEditing ? (
                  <div className="flex min-w-0 flex-1 items-center gap-1.5">
                    <input
                      autoFocus
                      value={editDraft}
                      onChange={(e) => setEditDraft(e.target.value)}
                      onBlur={() => commitEdit(row.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEdit(row.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="craft-focus min-w-0 flex-1 px-2 py-0.5 text-[12px] outline-none"
                      style={{
                        background: 'var(--surface-0)',
                        color: 'var(--ink-1)',
                        border: '1px solid var(--accent)',
                        borderRadius: `${Math.max(4, innerR - 2)}px`,
                      }}
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        commitEdit(row.id);
                      }}
                      className="inline-flex h-6 w-6 items-center justify-center rounded"
                      style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                    >
                      <Check className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(row.id);
                      setEditDraft(row.name);
                    }}
                    className="group flex min-w-0 flex-1 items-center gap-1.5 text-left"
                  >
                    <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                      {breakUi ? row.breakName : row.name}
                    </span>
                    <Pencil
                      className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
                      style={{ color: 'var(--ink-3)' }}
                    />
                  </button>
                )}
                <span
                  className="shrink-0 text-[11px]"
                  style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                >
                  @{row.owner}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 05. Accordion Row Inspection
  if (variantId === 'expandable-row-detail') {
    return (
      <div style={frameStyle}>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {rows.slice(0, 3).map((row) => {
            const isOpen = expandedId === row.id;
            return (
              <div key={row.id} style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : row.id)}
                  className={`flex w-full items-center justify-between gap-2 px-3 ${padY} text-left text-[12px] transition-colors hover:bg-[var(--surface-2)]`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform"
                      style={{
                        color: 'var(--ink-3)',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    />
                    <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                      {breakUi ? row.breakName : row.name}
                    </span>
                  </span>
                  <span
                    className="tabular-nums-auto shrink-0 text-[11px]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {row.latencyMs}ms
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition}
                      className="overflow-hidden"
                    >
                      <div
                        className="mx-3 mb-2.5 px-2.5 py-2 text-[11px]"
                        style={{
                          background: 'var(--surface-recessed)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: `${innerR}px`,
                          color: 'var(--ink-2)',
                          fontFamily: 'var(--dial-font-mono)',
                        }}
                      >
                        {row.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 06. Quiet Hover-Reveal Row Actions
  if (variantId === 'sticky-action-hover-rows') {
    return (
      <div style={frameStyle}>
        <div
          className="flex items-center justify-between px-3 py-2 text-[10.5px]"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span>HOVER ROW TO REVEAL ACTIONS</span>
          {flashMsg && <span style={{ color: 'var(--success)' }}>{flashMsg}</span>}
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {rows.map((row) => {
            const active = hoveredId === row.id;
            return (
              <div
                key={row.id}
                onMouseEnter={() => setHoveredId(row.id)}
                onClick={() => setHoveredId(row.id)}
                className={`flex items-center justify-between gap-2 px-3 ${padY} text-[12px] transition-colors`}
                style={{
                  background: active ? 'var(--surface-2)' : 'transparent',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? row.breakName : row.name}
                </span>
                {active ? (
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        flash(`Copied ${row.name}`);
                      }}
                      className="craft-pressable inline-flex h-6 items-center gap-1 px-2 text-[10.5px] font-medium"
                      style={{
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-strong)',
                        borderRadius: `${Math.max(4, innerR - 2)}px`,
                        color: 'var(--ink-1)',
                      }}
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        flash(`Removed ${row.name}`);
                      }}
                      className="craft-pressable inline-flex h-6 w-6 items-center justify-center"
                      style={{
                        background: 'var(--danger-soft)',
                        color: 'var(--danger)',
                        borderRadius: `${Math.max(4, innerR - 2)}px`,
                      }}
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <span
                    className="tabular-nums-auto shrink-0 text-[11px]"
                    style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                  >
                    {row.requests.toLocaleString()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 07. Status-Grouped Collapsible Sections
  if (variantId === 'grouped-status-table') {
    const groups: Array<'Active' | 'Queued'> = ['Active', 'Queued'];
    return (
      <div style={frameStyle}>
        {groups.map((grp) => {
          const items = rows.filter((r) => (grp === 'Active' ? r.status === 'Active' : r.status !== 'Active'));
          const collapsed = Boolean(collapsedGroups[grp]);
          return (
            <div key={grp}>
              <button
                type="button"
                onClick={() =>
                  setCollapsedGroups((prev) => ({ ...prev, [grp]: !prev[grp] }))
                }
                className="flex w-full items-center justify-between px-3 py-1.5 text-[11px] font-semibold"
                style={{
                  background: 'var(--surface-0)',
                  borderBottom: '1px solid var(--border-subtle)',
                  color: 'var(--ink-2)',
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <ChevronDown
                    className="h-3 w-3 transition-transform"
                    style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                  />
                  <span>{grp === 'Active' ? 'Active Production' : 'Queued & Paused'}</span>
                </span>
                <span
                  className="tabular-nums-auto rounded-full px-1.5 py-0.2 text-[10px]"
                  style={{
                    background: 'var(--surface-2)',
                    color: 'var(--ink-2)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  {items.length}
                </span>
              </button>
              {!collapsed &&
                items.map((row) => (
                  <div
                    key={row.id}
                    className={`flex items-center justify-between gap-2 px-3 ${padY} text-[12px]`}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                      {breakUi ? row.breakName : row.name}
                    </span>
                    <span
                      className="tabular-nums-auto shrink-0 text-[11px]"
                      style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
                    >
                      {row.latencyMs}ms
                    </span>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  }

  // 08. High-Density Financial / Ops Ledger
  if (variantId === 'compact-density-ledger') {
    return (
      <div style={frameStyle}>
        <div
          className="grid grid-cols-[1.4fr_0.6fr_0.7fr] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em]"
          style={{
            background: 'var(--surface-recessed)',
            borderBottom: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span>Pipeline</span>
          <span className="text-right">Delta</span>
          <span className="text-right">Calls</span>
        </div>
        {rows.map((row, idx) => (
          <div
            key={row.id}
            className="grid grid-cols-[1.4fr_0.6fr_0.7fr] items-center px-2.5 py-1.5 text-[11.5px]"
            style={{
              background: idx % 2 === 1 ? 'var(--surface-0)' : 'transparent',
              fontFamily: 'var(--dial-font-mono)',
            }}
          >
            <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
              {breakUi ? row.breakName : row.name}
            </span>
            <span
              className="tabular-nums-auto text-right"
              style={{
                color: row.delta.startsWith('+')
                  ? 'var(--success)'
                  : row.delta.startsWith('-')
                    ? 'var(--danger)'
                    : 'var(--ink-3)',
              }}
            >
              {row.delta}
            </span>
            <span className="tabular-nums-auto text-right" style={{ color: 'var(--ink-2)' }}>
              {row.requests.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 09. Adaptive Table -> Mobile Card Stack
  if (variantId === 'table-card-responsive') {
    if (mobilePreview) {
      return (
        <div className="flex flex-col gap-2">
          {rows.slice(0, 3).map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-1.5 p-3"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-subtle)',
                borderRadius: `${outerR}px`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[12.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>
                  {breakUi ? row.breakName : row.name}
                </span>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[10px]"
                  style={{
                    background: 'var(--surface-0)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--ink-2)',
                    fontFamily: 'var(--dial-font-mono)',
                  }}
                >
                  {row.status}
                </span>
              </div>
              <div
                className="flex items-center justify-between text-[11px]"
                style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}
              >
                <span>p95: {row.latencyMs}ms</span>
                <span className="tabular-nums-auto">{row.requests.toLocaleString()} req/h</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div style={frameStyle}>
        <div
          className="grid grid-cols-[1.4fr_0.7fr_0.6fr_0.8fr] px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em]"
          style={{
            background: 'var(--surface-0)',
            borderBottom: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
            fontFamily: 'var(--dial-font-mono)',
          }}
        >
          <span>Service</span>
          <span>Status</span>
          <span className="text-right">p95</span>
          <span className="text-right">Req/h</span>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {rows.slice(0, 3).map((row) => (
            <div
              key={row.id}
              className={`grid grid-cols-[1.4fr_0.7fr_0.6fr_0.8fr] items-center px-3 ${padY} text-[12px]`}
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                {breakUi ? row.breakName : row.name}
              </span>
              <span className="text-[11px]" style={{ color: 'var(--ink-2)' }}>
                {row.status}
              </span>
              <span
                className="tabular-nums-auto text-right text-[11.5px]"
                style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {row.latencyMs}ms
              </span>
              <span
                className="tabular-nums-auto text-right text-[11.5px]"
                style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
              >
                {row.requests.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div
          className="px-3 py-1.5 text-[10.5px]"
          style={{
            background: 'var(--surface-0)',
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--ink-3)',
          }}
        >
          Toggle 390px in top bar to inspect automatic mobile card reflow.
        </div>
      </div>
    );
  }

  // 10. Pinned Totals & Pagination Footer
  const pageSize = 2;
  const totalPages = Math.ceil(rows.length / pageSize);
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);
  const totalReqs = rows.reduce((sum, r) => sum + r.requests, 0);

  return (
    <div style={frameStyle}>
      <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {pageRows.map((row) => (
          <div
            key={row.id}
            className={`flex items-center justify-between gap-2 px-3 ${padY} text-[12px]`}
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
              {breakUi ? row.breakName : row.name}
            </span>
            <span
              className="tabular-nums-auto shrink-0 text-[11.5px]"
              style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}
            >
              {row.requests.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Pinned aggregate summary row */}
      <div
        className="flex items-center justify-between px-3 py-2 text-[11.5px] font-semibold"
        style={{
          background: 'var(--surface-0)',
          borderTop: '1px solid var(--border-strong)',
          color: 'var(--ink-1)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        <span>Total ({rows.length} services)</span>
        <span className="tabular-nums-auto">{totalReqs.toLocaleString()} req/h</span>
      </div>

      {/* Compact pagination footer */}
      <div
        className="flex items-center justify-between px-3 py-1.5 text-[11px]"
        style={{
          background: 'var(--surface-recessed)',
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--ink-3)',
          fontFamily: 'var(--dial-font-mono)',
        }}
      >
        <span className="tabular-nums-auto">
          Page {page} / {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="craft-pressable inline-flex h-6 w-6 items-center justify-center rounded disabled:opacity-40"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--ink-1)',
            }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="craft-pressable inline-flex h-6 w-6 items-center justify-center rounded disabled:opacity-40"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--ink-1)',
            }}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
