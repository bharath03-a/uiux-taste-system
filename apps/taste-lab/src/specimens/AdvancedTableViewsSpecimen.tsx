import { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronRight,
  Columns3,
  Download,
  Filter,
  Kanban,
  LayoutList,
  PanelRight,
  Plus,
  Search,
  SlidersHorizontal,
  Table2,
  Upload,
  X,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

interface AppRecord {
  id: string;
  name: string;
  owner: string;
  env: 'Prod' | 'Staging' | 'Dev';
  status: 'Healthy' | 'Degraded' | 'Paused';
  region: 'us-east' | 'eu-west' | 'ap-south';
  latencyMs: number;
  requestsK: number;
  spend: number;
  updated: string;
}

const SAMPLE_APPS: AppRecord[] = [
  { id: 'APP-104', name: 'Billing Core API', owner: 'A. Chen', env: 'Prod', status: 'Healthy', region: 'us-east', latencyMs: 42, requestsK: 842, spend: 4120, updated: '2m ago' },
  { id: 'APP-108', name: 'Claims Ingestion Worker', owner: 'R. Patel', env: 'Prod', status: 'Degraded', region: 'us-east', latencyMs: 284, requestsK: 519, spend: 2890, updated: '5m ago' },
  { id: 'APP-112', name: 'Identity SSO Gateway', owner: 'M. Silva', env: 'Prod', status: 'Healthy', region: 'eu-west', latencyMs: 31, requestsK: 1240, spend: 3640, updated: '11m ago' },
  { id: 'APP-119', name: 'Analytics Warehouse Sync', owner: 'K. Okafor', env: 'Staging', status: 'Paused', region: 'eu-west', latencyMs: 118, requestsK: 94, spend: 780, updated: '1h ago' },
  { id: 'APP-125', name: 'Webhook Dispatch Relay', owner: 'J. Morales', env: 'Dev', status: 'Healthy', region: 'ap-south', latencyMs: 65, requestsK: 210, spend: 460, updated: '3h ago' },
];

export function AdvancedTableViewsSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'saved-views-column-controls':
      return <SavedViewsColumnControls ctx={ctx} />;
    case 'multi-condition-filter-builder':
      return <MultiConditionFilterBuilder ctx={ctx} />;
    case 'pinned-columns-horizontal-grid':
      return <PinnedColumnsHorizontalGrid ctx={ctx} />;
    case 'multi-view-table-board-split':
      return <MultiViewTableBoardSplit ctx={ctx} />;
    case 'hierarchical-tree-grid':
      return <HierarchicalTreeGrid ctx={ctx} />;
    case 'spreadsheet-keyboard-summary-grid':
      return <SpreadsheetKeyboardSummaryGrid ctx={ctx} />;
    case 'split-table-detail-inspector':
      return <SplitTableDetailInspector ctx={ctx} />;
    case 'grouped-aggregation-subtotals':
      return <GroupedAggregationSubtotals ctx={ctx} />;
    case 'server-pagination-select-all':
      return <ServerPaginationSelectAll ctx={ctx} />;
    case 'export-import-column-mapper':
      return <ExportImportColumnMapper ctx={ctx} />;
    default:
      return null;
  }
}

