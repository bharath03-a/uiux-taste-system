import { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  CheckSquare,
  Clock,
  Folder,
  Inbox,
  MessageSquare,
  Plus,
  Send,
  Star,
  Users,
} from 'lucide-react';
import type { SpecimenContext } from '../types/taste';

interface Props {
  variantId: string;
  ctx: SpecimenContext;
}

export function WorkManagementViewsSpecimen({ variantId, ctx }: Props) {
  switch (variantId) {
    case 'kanban-wip-quick-add':
      return <KanbanWipQuickAdd ctx={ctx} />;
    case 'inbox-triage-split-queue':
      return <InboxTriageSplitQueue ctx={ctx} />;
    case 'roadmap-gantt-timeline':
      return <RoadmapGanttTimeline ctx={ctx} />;
    case 'record-detail-sticky-sidebar':
      return <RecordDetailStickySidebar ctx={ctx} />;
    case 'comment-mentions-activity':
      return <CommentMentionsActivity ctx={ctx} />;
    case 'workload-queue-balancer':
      return <WorkloadQueueBalancer ctx={ctx} />;
    case 'saved-views-folders-sidebar':
      return <SavedViewsFoldersSidebar ctx={ctx} />;
    case 'sla-countdown-escalation':
      return <SlaCountdownEscalation ctx={ctx} />;
    case 'subtasks-checklists-blockers':
      return <SubtasksChecklistsBlockers ctx={ctx} />;
    case 'weekly-resource-calendar':
      return <WeeklyResourceCalendar ctx={ctx} />;
    default:
      return null;
  }
}