// 01 · Saved Views + Column Visibility + Density Bar
function SavedViewsColumnControls({ ctx }: { ctx: SpecimenContext }) {
  const [view, setView] = useState<'all' | 'prod' | 'degraded'>('all');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');
  const [colsOpen, setColsOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>({
    owner: true,
    env: true,
    region: true,
    latency: true,
    spend: true,
  });

  const rows = useMemo(() => {
    if (view === 'prod') return SAMPLE_APPS.filter((a) => a.env === 'Prod');
    if (view === 'degraded') return SAMPLE_APPS.filter((a) => a.status !== 'Healthy');
    return SAMPLE_APPS;
  }, [view]);

  const padY = density === 'compact' ? 'py-1.5' : 'py-3';

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      {/* Saved View Tabs + Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: 'all' as const, label: 'All Services', count: SAMPLE_APPS.length },
            { id: 'prod' as const, label: 'Production', count: 3 },
            { id: 'degraded' as const, label: 'Needs Attention', count: 2 },
          ].map((t) => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setView(t.id)}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors"
                style={{
                  background: active ? 'var(--surface-2)' : 'transparent',
                  color: active ? 'var(--ink-1)' : 'var(--ink-3)',
                  border: active ? '1px solid var(--border-subtle)' : '1px solid transparent',
                }}
              >
                <span>{t.label}</span>
                <span className="tabular-nums-auto text-[10px]" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-3)' }}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setDensity((d) => (d === 'compact' ? 'comfortable' : 'compact'))}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}
          >
            <SlidersHorizontal className="h-3 w-3" />
            {density === 'compact' ? 'Compact' : 'Comfortable'}
          </button>
          <button
            type="button"
            onClick={() => setColsOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
            style={{ background: colsOpen ? 'var(--accent-soft)' : 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          >
            <Columns3 className="h-3 w-3" />
            Columns ({Object.values(visibleCols).filter(Boolean).length}/5)
          </button>

          {colsOpen && (
            <div
              className="absolute right-0 top-full z-20 mt-1.5 flex w-44 flex-col gap-1 rounded-lg p-2"
              style={{ background: 'var(--surface-1)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-md)' }}
            >
              {Object.entries(visibleCols).map(([key, on]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className="flex items-center justify-between rounded px-2 py-1 text-[11.5px] capitalize"
                  style={{ background: on ? 'var(--surface-2)' : 'transparent', color: 'var(--ink-1)' }}
                >
                  <span>{key}</span>
                  {on && <Check className="h-3 w-3" style={{ color: 'var(--accent)' }} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[12px]">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              <th className="px-3 py-2 text-[10.5px] font-semibold uppercase">Service</th>
              {visibleCols.owner && <th className="px-3 py-2 text-[10.5px] font-semibold uppercase">Owner</th>}
              {visibleCols.env && <th className="px-3 py-2 text-[10.5px] font-semibold uppercase">Env</th>}
              {visibleCols.region && <th className="px-3 py-2 text-[10.5px] font-semibold uppercase">Region</th>}
              {visibleCols.latency && <th className="px-3 py-2 text-right text-[10.5px] font-semibold uppercase">p95</th>}
              {visibleCols.spend && <th className="px-3 py-2 text-right text-[10.5px] font-semibold uppercase">Monthly</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td className={`px-3 ${padY}`}>
                  <div className="font-medium" style={{ color: 'var(--ink-1)' }}>
                    {ctx.breakUi ? `${r.name} — multi-region-failover-v2` : r.name}
                  </div>
                  <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{r.id}</div>
                </td>
                {visibleCols.owner && <td className={`px-3 ${padY}`} style={{ color: 'var(--ink-2)' }}>{r.owner}</td>}
                {visibleCols.env && (
                  <td className={`px-3 ${padY}`}>
                    <span className="rounded px-1.5 py-0.5 text-[10.5px]" style={{ background: 'var(--surface-2)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                      {r.env}
                    </span>
                  </td>
                )}
                {visibleCols.region && <td className={`px-3 ${padY}`} style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{r.region}</td>}
                {visibleCols.latency && <td className={`tabular-nums-auto px-3 text-right ${padY}`} style={{ color: r.latencyMs > 200 ? 'var(--danger)' : 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{r.latencyMs}ms</td>}
                {visibleCols.spend && <td className={`tabular-nums-auto px-3 text-right font-medium ${padY}`} style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>${r.spend.toLocaleString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 02 · Multi-Condition Filter Builder (AND / OR Query Bar)
function MultiConditionFilterBuilder({ ctx }: { ctx: SpecimenContext }) {
  const [mode, setMode] = useState<'AND' | 'OR'>('AND');
  const [rules, setRules] = useState<{ id: string; field: 'env' | 'status' | 'region'; value: string }[]>([
    { id: 'r1', field: 'env', value: 'Prod' },
    { id: 'r2', field: 'status', value: 'Healthy' },
  ]);

  const filtered = useMemo(() => {
    if (rules.length === 0) return SAMPLE_APPS;
    return SAMPLE_APPS.filter((row) => {
      const checks = rules.map((r) => row[r.field] === r.value);
      return mode === 'AND' ? checks.every(Boolean) : checks.some(Boolean);
    });
  }, [rules, mode]);

  const addQuickRule = (field: 'env' | 'status' | 'region', value: string) => {
    if (rules.some((r) => r.field === field && r.value === value)) return;
    setRules((prev) => [...prev, { id: `r-${Date.now()}`, field, value }]);
  };

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2.5" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <Filter className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
        <button
          type="button"
          onClick={() => setMode((m) => (m === 'AND' ? 'OR' : 'AND'))}
          className="rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
          style={{ background: 'var(--accent-soft)', color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}
        >
          Match {mode}
        </button>

        {rules.map((r) => (
          <span
            key={r.id}
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px]"
            style={{ background: 'var(--surface-0)', border: '1px solid var(--border-strong)', color: 'var(--ink-1)' }}
          >
            <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{r.field} =</span>
            <strong className="font-medium">{r.value}</strong>
            <button type="button" onClick={() => setRules((prev) => prev.filter((x) => x.id !== r.id))} aria-label="Remove rule">
              <X className="h-3 w-3" style={{ color: 'var(--ink-3)' }} />
            </button>
          </span>
        ))}

        <div className="ml-auto flex flex-wrap items-center gap-1">
          <button type="button" onClick={() => addQuickRule('region', 'us-east')} className="rounded px-1.5 py-0.5 text-[10.5px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}>
            + us-east
          </button>
          <button type="button" onClick={() => addQuickRule('status', 'Degraded')} className="rounded px-1.5 py-0.5 text-[10.5px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}>
            + Degraded
          </button>
          {rules.length > 0 && (
            <button type="button" onClick={() => setRules([])} className="px-1.5 py-0.5 text-[10.5px]" style={{ color: 'var(--ink-3)' }}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-[12px]" style={{ color: 'var(--ink-3)' }}>
            No applications match all conditions. Switch to OR or remove a pill.
          </div>
        ) : (
          filtered.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-2 px-3 py-2 text-[12px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="min-w-0">
                <div className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>
                  {ctx.breakUi ? `${row.name} (${row.id})` : row.name}
                </div>
                <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  {row.env} · {row.region} · {row.owner}
                </div>
              </div>
              <span
                className="shrink-0 rounded px-1.5 py-0.5 text-[10.5px] font-medium"
                style={{
                  background: row.status === 'Healthy' ? 'var(--success-soft)' : row.status === 'Degraded' ? 'var(--danger-soft)' : 'var(--surface-2)',
                  color: row.status === 'Healthy' ? 'var(--success)' : row.status === 'Degraded' ? 'var(--danger)' : 'var(--ink-2)',
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

// 03 · Pinned Left + Right Columns Horizontal Scroll Grid
function PinnedColumnsHorizontalGrid({ ctx }: { ctx: SpecimenContext }) {
  const [restartedId, setRestartedId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2 text-[11px]" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)' }}>
        <span>Scroll horizontally — Service (left) and Action (right) stay pinned</span>
        <span style={{ fontFamily: 'var(--dial-font-mono)' }}>8 columns</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-[740px] border-collapse text-left text-[11.5px]">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              <th className="sticky left-0 z-10 px-3 py-2 text-[10px] uppercase" style={{ background: 'var(--surface-1)', borderRight: '1px solid var(--border-subtle)' }}>Service</th>
              <th className="px-3 py-2 text-[10px] uppercase">Owner</th>
              <th className="px-3 py-2 text-[10px] uppercase">Env</th>
              <th className="px-3 py-2 text-[10px] uppercase">Region</th>
              <th className="px-3 py-2 text-right text-[10px] uppercase">Req/min</th>
              <th className="px-3 py-2 text-right text-[10px] uppercase">p95</th>
              <th className="px-3 py-2 text-right text-[10px] uppercase">Spend</th>
              <th className="sticky right-0 z-10 px-3 py-2 text-right text-[10px] uppercase" style={{ background: 'var(--surface-1)', borderLeft: '1px solid var(--border-subtle)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_APPS.slice(0, 4).map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td className="sticky left-0 z-10 px-3 py-2 font-medium" style={{ background: 'var(--surface-0)', borderRight: '1px solid var(--border-subtle)', color: 'var(--ink-1)' }}>
                  {ctx.breakUi ? `${r.name} · v4.12` : r.name}
                </td>
                <td className="px-3 py-2" style={{ color: 'var(--ink-2)' }}>{r.owner}</td>
                <td className="px-3 py-2" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-2)' }}>{r.env}</td>
                <td className="px-3 py-2" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-3)' }}>{r.region}</td>
                <td className="tabular-nums-auto px-3 py-2 text-right" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-2)' }}>{r.requestsK}k</td>
                <td className="tabular-nums-auto px-3 py-2 text-right" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-2)' }}>{r.latencyMs}ms</td>
                <td className="tabular-nums-auto px-3 py-2 text-right" style={{ fontFamily: 'var(--dial-font-mono)', color: 'var(--ink-1)' }}>${r.spend}</td>
                <td className="sticky right-0 z-10 px-3 py-2 text-right" style={{ background: 'var(--surface-0)', borderLeft: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => setRestartedId(r.id)}
                    className="rounded px-2 py-0.5 text-[10.5px] font-medium"
                    style={{
                      background: restartedId === r.id ? 'var(--accent)' : 'var(--surface-2)',
                      color: restartedId === r.id ? 'var(--accent-ink)' : 'var(--ink-1)',
                    }}
                  >
                    {restartedId === r.id ? 'Queued' : 'Deploy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 04 · Table / Board / Split-View Switcher on Shared Data
function MultiViewTableBoardSplit({ ctx }: { ctx: SpecimenContext }) {
  const [mode, setMode] = useState<'table' | 'board' | 'split'>('table');
  const [selectedId, setSelectedId] = useState(SAMPLE_APPS[0].id);
  const selected = SAMPLE_APPS.find((a) => a.id === selectedId) ?? SAMPLE_APPS[0];

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between gap-2 px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="text-[11.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Application Fleet</span>
        <div className="inline-flex rounded-lg p-0.5" style={{ background: 'var(--surface-recessed)', border: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'table' as const, label: 'Table', Icon: Table2 },
            { id: 'board' as const, label: 'Board', Icon: Kanban },
            { id: 'split' as const, label: 'Split', Icon: PanelRight },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
              style={{
                background: mode === id ? 'var(--surface-1)' : 'transparent',
                color: mode === id ? 'var(--ink-1)' : 'var(--ink-3)',
              }}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'table' && (
        <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
          {SAMPLE_APPS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelectedId(a.id)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-[12px]"
              style={{ background: a.id === selectedId ? 'var(--surface-2)' : 'transparent', borderBottom: '1px solid var(--border-subtle)' }}
            >
              <span className="font-medium" style={{ color: 'var(--ink-1)' }}>{a.name}</span>
              <span className="text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{a.status} · {a.latencyMs}ms</span>
            </button>
          ))}
        </div>
      )}

      {mode === 'board' && (
        <div className={`grid gap-2 p-2.5 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {(['Healthy', 'Degraded', 'Paused'] as const).map((status) => (
            <div key={status} className="flex flex-col gap-1.5 rounded-lg p-2" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
              <div className="text-[10.5px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{status}</div>
              {SAMPLE_APPS.filter((a) => a.status === status).map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSelectedId(a.id)}
                  className="rounded-md p-2 text-left text-[11.5px]"
                  style={{ background: 'var(--surface-0)', border: `1px solid ${a.id === selectedId ? 'var(--accent)' : 'var(--border-subtle)'}` }}
                >
                  <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{a.name}</div>
                  <div className="mt-0.5 text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{a.env} · {a.owner}</div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {mode === 'split' && (
        <div className={`grid ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-[1fr_220px]'}`}>
          <div style={{ borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
            {SAMPLE_APPS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setSelectedId(a.id)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-[11.5px]"
                style={{ background: a.id === selectedId ? 'var(--surface-2)' : 'transparent', borderBottom: '1px solid var(--border-subtle)' }}
              >
                <span className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>{a.name}</span>
                <span className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{a.env}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 p-3 text-[11.5px]" style={{ background: 'var(--surface-1)' }}>
            <div className="font-semibold" style={{ color: 'var(--ink-1)' }}>{selected.name}</div>
            <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{selected.id} · {selected.region}</div>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
              <div className="rounded p-1.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
                <div className="text-[9.5px]" style={{ color: 'var(--ink-3)' }}>p95</div>
                <div className="font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{selected.latencyMs}ms</div>
              </div>
              <div className="rounded p-1.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
                <div className="text-[9.5px]" style={{ color: 'var(--ink-3)' }}>Monthly</div>
                <div className="font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>${selected.spend}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 05 · Hierarchical Tree-Grid (Parent Rollups -> Child Services)
function HierarchicalTreeGrid({ ctx }: { ctx: SpecimenContext }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'org-core': true, 'org-data': false });

  const groups = [
    {
      id: 'org-core',
      name: 'Core Platform Services',
      children: SAMPLE_APPS.slice(0, 3),
    },
    {
      id: 'org-data',
      name: 'Data & Event Pipelines',
      children: SAMPLE_APPS.slice(3),
    },
  ];

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="grid grid-cols-[1fr_76px_86px] px-3 py-2 text-[10px] font-semibold uppercase" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
        <span>Hierarchy</span>
        <span className="text-right">Avg p95</span>
        <span className="text-right">Rollup</span>
      </div>
      {groups.map((g) => {
        const isOpen = expanded[g.id];
        const totalSpend = g.children.reduce((s, c) => s + c.spend, 0);
        const avgLat = Math.round(g.children.reduce((s, c) => s + c.latencyMs, 0) / g.children.length);
        return (
          <div key={g.id}>
            <button
              type="button"
              onClick={() => setExpanded((prev) => ({ ...prev, [g.id]: !prev[g.id] }))}
              className="grid w-full grid-cols-[1fr_76px_86px] items-center px-3 py-2 text-left text-[12px] font-semibold"
              style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-1)' }}
            >
              <span className="flex items-center gap-1.5">
                {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                <span>{g.name}</span>
                <span className="text-[10px] font-normal" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>({g.children.length})</span>
              </span>
              <span className="tabular-nums-auto text-right text-[11px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>{avgLat}ms</span>
              <span className="tabular-nums-auto text-right text-[11px]" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>${totalSpend.toLocaleString()}</span>
            </button>
            {isOpen &&
              g.children.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-[1fr_76px_86px] items-center py-1.5 pl-8 pr-3 text-[11.5px]"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <span className="truncate" style={{ color: 'var(--ink-2)' }}>
                    {ctx.breakUi ? `${c.name} · ${c.id}` : c.name}
                  </span>
                  <span className="tabular-nums-auto text-right text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{c.latencyMs}ms</span>
                  <span className="tabular-nums-auto text-right text-[11px]" style={{ color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>${c.spend.toLocaleString()}</span>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}

// 06 · Spreadsheet Keyboard Grid + Live Aggregation Footer
function SpreadsheetKeyboardSummaryGrid({ ctx }: { ctx: SpecimenContext }) {
  const [rows, setRows] = useState([
    { id: 'Q1', service: 'Compute Cluster', seats: 24, unitCost: 85 },
    { id: 'Q2', service: 'Managed Postgres', seats: 12, unitCost: 140 },
    { id: 'Q3', service: 'Edge CDN Bandwidth', seats: 40, unitCost: 18 },
  ]);
  const [activeCell, setActiveCell] = useState<string>('Q1:seats');

  const updateNum = (id: string, key: 'seats' | 'unitCost', val: string) => {
    const n = Math.max(0, Number(val) || 0);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: n } : r)));
  };

  const totalUnits = rows.reduce((s, r) => s + r.seats, 0);
  const grandTotal = rows.reduce((s, r) => s + r.seats * r.unitCost, 0);

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <table className="w-full border-collapse text-left text-[12px]">
        <thead>
          <tr style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
            <th className="px-3 py-1.5 text-[10px] uppercase">Line Item</th>
            <th className="px-3 py-1.5 text-right text-[10px] uppercase">Qty</th>
            <th className="px-3 py-1.5 text-right text-[10px] uppercase">Rate ($)</th>
            <th className="px-3 py-1.5 text-right text-[10px] uppercase">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td className="px-3 py-1.5 font-medium" style={{ color: 'var(--ink-1)' }}>
                {ctx.breakUi ? `${r.service} (Enterprise Reserved)` : r.service}
              </td>
              {(['seats', 'unitCost'] as const).map((field) => {
                const cellKey = `${r.id}:${field}`;
                const focused = activeCell === cellKey;
                return (
                  <td key={field} className="px-1.5 py-1 text-right">
                    <input
                      type="number"
                      value={r[field]}
                      onFocus={() => setActiveCell(cellKey)}
                      onChange={(e) => updateNum(r.id, field, e.target.value)}
                      className="tabular-nums-auto w-16 rounded px-1.5 py-1 text-right text-[11.5px] outline-none"
                      style={{
                        background: focused ? 'var(--accent-soft)' : 'var(--surface-1)',
                        color: 'var(--ink-1)',
                        border: `1px solid ${focused ? 'var(--accent)' : 'var(--border-subtle)'}`,
                        fontFamily: 'var(--dial-font-mono)',
                      }}
                    />
                  </td>
                );
              })}
              <td className="tabular-nums-auto px-3 py-1.5 text-right font-semibold" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>
                ${(r.seats * r.unitCost).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: 'var(--surface-1)', fontFamily: 'var(--dial-font-mono)' }}>
            <td className="px-3 py-2 text-[10.5px] font-semibold uppercase" style={{ color: 'var(--ink-3)' }}>SUM ({rows.length} rows)</td>
            <td className="tabular-nums-auto px-3 py-2 text-right text-[11.5px] font-semibold" style={{ color: 'var(--ink-2)' }}>{totalUnits}</td>
            <td className="px-3 py-2 text-right text-[10.5px]" style={{ color: 'var(--ink-3)' }}>—</td>
            <td className="tabular-nums-auto px-3 py-2 text-right text-[12px] font-bold" style={{ color: 'var(--accent)' }}>${grandTotal.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// 07 · Split Table + Slide-Over Detail Inspector
function SplitTableDetailInspector({ ctx }: { ctx: SpecimenContext }) {
  const [apps, setApps] = useState(SAMPLE_APPS.slice(0, 4));
  const [selectedId, setSelectedId] = useState(SAMPLE_APPS[0].id);
  const selected = apps.find((a) => a.id === selectedId) ?? apps[0];

  const cycleStatus = () => {
    const order: AppRecord['status'][] = ['Healthy', 'Degraded', 'Paused'];
    setApps((prev) =>
      prev.map((a) =>
        a.id === selected.id ? { ...a, status: order[(order.indexOf(a.status) + 1) % order.length] } : a,
      ),
    );
  };

  return (
    <div className={`grid overflow-hidden ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-[1fr_250px]'}`} style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div style={{ borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between px-3 py-2 text-[10.5px] font-semibold uppercase" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          <span>Applications</span>
          <span>Status</span>
        </div>
        {apps.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setSelectedId(a.id)}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-[12px]"
            style={{ background: a.id === selectedId ? 'var(--surface-2)' : 'transparent', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div>
              <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{a.name}</div>
              <div className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{a.owner} · {a.updated}</div>
            </div>
            <span className="rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', border: '1px solid var(--border-subtle)' }}>
              {a.status}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-3 p-3" style={{ background: 'var(--surface-1)' }}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>Inspector · {selected.id}</span>
            <span className="text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{selected.env}</span>
          </div>
          <div className="text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>{selected.name}</div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="rounded p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
              <div className="text-[9.5px]" style={{ color: 'var(--ink-3)' }}>Owner</div>
              <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{selected.owner}</div>
            </div>
            <div className="rounded p-2" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
              <div className="text-[9.5px]" style={{ color: 'var(--ink-3)' }}>Region</div>
              <div className="font-medium" style={{ color: 'var(--ink-1)', fontFamily: 'var(--dial-font-mono)' }}>{selected.region}</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={cycleStatus}
          className="w-full rounded-md py-1.5 text-[11.5px] font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Cycle Status ({selected.status})
        </button>
      </div>
    </div>
  );
}

// 08 · Grouped Aggregation Table with Subtotals
function GroupedAggregationSubtotals({ ctx }: { ctx: SpecimenContext }) {
  const [groupBy, setGroupBy] = useState<'region' | 'env'>('region');

  const grouped = useMemo(() => {
    const map = new Map<string, AppRecord[]>();
    for (const r of SAMPLE_APPS) {
      const k = r[groupBy];
      map.set(k, [...(map.get(k) ?? []), r]);
    }
    return Array.from(map.entries());
  }, [groupBy]);

  return (
    <div className="overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: 'var(--ink-2)' }}>
          <LayoutList className="h-3.5 w-3.5" /> Group by:
        </span>
        <div className="flex gap-1">
          {(['region', 'env'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setGroupBy(k)}
              className="rounded px-2 py-0.5 text-[11px] font-medium capitalize"
              style={{
                background: groupBy === k ? 'var(--accent)' : 'var(--surface-0)',
                color: groupBy === k ? 'var(--accent-ink)' : 'var(--ink-2)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {grouped.map(([key, items]) => {
        const subtotal = items.reduce((s, x) => s + x.spend, 0);
        return (
          <div key={key}>
            <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold" style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--dial-font-mono)' }}>
              <span style={{ color: 'var(--ink-1)' }}>{key} ({items.length})</span>
              <span className="tabular-nums-auto" style={{ color: 'var(--ink-1)' }}>${subtotal.toLocaleString()}/mo</span>
            </div>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-1.5 text-[11.5px]" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="truncate" style={{ color: 'var(--ink-2)' }}>{ctx.breakUi ? `${item.name} · ${item.owner}` : item.name}</span>
                <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>${item.spend.toLocaleString()}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// 09 · Server-Side Pagination + Page-Size + Select-All-Across-Pages Banner
function ServerPaginationSelectAll({ ctx }: { ctx: SpecimenContext }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedPage, setSelectedPage] = useState(true);
  const [selectedAllServer, setSelectedAllServer] = useState(false);
  const total = ctx.breakUi ? 148920 : 1420;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      {selectedPage && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11.5px]" style={{ background: 'var(--accent-soft)', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ color: 'var(--ink-1)' }}>
            {selectedAllServer
              ? `All ${total.toLocaleString()} matching records across ${totalPages} pages selected.`
              : `All ${pageSize} rows on page ${page} selected.`}
          </span>
          <div className="flex items-center gap-2">
            {!selectedAllServer ? (
              <button type="button" onClick={() => setSelectedAllServer(true)} className="font-semibold underline" style={{ color: 'var(--accent)' }}>
                Select all {total.toLocaleString()} records
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSelectedAllServer(false);
                  setSelectedPage(false);
                }}
                className="font-semibold underline"
                style={{ color: 'var(--ink-1)' }}
              >
                Clear selection
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-3 py-3 text-[12px]">
        <label className="inline-flex items-center gap-2" style={{ color: 'var(--ink-2)' }}>
          <input
            type="checkbox"
            checked={selectedPage}
            onChange={(e) => {
              setSelectedPage(e.target.checked);
              if (!e.target.checked) setSelectedAllServer(false);
            }}
          />
          <span>Select visible rows ({pageSize})</span>
        </label>
        <span className="tabular-nums-auto text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
          {start.toLocaleString()}–{end.toLocaleString()} of {total.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2" style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--ink-3)' }}>
          <span>Rows</span>
          {[25, 50, 100].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => {
                setPageSize(sz);
                setPage(1);
              }}
              className="rounded px-1.5 py-0.5 text-[10.5px]"
              style={{
                background: pageSize === sz ? 'var(--surface-2)' : 'var(--surface-0)',
                color: pageSize === sz ? 'var(--ink-1)' : 'var(--ink-3)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--dial-font-mono)',
              }}
            >
              {sz}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[11px]" style={{ fontFamily: 'var(--dial-font-mono)' }}>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded px-2 py-1 disabled:opacity-40"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          >
            Prev
          </button>
          <span className="tabular-nums-auto px-1" style={{ color: 'var(--ink-2)' }}>
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded px-2 py-1 disabled:opacity-40"
            style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// 10 · CSV / JSON Export + Bulk Import Column Mapper
function ExportImportColumnMapper({ ctx }: { ctx: SpecimenContext }) {
  const [tab, setTab] = useState<'import' | 'export'>('import');
  const [mapping, setMapping] = useState<Record<string, string>>({
    csv_app_name: 'name',
    csv_owner_email: 'owner',
    csv_env_tier: 'env',
    csv_monthly_usd: 'spend',
  });
  const [exported, setExported] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setTab('import')}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
            style={{ background: tab === 'import' ? 'var(--surface-2)' : 'transparent', color: tab === 'import' ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            <Upload className="h-3 w-3" /> Import Mapper
          </button>
          <button
            type="button"
            onClick={() => setTab('export')}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium"
            style={{ background: tab === 'export' ? 'var(--surface-2)' : 'transparent', color: tab === 'export' ? 'var(--ink-1)' : 'var(--ink-3)' }}
          >
            <Download className="h-3 w-3" /> Export Fields
          </button>
        </div>
        <span className="text-[10.5px]" style={{ color: 'var(--success)', fontFamily: 'var(--dial-font-mono)' }}>
          {ctx.breakUi ? '4/4 valid · 12,400 rows' : '4/4 matched'}
        </span>
      </div>

      {tab === 'import' ? (
        <div className="flex flex-col gap-1.5 p-3">
          {Object.entries(mapping).map(([src, target]) => (
            <div key={src} className="grid grid-cols-[1fr_20px_1fr] items-center gap-2 text-[11.5px]">
              <span className="truncate rounded px-2 py-1" style={{ background: 'var(--surface-1)', color: 'var(--ink-2)', fontFamily: 'var(--dial-font-mono)' }}>{src}</span>
              <ArrowUpDown className="mx-auto h-3 w-3 rotate-90" style={{ color: 'var(--ink-3)' }} />
              <select
                value={target}
                onChange={(e) => setMapping((prev) => ({ ...prev, [src]: e.target.value }))}
                className="rounded px-2 py-1 text-[11.5px]"
                style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
              >
                <option value="name">Service Name</option>
                <option value="owner">Owner</option>
                <option value="env">Environment</option>
                <option value="spend">Monthly Spend</option>
                <option value="ignore">Ignore column</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 p-3">
          <div className="text-[11.5px]" style={{ color: 'var(--ink-2)' }}>
            Export current filtered view with visible columns as CSV or JSON.
          </div>
          <button
            type="button"
            onClick={() => setExported(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[11.5px] font-medium"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {exported ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
            {exported ? 'Downloaded CSV' : 'Export CSV'}
          </button>
        </div>
      )}
    </div>
  );
}

// Keep unused icons cleanly referenced if needed in future expansions
void Plus;
void Search;