// 01 · Kanban Board with WIP Limits & Move Controls
function KanbanWipQuickAdd({ ctx }: { ctx: SpecimenContext }) {
  const [cards, setCards] = useState([
    { id: 'c1', title: 'Migrate webhook retries', col: 'todo' as 'todo' | 'doing' | 'done', prio: 'P1' },
    { id: 'c2', title: 'RBAC export endpoint', col: 'doing' as 'todo' | 'doing' | 'done', prio: 'P0' },
    { id: 'c3', title: 'Audit CSV streaming', col: 'doing' as 'todo' | 'doing' | 'done', prio: 'P1' },
    { id: 'c4', title: 'SCIM sync health check', col: 'done' as 'todo' | 'doing' | 'done', prio: 'P2' },
  ]);

  const move = (id: string) => {
    const order: ('todo' | 'doing' | 'done')[] = ['todo', 'doing', 'done'];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, col: order[(order.indexOf(c.col) + 1) % 3] } : c)));
  };

  return (
    <div className={`grid gap-2 ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {[
        { id: 'todo' as const, label: 'Queued', wip: 4 },
        { id: 'doing' as const, label: 'In Progress', wip: 2 },
        { id: 'done' as const, label: 'Done', wip: 9 },
      ].map((col) => {
        const items = cards.filter((c) => c.col === col.id);
        const overWip = items.length > col.wip;
        return (
          <div key={col.id} className="flex flex-col gap-1.5 rounded-lg p-2" style={{ background: 'var(--surface-1)', border: `1px solid ${overWip ? 'var(--danger)' : 'var(--border-subtle)'}` }}>
            <div className="flex items-center justify-between text-[10.5px] font-semibold" style={{ fontFamily: 'var(--dial-font-mono)' }}>
              <span style={{ color: 'var(--ink-2)' }}>{col.label}</span>
              <span style={{ color: overWip ? 'var(--danger)' : 'var(--ink-3)' }}>{items.length}/{col.wip}</span>
            </div>
            {items.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => move(c.id)}
                className="rounded-md p-2 text-left text-[11.5px]"
                style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="font-medium" style={{ color: 'var(--ink-1)' }}>{ctx.breakUi ? `${c.title} (Sprint 14)` : c.title}</div>
                <div className="mt-1 flex items-center justify-between text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                  <span>{c.prio}</span>
                  <span>Click to advance →</span>
                </div>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// 02 · Inbox & Triage Queue (Split-Pane)
function InboxTriageSplitQueue({ ctx }: { ctx: SpecimenContext }) {
  const [items, setItems] = useState([
    { id: 'i1', title: 'Production latency spike on Claims API', from: 'Monitor Bot', status: 'Open' },
    { id: 'i2', title: 'Access request: Prod DB read-only', from: 'K. Okafor', status: 'Open' },
    { id: 'i3', title: 'Enterprise SSO certificate expiring in 7d', from: 'Security', status: 'Snoozed' },
  ]);
  const [activeId, setActiveId] = useState('i1');
  const active = items.find((i) => i.id === activeId) ?? items[0];

  const markDone = () => {
    if (!active) return;
    setItems((prev) => prev.map((x) => (x.id === active.id ? { ...x, status: 'Triaged' } : x)));
  };

  return (
    <div className={`grid overflow-hidden ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-[210px_1fr]'}`} style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div style={{ borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => setActiveId(it.id)}
            className="flex w-full flex-col gap-0.5 px-3 py-2 text-left text-[11.5px]"
            style={{ background: it.id === activeId ? 'var(--surface-2)' : 'transparent', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div className="truncate font-medium" style={{ color: 'var(--ink-1)' }}>{it.title}</div>
            <div className="flex justify-between text-[10px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              <span>{it.from}</span>
              <span>{it.status}</span>
            </div>
          </button>
        ))}
      </div>
      {active && (
        <div className="flex flex-col justify-between gap-3 p-3" style={{ background: 'var(--surface-1)' }}>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
              <Inbox className="h-3 w-3" /> Triage Item · {active.status}
            </div>
            <div className="mt-1 text-[13px] font-semibold" style={{ color: 'var(--ink-1)' }}>{active.title}</div>
            <p className="mt-1 text-[11.5px]" style={{ color: 'var(--ink-2)' }}>Reported by {active.from}. Ready to route to owner or archive.</p>
          </div>
          <div className="flex gap-1.5">
            <button type="button" onClick={markDone} className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
              <Check className="h-3 w-3" /> Mark Triaged
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 03 · Roadmap / Gantt Timeline Strip
function RoadmapGanttTimeline({ ctx }: { ctx: SpecimenContext }) {
  const [zoom, setZoom] = useState<'Month' | 'Quarter'>('Quarter');
  const bars = [
    { name: 'Saved Table Views v2', start: 5, width: 42, pct: 80 },
    { name: 'RBAC Granular Policies', start: 28, width: 45, pct: 55 },
    { name: 'Audit Packet Exporter', start: 58, width: 36, pct: 20 },
  ];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold" style={{ color: 'var(--ink-1)' }}>Q4 Platform Roadmap</span>
        <div className="flex gap-1">
          {(['Month', 'Quarter'] as const).map((z) => (
            <button key={z} type="button" onClick={() => setZoom(z)} className="rounded px-2 py-0.5 text-[10.5px]" style={{ background: zoom === z ? 'var(--accent)' : 'var(--surface-1)', color: zoom === z ? 'var(--accent-ink)' : 'var(--ink-2)' }}>
              {z}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-1">
        {bars.map((b) => (
          <div key={b.name} className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px]">
              <span style={{ color: 'var(--ink-2)' }}>{ctx.breakUi ? `${b.name} — Multi-Tenant` : b.name}</span>
              <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{b.pct}%</span>
            </div>
            <div className="relative h-4 w-full rounded" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
              <div className="absolute top-0.5 bottom-0.5 overflow-hidden rounded" style={{ left: `${b.start}%`, width: `${b.width}%`, background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}>
                <div className="h-full" style={{ width: `${b.pct}%`, background: 'var(--accent)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 04 · Record Detail Page + Sticky Properties Sidebar
function RecordDetailStickySidebar({ ctx }: { ctx: SpecimenContext }) {
  const [status, setStatus] = useState('In Review');
  const [priority, setPriority] = useState('High');

  return (
    <div className={`grid overflow-hidden ${ctx.mobilePreview ? 'grid-cols-1' : 'grid-cols-[1fr_190px]'}`} style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--dial-radius)' }}>
      <div className="flex flex-col gap-2 p-3.5" style={{ borderRight: ctx.mobilePreview ? undefined : '1px solid var(--border-subtle)' }}>
        <span className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>OPS-419 · Platform Core</span>
        <h4 className="text-[13.5px] font-semibold" style={{ color: 'var(--ink-1)' }}>Add saved views & column pinning to Applications grid</h4>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
          Enterprise admins need persistent view filters, compact density mode, and pinned identifier columns across 10+ metric fields.
        </p>
      </div>
      <div className="flex flex-col gap-2.5 p-3 text-[11px]" style={{ background: 'var(--surface-1)' }}>
        <label className="flex flex-col gap-1">
          <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>STATUS</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded px-2 py-1 text-[11.5px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
            <option>Backlog</option>
            <option>In Progress</option>
            <option>In Review</option>
            <option>Done</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>PRIORITY</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded px-2 py-1 text-[11.5px]" style={{ background: 'var(--surface-0)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}>
            <option>Urgent</option>
            <option>High</option>
            <option>Normal</option>
          </select>
        </label>
      </div>
    </div>
  );
}

// 05 · Comment Thread, @Mentions & Activity Stream
function CommentMentionsActivity({ ctx }: { ctx: SpecimenContext }) {
  const [comments, setComments] = useState([
    { id: 'cm1', author: 'A. Chen', text: 'Verified p95 dropped to 42ms after index rollout.', time: '14m ago' },
  ]);
  const [draft, setDraft] = useState('');

  const submit = () => {
    if (!draft.trim()) return;
    setComments((prev) => [...prev, { id: `cm-${Date.now()}`, author: 'You', text: draft.trim(), time: 'just now' }]);
    setDraft('');
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex flex-col gap-1.5">
        {comments.map((c) => (
          <div key={c.id} className="rounded-lg p-2 text-[11.5px]" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex justify-between text-[10.5px]">
              <strong style={{ color: 'var(--ink-1)' }}>{c.author}</strong>
              <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{c.time}</span>
            </div>
            <div className="mt-0.5" style={{ color: 'var(--ink-2)' }}>{ctx.breakUi ? `${c.text} @rpatel @platform-oncall` : c.text}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <MessageSquare className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Reply or @mention teammate…"
          className="min-w-0 flex-1 rounded-md px-2.5 py-1.5 text-[11.5px] outline-none"
          style={{ background: 'var(--surface-1)', color: 'var(--ink-1)', border: '1px solid var(--border-subtle)' }}
        />
        <button type="button" onClick={submit} className="rounded-md p-1.5" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }} aria-label="Send comment">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// 06 · Bulk Assignment & Team Workload Balancer
function WorkloadQueueBalancer({ ctx }: { ctx: SpecimenContext }) {
  const [unassigned, setUnassigned] = useState(6);
  const [team, setTeam] = useState([
    { name: 'A. Chen', load: 85 },
    { name: 'R. Patel', load: 52 },
    { name: 'M. Silva', load: 40 },
  ]);

  const rebalance = () => {
    if (unassigned <= 0) return;
    setUnassigned(0);
    setTeam([
      { name: 'A. Chen', load: 85 },
      { name: 'R. Patel', load: 74 },
      { name: 'M. Silva', load: 72 },
    ]);
  };

  return (
    <div className="flex flex-col gap-2.5 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Users className="h-3.5 w-3.5" /> {unassigned} Unassigned Items
        </span>
        <button type="button" onClick={rebalance} disabled={unassigned === 0} className="rounded px-2 py-0.5 text-[10.5px] font-medium disabled:opacity-40" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          Auto-Balance
        </button>
      </div>
      {team.map((m) => (
        <div key={m.name} className="flex items-center gap-2 text-[11.5px]">
          <span className="w-20 truncate" style={{ color: 'var(--ink-2)' }}>{ctx.breakUi ? `${m.name} (Sr.)` : m.name}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${m.load}%`, background: m.load > 80 ? 'var(--danger)' : 'var(--accent)' }} />
          </div>
          <span className="tabular-nums-auto w-9 text-right text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{m.load}%</span>
        </div>
      ))}
    </div>
  );
}

// 07 · Saved Filters, Folders & Custom Views Sidebar
function SavedViewsFoldersSidebar({ ctx }: { ctx: SpecimenContext }) {
  const [pinned, setPinned] = useState<Record<string, boolean>>({ 'prod-err': true, 'my-queue': true, 'sla-risk': false });
  const views = [
    { id: 'prod-err', label: ctx.breakUi ? 'Production Degraded Services (Auto)' : 'Prod Degraded', count: 4 },
    { id: 'my-queue', label: 'Assigned to Me', count: 12 },
    { id: 'sla-risk', label: 'SLA Breach < 2h', count: 2 },
  ];

  return (
    <div className="flex flex-col gap-1 rounded-xl p-2.5" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="px-2 py-1 text-[10px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>Saved Views</div>
      {views.map((v) => (
        <div key={v.id} className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px]" style={{ background: 'var(--surface-1)' }}>
          <span className="flex min-w-0 items-center gap-1.5" style={{ color: 'var(--ink-1)' }}>
            <Folder className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--ink-3)' }} />
            <span className="truncate">{v.label}</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="tabular-nums-auto text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{v.count}</span>
            <button type="button" onClick={() => setPinned((p) => ({ ...p, [v.id]: !p[v.id] }))} aria-label="Pin view">
              <Star className="h-3.5 w-3.5" fill={pinned[v.id] ? 'currentColor' : 'none'} style={{ color: pinned[v.id] ? 'var(--accent)' : 'var(--ink-3)' }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 08 · SLA Countdown & Escalation Queue
function SlaCountdownEscalation({ ctx }: { ctx: SpecimenContext }) {
  const [escalated, setEscalated] = useState<string[]>([]);
  const tickets = [
    { id: 'INC-901', title: 'OAuth token refresh failing (EU)', left: '00:18:42', risk: true },
    { id: 'INC-904', title: 'CSV export timeout > 50k rows', left: '03:45:10', risk: false },
  ];

  return (
    <div className="flex flex-col gap-2">
      {tickets.map((t) => {
        const isEsc = escalated.includes(t.id);
        return (
          <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2.5" style={{ background: 'var(--surface-0)', border: `1px solid ${t.risk ? 'var(--danger)' : 'var(--border-subtle)'}` }}>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: 'var(--ink-1)' }}>
                <AlertCircle className="h-3.5 w-3.5 shrink-0" style={{ color: t.risk ? 'var(--danger)' : 'var(--ink-3)' }} />
                <span className="truncate">{ctx.breakUi ? `${t.id} · ${t.title}` : t.title}</span>
              </div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-[10.5px]" style={{ color: t.risk ? 'var(--danger)' : 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>
                <Clock className="h-3 w-3" /> SLA {t.left}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEscalated((prev) => (prev.includes(t.id) ? prev : [...prev, t.id]))}
              className="rounded px-2 py-1 text-[10.5px] font-medium"
              style={{ background: isEsc ? 'var(--surface-2)' : 'var(--danger-soft)', color: isEsc ? 'var(--ink-2)' : 'var(--danger)' }}
            >
              {isEsc ? 'Escalated' : 'Escalate'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// 09 · Subtasks, Checklists & Dependency Blockers
function SubtasksChecklistsBlockers({ ctx }: { ctx: SpecimenContext }) {
  const [tasks, setTasks] = useState([
    { id: 's1', label: 'Schema migration dry-run', done: true },
    { id: 's2', label: 'Backfill saved-view presets', done: false },
    { id: 's3', label: 'QA 390px mobile drawer', done: false },
  ]);
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <CheckSquare className="h-3.5 w-3.5" /> Checklist ({doneCount}/{tasks.length})
        </span>
        <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'var(--danger-soft)', color: 'var(--danger)', fontFamily: 'var(--dial-font-mono)' }}>
          Blocked by OPS-401
        </span>
      </div>
      {tasks.map((t) => (
        <label key={t.id} className="flex cursor-pointer items-center gap-2 text-[12px]" style={{ color: t.done ? 'var(--ink-3)' : 'var(--ink-1)' }}>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
          />
          <span className={t.done ? 'line-through' : ''}>{ctx.breakUi ? `${t.label} (verified)` : t.label}</span>
        </label>
      ))}
    </div>
  );
}

// 10 · Weekly Schedule & Resource Calendar Grid
function WeeklyResourceCalendar({ ctx }: { ctx: SpecimenContext }) {
  const [selectedDay, setSelectedDay] = useState('Wed');
  const days = [
    { d: 'Mon', event: 'Release 4.2' },
    { d: 'Tue', event: 'DB Maint.' },
    { d: 'Wed', event: 'Audit Sync' },
    { d: 'Thu', event: '—' },
    { d: 'Fri', event: 'Deploy Freeze' },
  ];

  return (
    <div className="flex flex-col gap-2 rounded-xl p-3" style={{ background: 'var(--surface-0)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--ink-1)' }}>
          <Calendar className="h-3.5 w-3.5" /> Release Calendar
        </span>
        <span className="text-[10.5px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>Selected: {selectedDay}</span>
      </div>
      <div className={`grid gap-1.5 ${ctx.mobilePreview ? 'grid-cols-2' : 'grid-cols-5'}`}>
        {days.map((day) => {
          const active = selectedDay === day.d;
          return (
            <button
              key={day.d}
              type="button"
              onClick={() => setSelectedDay(day.d)}
              className="flex flex-col gap-1 rounded-lg p-2 text-left"
              style={{
                background: active ? 'var(--accent-soft)' : 'var(--surface-1)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-subtle)'}`,
              }}
            >
              <span className="text-[10px] font-semibold uppercase" style={{ color: 'var(--ink-3)', fontFamily: 'var(--dial-font-mono)' }}>{day.d}</span>
              <span className="truncate text-[11px] font-medium" style={{ color: 'var(--ink-1)' }}>{day.event}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

void Plus;
